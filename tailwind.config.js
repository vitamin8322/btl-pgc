/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '300': '300px',
        '348': '348px',
        '450': '450px'
      },
      height: {
        '46': '46px',
        '414':'414px'
      },
      colors:{
        input: '#f1f3f5',
        gray: 'rgb(104, 112, 118)',
        blue1: 'rgb(0, 145, 255)',
        blueHover: 'rgb(0, 129, 241)', 
        default: 'rgb(248, 249, 250);',
        red1: 'rgb(243, 174, 175)',
        red2: 'rgb(255, 239, 239)',
        red3: 'rgb(229, 72, 77)'
      },
      boxShadow:{
        form: 'rgba(236, 238, 240, 0.5) 0px 10px 5px'
      },
      inset: {
        '135': '135px',
      },
      margin: {
        '08': '-8px',
      }
    },
  },
  plugins: [],
}