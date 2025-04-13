import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase | EasyMilestones",
  description:
    "A decentralized milestone payment system that automates payments based on predefined timelines. Built with Solidity and TypeScript.",
};

export default async function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen">
      <body
        className={`w-screen h-screen antialiased font-medium font-Satoshi select-none`}
      >
        {children}
      </body>
    </html>
  );
}
