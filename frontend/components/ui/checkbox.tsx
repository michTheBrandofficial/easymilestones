import React from "react";
import { Typography } from "../typography";
import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "framer-motion";

interface CheckBoxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, ...rest }) => {
  return (
    <div className="flex items-center gap-2 ">
      {rest.label && (
        <Typography variant={"p"} className="!text-sm -mt-1">
          {rest.label}
        </Typography>
      )}
      <label
        className={cn("relative inline-flex items-center cursor-pointer", {
          "opacity-50": rest.disabled,
        })}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={rest.disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer focus:outline-none active:outline-none"
        />
        <div className="w-5 h-5 bg-white border-[2px] border-gray-100 peer-focus:outline-none peer-active:outline-none rounded-full peer-checked:bg-primary-500 transition-all duration-75 peer-checked:border-primary-500 flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <AnimatePresence>
              {checked && (
                <motion.path
                  transition={{
                    delay: 0.1, // 100ms
                  }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  exit={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  d="M20 6 9 17l-5-5"
                ></motion.path>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
