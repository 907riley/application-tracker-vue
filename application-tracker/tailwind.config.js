/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    gridTemplateColumns: {
      'layout-col': '120px repeat(11, minmax(0, 1fr))'
    },
    gridTemplateRows: {
      // Simple 8 row grid
      '8': 'repeat(8, minmax(0, 1fr))',
      'layout-row': '120px repeat(7, minmax(0, 1fr))',
    },
    gridRow: {
      'span-7': 'span 7 / span 7'
    },
    colors: {
      'light-blue-custom': '#AEDBFF',
      'dark-blue-custom': '#6B98BB',
    },
    dropShadow: {
      '3xl': '0px 3px 3px rgba(0, 0, 0, 0.5)',
    },
    fontFamily: {
      'genos': ['Genos','ui-san-serif'],
    },
    extend: {},
  },
  plugins: [],
}

