import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beevil Knievel — Edge AI Hive Health & Pathology System",
  description:
    "Autonomous Edge-AI Environmental & Acoustic Health Monitoring System for Precision Apiculture. Powered by Antmicro CM4 Gateway, 16 Multi-Sensor Telemetry Fusion, and 96.84% Out-of-Sample Accuracy.",
  openGraph: {
    title: "Beevil Knievel — Edge AI Hive Health & Pathology System",
    description:
      "Autonomous Edge-AI Environmental & Acoustic Health Monitoring System for Precision Apiculture. IEEE HardwAIre Challenge Master Standard.",
    siteName: "Beevil Knievel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beevil Knievel — Edge AI Hive Health & Pathology System",
    description:
      "Autonomous Edge-AI Environmental & Acoustic Health Monitoring System for Precision Apiculture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#7a8085] text-white selection:bg-[#ffc833] selection:text-[#312f28]">
        {children}
      </body>
    </html>
  );
}
