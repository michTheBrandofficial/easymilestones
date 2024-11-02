import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import { configDotenv } from "dotenv";
import { type HardhatUserConfig } from "hardhat/config";

configDotenv({
  path: ["./.env.local", ".env"],
})

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
    }
  },
  networks: {
    sepolia: {
      url: process.env.API_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY as string],
      ignition: {
        gasPrice: 50_000_000_000n
      }
    },
  },
};

export default config;
