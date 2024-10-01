import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#00A54F",
        "tx": "#272727",
        "tx2": "#717171",
        "bg": "#FFFFFF",
        "bg2": "#F5F5F5",
        "bg3": "#E0FAEF",
        "bgDanger": "#FFE9E9",
        "strokeDanger": "#CC1011",
        "primaryHover": "#085f33",
      }
    },
  },
  plugins: [],
};
export default config;
