/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#17B294",
        black: "#232859",
        black2: "#3A3B45",
        "black-50": "rgba(0, 0, 0, 0.5)",
        milk: "#F9F9FE",
        milkLight: "#F7F7FD",
        blue: "#7A89FE",
        blueLight: "#C6CCFE",
        gray: {
          100: "#D6DFE8",
          200: "#F2F2F2",
          300: "#8C8FA7",
          400: "#D6DFE8",
          500: "#EEF0F3",
          600: "#B4B8D6",
        },
        redLight: "#FF7E7E",
        red: "#F56161",
        green: "#17B294",
        orange: "#FB8477",
        "blue-10": "rgba(122, 137, 254, 0.1)"
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        md: "18px",
        xl: "20px",
        "2xl": "26px",
        "3xl": "",
        "4xl": "40px",
      },
      fontFamily: {
        "main-regular": ["poppins-regular", "sans-serif"],
        "main-semibold": ["poppins-semibold", "sans-serif"],

        "secondary-regular": ["inter-regular", "sans-serif"],
        "secondary-medium": ["inter-medium", "sans-serif"],
        "secondary-semibold": ["inter-semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
