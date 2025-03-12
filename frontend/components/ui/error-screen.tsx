import { cn } from "@/components/cn";
import Lottie from "lottie-react";
import React from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import Signin from "@/assets/lottie-animations/signin.json";

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?:
    | (() => void)
    | {
        title: string;
        action: () => void;
      };
  className?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = "Oops! Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4",
        className
      )}
    >
      <div className="text-center max-w-md">
        <div className="">
          <Lottie
            animationData={Signin}
            loop={true}
            className=" aspect-video "
          />
        </div>
        <Typography
          variant={"h2"}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          {title}
        </Typography>

        <Typography className="text-gray-600 mb-8">{message}</Typography>

        {onRetry && (
          <Button
            onTap={typeof onRetry === "function" ? onRetry : onRetry.action}
            className="inline-flex items-center shadow-sm  "
          >
            {!(typeof onRetry === "function") ? onRetry.title : "Try Again"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
