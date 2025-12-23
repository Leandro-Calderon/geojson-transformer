/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          700: "#4f46e5",
        },
        accent: {
          DEFAULT: "#fb923c",
          600: "#ea580c",
        }
      }
    },
  },
  plugins: [],
}