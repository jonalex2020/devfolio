/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: {
          primary: "rgb(var(--background-primary) / <alpha-value>)",
          secondary: "rgb(var(--background-secondary) / <alpha-value>)",
          card: "rgb(var(--background-card) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        accent: {
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          purple: "rgb(var(--accent-purple) / <alpha-value>)",
          green: "rgb(var(--accent-green) / <alpha-value>)",
        },
        border: "rgb(var(--border-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};