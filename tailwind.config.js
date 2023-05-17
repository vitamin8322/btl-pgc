/** @type {import('tailwindcss').Config} */

const path = require('path');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '200': '200px',
        '265': '265px',
        '300': '300px',
        '348': '348px',
        '450': '450px',
        '62': '62%',
      },
      height: {
        '35': '35px',
        '40': '40px',
        '46': '46px',
        '54': '54px',
        '55': '55px',
        '225': '225px',
        '414':'414px',
        '525':'525px',
        '600':'600px',
      },
      colors:{
        // white: 'rgb(251 252 253)',
        input: '#f1f3f5',
        gray: 'rgb(104, 112, 118)',
        gray2: 'rgb(241, 243, 245)',
        blue1: 'rgb(0, 145, 255)',
        blueHover: 'rgb(0, 129, 241)', 
        default: 'rgb(248, 249, 250);',
        black:'rgb(17, 24, 28)',
        red1: 'rgb(243, 174, 175)',
        red2: 'rgb(255, 239, 239)',
        required: 'rgb(229, 72, 77)',
        requiredHover: 'rgb(229, 72, 77,0.08)',
        green:'rgb(48, 164, 108)',
        greenHover:'rgb(48, 164, 108,0.08)',
        green2:'rgb(233, 249, 238)',
        loading:'rgba(223, 227, 230, 0.3)'
      },
      boxShadow:{
        form: 'rgba(236, 238, 240, 0.5) 0px 10px 5px',
        header: 'rgb(236, 238, 240) 0px 3px 15px',
        table:'rgb(241, 243, 245) 0px 5px 20px'
      },
      inset: {
        '135': '135px',
      },
      margin: {
        '08': '-8px',
      },
      maxWidth:{
        '1170': '1170px',
        '300': '300px',
        '400': '400px'
      },
      minWidth: {
        '128': '128px',
        '150': '150px',
        '175': '175px',
        '211': '211px',
        '290': '290px',
      },
      minHeight: {
        '600': '600px',
      },
      backgroundImage: {
        'hero-pattern': "url('../../assets/image/Calendar.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
      
    },
  },
  plugins: [
    
  ],
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: path.resolve(__dirname, 'node_modules/react-datepicker'),
      },
    ],
  },
}