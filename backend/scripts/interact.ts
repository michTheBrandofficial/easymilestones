import { ethers } from "hardhat";
import { last } from "../utils";
import { MilestoneBuilder } from "./milestone_builder";

export async function main() {
	const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const easyMilestones = await ethers.getContractAt("EasyMilestones", address);
	const [signer1, , , signer3, signer4] = await ethers.getSigners();
	const contractWithSigner1 = easyMilestones.connect(signer3);
	const contractWithSigner2 = easyMilestones.connect(signer4);
	const milestoneBuilder = new MilestoneBuilder(10000n);
	const milestones = milestoneBuilder
		.appendMilestone(2000n, new Date(2024, 10, 11, 17, 22))
		.appendMilestone(6000n, new Date(2024, 10, 11, 17, 24))
		.appendMilestone(2000n, new Date(2024, 10, 11, 17, 28))
		.build();
	await contractWithSigner1.create_transaction(
		last(milestones).deadline,
		milestones,
		{
			value: milestoneBuilder.getTotalAmount(),
		},
	);
	const txRes = await contractWithSigner2.create_transaction(
		last(milestones).deadline,
		milestones,
		{
			value: milestoneBuilder.getTotalAmount(),
		},
	);
	await new Promise((resolve) => setTimeout(resolve, 10000));
	const receipt = await txRes.wait();
	console.log("receipt", receipt?.events);
	return easyMilestones;
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
