import "@nomicfoundation/hardhat-ethers";
import { expect } from "chai";
import { EasyMilestones } from "../typechain-types";

declare global {
  namespace Mocha {
    interface Suite {
      minterAddress: string;
      recipientAddress: string;
      recipientAddress2: string;
      easymilestones: EasyMilestones;
    }
  }
}

describe("EasyMilestones", async function () {
  before(async () => {
    const [
      { address: minterAddress },
      { address: recipientAddress },
      { address: recipientAddress2 },
    ] = await ethers.getSigners();
    const Razor = await ethers.getContractFactory("Razor");
    const razor = await Razor.deploy();
    await razor.waitForDeployment();
    await razor.issue(minterAddress, 5000);
    this.razor = razor;
    this.minterAddress = minterAddress;
    this.recipientAddress = recipientAddress;
    this.recipientAddress2 = recipientAddress2;
  });
  it("Should create and get transaction from user", async () => {
    const { easymilestones, minterAddress, recipientAddress } = this;
    await easymilestones.create_transaction(30300n, [
      { amount: 1000, deadline: 16000, status: 2 },
    ])
    const addressBalances = [
      await easymilestones.getBalance(minterAddress),
      await easymilestones.getBalance(recipientAddress),
    ] as const;
    expect(addressBalances).to.eql([BigInt(4300), BigInt(700)]);
  });
});
