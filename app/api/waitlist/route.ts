import { NextRequest, NextResponse } from "next/server";

interface WaitlistEntry {
  email: string;
  name?: string;
  joinedAt: string;
  source: string;
}

/**
 * Validates an email address without using regex (avoids ReDoS risk).
 * Checks RFC 5321 structural constraints: local@domain with a dot in domain.
 */
function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;

  // Must contain exactly one '@'; we search from the right to handle sub-addressing
  const atIndex = email.lastIndexOf("@");
  if (atIndex < 1) return false; // no local part

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (local.length === 0 || local.length > 64) return false;
  if (domain.length === 0 || domain.length > 253) return false;

  // Domain must contain at least one dot with text on both sides
  const lastDot = domain.lastIndexOf(".");
  if (lastDot < 1 || lastDot >= domain.length - 1) return false;

  // Reject whitespace anywhere in the address
  if (/\s/.test(email)) return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body as { email?: string; name?: string };

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 },
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const trimmedName =
      name && typeof name === "string" ? name.trim().slice(0, 100) : undefined;

    const entry: WaitlistEntry = {
      email: trimmedEmail,
      ...(trimmedName ? { name: trimmedName } : {}),
      joinedAt: new Date().toISOString(),
      source: "website",
    };

    // ------------------------------------------------------------------
    // Storage layer — extend this section to integrate with your preferred
    // service (e.g. Klaviyo, Mailchimp, a database, or a Google Sheet).
    // ------------------------------------------------------------------
    await persistEntry(entry);

    return NextResponse.json(
      {
        message:
          "You have been added to our exclusive waitlist. Expect a confirmation shortly.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[waitlist] POST error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}

/**
 * Persist a waitlist entry.
 *
 * Out of the box this simply logs to stdout (suitable for serverless
 * platforms that aggregate structured logs).  Replace / extend with
 * your preferred storage backend:
 *   - Klaviyo:   POST https://a.klaviyo.com/api/profiles/
 *   - Mailchimp: POST https://<dc>.api.mailchimp.com/3.0/lists/<id>/members
 *   - Supabase / PlanetScale / Neon: insert into `waitlist` table
 *   - Resend / SendGrid: trigger a confirmation email
 */
async function persistEntry(entry: WaitlistEntry): Promise<void> {
  const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const klaviyoListId = process.env.KLAVIYO_LIST_ID;

  if (klaviyoApiKey && klaviyoListId) {
    await subscribeToKlaviyo(entry, klaviyoApiKey, klaviyoListId);
    return;
  }

  // Fallback: structured log (captured by Vercel / cloud log sinks)
  console.log(
    JSON.stringify({ event: "waitlist_signup", ...entry }),
  );
}

async function subscribeToKlaviyo(
  entry: WaitlistEntry,
  apiKey: string,
  listId: string,
): Promise<void> {
  const payload = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: entry.email,
                ...(entry.name ? { first_name: entry.name } : {}),
              },
            },
          ],
        },
      },
      relationships: {
        list: {
          data: { type: "list", id: listId },
        },
      },
    },
  };

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        revision: "2024-02-15",
        "content-type": "application/json",
        Authorization: `Klaviyo-API-Key ${apiKey}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Klaviyo API error ${res.status}: ${text}`);
  }
}
