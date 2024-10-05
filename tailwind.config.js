/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 10s linear infinite', // Change the duration as needed
        },
        fontFamily: {
          righteous: ['Righteous', 'sans-serif'],
          magra: ['Magra', 'sans-serif'],
          Megrim: ['Megrim', 'sans-serif'],
        },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: '#eff0f3',
        sec: '#1E1E1E',
        thr: '#A1DD70',
      },
    },
  },
  plugins: [],
};
