import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "motion/react";
import React, { createContext, useContext, useMemo } from "react";
import { Button } from "../buttons";
import {
  Cancel01Icon
} from "hugeicons-react";
import { Typography } from "../typography";
import { ChevronLeft } from "@gravity-ui/icons";

type SheetContextType = {
  open: boolean;
  onClose: VoidFunction;
  title: string;
  backTitle?: "Back" | (string & {});
  action?: {
    title: string;
    do: VoidFunction;
  };
};

type SheetUnderlayProps = Pick<Props, "children" | "className"> &
  SheetContextType;

const SheetContext = createContext<SheetContextType | null>(null);

const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};

const SheetUnderlay = ({
  children,
  className,
  ...props
}: SheetUnderlayProps) => {
  const isOpen = useMemo(() => {
    return Boolean(props.open);
  }, [props.open]);
  return (
    <SheetContext.Provider
      value={{
        ...props,
        backTitle: props.backTitle ?? "Back",
      }}
    >
      <AnimatePresence>
        {isOpen ? (
          <section
            className={cn(
              "bg-black/20 backdrop-blur-[3px]",
              className,
              " w-screen h-screen fixed z-[10000000] top-0 left-0 flex items-center justify-center"
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) props.onClose();
            }}
          >
            {children}
          </section>
        ) : (
          ""
        )}
      </AnimatePresence>
    </SheetContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const SheetBody: React.FC<Omit<Props, "className">> = ({ children }) => {
  const { backTitle, onClose, title, action } = useSheet();
  return (
    <section className={cn("w-screen h-screen relative ")}>
      <motion.section
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          type: "keyframes",
          duration: 0.27,
        }}
        exit={{ y: "100%" }}
        className={cn(
          `w-full bg-white h-fit rounded-t-[16px] pb-6 absolute left-0 bottom-0 overflow-clip`
        )}
      >
        <div className="w-full pt-1.5 flex items-center justify-center">
          <div className="w-[46px] h-[5px] bg-[#D9D9D9] rounded-full"></div>
        </div>
        <div className="w-full py-0 grid items-center grid-cols-[1fr_auto_1fr] gap-x-2 px-1">
          <div>
            <Button
              whileHover={""}
              onTap={onClose}
              variant="ghost"
              className="!px-0 flex items-center justify-center"
            >
              <ChevronLeft width={26} height={26} />{" "}
              <span className="-mt-0.5">{backTitle}</span>
            </Button>
          </div>
          <Typography className="font-extrabold">{title}</Typography>
          <div className="flex justify-end pr-1.5">
            {action && (
              <Button
                whileHover={""}
                onTap={action.do}
                variant="ghost"
                className="!px-0 flex items-center justify-center"
              >
                <span>{action.title}</span>
              </Button>
            )}
          </div>
        </div>
        {children}
      </motion.section>
    </section>
  );
};

const SheetHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] ">
      {children}
    </div>
  );
};

const SheetContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full px-2.5">
      {children}
    </div>
  );
};

/**
 * @example
 * 
 * <Sheet className="" open={open} onClose={...} backTitle="Back" title="Title">
 *  <Sheet.Body>
 *    <Sheet.Header>
 *      Header Content
 *    </Sheet.Header>
 *    <Sheet.Content>
 *      Content goes here
 *    </Sheet.Content>
 *  </Sheet.Body>
 * </Sheet>
 * 
 */
const Sheet = Object.assign(SheetUnderlay, {
  Body: SheetBody,
  Header: SheetHeader,
  Content: SheetContent,
});

export default Sheet;
