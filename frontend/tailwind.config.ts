import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f0f7fe",
          "100": "#dcedfd",
          "200": "#c1e1fc",
          "300": "#a3d5fa",
          "400": "#65b5f5",
          "500": "#4196f0",
          "600": "#2c79e4",
          "700": "#2363d2",
          "800": "#2351aa",
          "900": "#224686",
          "950": "#192c52",
        },
        "em-black": "#101010",
        "em-secondary-text": "#808080",
        "em-tertiary": "#4CABEF"
      },
      fontFamily: {
        Satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
