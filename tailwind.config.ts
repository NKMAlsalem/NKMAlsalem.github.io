import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        sunken: token("sunken"),
        seal: token("seal"),
        "line-strong": token("line-strong"),
        "on-accent": token("on-accent"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: { DEFAULT: token("accent"), soft: token("accent-soft"), hover: token("accent-hover") },
        amber: { DEFAULT: token("amber"), soft: token("amber-soft") },
        crit: { DEFAULT: token("crit"), soft: token("crit-soft") },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        label: ["var(--font-label)"],
      },
      maxWidth: { page: "1120px" },
    },
  },
  plugins: [],
};

export default config;
