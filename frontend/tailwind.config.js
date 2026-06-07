/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        dark: '#1a1a1a',
        darker: '#0f0f0f',
        accent: '#F77F00',
      },
    },
  },
  plugins: [],
}
