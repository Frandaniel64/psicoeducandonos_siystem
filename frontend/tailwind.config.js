/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f1f5f9',
          DEFAULT: '#3b82f6', // Azul que denota calma y confianza
          dark: '#1e3a8a',
          accent: '#10b981', // Verde suave para esperanza/vida
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
