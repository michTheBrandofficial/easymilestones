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
      <div className="w-full flex relative z-20">
        <Milestone />
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
