import React from "react";
import { Typography } from "../typography";
import { cn } from "@/lib/shadcn-utils";

interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, ...rest }) => {
  return (
    <div className="flex items-center gap-2 ">
      {rest.label && (
        <Typography variant={"p"} className="!text-sm -mt-1">
          {rest.label}
        </Typography>
      )}
      <label className={
        cn(
          "relative inline-flex items-center cursor-pointer",
          { "opacity-50": rest.disabled }

        )
      }>
        <input
          type="checkbox"
          checked={checked}
          disabled={rest.disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer focus:outline-none active:outline-none"
        />
        <div className="w-12 h-[26px] bg-zinc-100 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-em-tertiary after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:shadow-md after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all after:duration-300 after:ease-in-out peer-checked:after:translate-x-full peer-checked:after:border-white "></div>
      </label>
    </div>
  );
};

export default Toggle;