import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        svh: "100svh",
      },
      backgroundColor: {
        primary: "#6aabe5",
      },
    },
  },
  plugins: [],
} satisfies Config;
