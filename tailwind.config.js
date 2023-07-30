/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      light: {
        main: '#F6F6F6',
        white: '#FFFF',
        title: {
          main: '#2E3271',
        }
      },
      dark: {
        main: '#291e28',
        title: {
          main: '#FFFF',
        },
        black: {
          10: '#523d50',
          20: '#493648',
          30: '#413040',
          40: '#392a38',
          50: '#312430',
          60: '#291e28',
          70: '#201820',
          80: '#181218'
        },
        gray: {
          10: '#090a30',
          20: '#212244',
          30: '#3a3a59',
          40: '#52536e',
          50: '#6b6c82',
          60: '#848497',
          70: '#9c9dac',
          80: '#b5b5c0',
          90: '#cdced5',
          100: '#e6e6ea',
        }
      }
    },
  },
  extend: {

  },
  plugins: [],
}
