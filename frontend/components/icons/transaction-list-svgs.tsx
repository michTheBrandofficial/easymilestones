import { scaleSize } from "@/lib/utils";

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
        strokeWidth="1.25084"
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
        strokeWidth="0.930859"
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
        strokeWidth="1.25084"
      />
      <circle
        cx="76.9778"
        cy="8.28813"
        r="6.94697"
        fill="#A3D5FA"
        stroke="#A3D5FA"
        strokeWidth="0.930859"
      />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M80.2164 11.5309H80.2208M80.2164 11.5309C79.9279 11.817 79.4051 11.7458 79.0385 11.7458C78.5884 11.7458 78.3717 11.8338 78.0505 12.155C77.777 12.4285 77.4104 12.9208 76.9779 12.9208C76.5453 12.9208 76.1787 12.4285 75.9052 12.155C75.584 11.8338 75.3673 11.7458 74.9172 11.7458C74.5506 11.7458 74.0278 11.817 73.7393 11.5309C73.4485 11.2426 73.5201 10.7176 73.5201 10.3486C73.5201 9.88234 73.4181 9.66793 73.086 9.33587C72.5921 8.84192 72.3451 8.59492 72.3451 8.28801C72.3451 7.98111 72.5921 7.73413 73.086 7.24017C73.3825 6.94374 73.5201 6.65001 73.5201 6.2274C73.5201 5.86076 73.4488 5.33795 73.7349 5.04947C74.0233 4.75869 74.5482 4.83026 74.9172 4.83026C75.3398 4.83026 75.6336 4.69264 75.93 4.39622C76.4239 3.90226 76.6709 3.65527 76.9778 3.65527C77.2848 3.65527 77.5317 3.90226 78.0257 4.39622C78.3221 4.69258 78.6157 4.83026 79.0385 4.83026C79.4051 4.83026 79.9279 4.75901 80.2164 5.0451C80.5072 5.33345 80.4356 5.85842 80.4356 6.2274C80.4356 6.6937 80.5376 6.9081 80.8696 7.24017C81.3636 7.73413 81.6106 7.98111 81.6106 8.28801C81.6106 8.59492 81.3636 8.84192 80.8696 9.33587C80.5376 9.66792 80.4356 9.88235 80.4356 10.3486C80.4356 10.7176 80.5072 11.2426 80.2164 11.5309Z"
          stroke="#101010"
          strokeWidth="0.694912"
        />
        <path
          d="M75.588 8.70171C75.588 8.70171 76.1439 9.00367 76.4219 9.44626C76.4219 9.44626 77.2558 7.70898 78.3676 7.12988"
          stroke="#101010"
          strokeWidth="0.694912"
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

const LittleMilestoneOngoing = ({ size = 1, ...props }: SVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "41",
    height: "18",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 41 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="33.5876"
        cy="7.87572"
        r="2.77965"
        fill="#171717"
        fill-opacity="0.3"
      />
      <circle
        cx="33.5876"
        cy="7.87565"
        r="6.94697"
        stroke="#171717"
        stroke-opacity="0.3"
        strokeWidth="0.930859"
      />
      <path
        d="M1 11.9502C12 -5.04962 16.821 28.5485 28 11.9502"
        stroke="#171717"
        stroke-opacity="0.3"
      />
    </svg>
  );
};

const LittleMilestoneCompleted = ({ size = 1, ...props }: SVGProps) => {
  const [w, h] = scaleSize(size, {
    width: "41",
    height: "18",
  });
  return (
    <svg
      fill="none"
      {...props}
      width={w}
      height={h}
      viewBox="0 0 41 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.9502C12 -5.04962 16.821 28.5485 28 11.9502"
        stroke="#A3D5FA"
      />
      <circle
        cx="33.4124"
        cy="7.4124"
        r="6.94697"
        fill="#A3D5FA"
        stroke="#A3D5FA"
        strokeWidth="0.930859"
      />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M36.6509 10.6552H36.6553M36.6509 10.6552C36.3625 10.9413 35.8397 10.87 35.473 10.87C35.023 10.87 34.8063 10.9581 34.4851 11.2793C34.2116 11.5527 33.845 12.045 33.4124 12.045C32.9798 12.045 32.6132 11.5528 32.3397 11.2793C32.0185 10.9581 31.8018 10.87 31.3518 10.87C30.9852 10.87 30.4624 10.9413 30.1739 10.6552C29.8831 10.3669 29.9547 9.84189 29.9547 9.47289C29.9547 9.00661 29.8527 8.7922 29.5206 8.46014C29.0267 7.96619 28.7797 7.71918 28.7797 7.41228C28.7797 7.10537 29.0266 6.8584 29.5206 6.36444C29.817 6.06801 29.9547 5.77428 29.9547 5.35167C29.9547 4.98503 29.8834 4.46222 30.1695 4.17374C30.4578 3.88296 30.9828 3.95453 31.3518 3.95453C31.7744 3.95453 32.0681 3.81691 32.3646 3.52049C32.8585 3.02652 33.1055 2.77954 33.4124 2.77954C33.7193 2.77954 33.9663 3.02652 34.4603 3.52049C34.7566 3.81684 35.0503 3.95453 35.473 3.95453C35.8397 3.95453 36.3625 3.88328 36.651 4.16937C36.9417 4.45772 36.8702 4.98269 36.8702 5.35167C36.8702 5.81797 36.9722 6.03237 37.3042 6.36444C37.7982 6.8584 38.0452 7.10537 38.0452 7.41228C38.0452 7.71918 37.7982 7.96619 37.3042 8.46014C36.9721 8.79219 36.8702 9.00661 36.8702 9.47289C36.8702 9.84189 36.9417 10.3669 36.6509 10.6552Z"
          stroke="#101010"
          strokeWidth="0.694912"
        />
        <path
          d="M32.0226 7.82598C32.0226 7.82598 32.5785 8.12794 32.8565 8.57052C32.8565 8.57052 33.6904 6.83324 34.8022 6.25415"
          stroke="#101010"
          strokeWidth="0.694912"
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
            transform="translate(27.8531 1.85303)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const LastLittleMilestoneSVG = ({
  size = 1,
  completed = false,
  ...props
}: TransactionListSVGProps) => {
  return completed ? (
    <LittleMilestoneCompleted size={size} {...props} />
  ) : (
    <LittleMilestoneOngoing size={size} {...props} />
  );
};

export const LittleMilestoneSVG = ({
  size = 1,
  completed,
  ...props
}: TransactionListSVGProps) => {
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
        stroke={completed ? "#A3D5FA" : "#1717174d"}
      />
    </svg>
  );
};
