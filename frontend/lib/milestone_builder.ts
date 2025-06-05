// should inherit DescriptiveError

import { last } from "./utils";

export class MilestoneBuilderError extends Error {
  description: string;
  constructor(message: string, descripton?: string) {
    super(message);
    this.name = "MilestoneBuilderError";
    this.description = descripton || "";
  }
}

interface MilestonePayload extends Pick<Milestone, "title"> {
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
export class MilestoneBuilder {
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
  appendMilestone(
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
    })
    return this;
  }

  // this is error prone
  removeMilestone(index: number): MilestoneBuilder {
    this.milestones.splice(index, 1);
    return this;
  }

  build(): TransactionPayload {
    const milestones = this.milestones.map((milestone, index) => {
      // one more validation here
      const { deadline: milestone_deadline, title: milestone_title, amount } = milestone
      if (milestone_title === "")
        throw new MilestoneBuilderError(`Milestone ${index + 1} title cannot be empty`);
      if (BigInt(amount) === 0n)
        throw new MilestoneBuilderError(`Milestone ${index + 1} amount cannot be 0`);
      return {
        amount,
        deadline: milestone_deadline,
        title: milestone_title,
      };
    });

    return {
      title: this.transaction_title,
      amount: this.getTotalAmount(),
      final_deadline: last(milestones).deadline,
      milestones,
    };
  }

  getTotalAmount() {
    if (this.milestones.length === 0)
      return 0n;
    const amounts = this.milestones.map((m) => m.amount);
    return amounts.reduce((a, b) => a + b, 0n) as bigint;
  }
}
