/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js,jxs,ts,tsx}"],
  theme: {
    sm:"480px",
    md:"768px",
    lg:"1200px",
    xl:"1440px",
    extend: {
      colors:{
        myBlue:"#0a3283",
        myPink:"#bd3650",
      },
     backgroundImage: (theme) =>({
      pattern:
      "url('https://wallpapersafari.com/image/whatsapp-backgrounds.jpg')",
    }),
    },
  },
  plugins: [],
};

