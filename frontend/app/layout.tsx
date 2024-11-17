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
      <body
        className={`w-screen h-screen bg-red-50 antialiased font-medium`}
      >
        <WagmiContextProvider cookies={cookies} >
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
