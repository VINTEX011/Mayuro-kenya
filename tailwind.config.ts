import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 24px 64px rgba(21, 60, 138, 0.18)",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ['"Manrope"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
