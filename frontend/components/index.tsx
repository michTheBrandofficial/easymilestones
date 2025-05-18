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
    <section className="w-full h-full bg-orange-400overflow-y-auto no-scrollbar flex ">
      <Button onTap={() => setOpen(!open)} className="!my-auto !mt-48 mx-auto">
        Complete Transaction
      </Button>
      <PendingOverlay isPending={false} />
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
