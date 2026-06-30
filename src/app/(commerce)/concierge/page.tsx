import TransitionLink from "@/components/ui/TransitionLink";

export const metadata = {
  title: "Concierge",
  description: "Private checkout experience for House of Piranha.",
};

export default function ConciergePage() {
  return (
    <main className="page-shell">
      <section className="concierge-hero">
        <h1>Concierge Service</h1>
        <p>White-glove checkout for the discerning collector.</p>
        <p className="subtle">This experience is coming soon. For now, contact us directly.</p>

        <div className="concierge-actions">
          <TransitionLink href="/" className="button button-primary">
            Return Home
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
