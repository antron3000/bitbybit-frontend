import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";
import { AIChat } from "@/components/AIChat";
import "@rainbow-me/rainbowkit/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitbybit - Decentralized Philanthropy",
  description: "Lock your USDC principal, stream high-yield returns to charities",
  icons: {
    icon: '/bitbybit-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[rgb(10,10,20)] text-white min-h-screen`}
      >
        <Providers>
          <Navigation />
          {children}
          <AIChat />
        </Providers>
      </body>
    </html>
  );
}
