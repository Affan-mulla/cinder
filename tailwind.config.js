/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // 👈 use src here
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        heading: "var(--font-outfit)",
        body: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};
