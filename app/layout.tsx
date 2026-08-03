import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Clerjaud Alan | Serrurerie, vitrerie, plomberie à Noiseau",
  description:
    "Clerjaud Alan intervient 24h/24 à Noiseau et autour pour la serrurerie, la vitrerie, la plomberie et le chauffage.",
  applicationName: "Clerjaud Alan",
  keywords: [
    "serrurier Noiseau",
    "plombier Noiseau",
    "vitrier Noiseau",
    "chauffagiste Noiseau",
    "dépannage 24h/24",
    "Clerjaud Alan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Clerjaud Alan — Dépannage multi-métiers 24h/24",
    description:
      "Serrurerie, vitrerie, plomberie et chauffage à Noiseau et dans les communes voisines.",
    url: "/",
    siteName: "Clerjaud Alan",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/opengraph.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clerjaud Alan — Dépannage multi-métiers 24h/24",
    description: "Serrurerie, vitrerie, plomberie et chauffage à Noiseau.",
    images: ["/images/opengraph.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071832",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
