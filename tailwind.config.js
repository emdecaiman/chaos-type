/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourcecodepro: ["Source Code Pro", "sans-serif"],
      },
      // https://www.30secondsofcode.org/css/s/zoomin-zoomout-animation/
      animation: {
        zoominout: "zoominout 5s ease infinite",
      },
      keyframes: {
        zoominout: {
          "0%": {
            transform: "scale(0.2)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.2)",
          },
        }
      }
    },
  },
  plugins: [],
}


