/**
 * @todo work on restricting people from putting old dates
 */
export class MilestoneBuilder {
	private totalAmount: bigint;
	private milestoneAmounts: bigint[] = [];
	private deadlines: bigint[] = [];

	constructor(totalAmount: bigint) {
		this.totalAmount = totalAmount;
	}

	appendMilestone(amount: bigint, deadline: Date): MilestoneBuilder {
		this.milestoneAmounts.push(amount);
		// const now = BigInt(new Date().getTime());
		const milestoneDeadline = BigInt(deadline.getTime());
		// if (now >= milestoneDeadline)
		// 	throw new Error("The deadline must be in the future");
		this.deadlines.push(milestoneDeadline);
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
