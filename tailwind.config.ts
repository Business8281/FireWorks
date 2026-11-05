import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Inter'",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'SF Mono'",
          "'Fira Code'",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        elevated: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
        brand: "0 4px 14px 0 rgba(29, 100, 242, 0.28)",
      },
      colors: {
        brand: {
          blue: "#1D64F2",
          blueHover: "#1654cc",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#1D64F2",
          700: "#1654cc",
          800: "#1e40af",
          950: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
