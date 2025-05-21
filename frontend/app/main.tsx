import { SheetProvider } from "@/components/ui/sheet";
import ToastProvider from "@/components/ui/toast";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import WagmiContextProvider from "./screens/-contexts";
import { AnimatePresence } from "motion/react";
import { LocalAccountProvider } from "./screens/-contexts/local-account";

const queryClient = new QueryClient();

// Create wagmi config
const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask({
      extensionOnly: true,
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});

// Register the config for type safety
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ToastProvider>
      <SheetProvider>
        <WagmiContextProvider cookies={null}>
          <LocalAccountProvider>
            <QueryClientProvider client={queryClient}>
              <AnimatePresence mode="popLayout">
                <RouterProvider router={router}></RouterProvider>
              </AnimatePresence>
            </QueryClientProvider>
          </LocalAccountProvider>
        </WagmiContextProvider>
      </SheetProvider>
    </ToastProvider>
  );
}
