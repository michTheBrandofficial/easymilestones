// SPDX-License-Identifier: GPL 3.0
pragma solidity ^0.8.28;
import "forge-std/console.sol";
import { Set } from "./Libs.sol";

contract EasyMilestones {
  struct Transaction {
    uint256 amount;
    uint256 deadline;
    Milestone[] milestones;
  }

  enum Status {
    unpaid,
    paid
  }

  struct Milestone {
    uint256 amount;
    uint256 deadline;
    Status status;
  }

  struct MilestoneWithoutStatus {
    uint256 amount;
    uint256 deadline;
  }

  // Track unique transaction owners using a set
  Set transactionOwnersSet = new Set();

  mapping(address => Transaction[]) private transactions;

  modifier nonZeroValue() {
    require(msg.value > 0, "Value must be greater than 0");
    _;
  }

  event TransactionCreated(address indexed owner, uint256 amount, Milestone[] milestones);

  /// @notice this function will create a new transaction for the user, clearing any one it has before, this is bad!!!!! 👎👎👎
  function createTransaction(uint256 _deadline, MilestoneWithoutStatus[] memory _milestones)
    public
    payable
    nonZeroValue
  {
    address newTransactionOwner = msg.sender;
    transactionOwnersSet.add(newTransactionOwner);
    Milestone[] memory _milestonesWithStatus = new Milestone[](_milestones.length);
    for (uint256 i = 0; i < _milestones.length; i++) {
      _milestonesWithStatus[i] = Milestone(_milestones[i].amount, _milestones[i].deadline, Status.unpaid);
    }
    transactions[newTransactionOwner].push(Transaction(msg.value, _deadline, _milestonesWithStatus));
    emit TransactionCreated(newTransactionOwner, msg.value, _milestonesWithStatus);
  }

  function getTransactions() external view returns (Transaction[] memory txn) {
    if (transactionOwnersSet.has(msg.sender)) {
      txn = transactions[msg.sender];
    }
    return txn;
  }

  event FundsTransferred(address indexed owner, uint256 amount, uint256 timestamp);

  function payTransactionOwner(address payable transaction_owner, Milestone memory milestone, uint256 block_timestamp) internal {
    if (block_timestamp >= milestone.deadline && milestone.status == Status.unpaid) {
      (bool success,) = transaction_owner.call{ value: milestone.amount }("");
      require(success, "Failed to transfer funds");
      milestone.status = Status.paid;
      emit FundsTransferred(transaction_owner, milestone.amount, block_timestamp);
    } // no need to check for else case here.
  }

  /// @notice this function will use block.timestamp to check if the milestone is due.
  /// @notice there are no transactions here
  function processDueMilestones() external {
    uint256 timestamp = block.timestamp;
    address[] memory transactionOwnersList = transactionOwnersSet.toArray();
    for (uint256 i = 0; i < transactionOwnersList.length; i++) {
      address payable transaction_owner = payable(transactionOwnersList[i]);
      Transaction[] memory txns = transactions[transaction_owner];
      for (uint256 j = 0; j < txns.length; j++) {
        Transaction memory txn = txns[j];
        for (uint256 m = 0; m < txn.milestones.length; m++) {
          payTransactionOwner(transaction_owner, txn.milestones[m], timestamp);
        }
      }
    }
  }
}
