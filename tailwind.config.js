// tailwind.config.js
module.exports = {
  darkMode: 'class', // <-- Important!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        modern: ['"Inter"', 'sans-serif'],
      },
      colors: {
        mkbhdRed: '#FF0000',
        mkbhdBlack: '#0F0F0F',
      },
    },
  },
  plugins: [],
}
