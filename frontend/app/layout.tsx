import type { Metadata } from "next";
import { headers } from "next/headers";
import WagmiContextProvider from "./_context";
import { LocalAccountProvider } from "./_context/local-account";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home | EasyMilestones",
  description:
    "A decentralized milestone payment system that automates payments based on predefined timelines. Built with Solidity and TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie") || "";
  return (
    <html lang="en" className="w-screen h-screen no-scrollbar">
      <body className={`w-screen h-screen antialiased font-medium font-Satoshi select-none`}>
        <LocalAccountProvider>
          <WagmiContextProvider cookies={cookies}>
            {children}
          </WagmiContextProvider>
        </LocalAccountProvider>
      </body>
    </html>
  );
}
