import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

type AuthenticatorTransportFuture = "ble" | "cable" | "hybrid" | "internal" | "nfc" | "smart-card" | "usb";
type CredentialDeviceType = "singleDevice" | "multiDevice";

export const WEBAUTHN_CONFIG = {
  rpName: process.env.WEBAUTHN_RP_NAME ?? "House of Piranha",
  rpID: process.env.WEBAUTHN_RP_ID ?? "localhost",
  origin: process.env.WEBAUTHN_ORIGIN ?? "http://localhost:3000",
  timeout: 60_000,
};

export interface StoredCredential {
  credentialID: string;
  credentialPublicKey: Uint8Array<ArrayBuffer>;
  counter: number;
  credentialDeviceType: CredentialDeviceType;
  credentialBackedUp: boolean;
  transports?: AuthenticatorTransportFuture[];
  userId: string;
  registeredAt: string;
}

export async function generateVaultRegistrationOptions(userId: string, userName: string) {
  return generateRegistrationOptions({
    rpName: WEBAUTHN_CONFIG.rpName,
    rpID: WEBAUTHN_CONFIG.rpID,
    userID: new TextEncoder().encode(userId),
    userName,
    timeout: WEBAUTHN_CONFIG.timeout,
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
      authenticatorAttachment: "platform",
    },
    supportedAlgorithmIDs: [-7, -257],
  });
}

export async function generateVaultAuthenticationOptions(
  allowCredentials: Array<{ id: string; transports?: AuthenticatorTransportFuture[] }>,
) {
  return generateAuthenticationOptions({
    rpID: WEBAUTHN_CONFIG.rpID,
    timeout: WEBAUTHN_CONFIG.timeout,
    userVerification: "preferred",
    allowCredentials: allowCredentials.map((credential) => ({
      id: credential.id,
      transports: credential.transports,
    })),
  });
}

export async function verifyVaultRegistration(registrationResponse: unknown, expectedChallenge: string) {
  return verifyRegistrationResponse({
    response: registrationResponse as Parameters<typeof verifyRegistrationResponse>[0]["response"],
    expectedChallenge,
    expectedOrigin: WEBAUTHN_CONFIG.origin,
    expectedRPID: WEBAUTHN_CONFIG.rpID,
    requireUserVerification: false,
  });
}

export async function verifyVaultAuthentication(
  authResponse: unknown,
  expectedChallenge: string,
  credential: StoredCredential,
) {
  return verifyAuthenticationResponse({
    response: authResponse as Parameters<typeof verifyAuthenticationResponse>[0]["response"],
    expectedChallenge,
    expectedOrigin: WEBAUTHN_CONFIG.origin,
    expectedRPID: WEBAUTHN_CONFIG.rpID,
    requireUserVerification: false,
    credential: {
      id: credential.credentialID,
      publicKey: credential.credentialPublicKey,
      counter: credential.counter,
      transports: credential.transports,
    },
  });
}
