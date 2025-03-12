import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MenuContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<MenuContextType["open"]>>;
  config: {
    transformOrigin:
      | "center"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right";
  };
};

const MenuContext = createContext<MenuContextType | null>(null);

const useMenu = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return menuContext;
};

type MenuProps = Pick<Props, "children"> & {
  transformOrigin?:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  className?: string;
};

const MenuProvider = ({
  children,
  transformOrigin = "center",
  ...props
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuContext.Provider
      value={{
        open: isOpen,
        setOpen: setIsOpen,
        config: {
          transformOrigin,
        },
      }}
    >
      <section className={cn(props.className, " w-fit h-fit relative")}>
        {children}
      </section>
    </MenuContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * @dev wraps the children in <div> and adds the menu class
 */
const MenuTrigger: React.FC<Pick<Props, "children" | "className">> = ({
  children,
  className,
}) => {
  const { setOpen } = useMenu();
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn("w-fit h-fit p-0 bg-transparent text-inherit", className)}
      onTap={() => setOpen(true)}
    >
      {children}
    </motion.div>
  );
};

const MenuContent: React.FC<Props> = ({ children, className }) => {
  const { open, setOpen, config } = useMenu();
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) containerRef.current?.focus();
  }, [open]);
  return (
    <AnimatePresence>
      {open ? (
        <>
          <section
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
            className="fixed h-screen w-screen !mt-0 top-0 left-0 z-[99999]"
          ></section>
          <motion.section
            ref={containerRef}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            tabIndex={0}
            className={cn(
              `min-h-[400px] min-w-[300px] top-[120%] bg-white rounded-3xl absolute z-[100000] border border-gray-100 `,
              className,
              { "origin-center": config.transformOrigin === "center" },
              { "origin-top-right": config.transformOrigin === "top-right" },
              { "origin-top-left": config.transformOrigin === "top-left" },
              {
                "origin-bottom-left": config.transformOrigin === "bottom-left",
              },
              {
                "origin-bottom-right":
                  config.transformOrigin === "bottom-right",
              }
            )}
          >
            {children}
          </motion.section>
        </>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

const MenuItem: React.FC<Props & React.JSX.IntrinsicElements["div"]> = ({
  children,
  className,
  ...props
}) => {
  const { setOpen } = useMenu();
  return (
    <div
      {...props}
      tabIndex={0}
      onClick={(e) => {
        setOpen(false);
        props.onClick?.(e);
      }}
      className={cn(
        "w-full h-fit focus:outline-none focus:bg-gray-100 hover:bg-gray-100 first:rounded-t-[inherit] last:rounded-b-[inherit] pl-5 py-3 cursor-pointer border-b border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * @example
 * ```jsx
 * <Menu>
 *  <Menu.Trigger>
 *    <Button variant='icon'>
 *      <User />
 *    </Button>
 *  </Menu.Trigger>
 *  <Menu.Content>
 *    <Menu.Item>
 *      ...children
 *    </Menu.Item>
 *  </Menu.Content>
 * </Menu> * ```
 */
const Menu = Object.assign(MenuProvider, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
});

export default Menu;
