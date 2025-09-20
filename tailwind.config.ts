import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "JetBrains Mono",
        ],
      },
      colors: {
        background: "#121212",
        foreground: "#8a8a8d",
        highlight: "#c161b2",
      },
    },
  },
  plugins: [],
} satisfies Config;
