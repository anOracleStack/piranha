"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { motion } from "framer-motion";
import { Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { HouseButton, HouseLink } from "@/components/ui/HouseButton";

export default function VaultEntryClient({ initiallyVerified }: { initiallyVerified: boolean }) {
  const [verified, setVerified] = useState(initiallyVerified);
  const [loading, setLoading] = useState(false);
  const [available] = useState(() => typeof window !== "undefined" && Boolean(window.PublicKeyCredential));
  const [message, setMessage] = useState("");

  const verify = async () => {
    setLoading(true);
    setMessage("");
    try {
      const challenge = await fetch("/api/auth/webauthn/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "authenticate" }),
      }).then((response) => response.json());

      let credential: unknown = { demo: true };
      if (available && challenge.options?.challenge && !challenge.demo) {
        credential = await startAuthentication({ optionsJSON: challenge.options });
      }

      const result = await fetch("/api/auth/webauthn/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }).then((response) => response.json());

      if (result.verified) {
        setVerified(true);
      } else {
        setMessage(result.error ?? "Vault entry failed.");
      }
    } catch {
      setMessage("Vault entry failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vault-entry">
      <motion.div
        className="vault-ring"
        animate={{ rotate: verified ? 0 : 360 }}
        transition={{ duration: 18, repeat: verified ? 0 : Infinity, ease: "linear" }}
        aria-hidden
      />
      <div className="vault-panel">
        <p className="eyebrow">Biometric Vault</p>
        <h1>{verified ? "Vault open" : "Verify identity"}</h1>
        <p>
          {verified
            ? "Your private allocation room is available."
            : "Passkey entry unlocks the private House allocation surface."}
        </p>
        <div className="vault-status">
          {verified ? <ShieldCheck className="size-6" aria-hidden /> : <Fingerprint className="size-6" aria-hidden />}
          <span>{verified ? "Verified member session" : available ? "Passkey available" : "Demo biometric mode"}</span>
        </div>
        {verified ? (
          <div className="vault-actions">
            <HouseLink href="/collections/hardware" variant="vault" size="lg">
              View hardware
            </HouseLink>
            <HouseLink href="/collections/the-fleet" size="lg">
              Private armory
            </HouseLink>
          </div>
        ) : (
          <HouseButton type="button" variant="vault" size="lg" loading={loading} onClick={verify}>
            <LockKeyhole className="size-4" aria-hidden />
            Verify identity
          </HouseButton>
        )}
        <p className="vault-message" aria-live="polite">
          {message}
        </p>
      </div>
    </section>
  );
}
