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
  {
    title: "Profile",
    icon: <UserCircle02Icon size={18} className="text-white " />,
    to: "/profile",
  },
];

const FloatingTabBar = () => {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-em-dark flex items-center gap-x-3 shadow-lg">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={cn(
            "size-8 flex items-center justify-center  rounded-full  hover:bg-em-tertiary ",
            {
              "bg-em-tertiary": pathname === link.to,
            }
          )}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

export default FloatingTabBar;
