import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
          "card-hover": "var(--bg-card-hover)",
        },
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          red: "var(--accent-red)",
          amber: "var(--accent-amber)",
          green: "var(--accent-green)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;