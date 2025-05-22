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
  { ...props }: React.HTMLAttributes<HTMLElement>
): React.JSX.Element => {
  return (
    <section
      {...props}
      className={cn(
        "font-Satoshi w-full h-full bg-em-primary pt-8",
        props.className
      )}
    >
      {props.children}
    </section>
  );
};

export default PageScreen;
