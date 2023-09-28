/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      filter: ['hover', 'focus'],
      colors: {
        'saddle-brown': '#a65111',
        'olive-green': {
          800: '#ced59d',
          900: '#c6d081',
        },
        'honey-yellow': {
          800: '#e8b713',
          900: '#ddaa00',
        },
        'dark-olive-green': {
          800: '#a87f53',
          900: '#7c5d3d',
        },
        'light-slate-gray': {
          800: '#a4c7c7',
          900: '#85aaaa',
        },
        'blue-berry': {
          300: '#59798a',
          500: '#477283',
          800: '#25637a',
          900: '#173f4e',
        },
        tomato: {
          700: '#f88265',
          800: '#f67454',
          900: '#F06543',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
