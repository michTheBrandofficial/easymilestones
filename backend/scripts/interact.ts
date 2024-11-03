import { last } from "../utils";

export async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const easymilestones = await ethers.getContractAt("EasyMilestones", address);
  const [signer1 = { address }] = await ethers.getSigners();
  easymilestones;
  const milestoneBuilder = new MilestoneBuilder(1000n);
  const milestones = milestoneBuilder
    .appendMilestone(2000n, new Date(2024, 10, 4))
    .appendMilestone(8000n, new Date(2024, 10, 5))
    .build();
  await easymilestones.create_transaction(
    last(milestones).deadline,
    milestones,
    {
      value: milestoneBuilder.getTotalAmount(),
    }
  );
  const transaction = await easymilestones.get_transaction();
  console.log(`${address} has these milestones:`, transaction[2]);
}

class MilestoneBuilder {
  private totalAmount: bigint;
  private milestoneAmounts: bigint[] = [];
  private deadlines: bigint[] = [];

  constructor(totalAmount: bigint) {
    this.totalAmount = totalAmount;
  }

  appendMilestone(amount: bigint, deadline: Date): MilestoneBuilder {
    this.milestoneAmounts.push(amount);
    this.deadlines.push(BigInt(deadline.getTime()));
    return this;
  }

  build() {
    const sum = this.milestoneAmounts.reduce((a, b) => a + b, 0n);
    if (sum !== this.totalAmount) {
      throw new Error("Sum of milestone amounts must equal total amount");
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
