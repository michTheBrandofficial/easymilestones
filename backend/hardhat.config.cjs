require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
const { configDotenv } = require("dotenv");
configDotenv({
	path: ["./.env.local", ".env"],
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
	solidity: {
		version: "0.8.28",
		settings: {
			viaIR: true,
		},
	},
	networks: {
		sepolia: {
			url: process.env.API_URL,
			accounts: [process.env.METAMASK_PRIVATE_KEY],
			ignition: {
				gasPrice: 50_000_000_000n,
			},
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			ignition: {
				gasPrice: 50_000_000_000n,
			},
		},
	},
};

module.exports = config;
