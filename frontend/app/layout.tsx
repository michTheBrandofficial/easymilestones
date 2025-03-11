import type { Metadata } from "next";
import { headers } from "next/headers";
import WagmiContextProvider from "./_context";
import "./globals.css";
import { createPublicClient, http, createWalletClient } from "viem";
import { anvil } from "viem/chains";
import contractAbi from "../../cron-jobs/abi";
import { writeContract } from "viem/actions";
const publicClient = createPublicClient({
  chain: anvil,
  transport: http(process.env.RPC_URL),
});

const walletClient = createWalletClient({
  chain: anvil,
  transport: http(process.env.RPC_URL),
  account: process.env.DEPLOYER_PRIVATE_KEY! as `0x${string}`,
});

const processDueMilestones = async () => {
  const hash = await walletClient.writeContract({
    address: "0x",
    abi: contractAbi,
    functionName: "createTransaction",
    args: [] as any,
  });
  const result = await publicClient.readContract({
    abi: contractAbi,
    address: '0x',
    functionName: 'getTransactions',
  })
};

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
    <html lang="en">
      <body className={`w-screen h-screen bg-red-50 antialiased font-medium`}>
        <WagmiContextProvider cookies={cookies}>
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
