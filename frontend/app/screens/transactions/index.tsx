import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Calendar01Icon,
  CheckmarkBadge01Icon,
  Clock04Icon,
  MoneySendSquareIcon,
  PlusSignIcon,
} from "hugeicons-react";
import { bigintSecondsToDate, formatEthValue, Status } from "@/lib/utils";
import Tabs from "@/components/ui/tabs";
import { wagmiContractConfig } from "@/lib/contract-utils";
import IOSSpinner from "@/components/ui/ios-spinner";
import { useMemo, useState } from "react";
import Transaction from "./-components/transaction";
import { useVariableHeightSheet } from "@/components/ui/variable-height-sheet";
import { formatDate } from "date-fns";
import { cn } from "@/components/cn";
import { useAccount, useReadContract } from "wagmi";

export const Route = createFileRoute("/transactions/")({
  component: Transactions,
});

function Transactions() {
  const navigate = useNavigate();
  const { address: userAddress } = useAccount();
  const { data: transactions = [], isFetching } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getTransactions",
    args: [userAddress!],
    query: {
      enabled: !!userAddress,
    }
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
  const TxDetailsSheet = useVariableHeightSheet("transaction-details", {
    onClose(close) {
      close();
      set_tx_details(null);
    },
  });
  const [tx_details, set_tx_details] = useState<Transaction | null>(null);
  return (
    <PageScreen className="flex flex-col flex-grow gap-y-5 relative overflow-y-auto no-scrollbar pb-0">
      <div className="w-full flex items-center justify-between">
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
              <Transaction
                key={index}
                tx={tx}
                onClickTransaction={() => {
                  set_tx_details(tx);
                  TxDetailsSheet.openSheet();
                }}
              />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="flex data-[state=inactive]:hidden flex-col gap-y-6"
            value="ongoing"
          >
            {transactionTabsMemo.ongoing.map((tx, index) => (
              <Transaction
                key={index}
                tx={tx}
                onClickTransaction={() => {
                  set_tx_details(tx);
                  TxDetailsSheet.openSheet();
                }}
              />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="flex data-[state=inactive]:hidden flex-col gap-y-6"
            value="completed"
          >
            {transactionTabsMemo.completed.map((tx, index) => (
              <Transaction
                key={index}
                tx={tx}
                onClickTransaction={() => {
                  set_tx_details(tx);
                  TxDetailsSheet.openSheet();
                }}
              />
            ))}
          </Tabs.Content>
        </Tabs>
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
