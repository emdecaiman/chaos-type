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
        zoominout: "zoominout 10s ease-in-out",
        wiggle: "wiggle 0.1s ease-in-out"
      },
      keyframes: {
        zoominout: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.25)",
          },
        },
        wiggle: {
          "0%": {
            transform: "translate(-5px,0)",
          },
          "50%": {
            transform: "translate(5px,0)",
          },
          "100%": {
            transform: "translate(-5px,0)",
          },
        }
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}


