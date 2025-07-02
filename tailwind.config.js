/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: '#2846D0',
        secondary: '#FFFFFF',
        lightBlue: '#AAB2FF',
        lightGray: '#EDEFFC',
        black: '#000000',
        carbs: '#FFAE38',
        fat: '#F45641',
        protein: '#72A91B',
        darkGray: '#BBBBBB',
        // Dark theme colors
        darkPrimary: '#3A5AE8',
        darkSecondary: '#1A1A1A',
        darkLightBlue: '#8A94E8',
        darkLightGray: '#2A2A2A',
        darkBlack: '#FFFFFF',
        darkCarbs: '#FFB84D',
        darkFat: '#FF6B59',
        darkProtein: '#8BC034',
        darkDarkGray: '#666666',
      },
    },
  },
  plugins: [],
}
