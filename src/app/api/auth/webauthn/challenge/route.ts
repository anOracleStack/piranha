import { cookies } from "next/headers";
import { generateVaultAuthenticationOptions, generateVaultRegistrationOptions } from "@/lib/webauthn";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      mode?: "register" | "authenticate";
      userId?: string;
      userName?: string;
    };

    const options =
      body.mode === "register"
        ? await generateVaultRegistrationOptions(body.userId ?? "demo-vault-member", body.userName ?? "Vault Member")
        : await generateVaultAuthenticationOptions([]);

    const cookieStore = await cookies();
    cookieStore.set("vault_challenge", options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 5,
      path: "/api/auth/webauthn",
    });

    return Response.json({
      options,
      credentialStoreConnected: false,
    });
  } catch (error) {
    console.error("[WebAuthn Challenge]", error);
    return Response.json({ error: "Challenge generation failed." }, { status: 500 });
  }
}
