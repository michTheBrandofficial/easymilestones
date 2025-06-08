// should inherit DescriptiveError

import { useState } from "react";
import { last } from "./utils";
import { ErrorMatcher } from "./error-matcher";
import { useToast } from "@/components/ui/toast-context";

export class MilestoneBuilderError extends Error {
  description: string;
  constructor(message: string, descripton?: string) {
    super(message);
    this.name = "MilestoneBuilderError";
    this.description = descripton || "";
  }
}

export interface MilestonePayload extends Pick<Milestone, "title"> {
  amount: bigint;
  deadline: bigint;
  /**
   * @dev a verified milestone is verified when it has a valid title, valid amount, and a date that is greater than `tomorrow` from milestone creation date.
   */
  isVerified?: boolean;
}

interface TransactionPayload extends Pick<Transaction, "title"> {
  milestones: MilestonePayload[];
  amount: bigint;
  final_deadline: bigint;
}

/**
 * @notice frontend milestone appender.
 * @moreinfo Solidity contract also handles these errors if they eventually bypass this frontend.
 */
class MilestoneBuilder {
  private transaction_title: string = "";
  private milestones: MilestonePayload[] = [];

  setTransactionTitle(title: string) {
    if (title === "")
      throw new MilestoneBuilderError("Transaction title cannot be empty");
    this.transaction_title = title;
    return this;
  }

  /**
   * @dev this adds a new empty milestone in front of the index given
   */
  addEmptyMilestone(index: number) {
    const milestones = this.milestones;
    this.milestones = [
      ...milestones.slice(0, index + 1),
      {
        title: "",
        amount: 0n,
        deadline: 0n,
        isVerified: false,
      },
      ...milestones.slice(index + 1),
    ];
  }

  removeMilestone(index: number): MilestoneBuilder {
    this.milestones = this.milestones.filter((_, i) => i !== index);
    return this;
  }

  /**
   * @dev the milestone already exists with default values 0n amount, 0n deadline, '' title
   * @dev this is called after a `save` button is clicked on each milestone
   * @dev only verified milestones can add empty milestones
   */
  updateMilestone(
    index: number,
    milestone_title: string,
    amount: bigint,
    deadline: Date
  ): MilestoneBuilder {
    const milestoneDeadline_BigInt = BigInt(deadline.getTime());
    const tomorrow_BigInt = BigInt(
      new Date(Date.now() + 24 * 60 * 60 * 1000).getTime()
    );
    if (milestoneDeadline_BigInt >= tomorrow_BigInt)
      undefined; // do nothing, this is for devs to easily understand
    else
      throw new MilestoneBuilderError(
        "Milestone deadline must be at least 24 hours in the future"
      );
    if (milestone_title === "")
      throw new MilestoneBuilderError("Milestone title cannot be empty");
    if (BigInt(amount) === 0n)
      throw new MilestoneBuilderError("Milestone amount cannot be 0");
    this.milestones[index] = {
      amount,
      deadline: milestoneDeadline_BigInt,
      title: milestone_title,
      isVerified: true,
    };
    return this;
  }

  /**
   * @dev this is the only block where the convertion of milliseconds to seconds happens
   */
  build(): TransactionPayload {
    const milestones = this.milestones.map((milestone, index) => {
      // one more validation here
      const {
        deadline: milestone_deadline_BigInt,
        title: milestone_title,
        amount: amount_BigInt,
      } = milestone;
      if (milestone_title === "")
        throw new MilestoneBuilderError(
          `Milestone ${index + 1} title cannot be empty`
        );
      if (BigInt(amount_BigInt) === 0n)
        throw new MilestoneBuilderError(
          `Milestone ${index + 1} amount cannot be 0`
        );
      return {
        amount: amount_BigInt,
        // the only place the conversion from milliseconds to seconds happens
        deadline: milestone_deadline_BigInt / 1000n,
        title: milestone_title,
      };
    });

    return {
      title: this.transaction_title,
      amount: this.getTotalAmount() || 0n,
      final_deadline: last(milestones)?.deadline || 0n,
      milestones,
    };
  }

  getTotalAmount() {
    if (this.milestones.length === 0) return 0n;
    const amounts = this.milestones.map((m) => m.amount);
    return amounts.reduce((a, b) => a + b, 0n) as bigint;
  }
}

export type MilestonePayloadWithDate = Helpers.Prettify<
  Omit<MilestonePayload, "deadline"> & { deadline: Date | null }
>;

export const useMilestoneBuilder = () => {
  const milestoneBuilder = new MilestoneBuilder();
  const [tx_title, set_tx_title] = useState<string>();
  const showToast = useToast();
  const [milestones, set_milestones] = useState<MilestonePayloadWithDate[]>([]);
  return {
    tx_title,
    milestones,
    setTxTitle(title: string) {
      milestoneBuilder.setTransactionTitle(title);
      set_tx_title(title);
    },
    /**
     * @dev this only appends milestone in the front of the given index
     */
    addEmptyMilestone(index: number) {
      try {
        milestoneBuilder.addEmptyMilestone(index);
        set_milestones((p) => {
          const newMilestones = [
            ...p.slice(0, index + 1),
            {
              title: "",
              amount: 0n,
              deadline: null,
              isVerified: false,
            } as MilestonePayloadWithDate,
            ...p.slice(index + 1),
          ];
          return newMilestones;
        });
      } catch (error) {
        ErrorMatcher.use(error).match(MilestoneBuilderError, (error) => {
          showToast("info", error.message);
        });
      }
    },
    removeMilestone(index: number) {
      milestoneBuilder.removeMilestone(index);
      set_milestones((p) => p.filter((_, i) => i !== index));
    },
    updateMilestone(
      index: number,
      milestone: Omit<MilestonePayloadWithDate, "deadline"> & { deadline: Date }
    ) {
      try {
        milestoneBuilder.updateMilestone(
          index,
          milestone.title,
          milestone.amount,
          milestone.deadline
        );
        // verify the milestone for the ui
        set_milestones((p) => p.map((m, i) => (i === index ? { ...milestone, isVerified: true } : m)));
        return { success: true }
      } catch (error) {
        ErrorMatcher.use(error).match(MilestoneBuilderError, (error) => {
          showToast("info", error.message);
        });
        return { success: false }
      }
    },
    build() {
      return milestoneBuilder.build();
    },
  };
};
