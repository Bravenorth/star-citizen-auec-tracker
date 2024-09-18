// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Bleu foncé
        secondary: '#3B82F6', // Bleu clair
        danger: '#EF4444', // Rouge
        success: '#10B981', // Vert
      },
    },
  },
  plugins: [],
}
