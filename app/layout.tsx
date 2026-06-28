import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Piranha — Luxury Redefined",
  description:
    "An exclusive luxury atelier. Predatory elegance meets artisanal craft. Join our waitlist for Season I access.",
  keywords: [
    "luxury fashion",
    "exclusive collection",
    "House of Piranha",
    "luxury brand",
    "artisanal",
    "limited edition",
  ],
  authors: [{ name: "House of Piranha" }],
  openGraph: {
    title: "House of Piranha — Luxury Redefined",
    description:
      "An exclusive luxury atelier. Predatory elegance meets artisanal craft.",
    siteName: "House of Piranha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Piranha — Luxury Redefined",
    description:
      "An exclusive luxury atelier. Predatory elegance meets artisanal craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts — loaded at runtime, does not block the build */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain-overlay antialiased">{children}</body>
    </html>
  );
}
