import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        mono: ["JetBrains Mono"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#e6e6e6",
            primary: "#007f5f",
            secondary: "#80b918",
            success: "#7cb518",
            warning: "#fbb02d",
            danger: "#fb6107",
          },
        },
      },
    }),
  ],
} satisfies Config;
