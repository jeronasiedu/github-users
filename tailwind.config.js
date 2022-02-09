module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        primary: '#22242c',
        secondary: '#16181d',
        other: '#3c4049',
      },
    },
  },
  plugins: [],
}
