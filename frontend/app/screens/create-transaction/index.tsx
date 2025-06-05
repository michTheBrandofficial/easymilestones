import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import { AddCircleIcon, Calendar03Icon, MoneyExchange03Icon } from "hugeicons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageScreen from "@/components/ui/screen";
import { noop } from "@/lib/utils";
import WaterBodySVG from "../-components/water-body-svg";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/create-transaction/")({
  component: CreateTransaction,
});

const screenMessage = {
  1: 'Create a Transaction Title',
  2: 'Break down your transaction into milestones for secure, step-by-step payments.',
}

function CreateTransaction() {
  // add modals variable here for controlling sheet
  const navigate = useNavigate();
  const milestones = [1, 2, 3];
  const milestoneContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {

  }, [milestones])
  return (
    <PageScreen className="flex flex-col gap-y-4 w-full flex-grow pb-8">
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
      <div className="w-full flex-grow max-h-[40vh] relative z-40 overflow-y-auto no-scrollbar">
        <div className="h-full grid grid-cols-[20%_80%] gap-x-0  overflow-y-auto no-scrollbar">
          <div className="flex flex-col ">
            {milestones.map((_, index) => {
              const sanePeoplesIndex = index + 1;
              {
                /* first milestone */
              }
              if (sanePeoplesIndex === 1)
                return (
                  <svg
                    width="36"
                    height="140"
                    viewBox="0 0 36 163"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
                      stroke="#4CABEF"
                      stroke-width="2.3949"
                    />
                    <circle
                      cx="5.32201"
                      cy="5.32201"
                      r="5.32201"
                      transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
                      fill="#4CABEF"
                    />
                    <circle
                      cx="14.192"
                      cy="14.192"
                      r="13.3009"
                      transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
                      stroke="#4CABEF"
                      stroke-width="1.78225"
                    />
                  </svg>
                );
              if (sanePeoplesIndex === 2)
                return (
                  <svg
                    width="36"
                    height="140"
                    viewBox="0 0 36 163"
                    fill="none"
                    className="-mt-1 ml-2 "
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
                );
              switch (sanePeoplesIndex % 2) {
                case 1:
                  return (
                    <svg
                      width="36"
                      height="140"
                      viewBox="0 0 36 163"
                      fill="none"
                      className="-mt-[3px] "
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
                        stroke="#4CABEF"
                        stroke-width="2.3949"
                      />
                      <circle
                        cx="5.32201"
                        cy="5.32201"
                        r="5.32201"
                        transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
                        fill="#4CABEF"
                      />
                      <circle
                        cx="14.192"
                        cy="14.192"
                        r="13.3009"
                        transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
                        stroke="#4CABEF"
                        stroke-width="1.78225"
                      />
                    </svg>
                  );
                case 0:
                  return (
                    <svg
                      width="36"
                      height="140"
                      viewBox="0 0 36 163"
                      fill="none"
                      className="-mt-[3px] ml-2 "
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
                  );
              }
            })}
          </div>
          <div className="flex flex-col ">
            {milestones.map((_, index) => (
              <Milestone key={index} />
            ))}
          </div>
        </div>
      </div>
      <WaterBodySVG />
      <div ref={milestoneContainerRef} className="w-screen px-4 fixed z-30 bottom-8 left-0 flex items-center gap-x-2">
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
    <div className="w-full flex flex-col gap-y-3 justify-end h-[140px] -mt-1 first:mt-0 ">
      <div className="w-full rounded-2xl pl-4 pr-3 py-2.5 bg-gray-400/20 backdrop-blur-[12px] flex items-center">
        <input className="w-full font-Bricolage_Grotesque font-semibold text-xl bg-transparent text-em-dark focus:outline-none" placeholder="0.1" />
        <p className="font-semibold text-em-text" >ETH</p>
      </div>
      {/* milestone title */}
      {/* icons */}
      {/* show date in formatted here, else red 😡 no date */}
      {/* message must vibrate with haptic feedback */}
      <div className="flex gap-x-4 h-fit">
        <Button variant="icon" className="px-0 h-fit bg-transparent !py-0" >
          <Calendar03Icon size={26} className="text-em-dark" />
        </Button>
        <Button variant="icon" className="px-0 h-fit bg-transparent !py-0" >
          <AddCircleIcon size={26} className="text-em-dark rotate-45" />
        </Button>
        {/* save button will show before this plus shows */}
        <Button variant="icon" className="px-0 h-fit bg-transparent !py-0" >
          <AddCircleIcon size={26} className="text-em-dark" />
        </Button>
      </div>
    </div>
  );
};

export default CreateTransaction;
