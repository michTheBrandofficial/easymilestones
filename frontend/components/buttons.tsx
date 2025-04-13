import { cn } from "./cn";
import { HTMLMotionProps, motion } from "motion/react";
import React, { PropsWithChildren } from "react";

type Variants = "full" | "outline" | "icon" | "ghost";

type ButtonProps = Omit<
  PropsWithChildren<HTMLMotionProps<"button">>,
  "onClick"
> & {
  variant?: Variants;
};

/**
 * @animated with motion.button
 * @note use onTap instead of onClick
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "full",
  className,
  onTap,
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: props.disabled ? 1 : 0.9 }}
      whileHover={{ scale: props.disabled ? 1 : 1.05 }}
      {...props}
      onTap={
        onTap
          ? (e, info) => {
              if (props.disabled) return;
              else onTap(e, info);
            }
          : undefined
      }
      className={cn(
        `font-semibold cursor-pointer rounded-xl `,
        { "bg-em-sky-blue text-white": variant === "full" },
        { "px-6 py-2": variant !== "icon" },
        {
          "border-2 border-em-sky-blue text-em-sky-blue/70 ":
            variant === "outline",
        },
        { "text-em-sky-blue": variant === "ghost" },
        { "bg-em-sky-blue text-white px-2 py-2": variant === "icon" },
        { "cursor-not-allowed opacity-50": props.disabled },
        className
      )}
    >
      {children}
    </motion.button>
  );
};
