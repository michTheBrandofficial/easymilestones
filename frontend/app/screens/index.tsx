import { Button } from "@/components/buttons";
import { cn } from "@/components/cn";
import {
  LastLittleMilestoneSVG,
  LittleMilestoneSVG,
  MilestoneSVG,
} from "@/components/icons/transaction-list-svgs";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import { wagmiContractConfig } from "@/lib/contract-utils";
import { bigintSecondsToDate, formatEthValue, last, Status } from "@/lib/utils";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import {
  Calendar01Icon,
  CheckmarkBadge01Icon,
  Clock04Icon,
  MoneySendSquareIcon,
} from "hugeicons-react";
import { useMemo, useState } from "react";
import { formatEther } from "viem";
import IOSSpinner from "@/components/ui/ios-spinner";
import { useVariableHeightSheet } from "@/components/ui/variable-height-sheet";
import { formatDate } from "date-fns";
import { useAccount, useReadContract } from "wagmi";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  // use wagmi to fetch transactions
  const { address: userAddress } = useAccount();
  const { data: transactions = [], isFetching } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getTransactions",
    args: [userAddress!],
  });
  const investMentDataMemo = useMemo(() => {
    return {
      totalInvested: transactions.reduce((acc, tx) => {
        return acc + tx.amount;
      }, 0n),
      remainingBalance: (() => {
        let remainingBal = 0n;
        transactions.forEach((tx) => {
          tx.milestones.forEach((m) => {
            if (m.status === Status.unpaid) {
              remainingBal += m.amount;
            }
          });
        });
        return remainingBal;
      })(),
      totalDisbursed: (() => {
        let totalPaidOut = 0n;
        transactions.forEach((tx) => {
          tx.milestones.forEach((m) => {
            if (m.status === Status.paid) {
              totalPaidOut += m.amount;
            }
          });
        });
        return totalPaidOut;
      })(),
    };
  }, [transactions]);
  const TxDetailsSheet = useVariableHeightSheet("transaction-details-home", {
    onClose(close) {
      close();
      set_tx_details(null);
    },
  });
  const [tx_details, set_tx_details] = useState<Transaction | null>(null);
  return (
    <PageScreen className="flex flex-col gap-y-5">
      <Typography variant="h1">GM, Mich</Typography>
      <div className="w-full">
        <div className="w-full rounded-t-3xl rounded-br-3xl bg-em-tertiary py-4 px-5 flex justify-between items-start">
          <div className="space-y-0">
            <Typography variant={"h3"}>
              {formatEther(investMentDataMemo.remainingBalance)} ETH
            </Typography>
            <Typography className="text-white text-sm">
              Remaining Balance
            </Typography>
          </div>
          <div className="w-fit h-fit -mt-0.5">
            <Clock04Icon className="size-20" />
          </div>
        </div>
        <div className="w-full grid grid-cols-[45%_55%] bg-em-tertiary rounded-b-3xl">
          <div className="bg-em-primary">
            <div className="w-full h-full rounded-b-3xl bg-em-tertiary py-4 px-5 flex justify-between items-start ">
              <div className="space-y-0">
                <Typography variant={"h3"}>
                  {formatEther(investMentDataMemo.totalInvested)} ETH
                </Typography>
                <Typography className="text-white text-sm">
                  Total Invested
                </Typography>
              </div>
            </div>
          </div>
          <div className="pl-2 pt-2 bg-em-primary rounded-tl-3xl ">
            <div className="w-full rounded-3xl bg-em-green py-4 px-5 flex justify-between items-start">
              <div className="space-y-0">
                <Typography variant={"h3"}>
                  {formatEther(investMentDataMemo.totalDisbursed)} ETH
                </Typography>
                <Typography className="text-white text-sm">
                  Total Disbursed
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFetching ? (
        <IOSSpinner />
      ) : transactions.length > 0 ? (
        <div className="w-full space-y-6">
          <div className="w-full flex items-center justify-between ">
            <Typography className="font-bold ">Transactions</Typography>
            {/* should navigate to transactions route when it is created in tanstack */}
            <Button
              // @ts-ignore
              onTap={() => navigate({ to: "/transactions" })}
              className="p-0 underline text-sm font-medium"
              variant="ghost"
            >
              See all
            </Button>
          </div>
          <div className="space-y-3">
            {/* filter through to get only transactions that have at least one milestone */}
            {(transactions as Helpers.DeepMutable<typeof transactions>).map(
              (tx, index) => {
                const isAllPaid = tx.milestones.every(
                  (m) => m.status === Status.paid
                );
                const transactionParameters = (() => {
                  return {
                    firstMilestoneCompleted:
                      tx.milestones[0].status === Status.paid,
                    hasMultipleMilestones: tx.milestones.length > 1,
                    secondMilestoneCompleted:
                      tx.milestones[1]?.status === Status.paid,
                    moreThan2Milestones:
                      tx.milestones.length > 2
                        ? {
                            inBetween: tx.milestones.slice(
                              1,
                              tx.milestones.length - 1
                            ),
                            lastMilestoneCompleted:
                              last(
                                tx.milestones as Helpers.Mutable<
                                  typeof tx.milestones
                                >
                              ).status === Status.paid,
                          }
                        : null,
                  };
                })();
                return (
                  <div
                    key={index}
                    onClick={() => {
                      set_tx_details(tx);
                      TxDetailsSheet.openSheet();
                    }}
                    className="w-full flex cursor-pointer items-start gap-x-2"
                  >
                    <div
                      className={cn(
                        "size-12 flex items-center justify-center bg-em-tertiary/50 rounded-full",
                        {
                          "bg-em-green/50": isAllPaid,
                        }
                      )}
                    >
                      {isAllPaid ? (
                        <CheckmarkBadge01Icon className={cn("size-7")} />
                      ) : (
                        <Clock04Icon className={cn("size-7")} />
                      )}
                    </div>
                    <div className="flex flex-col gap-y-1 w-[65%] items-start ">
                      <Typography className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                        {tx.title}
                      </Typography>
                      <div className="w-full flex pt-4 pb-2 bg-orange-">
                        <MilestoneSVG
                          size={1}
                          completed={
                            transactionParameters.firstMilestoneCompleted
                          }
                        />
                        {transactionParameters.hasMultipleMilestones &&
                          (transactionParameters.moreThan2Milestones ? (
                            <>
                              <LittleMilestoneSVG
                                size={0.8}
                                completed={
                                  transactionParameters.secondMilestoneCompleted
                                }
                                className="-mt-1 -ml-[7px]"
                              />
                              <Typography className="text-em-text font-bold text-xs -mt-2 mx-1.5 whitespace-nowrap">
                                {
                                  transactionParameters.moreThan2Milestones
                                    .inBetween.length
                                }{" "}
                                more
                              </Typography>
                              <LastLittleMilestoneSVG
                                size={0.8}
                                completed={
                                  transactionParameters.moreThan2Milestones
                                    .lastMilestoneCompleted
                                }
                                className="-mt-[9px] -ml-"
                              />
                            </>
                          ) : (
                            <MilestoneSVG
                              size={1}
                              completed={
                                transactionParameters.secondMilestoneCompleted
                              }
                              className="-mt-2.5 -ml-[7px]"
                            />
                          ))}
                      </div>
                    </div>
                    <div className="w-fit flex flex-col gap-y-1 items-end ml-auto">
                      <Typography className="font-semibold whitespace-nowrap">
                        {formatEther(tx.amount)} ETH
                      </Typography>
                      <Typography className="font-medium text-em-text text-xs">
                        {isAllPaid ? "Completed" : "Ongoing"}
                      </Typography>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-y-6 px-4 pb-4 pt-6 bg-em-tertiary rounded-[28px]">
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
      )}
      {tx_details && (
        <TxDetailsSheet.VariableHeightSheet
          title={"Transaction Details"}
          backButton={"Back"}
        >
          <TxDetailsSheet.VariableHeightSheetContent className="flex flex-col flex-grow gap-y-3 overflow-y-auto no-scrollbar">
            <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] py-2 flex flex-col gap-y-3">
              <div className="w-full flex items-center justify-between gap-x-2">
                <Typography className="text-em-text">
                  Transaction Title:
                </Typography>
                <Typography className="text-em-green font-medium font-Bricolage_Grotesque text-base overflow-ellipsis overflow-hidden bg-em-green/10 rounded-xl px-3 py-1">
                  {tx_details.title}
                </Typography>
              </div>
              <div className="w-full flex items-center justify-between gap-x-2">
                <Typography className="text-em-text">Total:</Typography>
                <Typography className="text-em-tertiary font-medium font-Bricolage_Grotesque text-base overflow-ellipsis overflow-hidden bg-em-primary/60 rounded-xl px-3 py-1">
                  {formatEthValue(tx_details.amount)} ETH
                </Typography>
              </div>
            </div>
            <div className="flex-grow grid px-2.5 pt-5 overflow-y-auto no-scrollbar mb-4">
              <div className="flex flex-col relative ">
                {tx_details.milestones.map((milestone, index) => (
                  <div key={index} className="w-full flex items-start gap-x-3">
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
                    <div className="h-[160px] flex-grow space-y-3">
                      <Typography className="font-bold font-Bricolage_Grotesque rounded-xl pl-4 pr-3 py-2.5 bg-gray-400/10 backdrop-blur-[12px] flex items-center justify-between">
                        {milestone.title}
                      </Typography>
                      <div className="w-full flex items-center gap-x-3">
                        <Calendar01Icon />
                        <Typography className="font-bold font-Bricolage_Grotesque bg-orange-200 px-3 py-1 rounded-lg">
                          {formatDate(
                            bigintSecondsToDate(milestone.deadline),
                            "do MMMM, yyyy"
                          )}
                        </Typography>
                      </div>
                      <div className="w-full flex items-center gap-x-3">
                        <MoneySendSquareIcon />
                        <Typography className="font-bold bg-lime-200 px-3 py-1 rounded-lg">
                          {formatEthValue(milestone.amount)} ETH
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="full"
              className="w-full"
              onTap={() => TxDetailsSheet.closeSheet()}
            >
              Close
            </Button>
          </TxDetailsSheet.VariableHeightSheetContent>
        </TxDetailsSheet.VariableHeightSheet>
      )}
    </PageScreen>
  );
}
