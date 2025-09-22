import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono"],
      },
      // Colors taken from the themery.nvim palette: https://github.com/tahayvr/themery.nvim/blob/e5005cf2f2fbf18749e4f54e99bff56a3e1c11e1/lua/themery/colors.lua#L3
      colors: {
        // CORE BACKGROUND SHADES (dark → light)
        bg: {
          // bg0: Extreme darkest background. Use sparingly (e.g. backdrop, contrast)
          0: "#0D0D0D",
          // bg1: Primary editor background (Normal). Change this first when theming.
          1: "#121212",
          // bg2: Secondary surface (CursorLine, popup menus, subtle panels, selection bg)
          2: "#333333",
          // bg3: Elevated / emphasized surface (statusline, tabline selected, titles)
          3: "#212121",
        },

        // CORE FOREGROUNDS (bright → dim)
        fg: {
          // fg0: Maximum contrast foreground (headings, strong emphasis)
          0: "#FFFFFF",
          // fg1: Primary text (Normal fg). Your main readable color.
          1: "#EAEAEA",
          // fg2: Secondary text (less important content, doc strings, mild dim)
          2: "#BEBEBE",
          // fg3: Tertiary / subtle text (line numbers, inactive, meta info)
          3: "#8A8A8D",
        },

        // SELECTION & MISC
        selection: {
          // selbg: Visual selection background, also used for inverse accents
          bg: "#262626",
          // selfg: Foreground inside selected regions (ensure contrast vs selbg)
          fg: "#EAEAEA",
        },

        // comment: Comment text + doc annotations (generally muted)
        comment: "#8A8A8D",

        // ACCENT / SEMANTIC COLOR SLOTS
        accent: {
          // color1: Error / critical / strong statement (used for errors, statements, git removed)
          error: "#FF3E55",
          // color2: Primary accent / info highlight (mode indicators, roots, success/add)
          primary: "#00D6D1",
          // color3: Attention / todo / highlight matches (TODO tags, search matches)
          warning: "#FFD447",
          // color4: Modified / constant / neutral warm accent (constants, modified files)
          info: "#5A7CFF",
          // color5: Type / secondary accent / soft alert (types, replace mode, interface)
          secondary: "#FF7DEB",
          // color6: Keywords / strong structural tokens / alternate error (keywords, visual mode bg, directives)
          success: "#4CFF8F",
        },

        // UI DECORATIVE & LOW EMPHASIS ELEMENTS
        ui: {
          // uic1: Borders, separators, guides, non-content structural UI
          border: "#5C6370",
        },
      },

      // Semantic color mappings for common use cases
      backgroundColor: {
        primary: "#121212", // bg1
        secondary: "#333333", // bg2
        elevated: "#212121", // bg3
        backdrop: "#0D0D0D", // bg0
      },

      textColor: {
        primary: "#EAEAEA", // fg1
        secondary: "#BEBEBE", // fg2
        muted: "#8A8A8D", // fg3
        emphasis: "#FFFFFF", // fg0
      },

      borderColor: {
        default: "#5C6370", // uic1
      },
    },
  },
  plugins: [],
} satisfies Config;
