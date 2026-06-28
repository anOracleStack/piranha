import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatManufactureDate, getDPPByUUID, verifyDPPUrl } from "@/lib/dpp";
import DPPVaultNotice from "./DPPVaultNotice";

interface DPPPageProps {
  params: Promise<{ hash: string }>;
  searchParams: Promise<{ t?: string; s?: string }>;
}

export const metadata: Metadata = {
  title: "Product Passport",
  description: "Authenticate your House of Piranha piece.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DPPPage({ params, searchParams }: DPPPageProps) {
  const { hash } = await params;
  const { t, s } = await searchParams;

  if (!t || !s) {
    return <DPPError message="This passport link is incomplete. Tap the product again." />;
  }

  const verification = verifyDPPUrl(hash, t, s);
  if (!verification.valid) {
    return <DPPError message={verification.reason ?? "This passport link cannot be verified."} />;
  }

  const dpp = await getDPPByUUID(hash);
  if (!dpp) {
    return <DPPError message="Passport not found. Contact Concierge for assistance." />;
  }

  return (
    <main className="dpp-page">
      <section className="dpp-card">
        <div className="dpp-header">
          <Image src="/images/brand/logo-gold.svg" alt="" width={44} height={44} unoptimized />
          <div>
            <p>House of Piranha</p>
            <span>Digital Product Passport</span>
          </div>
        </div>
        <div className="dpp-authenticated">Cryptographic verification passed</div>
        <h1>{dpp.productHandle.replaceAll("-", " ")}</h1>
        <p>Serial {dpp.serialNumber}</p>
        <dl className="passport-grid">
          <PassportField label="Manufactured" value={formatManufactureDate(dpp.manufactureDate)} />
          <PassportField label="Workshop" value={dpp.workshopCode} />
          <PassportField label="Artisan ID" value={dpp.artisanId} />
          <PassportField label="Hardware" value={dpp.hardwareSpec.primaryMetal} />
        </dl>
        <div className="material-list">
          {dpp.materials.map((material) => (
            <div key={material.component}>
              <div>
                <p>{material.component}</p>
                <span>{material.material}</span>
              </div>
              <strong>{material.origin}</strong>
            </div>
          ))}
        </div>
        <DPPVaultNotice />
      </section>
    </main>
  );
}

function PassportField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function DPPError({ message }: { message: string }) {
  return (
    <main className="dpp-page">
      <section className="dpp-card dpp-error">
        <Image src="/images/brand/logo-gold.svg" alt="" width={52} height={52} unoptimized />
        <h1>Passport unavailable</h1>
        <p>{message}</p>
        <Link href="/" className="house-button button-quiet button-md justify-center">
          Return to house
        </Link>
      </section>
    </main>
  );
}
