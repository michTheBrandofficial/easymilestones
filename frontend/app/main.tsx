import { SheetProvider } from "@/components/ui/sheet";
import ToastProvider from "@/components/ui/toast";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import WagmiContextProvider from "./screens/-contexts";
import { AnimatePresence } from "motion/react";
import { LocalAccountProvider } from "./screens/-contexts/local-account";
import { VariableHeightSheetProvider } from "@/components/ui/variable-height-sheet";

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
        <VariableHeightSheetProvider>
          <WagmiContextProvider cookies={null}>
            <LocalAccountProvider>
              <AnimatePresence mode="popLayout">
                <RouterProvider router={router}></RouterProvider>
              </AnimatePresence>
            </LocalAccountProvider>
          </WagmiContextProvider>
        </VariableHeightSheetProvider>
      </SheetProvider>
    </ToastProvider>
  );
}
