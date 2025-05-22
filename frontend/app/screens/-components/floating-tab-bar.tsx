import {
  Home01Icon,
  Home02Icon,
  Home03Icon,
  MoneyExchange01Icon,
  MoneyExchange02Icon,
  MoneyExchange03Icon,
  Target02Icon,
  UserCircle02Icon,
  UserCircleIcon,
} from "hugeicons-react";
import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/components/cn";
import { Button } from "@/components/buttons";

const links = [
  {
    title: "Home",
    icon: <Home03Icon size={18} className="text-white" />,
    to: "/",
  },
  {
    title: "Exchange",
    icon: <MoneyExchange03Icon size={18} className="text-white" />,
    to: "/transactions",
  },
  {
    title: "Create Milestone",
    icon: <Target02Icon size={18} className="text-white" />,
    to: "/create-transaction",
  },
];

type Props = {
  /**
   * @dev this is for the account modals
   */
  onClickAccount?: () => void;
};

/**
 * @dev onClickAccount should open the account sheet;
 */
const FloatingTabBar = (props: Props) => {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-em-dark flex items-center gap-x-3 shadow-lg">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={cn(
            "size-8 flex items-center justify-center  rounded-full  hover:bg-em-tertiary transition-colors duration-300 ",
            {
              "bg-em-tertiary": pathname === link.to,
            }
          )}
        >
          {link.icon}
        </Link>
      ))}
      <Button
      onTap={props.onClickAccount}
          className={cn(
            "size-8 flex items-center justify-center  rounded-full p-0  hover:bg-em-tertiary transition-colors duration-300 ",
          )}
        >
          <UserCircle02Icon size={18} className="text-white " />
        </Button>
    </div>
  );
};

export default FloatingTabBar;
