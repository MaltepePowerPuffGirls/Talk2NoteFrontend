/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': 'url("/assets/home_bg.png")'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}