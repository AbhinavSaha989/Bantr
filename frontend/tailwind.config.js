/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ipadPro: "1025px", // Define a breakpoint for iPad Pro width
      },
    },
  },
  plugins: [],
};
