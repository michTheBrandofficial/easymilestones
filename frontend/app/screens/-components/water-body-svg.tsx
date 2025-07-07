import { cn } from "@/components/cn";
import React from "react";


/**
 * @dev this is the water body svg just like in the figma
 * @see https://www.figma.com/design/7fm49E3MCDmSKfUj6hyslW/Easymilestones?node-id=361-105&t=a2OAbZO5LFSUbd8d-1
 */
const WaterBodySVG = ({
  className = "fixed bottom-5 z-10 left-0 min-w-[100vw] ",
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className={cn("", className)}>
      <div className="relative min-w-full h-40 flex justify-center">
        {/* first layer */}
        <svg
          width="485"
          height="360"
          viewBox="0 0 485 360"
          fill="none"
          className="absolute top-1 z-[11] "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M216.738 53.3178C154.901 30.8011 47.0221 55.9784 0.812378 71.3816L5.43335 358.722L476.353 354.521C486.715 250.479 493.996 35.422 440.225 7.52816C373.011 -27.3392 294.034 81.4638 216.738 53.3178Z"
            fill="url(#paint0_linear_519_140)"
            fillOpacity="0.62"
            stroke="white"
            strokeWidth="0.840177"
          />
          <defs>
            <linearGradient
              id="paint0_linear_519_140"
              x1="242.233"
              y1="0.561529"
              x2="210.857"
              y2="266.058"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3AA3F0" />
              <stop offset="1" stopColor="#093F66" />
            </linearGradient>
          </defs>
        </svg>
        {/* second layer */}
        <svg
          width="507"
          height="377"
          viewBox="0 0 507 377"
          fill="none"
          className="absolute z-[12] "
          xmlns="http://www.w3.org/2000/svg"
        >
          <foreignObject
            x="-3.07323"
            y="-3.36071"
            width="513.348"
            height="383.121"
          >
            <div
              style={{
                backdropFilter: "blur(1.68px)",
                clipPath: "url(#bgblur_0_519_141_clip_path)",
                height: "100%",
                width: "100%",
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="3.36071"
            d="M280.352 55.4428C345.235 31.7794 458.428 58.2389 506.914 74.4265L502.066 376.399L7.94815 371.985C-2.9245 262.645 -10.5648 36.6357 45.8555 7.3214C116.381 -29.3215 199.248 85.022 280.352 55.4428Z"
            fill="#45B1FF"
            fillOpacity="0.66"
          />
          <defs>
            <clipPath
              id="bgblur_0_519_141_clip_path"
              transform="translate(3.07323 3.36071)"
            >
              <path d="M280.352 55.4428C345.235 31.7794 458.428 58.2389 506.914 74.4265L502.066 376.399L7.94815 371.985C-2.9245 262.645 -10.5648 36.6357 45.8555 7.3214C116.381 -29.3215 199.248 85.022 280.352 55.4428Z" />
            </clipPath>
          </defs>
        </svg>
        {/* third layer */}
        <svg
          width="600"
          height="359"
          viewBox="0 0 600 359"
          fill="none"
          className="absolute top-3 z-[13] "
          xmlns="http://www.w3.org/2000/svg"
        >
          <foreignObject
            x="-3.36071"
            y="-2.87682"
            width="606.721"
            height="364.822"
          ></foreignObject>
          <path
            data-figma-bg-blur-radius="3.36071"
            d="M229.902 3.18978C303.824 -19.3116 538.667 106.952 600 71.4409L594.476 358.585L31.5259 354.387C19.1387 250.416 -32.7538 59.2105 31.5259 31.3357C111.876 -3.50775 137.5 31.3165 229.902 3.18978Z"
            fill="#43ACF7"
            fillOpacity="0.46"
          />
          <defs>
            <clipPath
              id="bgblur_0_519_142_clip_path"
              transform="translate(3.36071 2.87682)"
            >
              <path d="M229.902 3.18978C303.824 -19.3116 538.667 106.952 600 71.4409L594.476 358.585L31.5259 354.387C19.1387 250.416 -32.7538 59.2105 31.5259 31.3357C111.876 -3.50775 137.5 31.3165 229.902 3.18978Z" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default WaterBodySVG;
