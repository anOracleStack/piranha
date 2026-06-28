import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("vault_challenge");

    return Response.json(
      {
        verified: false,
        error: "Credential storage is not connected yet.",
      },
      { status: 501 },
    );
  } catch (error) {
    console.error("[WebAuthn Verify]", error);
    return Response.json({ error: "Verification failed." }, { status: 500 });
  }
}
