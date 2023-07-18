import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        svh: "100svh",
      },
    },
  },
  plugins: [],
} satisfies Config;
