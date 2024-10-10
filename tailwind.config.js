/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'principal': '#ff0066', // Añadir color personalizado
        'secundario': '#29d884',
        'blanco-artico': '#e6ebf1',
        'blanco-marino': '#f8f9fa',
        'blanco-puro': '#ffffff',
        'amarillo-jonquil': '#ffcc00',
        'azul-brandeis': '#0066ff',
        'azul-oscuro': '#003366',
        'morazul': '#5e00be',
        'grey-basic': '#b1b2b5',
        'grey-dim': '#6b6b6b',
        'negro-carbon': '#1f1f1f',
        'negro-puro': '#000000',
        'degradado-lineal': '#ff0066',
      },

      // backgroundImage: {
      //   'custom-gradient': 'linear-gradient(65deg, rgba(255,0,102,1) 0%, rgba(94,0,190,1) 35%)',
      // },

      fontFamily: {
        'titulo': ['Nunito', 'sans-serif'],
        'sans': ['Poppins', 'sans-serif'],

      },
      lineHeight: {
        '1.2': '1.2',
      },
      fontSize: {
        '26px': '26px', // tamaño personalizado
      },

    },
  },
  plugins: [],
}

