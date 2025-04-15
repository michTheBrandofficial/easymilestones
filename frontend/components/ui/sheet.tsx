import { cn } from "@/components/cn";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import React, { createContext, useContext, useMemo, useRef } from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import { ChevronLeft } from "@gravity-ui/icons";

type SheetContextType = {
  open: boolean;
  onClose: VoidFunction;
  title: string;
  backTitle?: "Back" | (string & {});
  action?: {
    title: string;
    /**
     * @param closeSheet closes the sheet after the action is done
     * @returns {void}
     */
    do: (closeSheet: () => void) => void;
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
          <>
            <section
              className={cn(
                "bg-black/25 backdrop-blur-[3px]",
                className,
                " w-screen h-screen fixed z-[10000000] !m-0 top-0 left-0 flex items-center justify-center"
              )}
              onClick={(e) => {
                if (e.target === e.currentTarget) props.onClose();
              }}
            ></section>
            {children}
          </>
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
  const y = useMotionValue(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleDragEnd = () => {
    const { height: sheetHeight } = sheetRef.current!.getBoundingClientRect();
    if (y.get() >= 0 && y.get() > sheetHeight * 0.4) {
      // if dragged down more than half of the sheet height, close the sheet
      onClose();
    } else {
      // snap back to original position
      animate(y, 0, {
        duration: 0.27,
        type: "spring",
      });
    }
  };
  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{
        y: 0,
        transition: {
          type: "keyframes",
          duration: 0.27,
        },
      }}
      ref={sheetRef}
      exit={{
        y: "100%",
        transition: {
          duration: 0.17,
          type: "keyframes",
        },
      }}
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0 }}
      dragElastic={0.5}
      dragTransition={{
        power: 0.2, // Lower values make it more responsive (0-1)
        timeConstant: 200, // Lower values make it faster
        modifyTarget: (target) => target * 1.5, // Multiplier for drag distance
      }}
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onDragEnd={handleDragEnd}
      className={cn(
        `w-full bg-white h-fit max-h-[90%] rounded-t-[16px] pb-6 absolute z-[100000000] left-0 bottom-0 overflow-y-auto flex flex-col transition-[height] duration-200 `
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
              onTap={() => {
                action.do(onClose)
              }}
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
  );
};

const SheetHeader: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] ">
      {children}
    </div>
  );
};

const SheetContent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="w-full px-2.5 overflow-y-auto no-scrollbar flex-grow"
    >
      {children}
    </motion.div>
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
