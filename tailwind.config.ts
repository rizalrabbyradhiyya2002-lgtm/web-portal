import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#17284B",
        "navy-light": "#20365F",
        hpio: "#C82032",
      },
    },
  },
  plugins: [],
};

export default config;
