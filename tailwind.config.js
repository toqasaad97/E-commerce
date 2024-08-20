/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
container: {
  center: true,
  padding: '3rem',

    },
    colors: {
      'light-blue-500': '#d1eaff', 
    },
  },
  plugins: [],}}