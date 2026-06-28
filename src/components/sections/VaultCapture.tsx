"use client";

import { useState, useCallback } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { HouseButton } from "@/components/ui/HouseButton";

export default function VaultCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/vault/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }, [email, status]);

  return (
    <section className="vault-capture-v2" aria-label="Enter the Vault — Private Allocation Waitlist">
      {/* Vault pulse rings */}
      <div className="vault-pulse-rings" aria-hidden>
        <div className="vault-pulse-ring vault-pulse-ring-outer" />
        <div className="vault-pulse-ring-2 vault-pulse-ring vault-pulse-ring-inner" />
      </div>

      <div className="vault-capture-v2-inner">
        <ScrollReveal>
          <p className="eyebrow">Private Access</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="vault-capture-v2-h2">
            Enter<br />The Vault.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="vault-capture-v2-sub">
            First access to Private Allocations. Invitations to Vault events.
            The Concierge on speed dial. No noise. No newsletters. No retail.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {status === "success" ? (
            <div className="vault-capture-success">
              <p className="vault-capture-success-h">Access Pending.</p>
              <p className="vault-capture-success-sub">
                You will be contacted directly when your allocation is confirmed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="vault-capture-v2-form" aria-label="Vault waitlist signup">
              <label htmlFor="vault-email-v2" className="sr-only">Email address</label>
              <input
                id="vault-email-v2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER VAULT"
                className="vault-input"
                required
                autoComplete="email"
              />
              <HouseButton
                type="submit"
                variant="gold"
                size="lg"
                loading={status === "loading"}
              >
                {status === "loading" ? "Requesting..." : "Request Access"}
              </HouseButton>
              {status === "error" && (
                <p className="vault-capture-error" role="alert">Enter a valid email address.</p>
              )}
            </form>
          )}
          <p className="vault-capture-v2-disclaimer">
            By requesting access, you agree to our Privacy Policy. We will never sell your information.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
