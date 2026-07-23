import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Bebas_Neue } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Smile Media — We Build. We Create.",
  description:
    "Digital marketing agency in Colombo, Sri Lanka. Flyers, banners, brand identities & digital campaigns — crafted to stop the scroll.",
  openGraph: {
    title: "Smile Media — We Build. We Create.",
    description:
      "Transforming ideas into powerful designs and strategies that make brands unforgettable.",
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
