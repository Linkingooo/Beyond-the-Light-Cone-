import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          bg: "#05060d",
          surface: "#0b0f1f",
          deep: "#080a17",
          accent: "#7c5cff",
          quantum: "#22d3ee",
          relativity: "#f0b429",
          star: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at top, rgba(124,92,255,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.12), transparent 60%), linear-gradient(180deg, #05060d 0%, #03040a 100%)",
        "lightcone":
          "conic-gradient(from 180deg at 50% 50%, rgba(124,92,255,0.0) 0deg, rgba(124,92,255,0.35) 90deg, rgba(34,211,238,0.35) 180deg, rgba(240,180,41,0.25) 270deg, rgba(124,92,255,0.0) 360deg)",
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 30s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
