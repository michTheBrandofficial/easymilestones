import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from 'wagmi/';
// use GanacheEth for dev or Sepolia then mainnet on mainnet
import { sepolia } from '@reown/appkit/networks';
import { ganache } from '../networks/ganache';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: [ganache, sepolia]
})

export const config = wagmiAdapter.wagmiConfig