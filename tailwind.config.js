/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noc: {
          950: '#030712',
          900: '#0b132b',
          800: '#111c3a',
          700: '#1e2d5c',
          accent: '#00e5ff',
        }
      }
    },
  },
  plugins: [],
};