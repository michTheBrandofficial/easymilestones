import { configDotenv } from "dotenv";
import { ethers } from "ethers";
import abiData from "../backend/artifacts/contracts/EasyMilestones.sol/EasyMilestones.json";

configDotenv({
  path: ["./.env.local", ".env"],
});

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// contract address can be left open for users to interact with
const DEPLOYED_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
// this can also be called the signer, this is the account that will be used to to pay for gas to process due milestones
const abi = abiData.abi;
const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);

async function subscribeToFundsTransferredEvent() {
  console.log("subscribing to event");
  return contract.on("TransactionCreated", (...args) => {
    console.log("args are", JSON.stringify(args));
  });
}

subscribeToFundsTransferredEvent();
