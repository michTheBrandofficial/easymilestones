import { Button } from "@/components/buttons";
import { cn } from "@/components/cn";
import { LastLittleMilestoneSVG, LittleMilestoneSVG, MilestoneSVG } from "@/components/icons/transaction-list-svgs";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import FakeData from "@/lib/fake-data";
import { last, Status } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckmarkBadge01Icon, Clock04Icon } from "hugeicons-react";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const transactions = FakeData.transactions;
  return (
    <PageScreen className="flex flex-col gap-y-5">
      <Typography variant="h1">GM, Mich</Typography>
      <div className="w-full">
        <div className="w-full rounded-t-3xl rounded-br-3xl bg-em-tertiary py-4 px-5 flex justify-between items-start">
          <div className="space-y-0">
            <Typography variant={"h3"}>5.5 ETH</Typography>
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
                <Typography variant={"h3"}>5.5 ETH</Typography>
                <Typography className="text-white text-sm">
                  Total Invested
                </Typography>
              </div>
            </div>
          </div>
          <div className="pl-2 pt-2 bg-em-primary rounded-tl-3xl ">
            <div className="w-full rounded-3xl bg-em-green py-4 px-5 flex justify-between items-start">
              <div className="space-y-0">
                <Typography variant={"h3"}>3.0 ETH</Typography>
                <Typography className="text-white text-sm">
                  Total Disbursed
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          {transactions.map((tx, index) => {
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
                          last(tx.milestones).status === Status.paid,
                      }
                    : null,
              };
            })();
            return (
              <div key={index} className="w-full flex items-start gap-x-2">
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
                      completed={transactionParameters.firstMilestoneCompleted}
                    />
                    {transactionParameters.hasMultipleMilestones &&
                      (transactionParameters.moreThan2Milestones ? (
                        <>
                          <LittleMilestoneSVG size={.8} completed={transactionParameters.secondMilestoneCompleted} className="-mt-1 -ml-[7px]" />
                          <Typography className="text-em-text font-bold text-xs -mt-2 mx-1.5 whitespace-nowrap">{transactionParameters.moreThan2Milestones.inBetween.length} more</Typography>
                          <LastLittleMilestoneSVG size={.8} completed={transactionParameters.moreThan2Milestones.lastMilestoneCompleted} className="-mt-[9px] -ml-" />
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
                    {tx.amount} ETH
                  </Typography>
                  <Typography className="font-medium text-em-text text-xs">
                    {isAllPaid ? "Completed" : "Ongoing"}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageScreen>
  );
}
