/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        'interviewing': '#95FF9F',
        'rejected': '#FEAD9B',
        'offered': '#5BCEDD',
        'accepted': '#40D24E',
        'declined': '#FF6A49',
        'pending': '#FFFFFF',
        'dark-aqua': "#053B3F",
        'light-aqua': "#41CAB2",
        'bright-pink': "#FF00B8",
        'light-pink': "#D728A6",
        'bright-aqua': "#00FFD1",
        'disabled-aqua': "#237667"
      },
      dropShadow: {
        '3xl': '0px 3px 3px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'genos': ['Genos','ui-san-serif'],
      },
    },
  },
  plugins: [],
}

