import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          deep: "#07172D",
          primary: "#0B1F3A",
          secondary: "#153765",
          dark: "#07172D",
          light: "#1C4376",
        },
        corporate: {
          red: "#D71935",
          "red-hover": "#B8142C",
          "red-subtle": "rgba(215, 25, 53, 0.08)",
        },
        brandBlue: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
        },
        surface: {
          bg: "#F4F7FC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
        primaryText: "#102448",
        secondaryText: "#64748B",
        statusSuccess: "#16A34A",
        statusDisabled: "#94A3B8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(11, 31, 58, 0.04), 0 1px 2px -1px rgba(11, 31, 58, 0.04)",
        "card-hover": "0 10px 24px -4px rgba(11, 31, 58, 0.09), 0 4px 8px -2px rgba(11, 31, 58, 0.04)",
        banner: "0 12px 30px -6px rgba(7, 23, 45, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
