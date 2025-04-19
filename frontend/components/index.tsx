"use client";
import { useState } from "react";
import { Button } from "./buttons";
import PendingOverlay from "./ui/pending-overlay";
import Sheet from "./ui/sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import IOSSpinner from "./ui/ios-spinner";
import { Typography } from "./typography";
import { useLocalAccount } from "@/app/_context/local-account";
import { formatEthAddress } from "@/lib/utils";
import { formatEther } from "viem/utils";
import {
  Calendar01Icon,
  Calendar03Icon,
  MoneySendSquareIcon,
} from "hugeicons-react";

const Components = () => {
  const [open, setOpen] = useState(false);
  const { isFetching: _isFetching } = useQuery({
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
        }, 4000);
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
      <Button onTap={() => setOpen(!open)} className="!my-auto !mt-48 mx-auto">
        Complete Transaction
      </Button>
      <PendingOverlay isPending={false} />
      <Sheet
        open={open}
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
            {_isFetching ? (
              <div className="py-14 flex items-center justify-center">
                <IOSSpinner />
              </div>
            ) : (
              <div className="pt-10  px-4">
                {createTransactionMutation.isPending ? (
                  <div className="py-14 flex items-center justify-center">
                    <IOSSpinner />
                  </div>
                ) : (
                  <div className="pb-12">
                    <Milestone />
                    <Milestone />
                    <Milestone />
                    <Milestone />
                    <Milestone />
                  </div>
                )}
                <Button
                  disabled={createTransactionMutation.isPending}
                  className="w-full"
                  onTap={() => {
                    createTransactionMutation.mutate(
                      {
                        amount: 0.3,
                        address: "0x1234567890",
                      },
                      {
                        onSuccess() {
                          setOpen(false);
                        },
                      }
                    );
                  }}
                >
                  Continue
                </Button>
              </div>
            )}
          </Sheet.Content>
        </Sheet.Body>
      </Sheet>
    </section>
  );
};

const Milestone = (_props: any) => {
  return (
    <div className="flex items-end gap-x-2 group ">
      <div className="flex flex-col items-center">
        <div className="w-[3px] h-24 group-first:h-20 bg-em-gray"></div>
        <div className="w-fit h-fit p-2 border-2 border-em-gray rounded-full">
          <div className="w-3 h-3 bg-em-gray rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-3 -mb-1">
        <div className="flex items-center gap-x-3">
          <Calendar01Icon size={28} strokeWidth={2.2} />
          <Typography className="font-Bricolage_Grotesque font-bold text-base text-em-dark bg-em-blue/10 w-fit p-2 px-4 rounded-xl">
            {new Date()
              .toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/(\d+)/, (match) => {
                const day = parseInt(match);
                const suffix =
                  ["th", "st", "nd", "rd"][day % 10 > 3 ? 0 : day % 10] || "th";
                return day + suffix;
              })}
          </Typography>
        </div>
        <div className="flex items-center gap-x-3">
          <MoneySendSquareIcon size={28} strokeWidth={2.2} />
          <Typography className="font-Bricolage_Grotesque font-bold text-base text-green-700 bg-green-100 w-fit p-2 px-4 rounded-xl">
            0.2 ETH
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Components;
