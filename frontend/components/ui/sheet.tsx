"use client";
import { cn } from "@/components/cn";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import { ArrowLeft01Icon } from "hugeicons-react";
import { percentage, px } from "@/lib/utils";
import { createPortal } from "react-dom";

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
  /**
   * @dev this is for the drag progress of the sheet 0 - 1
   */
  dragProgress: number;
  setDragProgress: (progress: number) => void;
};

type SheetUnderlayProps = Pick<Props, "children">;

const SheetContext = createContext<SheetContextType | null>(null);

const SHEET_UNDERLAY_TOP_OFFSET = 48;

/**
 * @dev this one to be mounted at top most of app
 */
const SheetProvider = ({ children }: SheetUnderlayProps) => {
  const [sheetMap, setSheetMap] = useState<SheetContextType["sheetMap"]>({});
  const sheetMapRef = useRef<SheetContextType["sheetMap"]>({});
  const [openSheets, setOpenSheets] = useState<string[]>([]);
  const [dragProgress, setDragProgress] = useState(0);
  const isFirstSheetOpen = useMemo(() => openSheets.length > 0, [openSheets]);
  useEffect(() => {
    sheetMapRef.current = sheetMap;
  }, [sheetMap]);
  const registerSheet = useCallback(
    (sheetId: string, config: SheetContextType["sheetMap"][string]) => {
      if (sheetId in sheetMapRef.current) return;
      setSheetMap((prev) => ({
        ...prev,
        [sheetId]: {
          ...config,
        },
      }));
    },
    []
  );
  /**
   * @dev width: Controls the width percentage (100% initially, 95% when open)
   * y: Controls vertical position (0px initially, 48px when open)
   * borderRadius: Controls border radius (0px initially, 16px when open)
   */
  const positionMap = {
    width: { initial: 100, final: 95 },
    y: { initial: 0, final: SHEET_UNDERLAY_TOP_OFFSET },
    borderRadius: { initial: 0, final: 16 },
  } as const;
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
        dragProgress,
        setDragProgress: (progress) => setDragProgress(progress),
      }}
    >
      <div
        id="app_sheet_container"
        className="h-screen w-screen bg-black flex items-center justify-center relative overflow-y-auto no-scrollbar"
      >
        <motion.div
          initial={{
            width: percentage(positionMap.width.initial),
          }}
          animate={
            isFirstSheetOpen
              ? {
                  // formula is ((initial - final) * progress) + final, when dragProgress is 0 final is 95;
                  width: percentage(
                    (positionMap.width.initial - positionMap.width.final) *
                      dragProgress +
                      positionMap.width.final
                  ),
                  y: px(SHEET_UNDERLAY_TOP_OFFSET),
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
          className="h-full no-scrollbar overflow-y-auto "
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

const SHEET_TOP_OFFSET = SHEET_UNDERLAY_TOP_OFFSET + 6;

type SheetProps<SheetId extends string> = Pick<Props, "children"> & {
  sheetId: SheetId;
  className?: string;
} & SheetContextType["sheetMap"][string];

const SheetImpl = <T extends string>({ children, ...props }: SheetProps<T>) => {
  const { registerSheet } = useContext(SheetContext)!;
  const { onClose, title, action, backButton, open } = props;
  // Use a ref to track if we've already registered this sheet
  const registeredRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  // Handle client-side only rendering for the portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
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
  }, [
    props.sheetId,
    registerSheet,
    props.onClose,
    props.title,
    props.action,
    props.backButton,
    props.open,
  ]);
  const y = useMotionValue(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Function to calculate drag progress percentage
  const calculateDragProgress = useCallback(() => {
    if (!sheetRef.current) return 0;
    const { height: sheetHeight } = sheetRef.current.getBoundingClientRect();
    const threshold = sheetHeight * 0.3;
    const currentY = y.get();
    // Calculate progress as a percentage (0 to 1)
    const progress = Math.min(Math.max(currentY / threshold, 0), 1);
    return progress;
  }, [y]);
  // Handle drag events
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const progress = calculateDragProgress();
    if (progress >= 1) {
      onClose();
    } else {
      animate(y, 0, {
        duration: 0.27,
        type: "spring",
      });
    }
  }, [onClose, y]);
  const sheetContent = (
    <AnimatePresence>
      {open ? (
        <>
          <section
            className={cn(
              "bg-black/20",
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
            style={{ y, height: `calc(100% - ${SHEET_TOP_OFFSET}px)` }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            dragTransition={{
              power: 0.2,
              timeConstant: 200,
              modifyTarget: (target) => target * 1.5,
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
              `w-full bg-white rounded-t-[16px] absolute z-[100000000] left-0 bottom-0 overflow-y-auto  transition-[height] duration-200 data-[isdragging=true]:cursor-grabbing `
            )}
          >
            <div className={cn("w-full h-full flex flex-col", props.className)}>
              <div className="w-full pt-1.5 flex items-center justify-center">
                <div className="w-[40px] h-[4px] bg-[#D9D9D9] rounded-full"></div>
              </div>
              <div className="w-full py-0 grid items-center grid-cols-[1fr_auto_1fr] gap-x-2 px-1">
                <div className="mt-1 text-em-secondary">
                  {typeof backButton === "string" && (
                    <Button
                      whileHover={""}
                      onTap={onClose}
                      variant="ghost"
                      className="!px-0 flex items-center justify-center text-em-secondary"
                    >
                      <ArrowLeft01Icon width={26} height={26} />{" "}
                      <span className="font-medium inline-block -ml-0.5">
                        {backButton}
                      </span>
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
                      className="!px-0 flex font-medium items-center justify-center text-em-secondary"
                    >
                      <span className="font-medium">{action.title}</span>
                    </Button>
                  )}
                </div>
              </div>
              {children}
            </div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
  // Only render the portal on the client side
  if (!mounted) return null;
  // Create portal to render the sheet at the document body level
  return createPortal(
    sheetContent,
    document.querySelector<HTMLDivElement>("div#app_sheet_container")!
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

const SheetContentImpl: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "w-full px-2.5 pb-6 overflow-y-auto no-scrollbar flex-grow ",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const useSheet = <S extends string>(
  sheetId: S,
  options?: {
    onClose?: (close: VoidFunction) => void;
  }
) => {
  const sheetContext = useContext(SheetContext);
  if (!sheetContext) {
    throw new Error("useSheet must be used within a SheetProvider");
  }

  return {
    Sheet: memo(
      (props: Omit<SheetProps<S>, "sheetId" | "onClose" | "open">) => {
        return (
          <SheetImpl
            {...props}
            // defaults to false
            open={sheetContext.sheetMap[sheetId]?.open ?? false}
            onClose={() => {
              if (!options?.onClose) sheetContext.closeSheet(sheetId);
              else options.onClose?.(() => sheetContext.closeSheet(sheetId));
            }}
            sheetId={sheetId}
          />
        );
      }
    ),
    SheetContent: memo(SheetContentImpl),
    SheetHeader: memo(SheetHeaderImpl),
    openSheet: () => sheetContext.openSheet(sheetId),
    closeSheet: () => {
      if (!options?.onClose) sheetContext.closeSheet(sheetId);
      else options.onClose?.(() => sheetContext.closeSheet(sheetId));
    },
  };
};

export { SheetProvider, useSheet };
