/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // The main HTML file
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          300: "#e0e0e0",
        },
      },
    },
  },
  plugins: [],
};

