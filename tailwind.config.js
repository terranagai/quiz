/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F5F5F0',
        'stone': {
          100: '#F8F7F5',
          200: '#E8E6E1',
          300: '#D3CEC4',
          400: '#B8B2A7',
          500: '#A39E93',
          600: '#857F72',
          700: '#625D52',
          800: '#504A40',
          900: '#423D33'
        }
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '0.25em'
      }
    },
  },
  plugins: [],
} 