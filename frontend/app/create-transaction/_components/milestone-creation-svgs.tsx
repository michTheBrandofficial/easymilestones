import { scaleSize } from "@/lib/utils";
import React from "react";

type MilestoneCreationSVGProps = {
  size?: 1 | (number & {});
};

const BRANCH_COLOR = "#A3D5FA";

const Branch: React.FC<MilestoneCreationSVGProps> = ({ size = 1, ...props }) => {
  const [w, h] = scaleSize(size, {
    width: "45",
    height: "100",
  });
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 45 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.10168 0C2.10168 75 2.10169 98 44.8887 98"
        stroke={BRANCH_COLOR}
        strokeWidth="2.7"
      />
    </svg>
  );
};

const StreamFlow: React.FC<MilestoneCreationSVGProps> = ({ size = 1, ...props }) => {
  const [w, h] = scaleSize(size, {
    width: "35",
    height: "73",
  });
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 35 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32.7841 -0.17197C37.963 64.5515 -11.5 -15.7932 5.00008 72.2068" stroke={BRANCH_COLOR} strokeWidth="2.7"/>
    </svg>
  );
};

export const MilestoneCreationSVGs = {
  Branch,
  StreamFlow,
}