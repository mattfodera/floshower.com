/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'led-green': '#00FF00',
        'led-red': '#FF0000',
        'dark-charcoal': '#1F1F1F',
        'darker-charcoal': '#151515',
        'light-charcoal': '#2A2A2A',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'led-green': '0 0 8px #00FF00',
        'led-red': '0 0 8px #FF0000',
      },
    },
  },
  plugins: [],
}