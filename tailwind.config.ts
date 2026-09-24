import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#061018",
        deep: "#0A1722",
        panel: "#0C1B28",
        signal: "#00D9FF",
        aqua: "#00F5C8",
        fabblue: "#1388FF",
        silicon: "#C9D6DF",
        silver: "#71818D",
        amberx: "#FFB84D",
        paper: "#F4FAFC",
        muted: "#8FA8B5",
        nexus: {
          950: "#061018",
          900: "#0A1722",
          850: "#0C1B28",
          800: "#10222F",
          700: "#16303F",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans HK", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glass: "0 12px 40px rgba(0, 0, 0, 0.45)",
        glow: "0 0 32px rgba(0, 217, 255, 0.22)",
        etch: "inset 0 1px 0 rgba(201, 214, 223, 0.08)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        dash: "dash 1.6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        dash: {
          to: { strokeDashoffset: "-24" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
