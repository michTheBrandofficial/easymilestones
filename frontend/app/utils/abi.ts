const easyMilestonesAbi = [
  {
    type: "function",
    name: "createTransaction",
    inputs: [
      { name: "_deadline", type: "uint256", internalType: "uint256" },
      {
        name: "_milestones",
        type: "tuple[]",
        internalType: "struct EasyMilestones.MilestoneWithoutStatus[]",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getTransactions",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "txn",
        type: "tuple[]",
        internalType: "struct EasyMilestones.Transaction[]",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "milestones",
            type: "tuple[]",
            internalType: "struct EasyMilestones.Milestone[]",
            components: [
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "status",
                type: "uint8",
                internalType: "enum EasyMilestones.Status",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "processDueMilestones",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FundsTransferred",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionCreated",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "milestones",
        type: "tuple[]",
        indexed: false,
        internalType: "struct EasyMilestones.Milestone[]",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "status",
            type: "uint8",
            internalType: "enum EasyMilestones.Status",
          },
        ],
      },
    ],
    anonymous: false,
  },
] as const;
export default easyMilestonesAbi;
