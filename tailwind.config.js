/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unicesumar: {
          blue: '#003366',
          orange: '#FF6600',
          dark: '#0f172a'
        }
      }
    },
  },
  plugins: [],
}