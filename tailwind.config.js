module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./modules/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
