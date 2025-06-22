// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { EasyMilestones } from "../src/EasyMilestones.sol";

library LibArray {
  function last(EasyMilestones.MilestoneWithoutStatus[] memory self)
    internal
    pure
    returns (EasyMilestones.MilestoneWithoutStatus memory)
  {
    require(self.length > 0, "Index out of bounds");
    return self[self.length - 1];
  }

  // Helper function to get total amount directly
  function getTotalAmount(EasyMilestones.MilestoneWithoutStatus[] memory self) internal pure returns (uint256) {
    uint256 total = 0;
    for (uint256 i = 0; i < self.length; i++) {
      total += self[i].amount;
    }
    return total;
  }
}

// - sending in incorrect _final_deadline and correct last milestone deadline ⛔ and seeing the require fail
// test that TransactionCreate event is emitted when a transaction is created.

contract EasyMilestonesTest is Test {
  using LibArray for EasyMilestones.MilestoneWithoutStatus[];
  using LibArray for EasyMilestones.Milestone[];

  EasyMilestones private easyMilestones;

  /// @dev all dates here are between Jul 2025 - Dec 2025
  uint256 private TWELVETH_JULY = 1752274800;
  uint256 private SECOND_AUGUST = 1754089200;
  uint256 private FIRST_SEPTEMBER = 1756681200;
  uint256 private SIXTEENTH_OCTOBER = 1760569200;
  uint256 private THIRTY_FIRST_OCTOBER = 1761865200;

  EasyMilestones.MilestoneWithoutStatus[] first_transaction;

  EasyMilestones.MilestoneWithoutStatus[] second_transaction;

  /// @dev keep a receive function to receive ether
  receive() external payable { }

  /// @dev this is called just before each test case
  function setUp() public {
    // make sure that the contract has enough ether to pay for the transactions;
    vm.deal(address(this), 3 ether);
    easyMilestones = new EasyMilestones();

    // first transacion
    first_transaction.push(EasyMilestones.MilestoneWithoutStatus(0.2 ether, TWELVETH_JULY, "Beverages"));
    first_transaction.push(EasyMilestones.MilestoneWithoutStatus(0.14 ether, SECOND_AUGUST, "Confectionaries"));
    easyMilestones.createTransaction{ value: first_transaction.getTotalAmount() }(
      first_transaction.last().deadline, "Foodstuff Fees", first_transaction
    );

    // second transaction
    second_transaction.push(EasyMilestones.MilestoneWithoutStatus(1 ether, FIRST_SEPTEMBER, "Battery change"));
    easyMilestones.createTransaction{ value: second_transaction.getTotalAmount() }(
      second_transaction.last().deadline, "Vehicle Expenses", second_transaction
    );
  }

  // test last method on EasyMilestones.MilestoneWithoutStatus[] to get a milestone by having the correct deadline
  function test_First_Transaction_LastMilestone_IsON_SecondAugust() public {
    vm.skip(true);
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(address(this));
    assertEq(transactions[0].milestones[transactions[0].milestones.length - 1].deadline, SECOND_AUGUST);
  }

  // test createTransaction function by
  // - sending in correct value and ✅ checking that the details of one transaction are correct
  function test_() public {
    vm.skip(true);
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(address(this));
    assertEq(transactions[0].milestones[transactions[0].milestones.length - 1].deadline, SECOND_AUGUST);
  }

  function test_User_Has_2_Transactions() public {
    vm.skip(true);
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(address(this));
    assertEq(transactions.length, 2);
  }

  function test_User_Has_3_MilestonesInTotal() public {
    vm.skip(true);
    uint256 totalMilestones = 0;
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(address(this));
    for (uint256 i = 0; i < transactions.length; i++) {
      EasyMilestones.Transaction memory transaction = transactions[i];
      totalMilestones += transaction.milestones.length;
    }
    assertEq(totalMilestones, 3);
  }

  // function test_FundsTransferred_EventEmitted_When_MilestoneProcessed() public {
  //   vm.skip(true);
  //   vm.warp(THIRTEENTH_NOVEMBER);
  //   // Check for the event match
  //   vm.expectEmit(true, false, false, true);
  //   emit EasyMilestones.FundsTransferred(address(this), 1 ether, "Vehicle Expenses", block.timestamp);
  //   easyMilestones.processDueMilestones();
  // }

  // /// @notice run test with forge test -vvv for console.logs to show
  // function test_Payment_Is_Made() public {
  //   vm.skip(true);
  //   vm.warp(THIRTEENTH_NOVEMBER);
  //   console.log(address(this).balance);
  //   // Check for the event match
  //   easyMilestones.processDueMilestones();
  //   console.log(address(this).balance);
  // }
}
