import {
  Navigate,
  Outlet,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import { Button } from "@/components/buttons";
import Logo from "../android-chrome-512x512.png";
import { formatEthAddress } from "@/lib/utils";
import Ethereum from "@/components/icons/ethereum";
import FloatingTabBar from "./-components/floating-tab-bar";
import { Typography } from "@/components/typography";
import type { FileRoutesByTo } from "../routeTree.gen";
import { useVariableHeightSheet } from "@/components/ui/variable-height-sheet";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import IOSSpinner from "@/components/ui/ios-spinner";
export const Route = createRootRoute({
  component: RootComponent,
});

const noFloatingBarRoutes: Array<keyof FileRoutesByTo & (string & {})> = [
  "/create-transaction",
  "/onboarding",
];

function RootComponent() {
  const { pathname } = useLocation();
  const AccountSheet = useVariableHeightSheet("account");
  const { isConnected, isConnecting, address } = useAccount();
  const { disconnect } = useDisconnect();
  const userBalance = useBalance({
    address,
    blockTag: "latest",
    query: {
      enabled: !!address,
    }
  });
  if (isConnecting)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto no-scrollbar bg-em-primary px-4 ">
        <IOSSpinner />
      </div>
    );
  if (!isConnected)
    return (
      <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar bg-em-primary pt-[54px] px-4 ">
        <Navigate to="/onboarding" replace />
        <Outlet />
      </div>
    );
  else <Navigate to="/" replace />;
  return (
    // padding top of 48 for safe area zone.
    <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar bg-em-primary pt-[54px] px-4 ">
      {pathname === "/onboarding" ? null : (
        <div className="w-full flex items-center justify-between pt-5">
          <img
            src={Logo}
            alt="Logo"
            className="w-11 h-11 rounded-full shadow-sm"
          />
          <Button
            onTap={AccountSheet.openSheet}
            className="flex items-center gap-x-2 px-4 py-2.5 bg-em-dark text-white rounded-full text-sm"
          >
            {formatEthAddress(address ?? "0x")}
            <Ethereum fill="#4CABEF" />
          </Button>
        </div>
      )}
      <Outlet />
      {noFloatingBarRoutes.includes(pathname as any) ? null : (
        <FloatingTabBar onClickAccount={AccountSheet.openSheet} />
      )}
      {pathname === "/onboarding" ? null : (
        <AccountSheet.VariableHeightSheet
          title="Account"
          backButton="Back"
          className="bg-white"
        >
          <AccountSheet.VariableHeightSheetContent className="flex flex-col justify-between gap-y-10">
            <div className="w-full px-1 5 py-2 flex flex-col gap-y-3">
              <div className="w-full flex items-center gap-x-2">
                <Typography className="text-em-text">Address:</Typography>
                <Typography className="text-em-tertiary font-bold flex-grow bg-em-primary/60 rounded-xl px-3 py-1 overflow-ellipsis overflow-hidden">
                  {address}
                </Typography>
              </div>
              <div className="w-full flex items-center gap-x-2">
                <Typography className="text-em-text">Balance:</Typography>
                <Typography className="text-em-tertiary font-bold bg-em-primary/60 rounded-xl px-3 py-1 overflow-ellipsis overflow-hidden">
                  {userBalance.data?.formatted} {userBalance.data?.symbol}
                </Typography>
              </div>
            </div>
            <div className="w-full flex gap-x-2 ">
              <Button
                variant="ghost-outline"
                className="w-full"
                onTap={() => disconnect()}
              >
                Disconnect
              </Button>
              <Button
                variant="full"
                className="w-full"
                onTap={AccountSheet.closeSheet}
              >
                OK
              </Button>
            </div>
          </AccountSheet.VariableHeightSheetContent>
        </AccountSheet.VariableHeightSheet>
      )}
    </div>
  );
}
