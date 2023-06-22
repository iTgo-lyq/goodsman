/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[tw-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
  theme: {
    extend: {
      borderColor: {
        gray: "var(--color-border)",
      },
    },
  },
};
