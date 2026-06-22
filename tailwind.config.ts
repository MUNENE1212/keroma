import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: "#B5482A",
          deep: "#7A2E1A",
          soft: "#E8C9BC",
        },
        cream: {
          DEFAULT: "#F5EFE6",
          warm: "#EFE6D7",
        },
        bone: "#F9F4EB",
        moss: {
          DEFAULT: "#2C4A3E",
          soft: "#C8D5CE",
        },
        saffron: {
          DEFAULT: "#D6A437",
          soft: "#F0DCAB",
        },
        ink: {
          DEFAULT: "#1F1B17",
          soft: "#5C544B",
        },
        mist: "#E8DFD3",
        error: "#A8321F",
        success: "#2C4A3E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.875rem",
        xl: "1.25rem",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        "out-quad": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;