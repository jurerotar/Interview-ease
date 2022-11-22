const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['pages/**/*.tsx', 'src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: [
        'var(--montserrat-font)',
        ...defaultTheme.fontFamily.sans
      ],
    },
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  plugins: [typography],
};
