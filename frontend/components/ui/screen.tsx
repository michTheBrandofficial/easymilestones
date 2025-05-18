"use client";
import React, { useEffect, useState } from "react";
import { cn } from "../cn";
import { HTMLMotionProps, motion } from "motion/react";

/**
 * Screen component - A container for page content with consistent styling
 *
 * @component
 * @param {React.HTMLAttributes<HTMLElement>} props - Standard HTML attributes
 * @param {React.ReactNode} props.children - Child elements to render inside the screen
 * @param {string} [props.className] - Additional CSS classes to apply (merged with defaults)
 *
 * @returns {JSX.Element} A styled section element with the provided children
 *
 * @example
 * // Basic usage
 * <PageScreen>
 *   <h1>Page Content</h1>
 * </PageScre>
 *
 * @example
 * // With additional classes
 * <PageScreen className="pb-10 px-4">
 *   <h1>Custom Padded Content</h1>
 * </PageScreeen>
 */
const PageScreen = (
  { skipInitialAnimation, ...props }: HTMLMotionProps<"section"> & { skipInitialAnimation?: boolean }
): JSX.Element => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // After component mounts, it's no longer the first render
    setIsFirstRender(false);
  }, []);

  // Skip animation on first render if skipInitialAnimation is true or not specified
  const shouldSkipAnimation =
    skipInitialAnimation !== false && isFirstRender;
  return (
    <motion.section
      {...props}
      initial={
        shouldSkipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 300 }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -300 }}
      transition={{ duration: 1 }}
      className={cn(
        "font-Satoshi w-full h-full bg-em-primary pt-[48px]",
        props.className
      )}
    >
      {props.children}
    </motion.section>
  );
};

export default PageScreen;
