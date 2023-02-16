/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
          xsm: '420px',  
          xm:'480px',
          xs: '540px',
          sm: '640px',
          cz: '664px',
          md: '768px',
          cs:'953px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
    extend: {
    
    },
  },
  plugins: [],
}
