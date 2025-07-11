"use client";
import { createContext, useContext } from "react";
import {
  createPublicClient,
  createWalletClient,
  http,
  PrivateKeyAccount,
  PublicClient,
  WalletClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";

/**
 * @dev this is only for development
 */
type LocalAccountContextType = {
  walletClient: WalletClient;
  publicClient: PublicClient;
  chain: typeof anvil;
  privateKeyAccount: PrivateKeyAccount;
  deployedContractAddress: `0x${string}`;
};

const localAccountContext = createContext<LocalAccountContextType | null>(null);

/**
 * @dev this is only for development
 */
export const useLocalAccount = () => {
  const context = useContext(localAccountContext);
  if (!context) {
    throw new Error(
      "useLocalAccount must be used within a LocalAccountProvider"
    );
  }
  return context;
};

/**
 * @dev this is only for development
 */
export const LocalAccountProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const localAccount = privateKeyToAccount(
    import.meta.env.VITE_PUBLIC_USER_PRIVATE_KEY! as `0x${string}`
  );
  const walletClient = createWalletClient({
    chain: anvil,
    transport: http(import.meta.env.VITE_PUBLIC_RPC_URL),
    account: localAccount,
  });
  const publicClient = createPublicClient({
    chain: anvil,
    transport: http(import.meta.env.VITE_PUBLIC_RPC_URL),
  });
  return (
    <localAccountContext.Provider
      value={{
        walletClient,
        publicClient,
        chain: anvil,
        privateKeyAccount: localAccount,
        deployedContractAddress: import.meta.env
          .VITE_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
      }}
    >
      {children}
    </localAccountContext.Provider>
  );
};
