/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: { 
    colors: {
      'light-blue-custom': '#AEDBFF',
      'dark-blue-custom': '#6B98BB',
    },
    extend: {},
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}

