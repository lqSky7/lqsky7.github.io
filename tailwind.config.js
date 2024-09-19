/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily:{
        harmonyLight:["harmonyLight"],
        harmonyThin: ["harmonyThin"],
        harmonyReg: ["harmonyReg"],   
        // to import these fonts, use @fontfamly boilerplate in input css file, add paths there, and by what name u are importing there, use that inside the array, for what name u want it to appear while using tailiwind, use name: ["array"], use multiple backupfonts in array just in case first one doesn't work.
      },

    },
  },
  plugins: [],
}

