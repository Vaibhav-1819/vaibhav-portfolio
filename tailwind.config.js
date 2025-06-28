// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        modern: ['"Inter"', 'sans-serif'],
      },
      colors: {
        mkbhdRed: {
          DEFAULT: '#FF0000',
          dark: '#CC0000',
        },
        mkbhdBlack: {
          DEFAULT: '#0F0F0F',
          light: '#1A1A1A',
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Optional animation plugin
  ],
};
