import { cn } from "@/components/cn";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "../buttons";
import { isNegative, last } from "@/lib/helpers";

type Props = {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  className?: string;
};

/**
 * @dev this function reverses the array of 12 years;
 * @example
 * ```jsx
 * const years = getYearRange(2024); // [2013, 2014, 2015, 2016, ...];
 * ```
 */
const getStepsRange = (count: number, step: number, maxVisibleSteps = 3) => {
  const stepsRange = [] as number[];
  if (step > count) throw new Error("Step is great than count");
  // work for if step === count
  if (step === count) {
    const backwardIterationCount = isNegative(step - maxVisibleSteps)
      ? // e.g 3 + (2 - 3) = 2 (we should loop backwards 2 times)
        maxVisibleSteps + (step - maxVisibleSteps)
      : maxVisibleSteps;
    // e.g 20 - i for how many times we will iterate backwards -> (20 - (0, then 1, then 2))
    Array.from({ length: backwardIterationCount }).forEach((_, i) => {
      stepsRange.unshift(step - i);
    });
  } else if (step < count) {
    // if the step is the end of max visible steps, we insert at front of array and find the backwards steps
    const isStepEndOfMaxVisibleSteps = step % maxVisibleSteps === 0;
    const isStepBeginningOfMaxVisibleSteps = step % maxVisibleSteps === 1;
    if (isStepEndOfMaxVisibleSteps) {
      Array.from({ length: maxVisibleSteps }).forEach((_, i) => {
        stepsRange.unshift(step - i);
      });
    } else if (isStepBeginningOfMaxVisibleSteps) {
      Array.from({ length: maxVisibleSteps }).forEach((_, i) => {
        stepsRange.push(step + i);
      });
    } else {
      // add the step
      stepsRange.unshift(step);
      // maxVisibleSteps - 1 because we have already put on element in the array at the line before
      Array.from({ length: maxVisibleSteps - 1 }).forEach((_, index) => {
        const one_based_index = index + 1;
        // fill back of array
        // we havent filled in the end of visible steps;
        if (
          last(stepsRange) % maxVisibleSteps === 0 ||
          last(stepsRange) === count
        )
          stepsRange.unshift(step - index);
        else {
          stepsRange.push(step + one_based_index);
          // we can start filling in front of array.
        }
      });
    }
  }
  return stepsRange;
};

const Pagination: React.FC<Props> = ({
  totalPages,
  page,
  onPageChange,
  className,
  ...props
}) => {
  // if count or page we are on is 0, no steps should be shown
  const steps = useMemo(
    () =>
      [totalPages, page].includes(0) ? [] : getStepsRange(totalPages, page),
    [page]
  );
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };
  return (
    <div
      className={cn("w-fit flex items-center gap-x-1", className)}
      {...props}
    >
      <Button
        onTap={() => {
          if (page === 1) return;
          else handlePageChange(page - 1);
        }}
        variant="ghost"
        className="flex items-center gap-x-0.5 text-black hover:!bg-black/10 hover:backdrop-blur-3xl transition-colors text-sm"
      >
        <ChevronLeft size={innerWidth > 480 ? 15 : 20} className="" />
        {innerWidth > 480 && "Previous"}
      </Button>
      <div className="w-fit flex items-center gap-x-1">
        {steps.map((step) => (
          <Button
            key={step}
            onTap={() => {
              handlePageChange(step);
            }}
            variant="ghost"
            className={cn(
              "px-0 w-10 flex items-center justify-center py-2 hover:!bg-black/10 hover:backdrop-blur-3xl transition-colors text-sm text-black",
              {
                "!bg-black/10 !backdrop-blur-3xl": page === step,
              }
            )}
          >
            {step}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="px-0 w-10 flex items-center justify-center py-2 hover:!bg-black/10 hover:backdrop-blur-3xl transition-colors text-black"
        >
          <Ellipsis className="text-black" size={20} />
        </Button>
      </div>
      {totalPages !== page && (
        <Button
          onTap={() => {
            handlePageChange(page + 1);
          }}
          variant="ghost"
          className="flex items-center gap-x-0.5 text-black hover:!bg-black/10 hover:backdrop-blur-3xl transition-colors text-sm"
        >
          {innerWidth > 480 && "Next"}
          <ChevronRight size={innerWidth > 480 ? 15 : 20} className="" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
