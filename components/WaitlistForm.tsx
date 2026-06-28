"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          data.message ?? "You have been added to our exclusive waitlist.",
        );
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please try again later.");
    }
  };

  return (
    <section
      id="waitlist"
      className="py-32 px-6 relative bg-[#0f0f12]"
    >
      {/* Top divider */}
      <div className="gold-line mb-20" />

      <div className="max-w-2xl mx-auto text-center">
        {/* Section label */}
        <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-6">
          Exclusive Access
        </p>

        <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] font-light italic mb-4">
          Join the Inner Circle
        </h2>

        <p className="text-[#c8bfa8] text-sm tracking-wider mb-12 leading-relaxed">
          Be the first to access our inaugural collection. Members receive
          priority access, private previews, and invitations to exclusive events.
        </p>

        {status === "success" ? (
          <SuccessState message={message} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border border-[#26262e] hover:border-[#c9a84c]/40 focus:border-[#c9a84c] text-[#f5f0e8] placeholder-[#6b6658] px-5 py-4 text-sm tracking-wider outline-none transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-[#26262e] hover:border-[#c9a84c]/40 focus:border-[#c9a84c] text-[#f5f0e8] placeholder-[#6b6658] px-5 py-4 text-sm tracking-wider outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs tracking-wider">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="mt-2 w-full sm:w-auto sm:mx-auto px-16 py-4 bg-[#c9a84c] text-[#09090b] text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#e4c97a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.25)] active:scale-[0.98]"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingDots />
                  Requesting Access
                </span>
              ) : (
                "Request Access"
              )}
            </button>

            <p className="text-[#6b6658] text-[11px] tracking-wider mt-2">
              We respect your privacy. No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>

      {/* Bottom divider */}
      <div className="gold-line mt-20" />
    </section>
  );
}

function SuccessState({ message }: { message: string }) {
  return (
    <div className="py-12 flex flex-col items-center gap-6">
      <div className="w-16 h-16 border border-[#c9a84c] flex items-center justify-center">
        <svg
          className="w-7 h-7 text-[#c9a84c]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">
          Welcome
        </p>
        <p className="text-[#f5f0e8] text-lg font-light">{message}</p>
      </div>
      <p className="text-[#6b6658] text-xs tracking-wider">
        Confirmation has been sent to your email.
      </p>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 bg-[#09090b] rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
