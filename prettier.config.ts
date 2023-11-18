import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  // important: true,
  theme: {
    extend: {
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography, forms],
} satisfies Config;
