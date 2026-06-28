import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vault_session";
const DEFAULT_SECRET = "local-development-house-of-piranha-session-secret";

function secret() {
  return process.env.VAULT_SESSION_SECRET ?? process.env.AUTH0_SECRET ?? DEFAULT_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createVaultSession(userId = "demo-vault-member") {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      id: randomUUID(),
      sub: userId,
      iat: issuedAt,
      exp: issuedAt + 60 * 60 * 24 * 7,
    }),
    "utf8",
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyVaultSession(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub: string;
      exp: number;
    };
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getVaultSession() {
  const cookieStore = await cookies();
  return verifyVaultSession(cookieStore.get(COOKIE_NAME)?.value);
}

export function setVaultSessionCookie(response: Response, token: string) {
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`,
  );
}
