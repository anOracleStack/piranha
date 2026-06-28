import type { Metadata } from "next";
import { getVaultSession } from "@/lib/session";
import VaultEntryClient from "./VaultEntryClient";

export const metadata: Metadata = {
  title: "The Vault",
  description: "Private biometric entry for House of Piranha allocation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VaultPage() {
  const session = await getVaultSession();

  return (
    <main className="vault-page">
      <VaultEntryClient initiallyVerified={Boolean(session)} />
    </main>
  );
}
