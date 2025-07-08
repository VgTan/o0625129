/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('/src/assets/images/BGShopsmart.svg')",
        "game-bg": "url('/src/assets/images/gamebg.svg')",
      },
      fontFamily: {
        baloo: ['"Baloo 2"', "cursive"],
        nanum: ['"Nanum Gothic"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        "orange": "#cc6d28",
        "dark-orange": "#efad47",
        "light-orange": "#f3c676",
        "light-blue": "#a9d3ef",
        "input-blue": "#c5e2f5",
        "button-blue": "#95baf1",
      },
      screens: {
        landscape: { raw: "(orientation: landscape)" },
      },
    },
  },
  plugins: [],
};
