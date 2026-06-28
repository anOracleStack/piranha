import { createHmac, timingSafeEqual } from "node:crypto";
import { dppRecords } from "@/lib/catalog";
import type { DPPData } from "@/types";

const DEFAULT_DPP_SECRET = "local-development-house-of-piranha-dpp-secret";

function getSecret() {
  return process.env.DPP_HMAC_SECRET ?? DEFAULT_DPP_SECRET;
}

function getTtlSeconds() {
  return Number.parseInt(process.env.DPP_URL_TTL_SECONDS ?? "86400", 10);
}

export function generateDPPUrl(uuid: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `${uuid}:${timestamp}`;
  const signature = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `/dpp/${uuid}?t=${timestamp}&s=${signature}`;
}

export function verifyDPPUrl(
  uuid: string,
  timestamp: string,
  signature: string,
): { valid: boolean; reason?: string } {
  const ts = Number.parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);

  if (!Number.isFinite(ts) || now < ts) {
    return { valid: false, reason: "Invalid passport timestamp." };
  }

  if (now - ts > getTtlSeconds()) {
    return { valid: false, reason: "Passport link expired. Tap the product again." };
  }

  if (!/^[0-9a-f]{64}$/i.test(signature)) {
    return { valid: false, reason: "Passport signature is malformed." };
  }

  const expected = createHmac("sha256", getSecret()).update(`${uuid}:${timestamp}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return { valid: false, reason: "Passport signature mismatch." };
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer)
    ? { valid: true }
    : { valid: false, reason: "Passport signature mismatch." };
}

export async function getDPPByUUID(uuid: string): Promise<DPPData | null> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
    return null;
  }

  return dppRecords.find((record) => record.uuid === uuid) ?? null;
}

export async function registerDPPOwnership(uuid: string, ownershipHash: string) {
  const record = await getDPPByUUID(uuid);
  if (!record) return false;
  record.ownershipHash = ownershipHash;
  return true;
}

export function formatManufactureDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}
