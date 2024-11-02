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

    mapping(address => Transaction) private transactions;

    function create_transaction(
        uint256 _deadline,
        MilestoneWithoutStatus[] memory _milestones
    ) public payable {
        Milestone[] memory _milestonesWithStatus = new Milestone[](_milestones.length);
        for (uint256 i = 0; i < _milestones.length; i++) {
            _milestonesWithStatus[i] = Milestone(
                _milestones[i].amount,
                _milestones[i].deadline,
                Status.unpaid
            );
        }  
        transactions[msg.sender] = Transaction(msg.value, _deadline, _milestonesWithStatus);
    }

    function get_transaction() public view returns (Transaction memory) {
        return transactions[msg.sender];
    }
}
