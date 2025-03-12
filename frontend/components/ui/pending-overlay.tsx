import { cn } from "@/components/cn";
import CircularLoader from "./circular-loader";

type Props = {
  isPending: boolean;
  /**
   * @dev the className can be used for backdrop blurs
   */
  className?: string;
};

const PendingOverlay = (props: Props) => {
  return !props.isPending ? null : (
    <section
      className={cn(
        "fixed -top-2 left-0 w-screen h-screen flex items-center justify-center opacity-0 -z-[400]",
        props.className || "",
        {
          "z-[1000000000] opacity-100": props.isPending,
        }
      )}
    >
      <CircularLoader />
    </section>
  );
};

export default PendingOverlay;
