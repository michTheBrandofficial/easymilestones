import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "motion/react";
import React, { createContext, useContext, useMemo } from "react";
import { Button } from "../buttons";
import { Cancel01Icon } from "hugeicons-react";
import { Typography } from "../typography";

type ModalContextType = {
  open: boolean;
  onClose: VoidFunction;
};

type ModalUnderlayProps = Pick<Props, "children" | "className"> &
  ModalContextType;

const ModalContext = createContext<ModalContextType | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const ModalUnderLay = ({
  children,
  className,
  ...props
}: ModalUnderlayProps) => {
  const isOpen = useMemo(() => {
    return Boolean(props.open);
  }, [props.open]);
  return (
    <ModalContext.Provider value={props}>
      <AnimatePresence>
        {isOpen ? (
          <section
          className={cn(
            "bg-white/25 backdrop-blur-[3px]",
            className,
            " w-screen h-screen !m-0 fixed z-[10000000] top-0 left-0 flex items-center justify-center"
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
    </ModalContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const ModalBody: React.FC<Props> = ({ children, className }) => {
  return (
    <section className={cn("w-fit h-fit px-3 ")}>
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className={cn(`min-h-[320px] bg-white rounded-[40px] py-6 px-7 !border !border-gray-100`, className)}
      >
        {children}
      </motion.section>
    </section>
  );
};

const ModalHeader: React.FC<{ title?: string }> = ({ title }) => {
  const { onClose } = useModal();
  return (
    <div className="w-full flex items-center justify-between ">
      <Button
        variant="ghost"
        className="p-0 invisible pointer-events-none text-em-light-dark"
      >
        <Cancel01Icon width={24} height={24} />
      </Button>
      <Typography className="font-bold">{title || ''}</Typography>
      <Button
        variant="ghost"
        onTap={onClose}
        className="p-0 text-em-light-dark"
      >
        <Cancel01Icon width={24} height={24} />
      </Button>
    </div>
  );
};

/**
 * @example
 * ```jsx
 * <Modal className="" open={open} >
 *  <Modal.Body className="p-5 flex justify-between items-center" >
 *    <button onClick={...} >
 *      <X />
 *    </button>
 *  </Modal.Body>
 * </Modal>
 * ```
 */
const Modal = Object.assign(ModalUnderLay, {
  Body: ModalBody,
  Header: ModalHeader
});

export default Modal;
