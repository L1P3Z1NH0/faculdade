const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    fontSize: {
      sm: "1rem",
      base: "1.25rem",
      md: "1.5rem",
      l: "1.75rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4.5rem",
      "5xl": "10rem",
    },
    spacing: {
      0: "0",
      1: "0.5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "2.5rem",
      6: "3rem",
      7: "3.5rem",
      8: "4rem",
      9: "4.5rem",
      10: "5rem",
      11: "5.5rem",
      12: "6rem",
      13: "6.5rem",
      14: "7rem",
      15: "7.5rem",
      16: "8rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      "grey-light-50": "#828282",
      "grey-light-30": "#BFC0C0",
      "grey-light-20": "#E0E0E0",
      "primary-80": "#001219",
      "primary-60": "#063040",
      "primary-40": "#0A9396",
      "dark-blue-60": "#2D3142",
      "dark-blue-50": "#373C51",
      "dark-blue-40": "#4C5470",
      "error-20": "#f22e31",
    },
    extend: {
      fontFamily: {
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
        unica: ['"Unica One"', ...defaultTheme.fontFamily.sans],
        martian: ['"Martian Mono"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
