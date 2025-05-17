import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        Bricolage_Grotesque: ["Bricolage_Grotesque", "sans-serif"],
      },
      colors: {
        em: {
          primary: "#E7F8FD",
          secondary: '#A3D5FA',
          dark: "#101010",
          text: '#808080',
          tertiary: '#4CABEF',
          green: '#05DF72'
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".fade-animation": {
          animation: "fade 1s linear infinite",
        },
        "@keyframes fade": {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0.25",
          },
        },
      });
    }),
  ],
};
export default config;
