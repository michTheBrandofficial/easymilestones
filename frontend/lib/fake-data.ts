import { Status } from "./utils";

export default class FakeData {
  static transactions: Transaction[] = [
    {
      amount: 10,
      deadline: 1699708800,
      title: "Transaction 1 for birthday",
      milestones: [
        {
          amount: 5,
          deadline: 1699708800,
          title: "Milestone 1",
          status: Status.unpaid,
        },
        {
          amount: 5,
          deadline: 1702396800,
          title: "Milestone 2",
          status: Status.unpaid,
        },
      ],
    },
    {
      amount: 20,
      deadline: 1702396800,
      title: "Transaction 2",
      milestones: [
        {
          amount: 10,
          deadline: 1702396800,
          title: "Milestone 1",
          status: Status.paid,
        },
        {
          amount: 10,
          deadline: 1705075200,
          title: "Milestone 2",
          status: Status.paid,
        },
      ],
    },

  ]
}