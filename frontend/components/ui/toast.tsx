"use client";
import { Button } from "../buttons";
import { AnimatePresence, motion } from "motion/react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ToastContext,
  ToastContextProps,
  ToastOptions,
  ToastType,
} from "./toast-context";

const toastStyles = {
  // success: "bg-green-100/70",
  // error: "bg-red-100/70",
  info: "bg-em-dark",
};

const buttonStyles = {
  // success: "!bg-green-600 hover:!bg-green-700",
  // error: "!bg-red-600 hover:!bg-red-700",
  info: "!bg-em-secondary/25 !text-em-tertiary",
};

const textStyles = {
  // success: "text-green-900",
  // error: "text-red-900",
  info: "text-white",
};

type ToastMessageProps = {
  toast: {
    type: ToastType;
    message: string;
    options?: ToastOptions;
  };
  index: number;
  messages: Array<{
    type: ToastType;
    message: string;
    options?: ToastOptions;
  }>;
  setMessages: React.Dispatch<
    React.SetStateAction<ToastMessageProps["messages"]>
  >;
};

const ToastMessage = ({
  toast,
  index,
  messages,
  setMessages,
}: ToastMessageProps) => {
  const trueIndex = index + 1;
  const msgLength = messages.length;
  return (
    <AnimatePresence>
      <motion.div
        key={index}
        variants={{
          hidden: {
            scale: 0.4,
            opacity: 0.4,
            y: 100,
          },
          almost_hidden: {
            y: -15 * (msgLength - trueIndex),
            scale: 1 - (msgLength - trueIndex) / 10,
          },
          shown: {
            scale: [0.4, 0.8, 1],
            opacity: [0, 0.8, 1],
            y: [100, 10, 0],
          },
          exit: {
            scale: [1, 0.5, 0.4],
            opacity: [1, 0.2, 0],
            y: [0, 90, 100],
          },
        }}
        initial={trueIndex === msgLength ? "hidden" : "shown"}
        animate={trueIndex < msgLength ? "almost_hidden" : "shown"}
        exit={"exit"}
        transition={{
          type: "keyframes",
          times: [0, 0.8, 1],
        }}
        className="origin-center select-none cursor-pointer fixed z-50 bottom-12 mx-auto w-full flex justify-center"
      >
        <div
          className={`flex items-center gap-x-3 w-fit bg-em-dark backdrop-blur-3xl rounded-full pl-6 pr-2 py-2 ${
            toastStyles[toast.type]
          }`}
        >
          <span
            className={`font-medium text-xs line-clamp-1 ${
              textStyles[toast.type]
            }`}
          >
            {toast.message}
          </span>
          <Button
            onTap={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const shouldRemove = (
                toast.options?.action?.onClick || (() => true)
              )?.();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              shouldRemove &&
                setMessages((prev) => prev.filter((msg) => msg !== toast));
            }}
            className={`!px-4 !text-xs !py-1.5
            } !rounded-full text-sm font-medium  ${buttonStyles[toast.type]}`}
          >
            <span className="mt-0.5 inline-block">
              {toast.options?.action?.title || "Close"}
            </span>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<
    Array<{
      type: ToastType;
      message: string;
      options?: ToastOptions;
    }>
  >([]);
  const showToast: ToastContextProps["showToast"] = (
    type,
    message,
    options
  ) => {
    const timerId = setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages].slice(1));
    }, options?.duration || 5000);
    if (messages.length === 3) {
      flushSync(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type,
            message,
            options: {
              ...options,
              action: {
                ...options?.action,
                onClick: () => {
                  // clear the timer so we can internally remove the toast
                  clearTimeout(timerId);
                  // toast will only be removed it this function returns true
                  const onClick = options?.action?.onClick;
                  return onClick ? onClick() : true;
                },
              },
            },
          },
        ]);
      });
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages.slice(1)]);
      }, 5000);
    } else
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type,
          message,
          options: {
            ...options,
            action: {
              ...options?.action,
              onClick: () => {
                // clear the timer so we can internally remove the toast
                clearTimeout(timerId);
                // toast will only be removed it this function returns true
                const onClick = options?.action?.onClick;
                return onClick ? onClick() : true;
              },
            },
          },
        },
      ]);
    playNotificationSound()
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Initialize audio on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/ui-negative-answer-om-fx-1-00-03.mp3');
    }
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Function to play the notification sound
  const playNotificationSound = () => {
    if (audioRef.current) {
      // Reset to beginning if already played
      audioRef.current.currentTime = 0;
      // Play with error handling
      audioRef.current.play().catch(err => {
        console.error('Failed to play notification sound:', err);
      });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {messages.map((toast, index) => {
        return (
          <ToastMessage
            setMessages={setMessages}
            key={index}
            toast={toast}
            index={index}
            messages={messages}
          />
        );
      })}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
