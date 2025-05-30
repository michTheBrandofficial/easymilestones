import { Button } from "@/components/buttons";
import RocketIcon from "@/components/icons/rocket";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import FakeData from "@/lib/fake-data";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusSignIcon } from "hugeicons-react";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/transactions/")({
  component: Transactions,
});

function Transactions() {
  const navigate = useNavigate();
  return (
    <PageScreen className="flex flex-col gap-y-5">
      <div className="w-full flex items-center justify-between  ">
        <Typography variant="h1">Transactions</Typography>
        <Button
          variant="icon"
          className="rounded-full"
          onTap={() => navigate({ to: "/create-transaction" })}
        >
          <PlusSignIcon strokeWidth="2" size={20} />
        </Button>
      </div>
      <Transaction />
    </PageScreen>
  );
}

const Transaction = () => {
  const [tx] = FakeData.transactions;
  return (
    <div className="w-full bg-white p-3 rounded-lg shadow-md">
      <div className="w-full flex items-center justify-between">
        <Typography className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
          {tx.title}
        </Typography>
        <Typography className="font-bold text-em-green whitespace-nowrap">
          {tx.amount} ETH
        </Typography>
      </div>
      <div className="w-full flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-2 text-em-text">
          <RocketIcon />
          {formatDate(new Date(tx.created_at * 1000), "MMM dd, yyyy")}
        </div>
        <div className="flex items-center gap-x-2 text-em-text">
          <RocketIcon className="rotate-90" />
          {formatDate(new Date(tx.final_deadline * 1000), "MMM dd, yyyy")}
        </div>
      </div>
    </div>
  );
};
