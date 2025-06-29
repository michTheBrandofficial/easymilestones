import { Button } from "@/components/buttons";
import RocketIcon from "@/components/icons/rocket";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import FakeData from "@/lib/fake-data";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CheckmarkBadge01Icon,
  Clock04Icon,
  PlusSignIcon,
} from "hugeicons-react";
import { formatDate } from "date-fns";
import { cn } from "@/components/cn";
import { bigintSecondsToDate, formatEthValue, last, Status } from "@/lib/utils";
import {
  LastLittleMilestoneSVG,
  LittleMilestoneSVG,
  MilestoneSVG,
} from "@/components/icons/transaction-list-svgs";
import Tabs from "@/components/ui/tabs";
import { useLocalAccount } from "../-contexts/local-account";
import { useQuery } from "@tanstack/react-query";
import { wagmiContractConfig } from "@/lib/contract-utils";
import IOSSpinner from "@/components/ui/ios-spinner";
import { useMemo } from "react";
import { formatEther } from "viem";

export const Route = createFileRoute("/transactions/")({
  component: Transactions,
});

function Transactions() {
  const navigate = useNavigate();
  const { publicClient, privateKeyAccount, deployedContractAddress } =
    useLocalAccount();
  const { data: transactions = [], isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const transactions = await publicClient.readContract({
        address: deployedContractAddress,
        abi: wagmiContractConfig.abi,
        functionName: "getTransactions",
        args: [privateKeyAccount.address],
      });
      return transactions;
    },
  });
  const transactionTabsMemo = useMemo(() => {
    const castTransactionsToMutable = transactions as Helpers.DeepMutable<
      typeof transactions
    >;
    return {
      all: castTransactionsToMutable,
      ongoing: castTransactionsToMutable.filter((tx) => {
        const isAllPaid = tx.milestones.every((m) => m.status === Status.paid);
        return !isAllPaid;
      }),
      completed: castTransactionsToMutable.filter((tx) => {
        const isAllPaid = tx.milestones.every((m) => m.status === Status.paid);
        return isAllPaid;
      }),
    };
  }, [transactions]);
  return (
    <PageScreen className="flex flex-col flex-grow gap-y-5 relative overflow-y-auto no-scrollbar pb-0">
      <div className="w-full flex items-center justify-between  ">
        <Typography variant="h1">Transactions</Typography>
        <Button
          variant="icon"
          className="rounded-full"
          onTap={() => navigate({ to: "/create-transaction" })}
        >
          <PlusSignIcon strokeWidth="2" size={20} />
        </Button>
      </div>
      {isFetching ? (
        <IOSSpinner />
      ) : transactions.length === 0 ? (
        <div className="w-full flex flex-col gap-y-8 px-4 pb-4 pt-8 bg-em-tertiary rounded-[28px]">
          <Typography className="w-full font-Bricolage_Grotesque font-semibold text-center text-lg">
            No transactions yet
          </Typography>
          <Button
            variant="full"
            className="w-full"
            onTap={() => navigate({ to: "/create-transaction" })}
          >
            Create Transaction
          </Button>
        </div>
      ) : (
        <Tabs
          onValueChange={() => {}}
          defaultValue="all"
          className="w-full flex flex-col gap-y-4 flex-grow relative overflow-y-auto no-scrollbar pb-20 "
        >
          <div className="w-full bg-em-tertiary rounded-xl sticky top-0">
            <Tabs.List className="grid w-full grid-cols-3 md:flex-grow ">
              <Tabs.Trigger
                value="all"
                className=" px-0 flex items-center justify-center gap-x-2"
              >
                All
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ongoing"
                className=" px-0 flex items-center justify-center gap-x-2"
              >
                Ongoing
              </Tabs.Trigger>
              <Tabs.Trigger
                value="completed"
                className=" px-0 flex items-center justify-center gap-x-2"
              >
                Completed
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            className="flex data-[state=inactive]:hidden flex-col gap-y-6"
            value="all"
          >
            {transactionTabsMemo.all.map((tx, index) => (
              <Transaction key={index} tx={tx} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="flex data-[state=inactive]:hidden flex-col gap-y-6"
            value="ongoing"
          >
            {transactionTabsMemo.ongoing.map((tx, index) => (
              <Transaction key={index} tx={tx} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="flex data-[state=inactive]:hidden flex-col gap-y-6"
            value="completed"
          >
            {transactionTabsMemo.completed.map((tx, index) => (
              <Transaction key={index} tx={tx} />
            ))}
          </Tabs.Content>
        </Tabs>
      )}
    </PageScreen>
  );
}

const Transaction = (props: { tx: Transaction }) => {
  const tx = props.tx;
  const txParameters = (() => {
    return {
      firstMilestoneCompleted: tx.milestones[0].status === Status.paid,
      hasMultipleMilestones: tx.milestones.length > 1,
      secondMilestoneCompleted: tx.milestones[1]?.status === Status.paid,
      moreThan2Milestones:
        tx.milestones.length > 2
          ? {
              inBetween: tx.milestones.slice(1, tx.milestones.length - 1),
              lastMilestoneCompleted:
                last(tx.milestones).status === Status.paid,
            }
          : null,
    };
  })();
  // get search params and scroll to it using props.index
  return (
    // change bg to em-tertiary
    <div className="w-full bg-[#f1f1f1] rounded-[28px] max-h-96">
      <div className="w-full px-[3px] pt-[3px] rounded-[inherit] ">
        <div className="w-full bg-white px-4 pt-4 pb-3 rounded-[inherit] ">
          <div className="w-full flex  gap-y-2  justify-between">
            <Typography className="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {tx.title}
            </Typography>
            <Typography className="font-bold text- text-em-text whitespace-nowrap">
              {formatEthValue(tx.amount)} ETH
            </Typography>
          </div>
          <div className="w-full mt-4 flex py-6">
            <MilestoneSVG
              size={1}
              className="flex-1 h-fit "
              completed={txParameters.firstMilestoneCompleted}
            />
            {txParameters.hasMultipleMilestones &&
              (txParameters.moreThan2Milestones ? (
                <>
                  <LittleMilestoneSVG
                    size={0.8}
                    completed={txParameters.secondMilestoneCompleted}
                    className="-mt-1 -ml-[10px] flex-1 h-fit max-w-[40px] "
                  />
                  <Typography className="text-em-text font-bold text-sm -mt-1.5 mx-1.5 whitespace-nowrap">
                    {txParameters.moreThan2Milestones.inBetween.length} more
                  </Typography>
                  <LastLittleMilestoneSVG
                    size={0.8}
                    completed={
                      txParameters.moreThan2Milestones.lastMilestoneCompleted
                    }
                    className="-mt-[6px] flex-1 h-fit max-w-[42px]"
                  />
                </>
              ) : (
                <MilestoneSVG
                  size={1}
                  completed={txParameters.secondMilestoneCompleted}
                  className="flex-1 h-fit -mt-2.5 -ml-[4px]"
                />
              ))}
          </div>
          <div className="w-full flex items-center justify-between mt-4 ">
            <div className="flex items-center gap-x-1.5 text-em-text text-sm">
              <RocketIcon width={16} height={16} />
              {formatDate(bigintSecondsToDate(tx.created_at), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-x-1.5 text-em-text text-sm">
              <RocketIcon width={16} height={16} className="rotate-90" />
              {formatDate(
                bigintSecondsToDate(tx.final_deadline),
                "MMM dd, yyyy"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-6 px-3.5 pt-4 pb-5 max-h-[160px] overflow-y-auto no-scrollbar ">
        <div className="space-y-5">
          {tx.milestones.map((milestone, index) => (
            <div key={index} className="w-full flex items-start gap-x-2">
              <div
                className={cn(
                  "size-12 min-w-12 min-h-12 flex items-center justify-center bg-em-tertiary/50 rounded-full",
                  {
                    "bg-em-green/50": milestone.status === Status.paid,
                  }
                )}
              >
                {milestone.status === Status.paid ? (
                  <CheckmarkBadge01Icon className={cn("size-7")} />
                ) : (
                  <Clock04Icon className={cn("size-7")} />
                )}
              </div>
              <div className="flex flex-col gap-y-0.5 w-[65%] items-start ">
                <Typography className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                  {milestone.title}
                </Typography>
                <Typography className="font-medium text-em-text text-xs">
                  {formatDate(
                    bigintSecondsToDate(milestone.deadline),
                    "MMM dd, yyyy"
                  )}
                </Typography>
              </div>
              <div className="w-fit flex flex-col gap-y-0.5 items-end ml-auto">
                <Typography className="font-bold whitespace-nowrap">
                  {formatEthValue(milestone.amount)} ETH
                </Typography>
                <Typography className="font-medium text-em-text text-xs">
                  {milestone.status === Status.paid ? "Completed" : "Ongoing"}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// onclick milestone show view in sheet
