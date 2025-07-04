import { cn } from "@/components/cn";
import React from "react";
import SeaLife1 from './sea-life-1.png'

/**
 * @dev this is the water body svg just like in the figma
 * @see https://www.figma.com/design/7fm49E3MCDmSKfUj6hyslW/Easymilestones?node-id=361-105&t=a2OAbZO5LFSUbd8d-1
 * @dev animate the elements here, water body to move and plants to move
 */
const WaterBodySVGFull = ({
  className = "fixed bottom-10 z-10 left-0 min-w-[100vw] ",
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
        <img src={SeaLife1} alt="plant" className="absolute w-[120px] -bottom-20 left-[5%] z-[15] " />
        <svg
          width="41"
          height="120"
          viewBox="0 0 41 120"
          fill="none"
          className="absolute -bottom-20 left-[55%] rotate-3 z-[15] "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.1223 41.3474C32.8465 48.9247 29.7997 57.0829 32.7542 66.35C34.4424 71.6964 36.2626 78.1517 33.4268 83.2341C32.2486 85.3463 30.7977 87.3176 29.0743 89.1481C23.7062 94.8377 25.988 103.049 23.4556 109.834C22.0751 113.504 19.7626 116.611 16.518 119.154C14.1439 120.989 12.8117 119.51 11.1894 117.834C4.13307 110.534 -1.35376 100.831 0.29492 90.7322C0.78293 87.7488 2.23377 84.9898 4.76615 83.2473C12.4688 77.9405 16.7026 72.1717 13.3525 62.5218C10.5431 54.4032 7.36448 46.7598 13.4712 39.1824C15.6606 36.4806 17.7885 33.6776 19.8549 30.7734C25.8825 22.2984 27.3729 10.9851 27.6894 0.595967C27.6932 0.500768 27.7188 0.407691 27.7643 0.323995C27.8098 0.2403 27.8739 0.168231 27.9517 0.113339C28.0295 0.0584463 28.1189 0.0222099 28.2129 0.00746677C28.307 -0.00727638 28.4031 -0.000118587 28.494 0.028335C29.1271 0.221949 29.5799 0.626757 29.8525 1.2428C34.0863 10.8663 38.729 20.239 40.4568 30.8262C41.0504 34.4565 40.2326 38.3112 38.1223 41.3474Z"
            fill="#425A2B"
          />
        </svg>
        <svg
          width="41"
          height="120"
          viewBox="0 0 41 120"
          fill="none"
          className="absolute -bottom-14 left-[69%] rotate-3 z-[16] "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.1223 41.3474C32.8465 48.9247 29.7997 57.0829 32.7542 66.35C34.4424 71.6964 36.2626 78.1517 33.4268 83.2341C32.2486 85.3463 30.7977 87.3176 29.0743 89.1481C23.7062 94.8377 25.988 103.049 23.4556 109.834C22.0751 113.504 19.7626 116.611 16.518 119.154C14.1439 120.989 12.8117 119.51 11.1894 117.834C4.13307 110.534 -1.35376 100.831 0.29492 90.7322C0.78293 87.7488 2.23377 84.9898 4.76615 83.2473C12.4688 77.9405 16.7026 72.1717 13.3525 62.5218C10.5431 54.4032 7.36448 46.7598 13.4712 39.1824C15.6606 36.4806 17.7885 33.6776 19.8549 30.7734C25.8825 22.2984 27.3729 10.9851 27.6894 0.595967C27.6932 0.500768 27.7188 0.407691 27.7643 0.323995C27.8098 0.2403 27.8739 0.168231 27.9517 0.113339C28.0295 0.0584463 28.1189 0.0222099 28.2129 0.00746677C28.307 -0.00727638 28.4031 -0.000118587 28.494 0.028335C29.1271 0.221949 29.5799 0.626757 29.8525 1.2428C34.0863 10.8663 38.729 20.239 40.4568 30.8262C41.0504 34.4565 40.2326 38.3112 38.1223 41.3474Z"
            fill="#425A2B"
          />
        </svg>
      </div>
    </div>
  );
};

export default WaterBodySVGFull;
