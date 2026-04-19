import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        metaShadow: "rgba(112, 120, 128, 1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-heavy": {
          "text-shadow": "3px 3px 0px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-game": {
          "text-shadow": "2px 2px 0px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-none": {
          "text-shadow": "none",
        },
        ".text-bloom": {
          "text-shadow": "0 0 8px rgba(255, 255, 255, 0.5), 2px 2px 0px rgba(0, 0, 0, 0.4)",
        },
        ".text-bloom-heavy": {
          "text-shadow": "0 0 12px rgba(255, 255, 255, 0.7), 3px 3px 0px rgba(0, 0, 0, 0.6)",
        },
      });
    }),
  ],
} satisfies Config;