module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-dark': '#454545',
        'light-black': '#ced4da',
        'light-blue': '#80bdff',
      },
      boxShadow: {
        0: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      },
      flex: {
        2: '0 0 50%',
        3: '0 0 100%',
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
};
