import { defineChain } from "viem";

// Define the custom network
export const ganache = defineChain({
  id: 1337,
  name: "Ganache",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:7545"],
      webSocket: ["ws://127.0.0.1:7545"],
    },
  },
  contracts: {
    EasyMilestones: {
      address: "0xd70267B3aFFC56ffEc88efFc699Ad151B8c1f63d",
      blockCreated: 2,
    },
  },
});
