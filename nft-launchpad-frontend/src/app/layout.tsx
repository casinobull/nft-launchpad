import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Providers } from "@/providers/WagmiProvider";

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
        <Providers>
          <AnimatedBackground />
          {/* Dark overlay to slightly dim the whole page */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-black/40" />
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
