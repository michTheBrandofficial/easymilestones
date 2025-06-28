import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import IOSSpinner from "@/components/ui/ios-spinner";
import { TransactionPayload } from "@/lib/milestone_builder";
import { useNavigate } from "@tanstack/react-router";
import { formatDate } from "date-fns/format";
import {
  Calendar01Icon,
  MoneySendSquareIcon,
  Tick02Icon,
} from "hugeicons-react";
import React, { useState } from "react";
import { formatEther } from "viem";
import { useLocalAccount } from "../../-contexts/local-account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import easyMilestonesAbi from "@/lib/abi";
import { useToast } from "@/components/ui/toast-context";
import Toggle from "@/components/ui/toggle";
import { bigintSecondsToDate, truncate } from "@/lib/utils";

type Props = {
  tx_payload: TransactionPayload;
  close(): void;
  /**
   * used to clear the builder state and then close confirmation sheet
   */
  onTransactionCreatedSuccessClose(): void;
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
  const {
    privateKeyAccount,
    publicClient,
    walletClient,
    chain,
    deployedContractAddress,
  } = useLocalAccount();
  const { data: balance } = useQuery({
    queryKey: ["account-balance"],
    queryFn: async () =>
      publicClient.getBalance({
        address: privateKeyAccount.address,
        blockTag: "latest",
      }),
    refetchOnWindowFocus: false,
  });
  const showToast = useToast();
  const createTransactionMutation = useMutation({
    mutationFn: async () => {
      const { request: simulatedContractRequest } =
        await publicClient.simulateContract({
          address: deployedContractAddress,
          abi: easyMilestonesAbi,
          functionName: "createTransaction",
          chain: chain,
          account: privateKeyAccount,
          args: [
            tx_payload.final_deadline,
            tx_payload.title,
            tx_payload.milestones.map((m) => {
              return {
                amount: m.amount,
                deadline: m.deadline,
                title: m.title,
              };
            }),
          ],
          value: tx_payload.amount,
        });
      await walletClient.writeContract(simulatedContractRequest);
    },
    onSuccess: () => {
      set_tx_state("confirmed");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["account-balance"] });
    },
    onError(err) {
      showToast("info", err.message);
    },
  });
  const [permissions, setPermissions] = useState({
    cannot_access_assets: false,
    authorization_to_lock: false,
  });
  const queryClient = useQueryClient();
  return (
    <section className="flex flex-col flex-grow overflow-y-auto no-scrollbar">
      {/* this will act as sheet header */}
      {tx_state !== "confirmed" && (
        <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] ">
          <div className="w-full px-1.5 py-2 flex flex-col gap-y-3">
            <div className="w-full flex items-center justify-between gap-x-2">
              <Typography className="text-em-text">Address:</Typography>
              <Typography className="text-em-dark flex-grow pl-3 font-medium font-Bricolage_Grotesque overflow-ellipsis overflow-hidden">
                {privateKeyAccount?.address}
              </Typography>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
              <Typography className="text-em-text">Balance:</Typography>
              <Typography className="text-em-dark font-medium font-Bricolage_Grotesque text-lg overflow-ellipsis overflow-hidden">
                {parseFloat(formatEther(balance || 0n)).toFixed(2)} ETH
              </Typography>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
              <Typography className="text-em-text">Total:</Typography>
              <Typography className="text-em-tertiary font-medium font-Bricolage_Grotesque text-lg overflow-ellipsis overflow-hidden bg-em-primary/60 rounded-xl px-3 py-1">
                {parseFloat(formatEther(tx_payload.amount)).toFixed(2)} ETH
              </Typography>
            </div>
          </div>
        </div>
      )}
      {createTransactionMutation.isPending && <IOSSpinner />}
      {tx_state === "confirmed" && (
        <div className="w-full flex flex-col items-center gap-y-3 my-auto">
          <div className="p-3 w-fit bg-green-100 text-green-700 rounded-full">
            <Tick02Icon className="size-8" />
          </div>
          <div className="text-center">
            <Typography className="text-em-text text-lg">
              Successfully stored
            </Typography>
            <Typography className="text-em-dark font-Bricolage_Grotesque font-bold text-xl">
              {parseFloat(formatEther(tx_payload.amount)).toFixed(2)} ETH
            </Typography>
          </div>
        </div>
      )}
      {tx_state === "still_in_confirmation" && (
        <div className="flex-grow grid grid-cols-[20%_80%] gap-x-0 px-[18px] pt-5 overflow-y-auto no-scrollbar mb-4">
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
                      bigintSecondsToDate(milestone.deadline),
                      "do MMMM, yyyy"
                    )}
                  </Typography>
                </div>
                <div className="w-full flex items-center gap-x-3">
                  <MoneySendSquareIcon />
                  <Typography className="font-bold bg-lime-200 px-3 py-1 rounded-lg">
                    {parseFloat(formatEther(milestone.amount)).toFixed(2)} ETH
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tx_state === "still_in_confirmation" && (
        <div className="w-full flex flex-col gap-y-3 mt-auto mb-3 px-2.5">
          <div className="w-full flex items-center gap-x-3">
            <Toggle
              checked={permissions.authorization_to_lock}
              onChange={(checked) =>
                setPermissions({
                  ...permissions,
                  authorization_to_lock: checked,
                })
              }
            />
            <Typography className="text-xs text-em-dark">
              I authorize EasyMilestones to lock{" "}
              {parseFloat(formatEther(tx_payload.amount)).toFixed(2)} ETH
              immediately and return it in milestones as defined above till{" "}
              {formatDate(
                bigintSecondsToDate(tx_payload.final_deadline),
                "EEEE do MMMM, yyyy"
              )}. I confirm and approve this transaction.
            </Typography>
          </div>
          <div className="h-[1px] bg-[#D3D3D3]" />
          <div className="w-full flex items-center gap-x-3">
            <Toggle
              checked={permissions.cannot_access_assets}
              onChange={(checked) =>
                setPermissions({
                  ...permissions,
                  cannot_access_assets: checked,
                })
              }
            />
            <Typography className="text-xs text-em-dark">
              I hereby acknowledge that this Transaction{" "}
              <span className="bg-em-tertiary ">
                {truncate(tx_payload.title, 20)}
              </span>{" "}
              CANNOT be broken once it has been created.
            </Typography>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-3 mt-auto px-2.5">
        <Button
          variant="full"
          className="w-full"
          disabled={
            createTransactionMutation.isPending ||
            !permissions.cannot_access_assets ||
            !permissions.authorization_to_lock
          }
          onTap={() => {
            tx_state === "confirmed"
              ? props.onTransactionCreatedSuccessClose()
              : createTransactionMutation.mutateAsync();
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
              props.onTransactionCreatedSuccessClose();
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
