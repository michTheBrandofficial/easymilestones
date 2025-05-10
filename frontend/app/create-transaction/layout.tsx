import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Transaction | EasyMilestones",
  description:
    "A decentralized milestone payment system that automates payments based on predefined timelines. Built with Solidity and TypeScript.",
};

export default async function CreateTransactionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
