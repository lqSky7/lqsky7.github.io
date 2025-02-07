/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'medium-slate': '#7576DE',
        'tropical-indigo': '#8479D9',
        'tropical-indigo-2': '#9183E6',
        'rich-black': '#080A18',
        'rich-black-2': '#0A0B1E',
      },
      fontFamily:{
        harmonyLight:["harmonyLight"],
        harmonyThin: ["harmonyThin"],
        harmonyReg: ["harmonyReg"],   
        // to import these fonts, use @fontfamly boilerplate in input css file, add paths there, and by what name u are importing there, use that inside the array, for what name u want it to appear while using tailiwind, use name: ["array"], use multiple backupfonts in array just in case first one doesn't work.
      },


      animation: {
        typewriter: "typewriter 2s steps(100) forwards",
        fade: 'fadeOut 5s ease-in-out',

      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%"
          }
        }   
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),
    require('@tailwindcss/typography')],
}

