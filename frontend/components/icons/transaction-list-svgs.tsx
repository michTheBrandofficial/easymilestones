import { scaleSize } from "@/lib/utils";
import { cn } from "../cn";

type TransactionListSVGProps = React.SVGProps<SVGSVGElement> & {
  size?: 1 | (number & {});
  completed: boolean;
};

/**
 * @dev this is the line flow that starts the transaction
 */
export const Transaction0Index = ({
  size = 1,
  completed = false,
  ...props
}: TransactionListSVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "72",
    height: "17",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 72 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.1372C28.274 -20.7267 37.1362 32.6099 71.4193 11.1372"
        stroke={completed ? "#A3D5FA" : "#1717174d"}
        stroke-width="1.25084"
      />
    </svg>
  );
};

/**
 * @dev this is the second line
 */
export const Transaction1Index = ({
  size = 1,
  completed = false,
  ...props
}: TransactionListSVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "72",
    height: "18",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 72 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.14734 11.4318C28.4214 -20.432 37.2835 32.9046 71.5666 11.4318"
        stroke={completed ? "#A3D5FA" : "#1717174d"}
        stroke-width="1.25084"
      />
    </svg>
  );
};
/**
 * @dev this is the completed badge
 */
export const TransactionCompletedBadge = ({
  size = 1,
  ...props
}: Omit<TransactionListSVGProps, "completed">) => {
  const [w, h] = scaleSize(size, {
    width: "16",
    height: "16",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.97783"
        cy="8.28813"
        r="6.94697"
        fill="#A3D5FA"
        stroke="#A3D5FA"
        stroke-width="0.930859"
      />
      <g clip-path="url(#clip0_445_142)">
        <path
          d="M11.2164 11.5309H11.2208M11.2164 11.5309C10.9279 11.817 10.4051 11.7458 10.0385 11.7458C9.58842 11.7458 9.3717 11.8338 9.05052 12.155C8.77703 12.4285 8.41041 12.9208 7.97785 12.9208C7.54528 12.9208 7.17866 12.4285 6.90516 12.155C6.58398 11.8338 6.36726 11.7458 5.91722 11.7458C5.5506 11.7458 5.02779 11.817 4.73931 11.5309C4.44852 11.2426 4.52009 10.7176 4.52009 10.3486C4.52009 9.88234 4.41811 9.66793 4.08604 9.33587C3.59208 8.84192 3.3451 8.59492 3.34509 8.28801C3.3451 7.98111 3.59208 7.73413 4.08603 7.24017C4.38246 6.94374 4.52009 6.65001 4.52009 6.2274C4.52009 5.86076 4.44884 5.33795 4.73492 5.04947C5.02327 4.75869 5.54824 4.83026 5.91723 4.83026C6.33983 4.83026 6.63356 4.69264 6.92998 4.39622C7.42395 3.90226 7.67093 3.65527 7.97784 3.65527C8.28475 3.65527 8.53173 3.90226 9.0257 4.39622C9.32205 4.69258 9.61573 4.83026 10.0385 4.83026C10.4051 4.83026 10.9279 4.75901 11.2164 5.0451C11.5072 5.33345 11.4356 5.85842 11.4356 6.2274C11.4356 6.6937 11.5376 6.9081 11.8696 7.24017C12.3636 7.73413 12.6106 7.98111 12.6106 8.28801C12.6106 8.59492 12.3636 8.84192 11.8696 9.33587C11.5376 9.66792 11.4356 9.88235 11.4356 10.3486C11.4356 10.7176 11.5072 11.2426 11.2164 11.5309Z"
          stroke="#101010"
          stroke-width="0.694912"
        />
        <path
          d="M6.58801 8.70171C6.58801 8.70171 7.14394 9.00367 7.42191 9.44626C7.42191 9.44626 8.2558 7.70898 9.36766 7.12988"
          stroke="#101010"
          stroke-width="0.694912"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_445_142">
          <rect
            width="11.1186"
            height="11.1186"
            fill="white"
            transform="translate(2.41855 2.72876)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

type OngoingProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 1 | (number & {});
};

/**
 * @dev this is the completed badge
 */
export const TransactionOngoingBadge = ({
  size = 1,
  ...props
}: OngoingProps) => {
  const [w, h] = scaleSize(size, {
    width: "16",
    height: "16",
  });
  const [sw, sh] = scaleSize(size, {
    width: "6",
    height: "6",
  });
  return (
    <div
      {...props}
      style={{
        width: w,
        height: h,
      }}
      className={cn(
        "border-2 border-[#171717]/30 flex items-center justify-center rounded-full ",
        props.className
      )}
    >
      <div
        {...props}
        style={{
          width: sw,
          height: sh,
        }}
        className="bg-[#171717]/30 rounded-full "
      ></div>
    </div>
  );
};
