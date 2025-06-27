import { Button } from "@/components/buttons";
import { cn } from "@/components/cn";
import { useToast } from "@/components/ui/toast-context";
import { useVariableHeightSheet } from "@/components/ui/variable-height-sheet";
import { MilestonePayloadWithDate } from "@/lib/milestone_builder";
import { pick } from "@/lib/utils";
import { formatDate } from "date-fns/format";
import {
  Calendar03Icon,
  AddCircleIcon,
  TickDouble03Icon,
} from "hugeicons-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import DatePickerSheetBody from "./date-picker-sheet-body";

type NonNullableMilestonePayloadWithDate = Helpers.NonNullableKey<
  MilestonePayloadWithDate,
  "deadline"
>;

type MilestoneProps = {
  index: number;
  milestone: MilestonePayloadWithDate;
  /**
   * this is async to set has changes only if the update is verified
   */
  onUpdate: (payload: NonNullableMilestonePayloadWithDate) => Promise<boolean>;
  onAdd: () => void;
  onRemove: () => void;
};

const Milestone = ({ index, ...props }: MilestoneProps) => {
  const [milestone, setMilestone] = useState<
    Omit<MilestonePayloadWithDate, "amount"> & { amount: string }
  >({
    ...props.milestone,
    amount: formatEther(props.milestone.amount),
  });
  useEffect(() => {
    setMilestone({
      ...props.milestone,
      amount: formatEther(props.milestone.amount),
    });
  }, [
    ...Object.values(
      pick(props.milestone, "title", "deadline", "amount", "title")
    ),
  ]);
  const DatePickerSheet = useVariableHeightSheet(`milestone-date-${index}`);
  const [hasChanges, setHasChanges] = useState(false);
  const showToast = useToast();
  return (
    <div
      key={index}
      data-milestone={index}
      className="w-full flex flex-col gap-y-3 justify-end h-[220px] -mt-1 first:mt-0 "
    >
      <div className="w-full rounded-2xl pl-4 pr-3 py-2.5 bg-gray-400/20 backdrop-blur-[12px] flex items-center">
        <input
          name="title"
          value={milestone.title}
          onInput={(e) => {
            const { value = "" } = e.target as unknown as { value: string };
            setMilestone((p) => ({ ...p, title: value || "" }));
            setHasChanges(true);
          }}
          autoComplete="off"
          className="w-full font-Bricolage_Grotesque font-semibold text-xl bg-transparent text-em-dark focus:outline-none"
          placeholder="E.g Birthday Cake"
        />
      </div>
      <div className="w-full rounded-2xl pl-4 pr-3 py-2.5 bg-gray-400/20 backdrop-blur-[12px] flex items-center">
        <input
          name="amount"
          value={milestone.amount}
          onInput={(e) => {
            const { value = "" } = e.target as unknown as { value: string };
            if (!value) setMilestone((p) => ({ ...p, amount: "" }));
            const newValue = value.replace(/[^0-9.]/g, ""); // Remove non-numeric chars except decimal
            // Prevent multiple decimal points
            const parts = newValue.split(".");
            const sanitizedValue =
              parts.length > 2
                ? `${parts[0]}.${parts.slice(1).join("")}`
                : newValue;
            if (/^\d+(\.\d{0,18})?$/.test(value))
              setMilestone((p) => ({
                ...p,
                // parse amount to be bigint with 18 decimals
                amount: sanitizedValue,
              }));
            setHasChanges(true);
          }}
          autoComplete="off"
          className="w-full font-Bricolage_Grotesque font-semibold text-xl bg-transparent text-em-dark focus:outline-none"
          placeholder="0.1"
        />
        <p className="font-semibold text-em-text">ETH</p>
      </div>
      <motion.p
        className={cn("font-medium text-em-text text-sm", {
          "text-red-500": !milestone.deadline,
        })}
      >
        {milestone.deadline
          ? `Deadline: ${formatDate(milestone.deadline, "dd MMMM, yyyy")}`
          : "Set a deadline"}
      </motion.p>
      <div className="flex gap-x-4 pr-1 h-fit">
        {/* set has changes here */}
        <Button
          onTap={() => {
            DatePickerSheet.openSheet();
          }}
          variant="icon"
          className="px-0 h-fit bg-transparent !py-0"
        >
          <Calendar03Icon size={26} className="text-em-dark" />
        </Button>
        <Button
          onTap={props.onRemove}
          variant="icon"
          className="px-0 h-fit bg-transparent !py-0"
        >
          <AddCircleIcon size={26} className="text-em-dark rotate-45" />
        </Button>
        {/* only verified milestones can create new ones */}
        {props.milestone.isVerified && (
          <Button
            onTap={props.onAdd}
            variant="icon"
            className="px-0 h-fit bg-transparent !py-0"
          >
            <AddCircleIcon size={26} className="text-em-dark" />
          </Button>
        )}
        {hasChanges && (
          <Button
            onTap={() => {
              if (!milestone.deadline) return;
              props
                .onUpdate({
                  ...milestone,
                  amount: BigInt(
                    (parseFloat(milestone.amount) || 0) * 10 ** 18
                  ),
                  //
                  deadline: milestone.deadline,
                })
                .then(() => {
                  setHasChanges(false);
                  showToast("info", "Milestone updated");
                });
            }}
            variant="icon"
            className="px-0 ml-auto h-fit bg-transparent !py-0"
          >
            <TickDouble03Icon size={26} className="text-em-dark" />
          </Button>
        )}
      </div>
      <DatePickerSheet.VariableHeightSheet
        title={"Set a Deadline"}
        backButton={"Back"}
      >
        <DatePickerSheet.VariableHeightSheetContent className="min-h-80 flex flex-col justify-end">
          <DatePickerSheetBody
            close={() => DatePickerSheet.closeSheet()}
            saveDate={(selectedDate) => {
              setMilestone((p) => ({
                ...p,
                deadline: selectedDate,
              }));
              DatePickerSheet.closeSheet();
              setHasChanges(true);
            }}
            initialDate={milestone.deadline}
          />
        </DatePickerSheet.VariableHeightSheetContent>
      </DatePickerSheet.VariableHeightSheet>
    </div>
  );
};

export default Milestone;
