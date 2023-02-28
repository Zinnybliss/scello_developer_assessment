/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [
    // Example content paths...
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        textVariantColor: "#6E6893",
        textPrimaryColor: "#25213B",
        primaryColor: "#6D5BD0",
        backgroundColor: "#F2F0F9",
        lightBg: "#C6C2DE",
        lightBg2: "#D9D5EC",
      },
    },
  },

  plugins: [],
};
