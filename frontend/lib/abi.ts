const easyMilestonesAbi = [
  {
    type: "function",
    name: "createTransaction",
    inputs: [
      { name: "final_deadline", type: "uint256", internalType: "uint256" },
      { name: "title", type: "string", internalType: "string" },
      {
        name: "_milestones",
        type: "tuple[]",
        internalType: "struct EasyMilestones.MilestoneWithoutStatus[]",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
          { name: "title", type: "string", internalType: "string" },
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
          { name: "final_deadline", type: "uint256", internalType: "uint256" },
          { name: "title", type: "string", internalType: "string" },
          {
            name: "milestones",
            type: "tuple[]",
            internalType: "struct EasyMilestones.Milestone[]",
            components: [
              { name: "amount", type: "uint256", internalType: "uint256" },
              { name: "deadline", type: "uint256", internalType: "uint256" },
              { name: "title", type: "string", internalType: "string" },
              {
                name: "status",
                type: "uint8",
                internalType: "enum EasyMilestones.Status",
              },
            ],
          },
          { name: "created_at", type: "uint256", internalType: "uint256" },
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
      { name: "title", type: "string", indexed: false, internalType: "string" },
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
      { name: "title", type: "string", indexed: false, internalType: "string" },
      {
        name: "created_at",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
export default easyMilestonesAbi;
