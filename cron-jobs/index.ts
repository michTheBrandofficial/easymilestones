import { CronJob } from "cron";
import { configDotenv } from "dotenv";
import { http, createWalletClient } from "viem";
import { anvil } from "viem/chains";
import contractAbi from "./abi";
import { privateKeyToAccount } from "viem/accounts";

configDotenv({
  path: ["./.env.local", ".env"],
});

const localAccount = privateKeyToAccount(process.env.DEPLOYER_PRIVATE_KEY! as `0x${string}`)
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(process.env.RPC_URL),
  account: localAccount,
});

const DEPLOYED_CONTRACT_ADDRESS = process.env
  .CONTRACT_ADDRESS! as `0x${string}`;

const processDueMilestones = async () => {
  const hash = await walletClient.writeContract({
    address: DEPLOYED_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "processDueMilestones",
    args: [] as any,
  });
  console.log(hash);
};

const job = new CronJob(
  // make this into every 15 mins
  "0 */15 * * * *",
  processDueMilestones,
  null,
  null,
  "Europe/London"
);

job.start();
