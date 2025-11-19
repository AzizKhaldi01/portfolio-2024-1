/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
        screens: {
          '3xl': '1620px',
          '4xl': '1920px',
        },
        animation: {
          'spin-slow': 'spin 10s linear infinite', // Change the duration as needed
        },
        fontFamily: {
          righteous: ['var(--font-cabinetGrotesk)', 'sans-serif'],
          magra: ['Magra', 'sans-serif'],
          Megrim: ['Megrim', 'sans-serif'],
          lora: ['var(--font-lora)', 'serif'],
          cabinetGrotesk: ['var(--font-cabinetGrotesk)', 'sans-serif'],
        },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: '#e7e7e7',
        sec: '#1E1E1E',
        thr: '#D4F534',
      },
    },
  },
  plugins: [],
};
