import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CartDrawer from "@/components/product/CartDrawer";
import MobileBottomDock from "@/components/nav/MobileBottomDock";
import NavigationShell from "@/components/nav/NavigationShell";
import VaultTransition from "@/components/motion/VaultTransition";
import ZipperOverlay from "@/components/motion/ZipperOverlay";
import { ZipperProvider } from "@/contexts/ZipperContext";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://houseofpiranha.com"),
  title: {
    default: "House of Piranha",
    template: "%s | House of Piranha",
  },
  description: "Luxury leather goods, travel armor, and authenticated objects for the private room.",
  openGraph: {
    title: "House of Piranha",
    description: "Luxury that bites back.",
    siteName: "House of Piranha",
    type: "website",
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
      <body>
        <ZipperProvider>
          <NavigationShell />
          <VaultTransition>{children}</VaultTransition>
          <MobileBottomDock />
          <CartDrawer />
          <ZipperOverlay />
        </ZipperProvider>
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
