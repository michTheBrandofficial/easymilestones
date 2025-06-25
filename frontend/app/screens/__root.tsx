import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/buttons";
import { useLocalAccount } from "./-contexts/local-account";
import Logo from "../android-chrome-512x512.png";
import { formatEthAddress, noop } from "@/lib/utils";
import Ethereum from "@/components/icons/ethereum";
import FloatingTabBar from "./-components/floating-tab-bar";
import { Typography } from "@/components/typography";
import { formatEther } from "viem";
import { useQuery } from "@tanstack/react-query";
import type { FileRoutesByTo } from "../routeTree.gen";
import { useVariableHeightSheet } from "@/components/ui/variable-height-sheet";
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
  const { privateKeyAccount, publicClient } = useLocalAccount();
  const { data: balance } = useQuery({
    queryKey: ["account-balance"],
    queryFn: async () =>
      publicClient.getBalance({
        address: privateKeyAccount.address,
        blockTag: "latest",
      }),
    refetchOnWindowFocus: false,
  });
  return (
    // padding top of 48 for safe area zone.
    <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar bg-em-primary pt-[54px]  px-4 ">
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
            {formatEthAddress(privateKeyAccount?.address)}
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
                <Typography className="text-em-secondary flex-grow bg-em-secondary/5 rounded-xl px-3 py-1 overflow-ellipsis overflow-hidden">
                  {privateKeyAccount?.address}
                </Typography>
              </div>
              <div className="w-full flex items-center gap-x-2">
                <Typography className="text-em-text">Balance:</Typography>
                <Typography className="text-em-secondary bg-em-secondary/5 rounded-xl px-3 py-1 overflow-ellipsis overflow-hidden">
                  {parseFloat(formatEther(balance || 0n)).toFixed(2)} ETH
                </Typography>
              </div>
            </div>
            <div className="w-full flex gap-x-2 ">
              <Button
                variant="ghost"
                className="w-full bg-gray-100"
                onTap={noop}
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
