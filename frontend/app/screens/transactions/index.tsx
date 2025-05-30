import { Button } from "@/components/buttons";
import RocketIcon from "@/components/icons/rocket";
import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import FakeData from "@/lib/fake-data";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CheckmarkBadge01Icon,
  Clock04Icon,
  PlusSignIcon,
} from "hugeicons-react";
import { formatDate } from "date-fns";
import { cn } from "@/components/cn";
import { Status } from "@/lib/utils";

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
    <div className="w-full bg-em-secondary/40 p-3.5 px-4 rounded-2xl ">
      <div className="w-full flex items-center justify-between">
        <Typography className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
          {tx.title}
        </Typography>
        <Typography className="font-bold text-lg font-Bricolage_Grotesque text-em-green whitespace-nowrap">
          {tx.amount} ETH
        </Typography>
      </div>
      <div className="w-full flex items-center justify-between mt-4 ">
        <div className="flex items-center gap-x-1.5 text-em-text text-sm">
          <RocketIcon width={16} height={16} />
          {formatDate(new Date(tx.created_at * 1000), "MMM dd, yyyy")}
        </div>
        <div className="flex items-center gap-x-1.5 text-em-text text-sm">
          <RocketIcon width={16} height={16} className="rotate-90" />
          {formatDate(new Date(tx.final_deadline * 1000), "MMM dd, yyyy")}
        </div>
      </div>
      <div className="w-full space-y-6 mt-6">
        <div className="w-full flex items-center justify-between ">
          <Typography className="font-bold ">Featured Milestones</Typography>
          {/* should navigate to transactions route when it is created in tanstack */}
          <Button
            // ontap opens milestone in sheet
            className="p-0 underline text-sm font-medium"
            variant="ghost"
          >
            See all
          </Button>
        </div>
        <div className="space-y-4">
          {tx.milestones.map((milestone, index) => (
            <div key={index} className="w-full flex items-start gap-x-2">
              <div
                className={cn(
                  "size-12 flex items-center justify-center bg-em-tertiary/50 rounded-full",
                  {
                    "bg-em-green/50": milestone.status === Status.paid,
                  }
                )}
              >
                {milestone.status === Status.paid ? (
                  <CheckmarkBadge01Icon className={cn("size-7")} />
                ) : (
                  <Clock04Icon className={cn("size-7")} />
                )}
              </div>
              <div className="flex flex-col gap-y-0.5 w-[65%] items-start ">
                <Typography className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                  {milestone.title}
                </Typography>
                <Typography className="font-medium text-em-text text-xs">
                  {formatDate(
                    new Date(milestone.deadline * 1000),
                    "MMM dd, yyyy"
                  )}
                </Typography>
              </div>
              <div className="w-fit flex flex-col gap-y-0.5 items-end ml-auto">
                <Typography className="font-bold whitespace-nowrap">
                  {milestone.amount} ETH
                </Typography>
                <Typography className="font-medium text-em-text text-xs">
                  {milestone.status === Status.paid ? "Completed" : "Ongoing"}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
