import { createContext, useContext } from "react";

// for now we have info state only
export type ToastType = "info";

export type ToastOptions = {
  action?: {
    title?: 'Close' | 'Undo';
    /**
     * @note this function can return a boolean value to determine if the toast should be removed.
     */
    onClick: () => boolean;
  };
  /**
   * @note the delay is in milliseconds
   */
  duration?: number;
};

export interface ToastContextProps {
  showToast: (type: ToastType, message: string, options?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.showToast;
};