/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: {
          primary: "#020617",
          secondary: "#0f172a",
          card: "#111827",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          muted: "#94a3b8",
        },
        accent: {
          blue: "#38bdf8",
          purple: "#a78bfa",
          green: "#34d399",
        },
        border: "#1e293b",
      },
    },
  },
  plugins: [],
};