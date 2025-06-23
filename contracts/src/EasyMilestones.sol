// SPDX-License-Identifier: GPL 3.0
pragma solidity ^0.8.24;

import { console } from "forge-std/console.sol";
import { Set } from "./Libs.sol";

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

contract EasyMilestones {
  using LibArray for MilestoneWithoutStatus[];

  struct Transaction {
    uint256 amount;
    uint256 final_deadline;
    string title;
    Milestone[] milestones;
    uint256 created_at;
  }

  enum Status {
    unpaid,
    paid
  }

  struct Milestone {
    uint256 amount;
    uint256 deadline;
    string title;
    Status status;
  }

  struct MilestoneWithoutStatus {
    uint256 amount;
    uint256 deadline;
    string title;
  }

  // Track unique transaction owners using a set
  Set transactionOwnersSet = new Set();

  mapping(address => Transaction[]) private transactions;

  modifier nonZeroValue() {
    require(msg.value > 0, "Value must be greater than 0");
    _;
  }

  event TransactionCreated(address indexed owner, uint256 amount, string title, uint256 created_at);

  function createTransaction(uint256 final_deadline, string memory title, MilestoneWithoutStatus[] memory _milestones)
    public
    payable
    nonZeroValue
  {
    address newTransactionOwner = msg.sender;
    uint256 total_amount = msg.value;
    // Check if the final deadline is equal to the deadline of the last milestone in the array
    require(_milestones.last().deadline == final_deadline, "Last milestone deadline must be equal to final deadline");
    require(_milestones.getTotalAmount() == total_amount, "Total amount must be equal to the sum of milestones");
    transactionOwnersSet.add(newTransactionOwner);

    Milestone[] memory _milestonesWithStatus = new Milestone[](_milestones.length);
    for (uint256 i = 0; i < _milestones.length; i++) {
      _milestonesWithStatus[i] =
        Milestone(_milestones[i].amount, _milestones[i].deadline, _milestones[i].title, Status.unpaid);
    }
    transactions[newTransactionOwner].push(
      Transaction(total_amount, final_deadline, title, _milestonesWithStatus, block.timestamp)
    );
    emit TransactionCreated(newTransactionOwner, total_amount, title, block.timestamp);
  }

  function getTransactions(address owner) external view returns (Transaction[] memory txn) {
    if (transactionOwnersSet.has(owner)) {
      txn = transactions[owner];
    }
    return txn;
  }

  event FundsTransferred(address indexed owner, uint256 amount, string milestone_title, uint256 timestamp);

  function payTransactionOwner(address payable transaction_owner, Milestone storage milestone, uint256 block_timestamp)
    internal
  {
    if (block_timestamp >= milestone.deadline && milestone.status == Status.unpaid) {
      (bool success,) = transaction_owner.call{ value: milestone.amount }("");
      require(success, "Failed to transfer funds");
      milestone.status = Status.paid;
      emit FundsTransferred(transaction_owner, milestone.amount, milestone.title, block_timestamp);
    }
  }

  /// @notice this function will use block.timestamp to check if the milestone is due.
  function processDueMilestones() external {
    uint256 timestamp = block.timestamp;
    address[] memory transactionOwnersList = transactionOwnersSet.toArray();
    for (uint256 index = 0; index < transactionOwnersList.length; index++) {
      // for each transaction owner that has transactions. we get all the transactions
      address payable transaction_owner = payable(transactionOwnersList[index]);
      Transaction[] storage txns = transactions[transaction_owner];
      for (uint256 transaction_index = 0; transaction_index < txns.length; transaction_index++) {
        Milestone[] storage txn_milestones = txns[transaction_index].milestones;
        for (uint256 milestone_index = 0; milestone_index < txn_milestones.length; milestone_index++) {
          payTransactionOwner(transaction_owner, txn_milestones[milestone_index], timestamp);
        }
      }
    }
  }
}
