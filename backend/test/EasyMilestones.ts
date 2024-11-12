import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { MilestoneBuilder } from "../scripts/milestone_builder";
import { EasyMilestones } from "../typechain-types";
import { last } from "../utils";

declare global {
	namespace Mocha {
		interface Suite {
			deployer_with_contract: EasyMilestones;
			t_owner: HardhatEthersSigner;
		}
	}
}

console.log("eeiei");

describe("EasyMilestones", async function () {
	before(async () => {
		const [deployer, t_owner, t_owner_2] = await ethers.getSigners();
		const EasyMilestones = await ethers.getContractFactory("EasyMilestones");
		const easyMilestones = await EasyMilestones.deploy();
		await easyMilestones.waitForDeployment();
		const [deployerWithContract, contractWithOwner1, contractWithOwner2] = [
			easyMilestones.connect(deployer),
			easyMilestones.connect(t_owner),
			easyMilestones.connect(t_owner_2),
		];
		const milestoneBuilder = new MilestoneBuilder(ethers.parseEther("1"));
		const milestones = milestoneBuilder
			// this is a past time oh
			.appendMilestone(ethers.parseEther("1"), new Date(2024, 10, 11, 15, 6))
			.build();
		await contractWithOwner1.create_transaction(
			last(milestones).deadline,
			milestones,
		);
		const balance = await ethers.provider.getBalance(t_owner.address);
		console.log(ethers.formatEther(balance));
		this.deployer_with_contract = deployerWithContract;
		this.t_owner = t_owner;
	});
	it("Should process due milestones and transaction owner should be credited ", async () => {
		const { deployer_with_contract, t_owner } = this;
		const balance = await ethers.provider.getBalance(t_owner.address);
		await deployer_with_contract.process_due_milestones();
		console.log(ethers.formatEther(balance));
		expect(ethers.formatEther(balance)).to.equal("0.000000000000000001");
	});
	// it("Should process due milestones and emit an event ", async () => {
	// 	const { deployer_with_contract } = this;
	// 	expect(await deployer_with_contract.process_due_milestones()).to.emit(
	// 		deployer_with_contract,
	// 		"FundsTransferred",
	// 	);
	// });
});
