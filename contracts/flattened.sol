// SPDX-License-Identifier: GPL 3.0
pragma solidity ^0.8.28;

// src/Libs.sol

contract Set {
  mapping(address => bool) internal addedValuesMapping;
  address[] internal addedValuesList;

  /// @dev adds an address to a list if the list doesn't have it
  function add(address value) public {
    if (!addedValuesMapping[value]) {
      addedValuesMapping[value] = true;
      addedValuesList.push(value);
    }
  }

  function has(address value) public view returns (bool) {
    return bool(addedValuesMapping[value]);
  }

  function toArray() public view returns (address[] memory) {
    return addedValuesList;
  }
}

// src/EasyMilestones.sol

library LibArray {
  function first(EasyMilestones.MilestoneWithoutStatus[] memory self)
    internal
    pure
    returns (EasyMilestones.MilestoneWithoutStatus memory)
  {
    require(self.length > 0, "Index out of bounds");
    return self[0];
  }

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
    uint256 arrayLength = self.length;
    for (uint256 i = 0; i < arrayLength; i++) {
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

  bool private locked;

  modifier nonZeroValue() {
    require(msg.value > 0, "Value must be greater than 0");
    _;
  }

  modifier nonReentrant() {
    require(!locked, "Reentrant call");
    locked = true;
    _;
    locked = false;
  }

  event TransactionCreated(address indexed owner, uint256 amount, string title, uint256 created_at);

  function createTransaction(uint256 final_deadline, string memory title, MilestoneWithoutStatus[] memory _milestones)
    public
    payable
    nonZeroValue
    nonReentrant
  {
    address newTransactionOwner = msg.sender;
    uint256 total_amount = msg.value;
    // Check if the final deadline is equal to the deadline of the last milestone in the array
    require(_milestones.length > 0, "No milestones provided");
    require(_milestones.first().deadline > block.timestamp, "Deadline must be in future");
    require(_milestones.last().deadline == final_deadline, "Last milestone deadline must be equal to final deadline");
    require(_milestones.getTotalAmount() == total_amount, "Total amount must be equal to the sum of milestones");
    transactionOwnersSet.add(newTransactionOwner);

    // Create transaction struct in memory first, then push to storage
    Transaction storage newTransaction = transactions[newTransactionOwner].push();
    newTransaction.amount = total_amount;
    newTransaction.final_deadline = final_deadline;
    newTransaction.title = title;
    newTransaction.created_at = block.timestamp;

    uint256 milestones_length = _milestones.length;
    // Add milestones to the storage array
    for (uint256 i = 0; i < milestones_length; i++) {
      newTransaction.milestones.push(
        Milestone({
          amount: _milestones[i].amount,
          deadline: _milestones[i].deadline,
          title: _milestones[i].title,
          status: Status.unpaid
        })
      );
    }
    emit TransactionCreated(newTransactionOwner, total_amount, title, block.timestamp);
  }

  function getTransactions(address owner) external view returns (Transaction[] memory txn) {
    if (transactionOwnersSet.has(owner)) {
      txn = transactions[owner];
    }
    return txn;
  }

  event FundsTransferred(address indexed owner, uint256 amount, string title, uint256 timestamp);

  function payTransactionOwner(address payable transaction_owner, Milestone storage milestone, uint256 block_timestamp)
    internal
  {
    if (block_timestamp >= milestone.deadline && milestone.status == Status.unpaid) {
      // update state first
      milestone.status = Status.paid;

      // external interactions last
      (bool success,) = transaction_owner.call{ value: milestone.amount }("");
      if (success == false) {
        revert("Failed to transfer funds");
      }
      emit FundsTransferred(transaction_owner, milestone.amount, milestone.title, block_timestamp);
    }
  }

  /// @notice this function will use block.timestamp to check if the milestone is due.
  /// @notice anybody can call this function to process due milestones, that is if you are willing to pay gas fees 😂
  function processDueMilestones() external nonReentrant {
    uint256 timestamp = block.timestamp;
    address[] memory transactionOwnersList = transactionOwnersSet.toArray();
    uint256 transactionOwnersLength = transactionOwnersList.length;
    for (uint256 index = 0; index < transactionOwnersLength; index++) {
      // for each transaction owner that has transactions. we get all the transactions
      address payable transaction_owner = payable(transactionOwnersList[index]);
      Transaction[] storage txns = transactions[transaction_owner];
      uint256 txns_length = txns.length;
      for (uint256 transaction_index = 0; transaction_index < txns_length; transaction_index++) {
        Milestone[] storage txn_milestones = txns[transaction_index].milestones;
        uint256 milestones_length = txn_milestones.length;
        for (uint256 milestone_index = 0; milestone_index < milestones_length; milestone_index++) {
          payTransactionOwner(transaction_owner, txn_milestones[milestone_index], timestamp);
        }
      }
    }
  }
}

