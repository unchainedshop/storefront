module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-light-dark': '#454545',
        'light-black': '#ced4da',
        'light-blue': '#80bdff',
        'color-brand': '#232323',
        'color-brand-lightest': '#e7e7e7',
        'color-brand-darker': '#121212',
        'color-dark': '#232323',
        'color-grey-lightest': '#ececec',
        'color-danger-100': '#FEE2E2',
        'color-danger-200': '#FECACA',
        'color-danger-600': '#DC2626',
        'color-danger-900': '#7F1D1D',
        'color-warning-100': '#FEF3C7',
        'color-warning-200': '#FDE68A',
        'color-warning-900': '#78350F',
        'color-success-100': '#D1FAE5',
        'color-success-200': '#A7F3D0',
        'color-success-900': '#064E3B',
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
