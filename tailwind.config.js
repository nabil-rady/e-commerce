/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ECE7B",
        darkGray: "#1D1F22",
      },
      flexGrow: {
        5: "5",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};
