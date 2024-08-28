/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js,jxs,ts,tsx}"],
  theme: {
    sm:"480px",
    md:"768",
    lg:"1200px",
    xl:"1440",
    extend: {
      colors:{
        myBlue:"#0a3283",
        myPink:"#bd3650"
      }
    },
  },
  plugins: [],
};

