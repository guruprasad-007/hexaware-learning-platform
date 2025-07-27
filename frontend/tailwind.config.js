/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",      // Indigo-600
        secondary: "#9333ea",    // Purple-600
        background: "#f9fafb",   // Light background color
      },
    },
  },
  plugins: [],
};
