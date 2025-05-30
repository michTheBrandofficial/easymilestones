import { Status } from "./utils";

// const today = new Date()

export default class FakeData {
  // solidity sends in seconds so we convert to milliseconds by multiplying by 1000
  static transactions: Transaction[] = [
    {
      amount: 10,
      created_at: 1744239600,
      final_deadline: 1746831600,
      title: "Transaction 1 for birthday",
      milestones: [
        {
          amount: 5,
          deadline: 1745190000,
          title: "Milestone 1",
          status: Status.paid,
        },
        {
          amount: 5,
          deadline: 1746831600,
          title: "Milestone 2",
          status: Status.unpaid,
        },
      ],
    },
    {
      amount: 15,
      created_at: 1740870000,
      final_deadline: 1744412400,
      title: "Transaction 2 for birthday",
      milestones: [
        {
          amount: 5,
          deadline: 1742770800,
          title: "Milestone 1",
          status: Status.paid,
        },
        {
          amount: 5,
          deadline: 1744239600,
          title: "Milestone 2",
          status: Status.unpaid,
        },
        {
          amount: 5,
          deadline: 1744412400,
          title: "Milestone 2",
          status: Status.unpaid,
        },
      ],
    },
  ]
}