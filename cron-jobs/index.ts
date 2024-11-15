import { CronJob } from "cron";
import { configDotenv } from "dotenv";
import { ethers } from "ethers";
import abiData from "./abi.json";

configDotenv({
  path: ["./.env.local", ".env"],
});

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// contract address can be left open for users to interact with
const DEPLOYED_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
// this can also be called the signer, this is the account that will be used to to pay for gas to process due milestones
const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY!, provider);
const abi = abiData.abi;
const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, wallet);

async function processDueMilestones() {
  await contract
    .process_due_milestones()
    .then((val) => console.log("paid out to user"));
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
