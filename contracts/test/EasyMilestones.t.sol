// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Test, console } from "forge-std/Test.sol";
import { EasyMilestones } from "../src/EasyMilestones.sol";

library ArrayUtils {
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
  using ArrayUtils for EasyMilestones.MilestoneWithoutStatus[];

  EasyMilestones private easyMilestones;
  uint256 private FIRST_NOVEMBER = 1730415600;
  uint256 private FIFTH_NOVEMBER = 1730761200;
  uint256 private THIRTEENTH_NOVEMBER = 1731452400;
  EasyMilestones.MilestoneWithoutStatus[] milestones;

  // keep a receive function to receive ether
  receive() external payable { }

  /// @notice checkout book.foundry.sh and/or have an ai model assist you with this tests
  function setUp() public {
    // this is to make sure that the contract has enough ether to pay for the transaction;
    vm.deal(address(this), 1000 ether);
    milestones.push(EasyMilestones.MilestoneWithoutStatus(1 ether, FIFTH_NOVEMBER));
    easyMilestones = new EasyMilestones();
    easyMilestones.create_transaction{ value: 1 ether }(milestones.last().deadline, milestones);
  }

  function test_FundsTransferred_EventEmitted_When_MilestoneProcessed() public {
    vm.warp(THIRTEENTH_NOVEMBER);
    // Check for the event match
    vm.expectEmit(true, false, false, true);
    emit EasyMilestones.FundsTransferred(address(this), 1 ether, block.timestamp);
    easyMilestones.process_due_milestones();
  }

  /// @notice run test with forge test -vvv for console.logs to show
  function test_actually_paid_address() public {
    vm.warp(THIRTEENTH_NOVEMBER);
    console.log(address(this).balance);
    // Check for the event match
    easyMilestones.process_due_milestones();
    console.log(address(this).balance);
  }

}
