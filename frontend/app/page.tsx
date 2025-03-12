"use client";

import easyMilestonesAbi from "./utils/abi";
import { useLocalAccount } from "./_context/local-account";

const DEPLOYED_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`;

const Home = () => {
  const { publicClient, privateKeyAccount } = useLocalAccount();
  async function fetchTransactions() {
    const result = await publicClient.readContract({
      abi: easyMilestonesAbi,
      functionName: "getTransactions",
      address: DEPLOYED_CONTRACT_ADDRESS,
      args: [privateKeyAccount.address],
    });
    console.log(result);
  }
  return (
    <section className="font-Satoshi w-full h-full">
      <p className="w-full text-ellipsis p-2 overflow-hidden">
        {privateKeyAccount.publicKey}
      </p>
      <button onClick={fetchTransactions}>Fetch Transactions</button>
    </section>
  );
}

export default Home;
