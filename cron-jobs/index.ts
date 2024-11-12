import { CronJob } from "cron";
import { configDotenv } from "dotenv";
import { ethers } from "ethers";
import abiData from "../backend/artifacts/contracts/EasyMilestones.sol/EasyMilestones.json";
import { EasyMilestones } from "../backend/typechain-types";

configDotenv({
  path: ["./.env.local", ".env"],
});

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// contract address can be left open for users to interact with
const DEPLOYED_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
// this can also be called the signer, this is the account that will be used to to pay for gas to process due milestones
const wallet = new ethers.Wallet(process.env.LOCAL_PRIVATE_KEY!, provider);
const abi = abiData.abi;
const contract = new ethers.Contract(
  DEPLOYED_CONTRACT_ADDRESS,
  abi,
  wallet
) as unknown as EasyMilestones;

async function processDueMilestones() {
  await contract.process_due_milestones();
}

const job = new CronJob(
  // make this into 30 mins later on, maybe in prod it should be 1 hour
  "*/16 * * * * *",
  processDueMilestones,
  null,
  null,
  "Europe/London"
);

job.start();
