"use client";
import { cn } from "@/components/cn";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import { ArrowLeft01Icon } from "hugeicons-react";
import { createPortal } from "react-dom";

type VariableHeightSheetContextType = {
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
    config: VariableHeightSheetContextType["sheetMap"][string]
  ) => void;
  unregisterSheet: (sheetId: string) => void;
  /**
   * @dev this is for collapsing opened sheets when new sheets come up, this feature can hold on for now
   */
  openSheets?: string[];
  openSheet(sheetId: string): void;
  closeSheet(sheetId: string): void;
};

type VariableHeightSheetUnderlayProps = Pick<Props, "children">;

const VariableHeightSheetContext = createContext<VariableHeightSheetContextType | null>(null);

const FIXED_SHEET_UNDERLAY_TOP_OFFSET = 48

/**
 * @dev this one to be mounted at top most of app
 */
const VariableHeightSheetProvider = ({ children }: VariableHeightSheetUnderlayProps) => {
  const [sheetMap, setSheetMap] = useState<VariableHeightSheetContextType["sheetMap"]>({});
  const sheetMapRef = useRef<VariableHeightSheetContextType["sheetMap"]>({});
  const [openSheets, setOpenSheets] = useState<string[]>([]);
  useEffect(() => {
    sheetMapRef.current = sheetMap;
  }, [sheetMap]);
  const registerSheet = useCallback(
    (sheetId: string, config: VariableHeightSheetContextType["sheetMap"][string]) => {
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
  return (
    <VariableHeightSheetContext.Provider
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
        {/* {app_sheet_container} */}
        {children}
    </VariableHeightSheetContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const FIXED_SHEET_TOP_OFFSET = FIXED_SHEET_UNDERLAY_TOP_OFFSET + 6;

type VariableHeightSheetProps<SheetId extends string> = Pick<Props, "children"> & {
  sheetId: SheetId;
  className?: string
} & VariableHeightSheetContextType["sheetMap"][string];

const VariableHeightSheetImpl = <T extends string>({ children, ...props }: VariableHeightSheetProps<T>) => {
  const { registerSheet } = useContext(VariableHeightSheetContext)!;
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
            style={{ y, height: `fit-content` }}
            // dont use this as this is a fixed height sheet style={{ y, height: `calc(100% - ${FIXED_SHEET_TOP_OFFSET}px)` }}
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
              `w-full bg-white rounded-t-[16px] absolute z-[100000000] left-0 bottom-0 overflow-y-auto  transition-[height] duration-200 data-[isdragging=true]:cursor-grabbing `,
            )}
          >
            <div className={cn("w-full h-full flex flex-col", props.className)}>
            <div className="w-full pt-1.5 hidden items-center justify-center">
              <div className="w-[46px] h-[4px] bg-[#D9D9D9] rounded-full"></div>
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
                    <span className="font-medium inline-block -ml-0.5">{backButton}</span>
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
                    <span className="font-medium" >{action.title}</span>
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

const VariableHeightSheetHeaderImpl: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full pb-2 px-2.5 border-b-2 border-b-[#D3D3D3] ">
      {children}
    </div>
  );
};

const VariableHeightSheetContentImpl: React.FC<{ children?: React.ReactNode, className?: string }> = ({
  children, className
}) => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn("w-full px-2.5 pb-6 overflow-y-auto no-scrollbar flex-grow ", className)}
    >
      {children}
    </motion.div>
  );
};

const useVariableHeightSheet = <S extends string>(sheetId: S) => {
  const sheetContext = useContext(VariableHeightSheetContext);
  if (!sheetContext) {
    throw new Error("useSheet must be used within a SheetProvider");
  }

  return {
    VariableHeightSheet: memo(
      (props: Omit<VariableHeightSheetProps<S>, "sheetId" | "onClose" | "open">) => {
        return (
          <VariableHeightSheetImpl
            {...props}
            // defaults to false
            open={sheetContext.sheetMap[sheetId]?.open ?? false}
            onClose={() => sheetContext.closeSheet(sheetId)}
            sheetId={sheetId}
          />
        );
      }
    ),
    VariableHeightSheetContent: VariableHeightSheetContentImpl,
    VariableHeightSheetHeader: VariableHeightSheetHeaderImpl,
    openSheet: () => sheetContext.openSheet(sheetId),
    closeSheet: () => sheetContext.closeSheet(sheetId),
  };
};

export { VariableHeightSheetProvider, useVariableHeightSheet };

