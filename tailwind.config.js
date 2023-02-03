/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*{html,js,jsx}'],
  theme: {
    extend: {
      color: {
        ...colors,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
