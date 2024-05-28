import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: "Poppins",
        baloo: "Baloo",
        "baloo-2": "'Baloo 2'",
        lato: "Lato",
        quicksand: "Quicksand",
        "paytone-one": "'Paytone One'",
        "barlow-condensed": "'Barlow Condensed'",
        inherit: "inherit",
        "baloo-bhaijaan": "'Baloo Bhaijaan'",
        inter: "Inter",
      },
      colors: {
        primary: "#cb6f04",
      }
    },
  },
  plugins: [nextui()],
};
export default config;
