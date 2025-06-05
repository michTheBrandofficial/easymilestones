import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import { MilestoneCreationSVGs } from "./-components/milestone-creation-svgs";
import { Calendar04Icon } from "hugeicons-react";
import AddCircle from "@/components/icons/add-circle";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageScreen from "@/components/ui/screen";
import { noop } from "@/lib/utils";

export const Route = createFileRoute("/create-transaction/")({
  component: CreateTransaction,
});

function CreateTransaction() {
  // add modals variable here for controlling sheet
  const navigate = useNavigate()
  return (
    <PageScreen className="flex flex-col gap-y-4 w-full h-full pb-8 ">
      <Typography variant={"h1"} className="!text-[40px]  ">
        Steps to spending better
      </Typography>
      <div className="w-full flex flex-col gap-y-0">
        <Milestone />
      </div>
      <div className="w-full flex items-center gap-x-2 mt-auto">
        <Button onTap={() => navigate({ to: "/transactions" })} variant="ghost" className="w-full ">
          Cancel
        </Button>
        <Button onTap={noop} className="w-full ">Continue</Button>
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
