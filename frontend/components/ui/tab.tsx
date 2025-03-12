import { pick } from "@/lib/helpers";
import { cn } from "@/components/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

type TabContextType = {
  links: { value: Lowercase<string>; label: string }[];
  activeLink: { value: Lowercase<string>; label: string };
  addLink: (link: { value: Lowercase<string>; label: string }) => void;
  setActiveLink: (link: { value: Lowercase<string>; label: string }) => void;
};

const TabContext = createContext<TabContextType | null>(null);

const useTab = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return tabContext;
};

type TabProps = Pick<Props, "children">;

const TabProvider = ({ children }: TabProps) => {
  const [links, setLinks] = useState(
    [] as { value: Lowercase<string>; label: string }[]
  );
  const [activeLink, setActiveLink] = useState({
    value: "" as Lowercase<string>,
    label: "",
  });
  return (
    <TabContext.Provider
      value={{
        links: links,
        activeLink: activeLink,
        addLink(link) {
          setLinks((p) => {
            const hasLink = !!p.find((pLink) => link.value === pLink.value);
            if (hasLink) return p;
            else {
              p.push(link);
              return p;
            }
          });
        },
        setActiveLink(link) {
          setActiveLink(link);
        },
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

type TabLinkProps = Pick<Props, "children" | "className"> & {
  value: Lowercase<string>;
  label: string;
};

const TabHeader: React.FC<Pick<Props, "children" | "className">> = ({
  children,
  className,
}) => {
  const { links, activeLink, setActiveLink } = useTab();
  const activeLinkIndex =
    links.findIndex((link) => activeLink.value === link.value) || 0;
  const validatedChildren = (
    children ? (Array.isArray(children) ? children : [children]) : []
  ).filter(
    (child) =>
      typeof child.type === "function" && child.type.displayName === "TabLink"
  );
  useEffect(() => {
    setActiveLink(links[0]);
  }, []);
  return (
    <div
      className={cn(
        className,
        "w-full min-h-9 grid grid-cols-2 place-content-center rounded-lg bg-gray-100 overflow-x-auto no-scrollbar relative"
      )}
    >
      {validatedChildren}
      {links.map((link, index) => (
        <p
          onClick={() => setActiveLink(link)}
          key={index}
          className="text-sm relative z-30 text-center font-semibold cursor-pointer"
        >
          {link.label}
        </p>
      ))}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: `${activeLinkIndex * 100}%` }}
        className="absolute z-10 w-1/2 h-full px-[3px] py-[3px] top-0 left-0"
      >
        <div className="rounded-md bg-white h-full w-full shadow-sm"></div>
      </motion.div>
    </div>
  );
};

const TabLink: React.FC<TabLinkProps> = ({ children, className, ...props }) => {
  const { addLink } = useTab();
  const link = pick(props, "value", "label");
  useEffect(() => {
    addLink(link);
  }, []);
  return null;
};

TabLink.displayName = "TabLink";

type TabContentProps = Pick<Props, "children" | "className"> &
  React.AllHTMLAttributes<"div"> & {
    value: string;
  };

const TabContent: React.FC<TabContentProps> = ({ children, value }) => {
  const open = Boolean(value);
  return <AnimatePresence>{open ? children : ""}</AnimatePresence>;
};

/**
 * @example
 * ```jsx
 * <Tab>
 *  <Tab.Header>
 *    <Tab.Link value="all" label="All" />
 *  </Tab.Header>
 *  <Tab.Content value="all" >
 *    ...children
 *  </Tab.Content>
 * </Tab>
 * ```
 */
const Tab = Object.assign(TabProvider, {
  Header: TabHeader,
  Link: TabLink,
  Content: TabContent,
});

export default Tab;
