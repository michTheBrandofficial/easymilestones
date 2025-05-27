import { scaleSize } from "@/lib/utils";
import { cn } from "../cn";

type SVGProps = React.SVGProps<SVGSVGElement> & {
  size?: 1 | (number & {});
};

const MilestoneOngoing = ({ size = 1, ...props }: SVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "85",
    height: "18",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 85 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.14734 11.4318C28.4214 -20.432 37.2835 32.9046 71.5666 11.4318"
        stroke="#171717"
        stroke-opacity="0.3"
        stroke-width="1.25084"
      />
      <circle
        cx="77.5876"
        cy="8.87572"
        r="2.77965"
        fill="#171717"
        fill-opacity="0.3"
      />
      <circle
        cx="77.5876"
        cy="8.87565"
        r="6.94697"
        stroke="#171717"
        stroke-opacity="0.3"
        stroke-width="0.930859"
      />
    </svg>
  );
};

const MilestoneCompleted = ({ size = 1, ...props }: SVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "85",
    height: "17",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 85 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.1372C28.274 -20.7267 37.1362 32.6099 71.4193 11.1372"
        stroke="#A3D5FA"
        stroke-width="1.25084"
      />
      <circle
        cx="76.9778"
        cy="8.28813"
        r="6.94697"
        fill="#A3D5FA"
        stroke="#A3D5FA"
        stroke-width="0.930859"
      />
      <g clip-path="url(#clip0_0_1)">
        <path
          d="M80.2164 11.5309H80.2208M80.2164 11.5309C79.9279 11.817 79.4051 11.7458 79.0385 11.7458C78.5884 11.7458 78.3717 11.8338 78.0505 12.155C77.777 12.4285 77.4104 12.9208 76.9779 12.9208C76.5453 12.9208 76.1787 12.4285 75.9052 12.155C75.584 11.8338 75.3673 11.7458 74.9172 11.7458C74.5506 11.7458 74.0278 11.817 73.7393 11.5309C73.4485 11.2426 73.5201 10.7176 73.5201 10.3486C73.5201 9.88234 73.4181 9.66793 73.086 9.33587C72.5921 8.84192 72.3451 8.59492 72.3451 8.28801C72.3451 7.98111 72.5921 7.73413 73.086 7.24017C73.3825 6.94374 73.5201 6.65001 73.5201 6.2274C73.5201 5.86076 73.4488 5.33795 73.7349 5.04947C74.0233 4.75869 74.5482 4.83026 74.9172 4.83026C75.3398 4.83026 75.6336 4.69264 75.93 4.39622C76.4239 3.90226 76.6709 3.65527 76.9778 3.65527C77.2848 3.65527 77.5317 3.90226 78.0257 4.39622C78.3221 4.69258 78.6157 4.83026 79.0385 4.83026C79.4051 4.83026 79.9279 4.75901 80.2164 5.0451C80.5072 5.33345 80.4356 5.85842 80.4356 6.2274C80.4356 6.6937 80.5376 6.9081 80.8696 7.24017C81.3636 7.73413 81.6106 7.98111 81.6106 8.28801C81.6106 8.59492 81.3636 8.84192 80.8696 9.33587C80.5376 9.66792 80.4356 9.88235 80.4356 10.3486C80.4356 10.7176 80.5072 11.2426 80.2164 11.5309Z"
          stroke="#101010"
          stroke-width="0.694912"
        />
        <path
          d="M75.588 8.70171C75.588 8.70171 76.1439 9.00367 76.4219 9.44626C76.4219 9.44626 77.2558 7.70898 78.3676 7.12988"
          stroke="#101010"
          stroke-width="0.694912"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="11.1186"
            height="11.1186"
            fill="white"
            transform="translate(71.4185 2.72876)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

type TransactionListSVGProps = SVGProps & {
  completed: boolean;
};

export const MilestoneSVG = ({
  size = 1,
  completed = false,
  ...props
}: TransactionListSVGProps) => {
  return completed ? (
    <MilestoneCompleted size={size} {...props} />
  ) : (
    <MilestoneOngoing size={size} {...props} />
  );
};

export const LittleMilestoneSVG = ({ size = 1, completed, ...props }: TransactionListSVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "29",
    height: "12",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 29 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.95018C12 -11.0496 16.821 22.5485 28 5.95018"
        stroke={
          completed ? "#A3D5FA" : "#1717174d"
        }
      />
    </svg>
  );
};
