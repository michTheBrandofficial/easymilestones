const MilestoneBranch: React.FC<{
  sanePeoplesIndex: number;
  index: number;
}> = ({ sanePeoplesIndex, index }) => {
  if (sanePeoplesIndex === 1)
    return (
      <svg
        key={index}
        height="160"
        viewBox="0 0 36 163"
        fill="none"
        className="w-fit"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
          stroke="#4CABEF"
          strokeWidth="2.3949"
        />
        <circle
          cx="5.32201"
          cy="5.32201"
          r="5.32201"
          transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
          fill="#4CABEF"
        />
        <circle
          cx="14.192"
          cy="14.192"
          r="13.3009"
          transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
          stroke="#4CABEF"
          strokeWidth="1.78225"
        />
      </svg>
    );
  if (sanePeoplesIndex === 2)
    return (
      <svg
        key={index}
        height="160"
        viewBox="0 0 36 163"
        fill="none"
        className="-mt-1 ml-2 w-fit "
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
          stroke="#4CABEF"
          strokeWidth="2.3949"
        />
        <circle
          cx="14.77"
          cy="148.268"
          r="5.32201"
          transform="rotate(92.1494 14.77 148.268)"
          fill="#4CABEF"
        />
        <circle
          cx="14.7699"
          cy="148.268"
          r="13.3009"
          transform="rotate(92.1494 14.7699 148.268)"
          stroke="#4CABEF"
          strokeWidth="1.78225"
        />
      </svg>
    );
  switch (sanePeoplesIndex % 2) {
    case 1:
      return (
        <svg
          key={index}
          height="160"
          viewBox="0 0 36 163"
          fill="none"
          className="-mt-[3px] w-fit "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9591 1.37759C-39.047 55.8487 63.6376 68.9745 25.0158 136.11"
            stroke="#4CABEF"
            strokeWidth="2.3949"
          />
          <circle
            cx="5.32201"
            cy="5.32201"
            r="5.32201"
            transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 15.0396 142.695)"
            fill="#4CABEF"
          />
          <circle
            cx="14.192"
            cy="14.192"
            r="13.3009"
            transform="matrix(0.0375053 0.999296 0.999296 -0.0375053 5.84314 134.164)"
            stroke="#4CABEF"
            strokeWidth="1.78225"
          />
        </svg>
      );
    case 0:
      return (
        <svg
          key={index}
          height="160"
          viewBox="0 0 36 163"
          fill="none"
          className="-mt-[3px] ml-2 w-fit "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3683 1.83251C74.3744 56.3036 -28.3102 69.4295 10.3116 136.565"
            stroke="#4CABEF"
            strokeWidth="2.3949"
          />
          <circle
            cx="14.77"
            cy="148.268"
            r="5.32201"
            transform="rotate(92.1494 14.77 148.268)"
            fill="#4CABEF"
          />
          <circle
            cx="14.7699"
            cy="148.268"
            r="13.3009"
            transform="rotate(92.1494 14.7699 148.268)"
            stroke="#4CABEF"
            strokeWidth="1.78225"
          />
        </svg>
      );
  }
};

export default MilestoneBranch
