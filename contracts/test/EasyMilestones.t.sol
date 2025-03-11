// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { EasyMilestones } from "../src/EasyMilestones.sol";

library LibArray {
  function last(EasyMilestones.MilestoneWithoutStatus[] storage arr)
    internal
    view
    returns (EasyMilestones.MilestoneWithoutStatus memory)
  {
    require(arr.length > 0, "Array is empty");
    return arr[arr.length - 1];
  }
}

contract EasyMilestonesTest is Test {
  using LibArray for EasyMilestones.MilestoneWithoutStatus[];

  EasyMilestones private easyMilestones;
  uint256 private FIRST_NOVEMBER = 1730415600;
  uint256 private FIFTH_NOVEMBER = 1730761200;
  uint256 private THIRTEENTH_NOVEMBER = 1731452400;
  EasyMilestones.MilestoneWithoutStatus[] milestones1;
  EasyMilestones.MilestoneWithoutStatus[] milestones2;

  // keep a receive function to receive ether
  receive() external payable { }

  /// @notice checkout book.foundry.sh and/or have an ai model assist you with this tests
  function setUp() public {
    // this is to make sure that the contract has enough ether to pay for the transaction;
    vm.deal(address(this), 1000 ether);
    milestones1.push(EasyMilestones.MilestoneWithoutStatus(1 ether, FIRST_NOVEMBER));
    milestones1.push(EasyMilestones.MilestoneWithoutStatus(1 ether, FIFTH_NOVEMBER));
    milestones2.push(EasyMilestones.MilestoneWithoutStatus(1 ether, THIRTEENTH_NOVEMBER));
    easyMilestones = new EasyMilestones();
    easyMilestones.createTransaction{ value: 2 ether }(milestones1.last().deadline, milestones1);
    easyMilestones.createTransaction{ value: 1 ether }(milestones2.last().deadline, milestones2);
  }

  function test_UserHas_2_Transactions() public {
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(
      address(this)
    );
    assertEq(transactions.length, 2);
  }

  function test_UserHas_3_MilestonesInTotal() public  {
    vm.skip(true);
    uint256 totalMilestones = 0;
    EasyMilestones.Transaction[] memory transactions = easyMilestones.getTransactions(
      address(this)
    );
    for (uint256 i = 0; i < transactions.length; i++) {
      EasyMilestones.Transaction memory transaction = transactions[i];
      totalMilestones += transaction.milestones.length;
    }
    assertEq(totalMilestones, 3);
  }

  function test_FundsTransferred_EventEmitted_When_MilestoneProcessed() public {
    vm.skip(true);
    vm.warp(THIRTEENTH_NOVEMBER);
    // Check for the event match
    vm.expectEmit(true, false, false, true);
    emit EasyMilestones.FundsTransferred(address(this), 1 ether, block.timestamp);
    easyMilestones.processDueMilestones();
  }

  /// @notice run test with forge test -vvv for console.logs to show
  function test_Payment_Is_Made() public {
    vm.skip(true);
    vm.warp(THIRTEENTH_NOVEMBER);
    console.log(address(this).balance);
    // Check for the event match
    easyMilestones.processDueMilestones();
    console.log(address(this).balance);
  }
}
