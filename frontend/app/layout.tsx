import Logo from '@/assets/images/favicon.png';
import type { Metadata } from "next";
import { headers } from "next/headers";
import WagmiContextProvider from "./_context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home | EasyMilestones",
  description: "A decentralized milestone payment system that automates payments based on predefined timelines. Built with Solidity and TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie") || "";
  return (
    <html lang="en">
      <link rel="icon" href={Logo.src} />
      <body
        className={`w-screen h-screen font-Satoshi antialiased font-medium`}
      >
        <WagmiContextProvider cookies={cookies} >
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
