import React from "react";

const Ethereum = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="9"
      height="15"
      fill="none"
      {...props}
      viewBox="0 0 9 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M4.41944 0L4.32291 0.328105V9.84894L4.41944 9.9453L8.83892 7.33297L4.41944 0Z"
          fill="inherit"
        />
        <path
          d="M4.41948 0L0 7.33297L4.41948 9.94534V5.32421V0Z"
          fill="inherit"
        />
        <path
          d="M4.41945 11.3832L4.36505 11.4496V14.8411L4.41945 15L8.84159 8.77222L4.41945 11.3832Z"
          fill="inherit"
        />
        <path d="M4.41948 15V11.3832L0 8.77222L4.41948 15Z" fill="inherit" />
        <path
          d="M4.41943 9.94528L8.83885 7.33298L4.41943 5.32422V9.94528Z"
          fill="inherit"
        />
        <path
          d="M0 7.33298L4.41941 9.94532V5.32422L0 7.33298Z"
          fill="inherit"
        />
      </g>
    </svg>
  );
};

export default Ethereum;
