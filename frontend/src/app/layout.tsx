import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0d14",
};

export const metadata: Metadata = {
  title: "BEEVIL KNIEVEL - Sub-GHz Acoustic & Brood Telemetry for Commercial Apiaries",
  description:
    "Sensors track brood temperature, acoustic FFT spectrum, and CO2 across 100+ hives. Continuous edge intelligence without cracking propolis seals.",
  keywords: [
    "Beevil Knievel",
    "precision apiculture",
    "hive telemetry",
    "TinyML",
    "brood thermometry",
    "acoustic FFT",
    "commercial beekeeping",
    "LoRa mesh",
  ],
  authors: [{ name: "Beevil Knievel Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0d14] text-[#f4f4f6] font-sans antialiased min-h-screen selection:bg-[#f0b840]/30 selection:text-[#f0b840]">
        {children}
      </body>
    </html>
  );
}
