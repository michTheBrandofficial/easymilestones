import { Typography } from "@/components/typography";
import PageScreen from "@/components/ui/screen";
import { createFileRoute } from "@tanstack/react-router";
import {
  Clock01Icon,
  Clock02Icon,
  Clock03Icon,
  Clock04Icon,
} from "hugeicons-react";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <PageScreen className="flex flex-col gap-y-5">
      <Typography variant="h1">GM, Mich</Typography>
      <div className="w-full">
        <div className="w-full rounded-t-3xl rounded-br-3xl bg-em-tertiary py-4 px-5 flex justify-between items-start">
          <div className="space-y-0">
            <Typography variant={"h3"}>5.5 ETH</Typography>
            <Typography className="text-white text-sm">
              Remaining Balance
            </Typography>
          </div>
          <div className="w-fit h-fit -mt-0.5">
            <Clock04Icon className="size-20" />
          </div>
        </div>
        <div className="w-full grid grid-cols-[45%_55%] bg-em-tertiary rounded-b-3xl">
          <div className="bg-em-primary">
            <div className="w-full h-full rounded-b-3xl bg-em-tertiary py-4 px-5 flex justify-between items-start ">
            <div className="space-y-0">
              <Typography variant={"h3"}>5.5 ETH</Typography>
              <Typography className="text-white text-sm">
                Total Invested
              </Typography>
            </div>
          </div>
          </div>
          <div className="pl-2 pt-2 bg-em-primary rounded-tl-3xl ">
            <div className="w-full rounded-3xl bg-em-green py-4 px-5 flex justify-between items-start">
              <div className="space-y-0">
                <Typography variant={"h3"}>3.0 ETH</Typography>
                <Typography className="text-white text-sm">
                  Total Disbursed
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageScreen>
  );
}
