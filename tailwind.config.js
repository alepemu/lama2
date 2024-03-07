/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-side": "bounceX 3s infinite;",
        "spin-slow": "spin 1.5s linear infinite",
      },
      keyframes: {
        bounceX: {
          "0%, 100%": {
            transform: "translateX(-125px)",
            "animation-timing-function": "ease-in-out",
          },
          "50%": {
            transform: "translateX(125px)",
            "animation-timing-function": "ease-in-out",
          },
        },
      },
    },
  },
  plugins: [],
};
