/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#6256CA',
        'yellow': '#FDFAD9',
        'green': '#C1E2A4',
        'green-secondary': '#86D293',
      }
    },
  },
  plugins: [],
}
