import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "HyperPad - The First Ever Creator Launchpad on HyperEVM",
  description: "Create, launch, and trade unique NFT collections on the fastest blockchain network. Join the future of digital art and collectibles.",
  keywords: "NFT, HyperEVM, blockchain, digital art, collectibles, launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen gradient-bg-dark relative">
        <AnimatedBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
