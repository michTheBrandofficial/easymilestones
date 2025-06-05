import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import { MilestoneCreationSVGs } from "./-components/milestone-creation-svgs";
import { Calendar04Icon, MoneyExchange03Icon } from "hugeicons-react";
import AddCircle from "@/components/icons/add-circle";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageScreen from "@/components/ui/screen";
import { noop } from "@/lib/utils";
import WaterBodySVG from "../-components/water-body-svg";

export const Route = createFileRoute("/create-transaction/")({
  component: CreateTransaction,
});

function CreateTransaction() {
  // add modals variable here for controlling sheet
  const navigate = useNavigate();
  return (
    <PageScreen className="flex flex-col gap-y-4 w-full h-full pb-8 ">
      <div className="flex flex-col gap-y-3">
        <Typography
          variant={"h1"}
          className="!text-[40px] flex items-center gap-x-5 "
        >
          Create a TX{" "}
          <MoneyExchange03Icon
            size={40}
            strokeWidth={2.3}
            className="text-em-tertiary "
          />
        </Typography>
        <Typography variant={"p"} className="text-em-text pl-1 font-medium  ">
          Break down your transaction into milestones for secure, step-by-step
          payments.
        </Typography>
      </div>
      <div className="w-full grid grid-cols-[20%_80%] gap-x-4 relative z-20">
        <div className="flex flex-col">
          {/* first milestone */}
          <svg
            width="36"
            height="140"
            viewBox="0 0 36 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1172 1.37761C74.1233 55.8487 -28.5613 68.9746 10.0605 136.11"
              stroke="#4CABEF"
              stroke-width="2.3949"
            />
            <circle
              cx="15.5556"
              cy="146.852"
              r="5.32201"
              transform="rotate(92.1494 15.5556 146.852)"
              fill="#4CABEF"
            />
            <circle
              cx="15.5556"
              cy="146.852"
              r="13.3009"
              transform="rotate(92.1494 15.5556 146.852)"
              stroke="#4CABEF"
              stroke-width="1.78225"
            />
          </svg>
          {/* second milestone */}
          <svg
            width="36"
            height="140"
            viewBox="0 0 36 163"
            fill="none"
            className="-mt-1 ml-1 "
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
              stroke="#4CABEF"
              stroke-width="2.3949"
            />
            <circle
              cx="14.77"
              cy="148.268"
              r="5.32201"
              transform="rotate(92.1494 14.77 148.268)"
              fill="#4CABEF"
            />
            <circle
              cx="14.7699"
              cy="148.268"
              r="13.3009"
              transform="rotate(92.1494 14.7699 148.268)"
              stroke="#4CABEF"
              stroke-width="1.78225"
            />
          </svg>
        </div>
      </div>
      <WaterBodySVG />
      <div className="w-full flex relative z-20 items-center gap-x-2 mt-auto">
        <Button
          onTap={() => navigate({ to: "/transactions" })}
          variant="ghost"
          className="w-full "
        >
          Cancel
        </Button>
        <Button onTap={noop} className="w-full ">
          Continue
        </Button>
      </div>
    </PageScreen>
  );
}

const Milestone = () => {
  return (
    <div className="w-full flex items-end pl-3 ">
      <MilestoneCreationSVGs.Branch />
      {/* icons */}
      <div className="flex gap-x-2">
        <Button>
          <Calendar04Icon />
        </Button>
        <Button>
          <AddCircle fill="#FF6467" className="rotate-45 w-6 h-6" />
        </Button>
        <Button>
          <AddCircle fill="#00D492" className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CreateTransaction;
