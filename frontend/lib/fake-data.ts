import { Status } from "./utils";

// const today = new Date()

export default class FakeData {
  // solidity sends in seconds so we convert to milliseconds by multiplying by 1000
  static transactions: Transaction[] = [
    {
      amount: 10n ** 18n,
      created_at: 1744239600n,
      final_deadline: 1746831600n,
      title: "Transaction 1 for birthday",
      milestones: [
        {
          amount: 5n ** 18n,
          deadline: 1745190000n,
          title: "Milestone 1",
          status: Status.paid,
        },
        {
          amount: 5n ** 18n,
          deadline: 1746831600n,
          title: "Milestone 2",
          status: Status.unpaid,
        },
      ],
    },
  ]
}