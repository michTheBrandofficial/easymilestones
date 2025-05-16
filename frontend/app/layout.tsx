import type { Metadata } from "next";
import { headers } from "next/headers";
import WagmiContextProvider from "./_context";
import { LocalAccountProvider } from "./_context/local-account";
import "./globals.css";
import { SheetProvider } from "@/components/ui/sheet";

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
    <html lang="en" className="w-screen h-screen overflow-y-auto no-scrollbar">
      <body
        className={`w-screen h-screen antialiased font-medium font-Satoshi select-none overflow-y-auto no-scrollbar `}
      >
        <SheetProvider>
          <LocalAccountProvider>
            <WagmiContextProvider cookies={cookies}>
              {children}
            </WagmiContextProvider>
          </LocalAccountProvider>
        </SheetProvider>
      </body>
    </html>
  );
}
