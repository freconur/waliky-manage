/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard': '250px 1fr',
      },
      bgCutomize: {
        'prueba': '#ffffff54'
      }
    },
  },
  plugins: [],
}
