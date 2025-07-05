"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { cookieToInitialState, createConfig, http, WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    metaMask({
      extensionOnly: true,
    }),
  ],
  transports: {
    [baseSepolia.id]: http(import.meta.env.VITE_PUBLIC_RPC_URL),
  },
});

// augment module interface
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

// Set up queryClient
const queryClient = new QueryClient();

function WagmiContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(config, cookies);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default WagmiContextProvider;
