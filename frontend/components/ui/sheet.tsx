"use client";
import { cn } from "@/components/cn";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import { ChevronLeft } from "@gravity-ui/icons";
import { percentage, pick, px } from "@/lib/utils";

type SheetContextType = {
  sheetMap: {
    [sheetId: string]: {
      open: boolean;
      backButton?: false | "Back" | (string & {});
      /**
       * @dev the title displayed at the top center of the sheet
       */
      title: string;
      onClose: VoidFunction;
      action?: {
        title: string;
        /**
         * @param closeSheet closes the sheet after the action is done
         * @returns {void}
         */
        do: (closeSheet: VoidFunction) => void;
      };
    };
  };
  registerSheet: (
    sheetId: string,
    config: SheetContextType["sheetMap"][string]
  ) => void;
  unregisterSheet: (sheetId: string) => void;
  /**
   * @dev this is for collapsing opened sheets when new sheets come up, this feature can hold on for now
   */
  openSheets?: string[];
  openSheet(sheetId: string): void;
  closeSheet(sheetId: string): void;
};

type SheetUnderlayProps = Pick<Props, "children">;

const SheetContext = createContext<SheetContextType | null>(null);

/**
 * @dev this one to be mounted at top most of app
 */
const SheetProvider = ({ children }: SheetUnderlayProps) => {
  const [sheetMap, setSheetMap] = useState<SheetContextType["sheetMap"]>({});
  const sheetMapRef = useRef<SheetContextType["sheetMap"]>({});
  const [openSheets, setOpenSheets] = useState<string[]>([]);
  const isFirstSheetOpen = useMemo(() => openSheets.length === 0, [openSheets]);
  useEffect(() => {
    sheetMapRef.current = sheetMap;
  }, [sheetMap]);
  const registerSheet = useCallback(
    (sheetId: string, config: SheetContextType["sheetMap"][string]) => {
      if (sheetId in sheetMapRef.current) return (console.log('yes', sheetId));
      setSheetMap((prev) => ({
        ...prev,
        [sheetId]: {
          ...config,
        },
      }));
    },
    []
  );
  return (
    <SheetContext.Provider
      value={{
        openSheets,
        sheetMap,
        registerSheet: registerSheet,
        unregisterSheet: (sheetId) => {
          setSheetMap((prev) => {
            const newMap = { ...prev };
            delete newMap[sheetId];
            return newMap;
          });
          setOpenSheets((prev) => prev.filter((id) => id !== sheetId));
        },
        openSheet(sheetId) {
          if (openSheets.includes(sheetId)) return;
          setOpenSheets((prev) => [...prev, sheetId]);
          setSheetMap((prev) => ({
            ...prev,
            [sheetId]: {
              ...prev[sheetId],
              open: true,
            },
          }));
        },
        closeSheet(sheetId) {
          setOpenSheets((prev) => prev.filter((sheet) => sheet !== sheetId));
          setSheetMap((prev) => ({
            ...prev,
            [sheetId]: {
              ...prev[sheetId],
              open: false,
            },
          }));
        },
      }}
    >
      <div className="h-screen w-screen bg-blue-300 flex items-center justify-center relative overflow-y-auto no-scrollbar ">
        <motion.div
          initial={{
            width: percentage(100),
          }}
          animate={
            isFirstSheetOpen
              ? {
                  width: percentage(95),
                  y: px(48),
                  borderTopRightRadius: px(16),
                  borderTopLeftRadius: px(16),
                }
              : {
                  width: percentage(100),
                  y: px(0),
                }
          }
          transition={{
            type: "keyframes",
          }}
          className="h-full bg-white no-scrollbar overflow-y-auto "
        >
          {children}
        </motion.div>
      </div>
    </SheetContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

type SheetProps<SheetId extends string> = Pick<Props, "children"> & {
  sheetId: SheetId;
} & SheetContextType["sheetMap"][string];

const SheetImpl = <T extends string>({ children, ...props }: SheetProps<T>) => {
  const { registerSheet } = useContext(SheetContext)!;
  const { onClose, title, action, backButton, open } = props;
  // Use a ref to track if we've already registered this sheet
  const registeredRef = useRef(false);
  useEffect(() => {
    if (!props.sheetId || registeredRef.current) return;
    // Mark as registered
    registeredRef.current = true;

    // Extract only the needed properties to avoid unnecessary re-registrations
    const sheetConfig = {
      onClose: props.onClose,
      title: props.title,
      action: props.action,
      backButton: props.backButton,
      open: props.open,
    };
    registerSheet(props.sheetId, sheetConfig);
  }, [props.sheetId, registerSheet, props.onClose, props.title, props.action, props.backButton, props.open]);
  const y = useMotionValue(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnd = () => {
    setIsDragging(false);
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
    <AnimatePresence>
      {open ? (
        <>
          <section
            className={cn(
              "bg-black/25 backdrop-blur-[3px]",
              "w-screen h-screen fixed z-[10000000] !m-0 top-0 left-0 flex items-center justify-center"
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          />
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
            onDragStart={() => {
              setIsDragging(true);
            }}
            onDragEnd={handleDragEnd}
            data-isdragging={isDragging}
            className={cn(
              `w-full bg-white h-fit max-h-[90%] rounded-t-[16px] absolute z-[100000000] left-0 bottom-0 overflow-y-auto flex flex-col transition-[height] duration-200 data-[isdragging=true]:cursor-grabbing `
            )}
          >
            <div className="w-full pt-1.5 flex items-center justify-center">
              <div className="w-[46px] h-[5px] bg-[#D9D9D9] rounded-full"></div>
            </div>
            <div className="w-full py-0 grid items-center grid-cols-[1fr_auto_1fr] gap-x-2 px-1">
              <div>
                {typeof backButton === "string" && (
                  <Button
                    whileHover={""}
                    onTap={onClose}
                    variant="ghost"
                    className="!px-0 flex items-center justify-center"
                  >
                    <ChevronLeft width={26} height={26} />{" "}
                    <span className="-mt-0.5 font-medium">{backButton}</span>
                  </Button>
                )}
              </div>
              <Typography className="font-extrabold text-[17px] ">
                {title}
              </Typography>
              <div className="flex justify-end pr-1.5">
                {action && (
                  <Button
                    whileHover={""}
                    onTap={() => {
                      action.do(onClose);
                    }}
                    variant="ghost"
                    className="!px-0 flex font-medium items-center justify-center"
                  >
                    <span>{action.title}</span>
                  </Button>
                )}
              </div>
            </div>
            {children}
          </motion.section>
        </>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

const SheetHeaderImpl: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] ">
      {children}
    </div>
  );
};

const SheetContentImpl: React.FC<{ children?: React.ReactNode }> = ({
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
      className="w-full px-2.5 pb-6 overflow-y-auto no-scrollbar flex-grow "
    >
      {children}
    </motion.div>
  );
};

const useSheet = <S extends string>(sheetId: S) => {
  const sheetContext = useContext(SheetContext);
  if (!sheetContext) {
    throw new Error("useSheet must be used within a SheetProvider");
  }

  return {
    Sheet: (props: Omit<SheetProps<S>, "sheetId" | "onClose" | "open">) => {
      return (
        <SheetImpl
          {...props}
          // defaults to false
          open={sheetContext.sheetMap[sheetId]?.open ?? false}
          onClose={() => sheetContext.closeSheet(sheetId)}
          sheetId={sheetId}
        />
      );
    },
    SheetContent: SheetContentImpl,
    SheetHeader: SheetHeaderImpl,
    openSheet: () => sheetContext.openSheet(sheetId),
    closeSheet: () => sheetContext.closeSheet(sheetId),
  };
};

export { SheetProvider, useSheet };
