// should inherit DescriptiveError

import { useState } from "react";
import { last } from "./utils";

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
   * @dev this is called after a save button is clicked on each milestone
   */
  saveMilestone(
    milestone_title: string,
    amount: bigint,
    deadline: Date
  ): MilestoneBuilder {
    const tomorrow = BigInt(
      new Date(Date.now() + 24 * 60 * 60 * 1000).getTime() / 1000
    );
    const milestoneDeadline = BigInt(deadline.getTime() / 1000);
    if (milestoneDeadline! >= tomorrow)
      throw new MilestoneBuilderError(
        "Milestone deadline must be at least 24 hours in the future"
      );
    if (milestone_title === "")
      throw new MilestoneBuilderError("Milestone title cannot be empty");
    if (BigInt(amount) === 0n)
      throw new MilestoneBuilderError("Milestone amount cannot be 0");
    this.milestones.push({
      amount,
      deadline: milestoneDeadline,
      title: milestone_title,
    });
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
      },
      ...milestones.slice(index + 1),
    ];
  }

  // this is error prone
  removeMilestone(index: number): MilestoneBuilder {
    this.milestones.splice(index, 1);
    return this;
  }

  updateMilestone(
    index: number,
    milestone_title: string,
    amount: bigint,
    deadline: Date
  ): MilestoneBuilder {
    const tomorrow = BigInt(
      new Date(Date.now() + 24 * 60 * 60 * 1000).getTime() / 1000
    );
    const milestoneDeadline = BigInt(deadline.getTime() / 1000);
    if (milestoneDeadline! >= tomorrow)
      throw new MilestoneBuilderError(
        "Milestone deadline must be at least 24 hours in the future"
      );
    if (milestone_title === "")
      throw new MilestoneBuilderError("Milestone title cannot be empty");
    if (BigInt(amount) === 0n)
      throw new MilestoneBuilderError("Milestone amount cannot be 0");
    this.milestones[index] = {
      amount,
      deadline: milestoneDeadline,
      title: milestone_title,
    };
    return this;
  }

  build(): TransactionPayload {
    const milestones = this.milestones.map((milestone, index) => {
      // one more validation here
      const {
        deadline: milestone_deadline,
        title: milestone_title,
        amount,
      } = milestone;
      if (milestone_title === "")
        throw new MilestoneBuilderError(
          `Milestone ${index + 1} title cannot be empty`
        );
      if (BigInt(amount) === 0n)
        throw new MilestoneBuilderError(
          `Milestone ${index + 1} amount cannot be 0`
        );
      return {
        amount,
        deadline: milestone_deadline,
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
  Omit<MilestonePayload, "deadline"> & { deadline: Date }
>;

export const useMilestoneBuilder = () => {
  const milestoneBuilder = new MilestoneBuilder();
  const [tx_title, set_tx_title] = useState<string>();
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
      milestoneBuilder.addEmptyMilestone(index);
      set_milestones((p) => {
        const newMilestones = [
          ...p.slice(0, index + 1),
          {
            title: "",
            amount: 0n,
            deadline: new Date(),
          } as MilestonePayloadWithDate,
          ...p.slice(2 + 1),
        ];
        return newMilestones;
      });
    },
    saveMilestone(milestone: MilestonePayloadWithDate) {
      milestoneBuilder.saveMilestone(
        milestone.title,
        milestone.amount,
        milestone.deadline
      );
      set_milestones((p) => [...p, milestone]);
    },
    removeMilestone(index: number) {
      milestoneBuilder.removeMilestone(index);
      set_milestones((p) => p.filter((_, i) => i !== index));
    },
    updateMilestone(index: number, milestone: MilestonePayloadWithDate) {
      milestoneBuilder.updateMilestone(
        index,
        milestone.title,
        milestone.amount,
        milestone.deadline
      );
      set_milestones((p) => p.map((m, i) => (i === index ? milestone : m)));
    },
    build() {
      return milestoneBuilder.build();
    },
  };
};
