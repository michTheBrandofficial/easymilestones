"use client";
import { useState } from "react";
import { Button } from "./buttons";
import Popover from "./ui/popover";
import CheckBox from "./ui/checkbox";
import Toggle from "./ui/toggle";
import PendingOverlay from "./ui/pending-overlay";
import Sheet from "./ui/sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import IOSSpinner from "./ui/ios-spinner";
import { Typography } from "./typography";
import { useLocalAccount } from "@/app/_context/local-account";
import { formatEthAddress } from "@/lib/utils";
import { formatEther } from "viem/utils";

const Components = () => {
  const [open, setOpen] = useState(false);
  const [phone] = useState("");
  const { isFetching } = useQuery({
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, 2000);
      });
    },
    queryKey: ["test"],
    enabled: open,
  });
  const createTransactionMutation = useMutation({
    mutationFn: (data: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, Math.floor(Math.random() * 4000));
      });
    },
  });
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
    <section className="w-full h-screen overflow-x-auto p-3 space-y-10 overflow-y-auto no-scrollbar flex ">
      <Button onTap={() => setOpen(!open)} className="!my-auto">
        Pay 0.3 ETH
      </Button>
      <PendingOverlay isPending={false} />
      <Sheet
        open={true}
        onClose={() => {
          setOpen(false);
        }}
        title="Confirm"
        action={{
          title: "Continue",
          do(closeSheet) {
            createTransactionMutation.mutate(
              {
                amount: 0.3,
                address: "0x1234567890",
              },
              {
                onSuccess() {
                  closeSheet();
                },
              }
            );
          },
        }}
      >
        <Sheet.Body>
          <Sheet.Header>
            <div className="flex items-center gap-x-2 py-1">
              <Typography className="font-bold text-em-light-dark text-sm">
                Address:
              </Typography>
              <Typography className="text-em-blue/90 bg-em-blue/10 text-sm w-fit p-1 px-3 rounded-lg">
                {formatEthAddress(privateKeyAccount?.address)}
              </Typography>
              <Typography className="overflow-hidden text-ellipsis text-black font-extrabold ml-auto">
                {balance &&
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(formatEther(balance)))}{" "}
                ETH
              </Typography>
            </div>
          </Sheet.Header>
          <Sheet.Content>
            {createTransactionMutation.isPending ? (
              <div className="py-14 flex items-center justify-center">
                <IOSSpinner />
              </div>
            ) : (
              <div className="gap-y-[640px] grid ">
                <p>djsksl</p>
                <p>djsksl</p>
              </div>
            )}
          </Sheet.Content>
        </Sheet.Body>
      </Sheet>
    </section>
  );
};

export default Components;
