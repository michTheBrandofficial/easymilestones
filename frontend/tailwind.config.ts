import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        em: {
          'primary': "#FFFFFF",
          'sky-blue': "#A3D5FA",
          'dark': '#101010',
          'light-dark': '#808080',
          'blue': "#4CABEF"
        }
      }
    },
  },
  plugins: [],
};
export default config;
