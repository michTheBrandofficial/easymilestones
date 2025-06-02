import { cn } from "@/lib/shadcn-utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { HTMLMotionProps, motion } from "motion/react";
import * as React from "react";
import { createContext } from "react";

const TabsRoot = TabsPrimitive.Root;

type Position = {
  width: number;
  x: number;
  height: number;
};

const TabCursorPositionContext = createContext<{
  position: Position;
  setPosition(position: Position): void;
} | null>(null);

const useTabCursorPosition = () => {
  const context = React.useContext(TabCursorPositionContext);
  if (!context) {
    throw new Error("useTabCursorPosition must be used within a TabsList");
  }
  return context;
};

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const [pos, setPos] = React.useState({ width: 29, x: 50, height: 29 });
  return (
    <TabCursorPositionContext.Provider
      value={{
        position: pos,
        setPosition: setPos,
      }}
    >
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex h-fit items-center justify-center rounded-xl bg-white border border-em-secondary/30 p-1 relative",
          className
        )}
        {...props}
      >
        <TabsCursor />
        {children}
      </TabsPrimitive.List>
    </TabCursorPositionContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsCursor = ({ className, ...props }: HTMLMotionProps<"div">) => {
  const { position: cursorPosition } = useTabCursorPosition();
  return (
    <motion.div
      {...props}
      animate={cursorPosition}
      className={cn("absolute z-10 rounded-lg bg-em-secondary", className)}
    />
  );
};

TabsCursor.displayName = "TabsCursor";

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { setPosition } = useTabCursorPosition();
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center relative z-20 justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-white transition-colors ease-[ease] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-em-text data-[state=active]:text-white",
        className
      )}
      {...props}
      onClick={(e) => {
        setPosition({
          width: e.currentTarget.clientWidth,
          x: e.currentTarget.offsetLeft,
          height: e.currentTarget.clientHeight,
        });
      }}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
