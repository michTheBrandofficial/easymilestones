// SPDX-License-Identifier: GPL 3.0
pragma solidity 0.8.28;

/// @notice implement, authentication in a different contract.
contract EasyMilestones {
	// holds tokens till a specific milestone is reached
	// we need the following:
	// 1. a way to store each user's balance
	// 2. each user will have only one pending transaction at a time
	// 3. each transaction will have many milestones
	// 4. each milestone will have a specific amount of tokens
	// 5. each milestone will have a specific deadline to be paid
	// 6. each milestone

	/// @notice the address of the user, the deadline here is the deadline of the last milestone in the array.
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

	/// @notice this function will create a new transaction for the user, clearing any one it has before, this is bad!!!!!
	function create_transaction(
		uint256 _deadline,
		MilestoneWithoutStatus[] memory _milestones
	) public payable nonZeroValue {
		if (!transaction_owners[msg.sender]) {
			transaction_owners[msg.sender] = true;
			transaction_owners_list.push(msg.sender);
		}
		Milestone[] memory _milestonesWithStatus = new Milestone[](
			_milestones.length
		);
		for (uint256 i = 0; i < _milestones.length; i++) {
			_milestonesWithStatus[i] = Milestone(
				_milestones[i].amount,
				_milestones[i].deadline,
				Status.unpaid
			);
		}
		transactions[msg.sender] = Transaction(
			msg.value,
			_deadline,
			_milestonesWithStatus
		);
	}

	function get_transaction() external view returns (Transaction memory txn) {
		if (transaction_owners[msg.sender]) {
			txn = transactions[msg.sender];
		}
		return txn;
	}

	event FundsTransferred(address indexed recipient, uint256 amount, uint256 timestamp);

	function process_due_milestones() private {
		for (uint i = 0; i < transaction_owners_list.length; i++) {
			address owner = transaction_owners_list[i];
			Transaction storage txn = transactions[owner];
			for (uint j = 0; j < txn.milestones.length; j++) {
				if (
					block.timestamp >= txn.milestones[j].deadline &&
					txn.milestones[j].status == Status.unpaid
				) {
					txn.milestones[j].status = Status.paid;
					payable(owner).transfer(txn.milestones[j].amount);
					emit FundsTransferred(owner, txn.milestones[j].amount, block.timestamp);
				}
			}
		}
	}
}
