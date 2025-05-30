import React from "react";

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      {...props}
      viewBox="0 0 18 18"
      stroke={props.stroke || "#808080"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.19995 8.9315C8.70895 0.527731 14.3235 0.430824 16.5671 1.43284C17.5691 3.67647 17.4722 9.29098 9.06843 13.8C8.98129 13.299 8.49661 11.9865 7.255 10.7449C6.01339 9.50332 4.70096 9.01864 4.19995 8.9315Z"
        stroke="inherit"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 13.4C11.8342 14.2 12.0087 15.6345 12.235 16.9999C12.235 16.9999 15.6578 14.4697 13.4684 11"
        stroke="inherit"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.59996 7.86835C3.79996 6.23413 2.36546 6.05965 1 5.83327C1 5.83327 3.53022 2.41049 6.99996 4.59991"
        stroke="inherit"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.68274 11.5878C3.22777 12.0427 2.45434 13.3621 3.00029 15C4.63816 15.5459 5.95755 14.7725 6.41251 14.3175"
        stroke="inherit"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7118 5.84448C13.7118 4.98537 13.0154 4.28893 12.1563 4.28893C11.2972 4.28893 10.6007 4.98537 10.6007 5.84448C10.6007 6.70358 11.2972 7.40002 12.1563 7.40002C13.0154 7.40002 13.7118 6.70358 13.7118 5.84448Z"
        stroke="inherit"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default RocketIcon;
