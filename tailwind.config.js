/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,jsx}", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        mycolorfrom:"rgba(120, 120, 120, 0.34)",
        mycolorto:"rgba(61, 61, 61, 0.3)",
        cardcolor:"rgba(34, 34, 34, 0.66)"
      },
      backgroundImage:{
        'termSale': "url('../images/BackUSages.svg)",
      },
      backgroundSize:{
        '90':'90%',
        '80':'80%',
        '70':'70%',
        '60':'60%',
        '50':'50%',
        '40':'40%',
        '150':'150%',
        '140':'140%',
        '120':'120%',
        '110':'110%',
      }
    },
  },
  plugins: [],
}

