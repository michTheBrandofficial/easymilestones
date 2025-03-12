"use client";

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";
import easyMilestonesAbi from "./utils/abi";

const localAccount = privateKeyToAccount(
  process.env.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY! as `0x${string}`
);
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
  account: localAccount,
});
walletClient
const publicClient = createPublicClient({
  chain: anvil,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
const DEPLOYED_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`;

export default function Home() {
  async function fetchTransactions() {
    const result = await publicClient.readContract({
      abi: easyMilestonesAbi,
      functionName: "getTransactions",
      address: DEPLOYED_CONTRACT_ADDRESS,
      args: [localAccount.address],
    });
    console.log(result);
  }
  return (
    <section className="font-Satoshi w-full h-full">
      <p className="w-full text-ellipsis p-2 overflow-hidden">
        {localAccount.publicKey}
      </p>
      <button onClick={fetchTransactions}>Fetch Transactions</button>
    </section>
  );
}
