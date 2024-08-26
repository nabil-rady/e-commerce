/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ECE7B",
        selected: "#1D1F22",
      },
      flexGrow: {
        5: "5",
      },
    },
  },
  plugins: [],
};
