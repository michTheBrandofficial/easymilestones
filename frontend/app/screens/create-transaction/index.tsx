import { Button } from "@/components/buttons";
import { Typography } from "@/components/typography";
import { MoneyExchange03Icon } from "hugeicons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageScreen from "@/components/ui/screen";
import { inlineSwitch, wait } from "@/lib/utils";
import WaterBodySVG from "../-components/water-body-svg";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  MilestoneBuilderError,
  TransactionPayload,
  useMilestoneBuilder,
} from "@/lib/milestone_builder";
import { useToast } from "@/components/ui/toast-context";
import { useSheet } from "@/components/ui/sheet";
import Milestone from "./-components/milestone";
import ConfirmationSheetBody from "./-components/confirmation-sheet-body";

export const Route = createFileRoute("/create-transaction/")({
  component: CreateTransaction,
});

const screenMessage = {
  1: "Create a Transaction Title",
  2: "Break down your transaction into milestones for secure, step-by-step payments.",
};

function CreateTransaction() {
  // add modals variable here for controlling sheet
  const navigate = useNavigate();
  const MAX_STEP = 2;
  const [step, setStep] = useState<Helpers.Steps<typeof MAX_STEP>>(1);
  const milestoneContainerRef = useRef<HTMLDivElement>(null);
  const txTitleRef = useRef<HTMLInputElement>(null);
  const milestoneBuilder = useMilestoneBuilder();
  const [tx_payload, setTx_Payload] = useState<TransactionPayload | null>(null);
  const ConfirmationSheet = useSheet("transaction-confirmation", {
    onClose(close) {
      setTx_Payload(null);
      close();
    },
  });
  const [txTitle, setTxTitle] = useState("");
  const showToast = useToast();
  function focusOnTxTitle() {
    if (step === 1) txTitleRef.current?.focus();
  }
  function focusOnLastMilestone() {
    if (step === 2) {
      const lastMilestone =
        milestoneContainerRef.current?.querySelector<HTMLDivElement>(
          `[data-milestone='${milestoneBuilder.milestones.length - 1}']`
        );
      if (lastMilestone) {
        lastMilestone.scrollIntoView({ behavior: "smooth", block: "end" });
        const input = lastMilestone.querySelector<HTMLInputElement>(
          "input[name='title']"
        );
        if (input) input.focus();
      }
    }
  }
  async function handleNext() {
    if (step === MAX_STEP) {
      try {
        const tx_payload = milestoneBuilder.build();
        setTx_Payload(tx_payload);
        ConfirmationSheet.openSheet();
      } catch (error) {
        showToast("info", (error as MilestoneBuilderError).message);
      }
    } else if (step === 1) {
      if (txTitle === "") return;
      milestoneBuilder.setTxTitle(txTitle);
      // add a new milestone here
      if (milestoneBuilder.milestones.length === 0)
        milestoneBuilder.addEmptyMilestone(0);
      setStep((p) => (p + 1) as 2);
    } else setStep((p) => (p + 1) as 2);
  }

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
        <Typography
          variant={"p"}
          className="text-em-text pl-1 min-h-[48px] font-medium  "
        >
          <AnimatePresence mode="wait">
            {inlineSwitch(
              step,
              [
                1,
                <motion.span
                  key={"1"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {screenMessage[step]}
                </motion.span>,
              ],
              [
                2,
                <motion.span
                  key={"2"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {screenMessage[step]}
                </motion.span>,
              ]
            )}
          </AnimatePresence>
        </Typography>
      </div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key={"tx_title"}
            onSubmit={(e) => {
              e.preventDefault();
              if (txTitle === "") return;
              handleNext();
            }}
            variants={{
              hidden: { opacity: 0, y: -40 },
              visible: { opacity: 1, y: 0 },
            }}
            initial={"hidden"}
            animate={"visible"}
            exit={{ opacity: 0, y: -40, transition: { delay: -0.3 } }}
            onAnimationComplete={(definition) => {
              if (definition === "visible") focusOnTxTitle();
            }}
            className="w-full rounded-2xl pl-4 pr-3 py-2.5 bg-gray-400/20 backdrop-blur-[12px] flex items-center"
          >
            <input
              ref={txTitleRef}
              value={txTitle}
              onChange={(e) => setTxTitle(e.target.value)}
              className="w-full font-Bricolage_Grotesque font-medium text-xl bg-transparent text-em-dark focus:outline-none"
              placeholder="Transaction title"
            />
            <button
              type="submit"
              className="hidden cursor-not-allowed pointer-events-none"
            ></button>
          </motion.form>
        )}
        {step === 2 && (
          <motion.div
            key={"tx_milestones"}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            initial={"hidden"}
            animate={"visible"}
            exit={{ opacity: 0, y: 40, transition: { delay: -0.3 } }}
            className="w-full flex-grow max-h-[40vh] relative z-40 overflow-y-auto no-scrollbar"
            onAnimationComplete={(definition) => {
              if (definition === "visible") focusOnLastMilestone();
            }}
          >
            <div
              ref={milestoneContainerRef}
              className="h-full grid grid-cols-[20%_80%] gap-x-0 overflow-y-auto no-scrollbar"
            >
              <div className="flex flex-col ">
                {milestoneBuilder.milestones.map((_, index) => {
                  const sanePeoplesIndex = index + 1;
                  {
                    /* first milestone */
                  }
                  if (sanePeoplesIndex === 1)
                    return (
                      <svg
                        key={index}
                        height="220"
                        viewBox="0 0 36 163"
                        fill="none"
                        className="w-fit"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
                          stroke="#4CABEF"
                          strokeWidth="2.3949"
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
                          strokeWidth="1.78225"
                        />
                      </svg>
                    );
                  if (sanePeoplesIndex === 2)
                    return (
                      <svg
                        key={index}
                        height="220"
                        viewBox="0 0 36 163"
                        fill="none"
                        className="-mt-1 ml-2 w-fit "
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
                          stroke="#4CABEF"
                          strokeWidth="2.3949"
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
                          strokeWidth="1.78225"
                        />
                      </svg>
                    );
                  switch (sanePeoplesIndex % 2) {
                    case 1:
                      return (
                        <svg
                          key={index}
                          height="220"
                          viewBox="0 0 36 163"
                          fill="none"
                          className="-mt-[3px] w-fit "
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
                            stroke="#4CABEF"
                            strokeWidth="2.3949"
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
                            strokeWidth="1.78225"
                          />
                        </svg>
                      );
                    case 0:
                      return (
                        <svg
                          key={index}
                          height="220"
                          viewBox="0 0 36 163"
                          fill="none"
                          className="-mt-[3px] ml-2 w-fit "
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
                            stroke="#4CABEF"
                            strokeWidth="2.3949"
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
                            strokeWidth="1.78225"
                          />
                        </svg>
                      );
                  }
                })}
              </div>
              <div className="flex flex-col relative ">
                {milestoneBuilder.milestones.map((milestone, index) => (
                  <Milestone
                    index={index}
                    key={index}
                    milestone={milestone}
                    onUpdate={async (payload) => {
                      return new Promise<boolean>((resolve, reject) => {
                        const { success: didMilestoneUpdate } =
                          milestoneBuilder.updateMilestone(index, payload);
                        if (didMilestoneUpdate) resolve(didMilestoneUpdate);
                        else reject(didMilestoneUpdate);
                      });
                    }}
                    onAdd={async () => {
                      milestoneBuilder.addEmptyMilestone(index);
                      // wait sometime before executing
                      await wait(200);
                      const nextMilestone =
                        milestoneContainerRef.current?.querySelector<HTMLDivElement>(
                          `[data-milestone='${index + 1}']`
                        );
                      if (nextMilestone) {
                        milestoneContainerRef.current?.scroll({
                          top:
                            nextMilestone.offsetTop +
                            nextMilestone.getBoundingClientRect().height -
                            milestoneContainerRef.current.getBoundingClientRect()
                              .height,
                          behavior: "smooth",
                        });
                        await wait(500);
                        const input =
                          nextMilestone.querySelector<HTMLInputElement>(
                            "input[name='title']"
                          );
                        if (input) input.focus();
                      }
                    }}
                    onRemove={() => {
                      if (milestoneBuilder.milestones.length === 1)
                        return showToast(
                          "info",
                          "At least one milestone must be provided"
                        );
                      milestoneBuilder.removeMilestone(index);
                      showToast("info", "Milestone removed");
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <WaterBodySVG />
      <div className="w-screen px-4 fixed z-30 bottom-8 left-0 flex items-center gap-x-2">
        <Button
          onTap={() => {
            if (step === 1) navigate({ to: "/transactions" });
            else setStep((p) => (p - 1) as 1);
          }}
          variant="ghost"
          className="w-full "
        >
          {/* translate animation with span here */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.span
                key={"cancel"}
                className="inline-block"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0, transition: { delay: -0.3 } }}
              >
                Cancel
              </motion.span>
            ) : (
              <motion.span
                key={"back"}
                className="inline-block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0, transition: { delay: -0.3 } }}
              >
                Back
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button
          disabled={step === 1 && txTitle === ""}
          onTap={handleNext}
          className="w-full "
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.span
                key={"next"}
                className="inline-block"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0, transition: { delay: -0.3 } }}
              >
                Next
              </motion.span>
            ) : (
              <motion.span
                key={"continue"}
                className="inline-block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0, transition: { delay: -0.3 } }}
              >
                Continue
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
      {tx_payload && (
        <ConfirmationSheet.Sheet
          title="Confirm Transaction"
          backButton={"Back"}
        >
          <ConfirmationSheet.SheetContent className="flex flex-col px-0">
            <ConfirmationSheetBody
              tx_payload={tx_payload}
              close={() => ConfirmationSheet.closeSheet()}
              onTransactionCreatedSuccessClose={() => {
                ConfirmationSheet.closeSheet();
                milestoneBuilder.clear();
                setTxTitle("");
                focusOnTxTitle();
                setStep(1);
              }}
            />
          </ConfirmationSheet.SheetContent>
        </ConfirmationSheet.Sheet>
      )}
    </PageScreen>
  );
}

export default CreateTransaction;
