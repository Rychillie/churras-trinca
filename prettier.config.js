module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cvar", "twMerge"],
};