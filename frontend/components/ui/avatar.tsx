import { cn } from "@/components/cn";
import { Person } from "@gravity-ui/icons";
import React from "react";

type Props = {
  size?: 48 | (number & {});
  className?: string;
  src?: string;
  alt?: string;
};

const Avatar: React.FC<Props> = ({ size = 48, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-full ",
        {
          "bg-stone-200 hover:bg-stone-300 flex items-center justify-center":
            !props.src,
          "bg-transparent": props.src,
        },
        className
      )}
      {...props}
      style={{
        width: size,
        height: size,
      }}
    >
      {props.src ? (
        <img
          src={props.src}
          alt={props.alt}
          className="w-full h-full object-cover rounded-[inherit]"
        />
      ) : (
        <Person className="text-inherit" />
      )}
    </div>
  );
};

export default Avatar;
