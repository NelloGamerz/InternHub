/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all files in the src directory
    "./public/**/*.{html,js}",          // Include files in the public directory
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the components directory
    "./pages/**/*.{js,jsx,ts,tsx}",      // Include Next.js pages if applicable
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}", // ShadCN UI
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
