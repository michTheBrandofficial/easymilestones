import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "motion/react";
import React, { useMemo } from "react";

type ModalUnderlayProps = Pick<Props, "children" | "className"> & {
  open: boolean;
  onClose: VoidFunction;
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
    <AnimatePresence>
      {isOpen ? (
        <section
          className={cn(
            "bg-black/25 backdrop-blur-[2px]",
            className,
            " w-screen h-screen fixed z-[10000000] -top-3 left-0 flex items-center justify-center"
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
        className={cn(`min-h-[400px] bg-white rounded-3xl`, className)}
      >
        {children}
      </motion.section>
    </section>
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
});

export default Modal;
