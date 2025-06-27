import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import IOSSpinner from "@/components/ui/ios-spinner";
import { TransactionPayload } from "@/lib/milestone_builder";
import { useNavigate } from "@tanstack/react-router";
import { formatDate } from "date-fns/format";
import { Calendar01Icon, MoneySendSquareIcon } from "hugeicons-react";
import React, { useState } from "react";
import { formatEther } from "viem";

type Props = {
  tx_payload: TransactionPayload;
  is_Tx_Pending: boolean;
  confirm(): void;
  close(): void;
};

type TransactionState = "still_in_confirmation" | "pending" | "confirmed";

/**
 * @dev trap all the state here so that confirmation sheet does not re-render from top
 */
const ConfirmationSheetBody: React.FC<Props> = ({ tx_payload, ...props }) => {
  const navigate = useNavigate();
  const [tx_state, set_tx_state] = useState<TransactionState>(
    "still_in_confirmation"
  );
  return (
    <section className="flex flex-col pt-6 flex-grow">
      {tx_state === "pending" && <IOSSpinner />}
      {tx_state === "pending" && <IOSSpinner />}  
      <div className="h-full grid grid-cols-[20%_80%] gap-x-0 px-2 overflow-y-auto no-scrollbar">
        <div className="flex flex-col ">
          {tx_payload.milestones.map((_, index) => {
            const sanePeoplesIndex = index + 1;
            return (
              <MilestoneBranch
                sanePeoplesIndex={sanePeoplesIndex}
                index={index}
                key={index}
              />
            );
          })}
        </div>
        <div className="flex flex-col relative ">
          {tx_payload.milestones.map((milestone, index) => (
            <div key={index} className="h-[160px] space-y-3">
              <Typography className="font-bold font-Bricolage_Grotesque rounded-xl pl-4 pr-3 py-2.5 bg-gray-400/10 backdrop-blur-[12px]">
                {milestone.title}
              </Typography>
              <div className="w-full flex items-center gap-x-3">
                <Calendar01Icon />
                <Typography className="font-bold font-Bricolage_Grotesque bg-orange-200 px-3 py-1 rounded-lg">
                  {formatDate(
                    new Date(Number(milestone.deadline * 1000n)),
                    "do MMMM, yyyy"
                  )}
                </Typography>
              </div>
              <div className="w-full flex items-center gap-x-3">
                <MoneySendSquareIcon />
                <Typography className="font-bold bg-lime-200 px-3 py-1 rounded-lg">
                  {formatEther(milestone.amount)} ETH
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-auto">
        <Button
          variant="full"
          className="w-full"
          onTap={() => {
            tx_state === "confirmed" ? props.close() : props.confirm();
            // take tx_payload state and send to contract, wait for confirmation here and then show
            // change the milestone and show in the transactions page
          }}
        >
          {tx_state === "confirmed" ? "Close" : "Confirm"}
        </Button>
        {tx_state === "confirmed" && (
          <Button
            initial={{ scaleX: 0, y: 100 }}
            animate={{ scaleX: 1, y: 0 }}
            variant="ghost-outline"
            className="w-full"
            onTap={() => {
              navigate({ to: "/transactions" });
            }}
          >
            View Transaction
          </Button>
        )}
      </div>
    </section>
  );
};

const MilestoneBranch: React.FC<{
  sanePeoplesIndex: number;
  index: number;
}> = ({ sanePeoplesIndex, index }) => {
  if (sanePeoplesIndex === 1)
    return (
      <svg
        key={index}
        height="160"
        viewBox="0 0 36 163"
        fill="none"
        className="w-fit"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
          stroke="#4CABEF"
          strokeWidth="2.3949"
        />
        <circle
          cx="5.32201"
          cy="5.32201"
          r="5.32201"
          transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
          fill="#4CABEF"
        />
        <circle
          cx="14.192"
          cy="14.192"
          r="13.3009"
          transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
          stroke="#4CABEF"
          strokeWidth="1.78225"
        />
      </svg>
    );
  if (sanePeoplesIndex === 2)
    return (
      <svg
        key={index}
        height="160"
        viewBox="0 0 36 163"
        fill="none"
        className="-mt-1 ml-2 w-fit "
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
          stroke="#4CABEF"
          strokeWidth="2.3949"
        />
        <circle
          cx="14.77"
          cy="148.268"
          r="5.32201"
          transform="rotate(92.1494 14.77 148.268)"
          fill="#4CABEF"
        />
        <circle
          cx="14.7699"
          cy="148.268"
          r="13.3009"
          transform="rotate(92.1494 14.7699 148.268)"
          stroke="#4CABEF"
          strokeWidth="1.78225"
        />
      </svg>
    );
  switch (sanePeoplesIndex % 2) {
    case 1:
      return (
        <svg
          key={index}
          height="160"
          viewBox="0 0 36 163"
          fill="none"
          className="-mt-[3px] w-fit "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
            stroke="#4CABEF"
            strokeWidth="2.3949"
          />
          <circle
            cx="5.32201"
            cy="5.32201"
            r="5.32201"
            transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
            fill="#4CABEF"
          />
          <circle
            cx="14.192"
            cy="14.192"
            r="13.3009"
            transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
            stroke="#4CABEF"
            strokeWidth="1.78225"
          />
        </svg>
      );
    case 0:
      return (
        <svg
          key={index}
          height="160"
          viewBox="0 0 36 163"
          fill="none"
          className="-mt-[3px] ml-2 w-fit "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
            stroke="#4CABEF"
            strokeWidth="2.3949"
          />
          <circle
            cx="14.77"
            cy="148.268"
            r="5.32201"
            transform="rotate(92.1494 14.77 148.268)"
            fill="#4CABEF"
          />
          <circle
            cx="14.7699"
            cy="148.268"
            r="13.3009"
            transform="rotate(92.1494 14.7699 148.268)"
            stroke="#4CABEF"
            strokeWidth="1.78225"
          />
        </svg>
      );
  }
};

export default ConfirmationSheetBody;
