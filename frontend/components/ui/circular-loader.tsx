import { px } from "@/lib/helpers";
import { cn } from "@/components/cn";
import { CSSProperties } from "react";

type Props = Omit<React.JSX.IntrinsicElements["div"], "color"> & {
  color?: CSSProperties["color"];
  size?: number;
};

const CircularLoader = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          " border-2 border-white rounded-full animate-spin ease-[ease] duration-700",
          props.className
        )}
        style={{
          borderLeftColor: props.color || "#e91e63",
          borderRightColor: props.color || "#e91e63",
          borderBottomColor: props.color || "#e91e63",
          borderTopColor: "transparent",
          width: px(props.size || 24),
          height: px(props.size || 24),
        }}
      ></div>
    </div>
  );
};

export default CircularLoader;
