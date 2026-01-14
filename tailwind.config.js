/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fa5c5c",
        secondary: "#fd8a6b",
        accent: "#fbef76",
        dark: "#111111",
        light: "#ffffff",
        "panel-bg": "#f8f8f8",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "game-snap": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      backgroundImage: {
        noise:
          'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E\')',
      },
    },
  },
  plugins: [],
}
