import { cn } from "@/components/cn";
import { LastLittleMilestoneSVG, LittleMilestoneSVG, MilestoneSVG } from "@/components/icons/transaction-list-svgs";
import { Typography } from "@/components/typography";
import { bigintSecondsToDate, formatEthValue, last, Status } from "@/lib/utils";
import { formatDate } from "date-fns/format";
import { CheckmarkBadge01Icon, Clock04Icon, RocketIcon } from "hugeicons-react";

const Transaction = (props: {
  tx: Transaction;
  onClickTransaction: () => void;
}) => {
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
    <div
      onClick={props.onClickTransaction}
      className="w-full bg-[#f1f1f1] rounded-[28px] max-h-96 cursor-pointer"
    >
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

export default Transaction;
