// should inherit DescriptiveError

export class MilestoneBuilderError extends Error {
  description: string;
  constructor(message: string, descripton?: string) {
    super(message);
    this.name = "MilestoneBuilderError";
    this.description = descripton || "";
  }
}

/**
 * @notice frontend milestone appender.
 * @throws MilestoneBuilderError if the total amount is not equal to the sum of the milestone amounts.
 * @moreinfo Solidity contract also handles these errors if they eventually bypass this frontend.
 */
export class MilestoneBuilder {
  private totalAmount: bigint;
  private milestoneAmounts: bigint[] = [];
  private deadlines: bigint[] = [];

  constructor(totalAmount: bigint) {
    this.totalAmount = totalAmount;
  }

  /**
   * @note needs adequate checks for deadline;
   */
  appendMilestone(amount: bigint, deadline: Date): MilestoneBuilder {
    this.milestoneAmounts.push(amount);
    const now = BigInt(new Date().getTime() / 1000);
    const milestoneDeadline = BigInt(deadline.getTime() / 1000);
    if (now >= milestoneDeadline)
      throw new MilestoneBuilderError("The deadline must be in the future");
    this.deadlines.push(milestoneDeadline);
    return this;
  }

  build() {
    const sum = this.milestoneAmounts.reduce((a, b) => a + b, 0n);
    if (sum !== this.totalAmount) {
      throw new MilestoneBuilderError(
        "Sum of milestone amounts must equal total amount"
      );
    }

    const milestones = this.milestoneAmounts.map((amount, index) => ({
      amount,
      deadline: this.deadlines[index],
    }));

    return milestones;
  }

  getTotalAmount() {
    return this.totalAmount;
  }
}
