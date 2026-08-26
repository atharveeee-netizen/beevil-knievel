import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEEVIL KNIEVEL — Cyber-Physical Apiculture & Edge AI Telemetry",
  description:
    "Autonomous Cyber-Physical Apiculture & Edge-AI Hive Health Telemetry Fusion Array. Antmicro CM4 Gateway, LoRaWAN IN865 Multi-Hop Mesh, and Cryptographic Honey Chain Ledger.",
  openGraph: {
    title: "BEEVIL KNIEVEL — Cyber-Physical Apiculture & Edge AI Telemetry",
    description:
      "Autonomous Cyber-Physical Apiculture & Edge-AI Hive Health Telemetry Fusion Array. Antmicro CM4 Gateway, LoRaWAN IN865 Multi-Hop Mesh.",
    siteName: "BEEVIL KNIEVEL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BEEVIL KNIEVEL — Cyber-Physical Apiculture & Edge AI Telemetry",
    description:
      "Autonomous Cyber-Physical Apiculture & Edge-AI Hive Health Telemetry Fusion Array.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-[#070a12] text-[#f8fafc] selection:bg-[#f59e0b] selection:text-[#070a12]">
        {children}
      </body>
    </html>
  );
}
