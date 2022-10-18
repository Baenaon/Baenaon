/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Jalnan", "ui-sans-serif"],
      },
      color: {
        themecolor: "#42DDBB",
      },
    },
  },
  plugins: [],
};
