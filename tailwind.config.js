/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        SpaceGrotesk:  ["Space Grotesk",  "sans-serif"],
        Inter:         ["Inter",          "sans-serif"],
        SpaceMono:     ["Space Mono",     "monospace"],
        JetBrains:     ["JetBrains Mono", "monospace"],
        Roboto:        ["Roboto",         "sans-serif"],
        Jersey:        ["Jersey 15",      "sans-serif"],
      },
      colors: {
        redteam: {
          DEFAULT: "#ff2d55",
          dark:    "#cc1f3f",
          light:   "#ff6b8a",
          dim:     "rgba(255,45,85,0.15)",
          glow:    "rgba(255,45,85,0.4)",
        },
        terminal: {
          DEFAULT: "#00ff9f",
          dark:    "#00cc7d",
          dim:     "rgba(0,255,159,0.15)",
          glow:    "rgba(0,255,159,0.4)",
        },
        cyber: {
          DEFAULT: "#00c8ff",
          dark:    "#0099cc",
          glow:    "rgba(0,200,255,0.4)",
        },
        matrix: {
          900: "#050a0f",
          800: "#0a1628",
          700: "#0d1f2d",
          600: "#1a2f44",
          500: "#243b55",
        },
      },
      animation: {
        "glitch":           "glitch 4s ease-in-out infinite",
        "pulse-red":        "pulse-red-border 2.5s ease-in-out infinite",
        "blink-cursor":     "blink-cursor 1s step-end infinite",
        "scan-line":        "scan-line 4s linear infinite",
        "glow-pulse":       "glow-pulse-red 2s ease-in-out infinite",
        "fade-in-up":       "fade-in-up 0.6s ease-out",
      },
      boxShadow: {
        "glow-red":   "0 0 20px rgba(255,45,85,0.5), 0 0 40px rgba(255,45,85,0.25)",
        "glow-green": "0 0 20px rgba(0,255,159,0.5), 0 0 40px rgba(0,255,159,0.25)",
        "glow-cyan":  "0 0 20px rgba(0,200,255,0.5)",
        "rt-card":    "0 0 25px rgba(255,45,85,0.1), inset 0 0 25px rgba(255,45,85,0.03)",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: '"Inter", sans-serif',
            maxWidth: "none",
            color: "#94a3b8",
            a: { color: "#ff2d55", "&:hover": { color: "#ff6b8a" } },
            strong: { color: "#e8f0fe", fontWeight: "600" },
            h1: { fontFamily: '"Space Mono", monospace', fontWeight: "700" },
            h2: { fontFamily: '"Space Mono", monospace', fontWeight: "700" },
            h3: { fontFamily: '"Space Mono", monospace', fontWeight: "700" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
