// SPDX-License-Identifier: GPL 3.0
pragma solidity ^0.8.28;

import "forge-std/console.sol";

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

  // Track unique transaction owners using a mapping as a set
  mapping(address => bool) private transaction_owners;

  address[] private transaction_owners_list;

  mapping(address => Transaction) private transactions;

  modifier nonZeroValue() {
    require(msg.value > 0, "Value must be greater than 0");
    _;
  }

  event TransactionCreated(uint256 amount, uint256 deadline);

  /// @notice this function will create a new transaction for the user, clearing any one it has before, this is bad!!!!! 👎👎👎
  function create_transaction(uint256 _deadline, MilestoneWithoutStatus[] memory _milestones)
    public
    payable
    nonZeroValue
  {
    if (!transaction_owners[msg.sender]) {
      transaction_owners[msg.sender] = true;
      transaction_owners_list.push(msg.sender);
    }
    Milestone[] memory _milestonesWithStatus = new Milestone[](_milestones.length);
    for (uint256 i = 0; i < _milestones.length; i++) {
      _milestonesWithStatus[i] = Milestone(_milestones[i].amount, _milestones[i].deadline, Status.unpaid);
    }
    transactions[msg.sender] = Transaction(msg.value, _deadline, _milestonesWithStatus);
    emit TransactionCreated(msg.value, _deadline);
  }

  function get_transaction() external view returns (Transaction memory txn) {
    if (transaction_owners[msg.sender]) {
      txn = transactions[msg.sender];
    }
    return txn;
  }

  event FundsTransferred(address indexed recipient, uint256 amount, uint256 timestamp);

  function pay_owner(
    address payable transaction_owner,
    Milestone memory milestone,
    uint256 block_timestamp
  ) internal {
    if (block_timestamp >= milestone.deadline && milestone.status == Status.unpaid) {
      (bool success,) = transaction_owner.call{ value: milestone.amount }("");
      require(success, "Failed to transfer funds");
      milestone.status = Status.paid;
      emit FundsTransferred(transaction_owner, milestone.amount, block_timestamp);
    } // no need to check for else case here.
  }

  /// @notice this function will use block.timestamp to check if the milestone is due.
  function process_due_milestones() external {
    uint256 timestamp = block.timestamp;
    for (uint256 i = 0; i < transaction_owners_list.length; i++) {
      address payable transaction_owner = payable(transaction_owners_list[i]);
      Transaction storage txn = transactions[transaction_owner];
      for (uint256 j = 0; j < txn.milestones.length; j++) {
        pay_owner(transaction_owner, txn.milestones[j], timestamp);
      }
    }
  }
}
