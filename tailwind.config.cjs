/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "md-primary": "var(--md-sys-color-primary)",
        "md-on-primary": "var(--md-sys-color-on-primary)",
        "md-primary-container":
          "var(--md-sys-color-primary-container)",
        "md-on-primary-container":
          "var(--md-sys-color-on-primary-container)",
        "md-secondary": "var(--md-sys-color-secondary)",
        "md-on-secondary": "var(--md-sys-color-on-secondary)",
        "md-secondary-container":
          "var(--md-sys-color-secondary-container)",
        "md-on-secondary-container":
          "var(--md-sys-color-on-secondary-container)",
        "md-tertiary": "var(--md-sys-color-tertiary)",
        "md-on-tertiary": "var(--md-sys-color-on-tertiary)",
        "md-tertiary-container":
          "var(--md-sys-color-tertiary-container)",
        "md-on-tertiary-container":
          "var(--md-sys-color-on-tertiary-container)",
        "md-error": "var(--md-sys-color-error)",
        "md-on-error": "var(--md-sys-color-on-error)",
        "md-error-container":
          "var(--md-sys-color-error-container)",
        "md-on-error-container":
          "var(--md-sys-color-on-error-container)",
        "md-surface": "var(--md-sys-color-surface)",
        "md-on-surface": "var(--md-sys-color-on-surface)",
        "md-surface-variant":
          "var(--md-sys-color-surface-variant)",
        "md-on-surface-variant":
          "var(--md-sys-color-on-surface-variant)",
        "md-surface-container-lowest":
          "var(--md-sys-color-surface-container-lowest)",
        "md-surface-container-low":
          "var(--md-sys-color-surface-container-low)",
        "md-surface-container":
          "var(--md-sys-color-surface-container)",
        "md-surface-container-high":
          "var(--md-sys-color-surface-container-high)",
        "md-surface-container-highest":
          "var(--md-sys-color-surface-container-highest)",
        "md-outline": "var(--md-sys-color-outline)",
        "md-outline-variant":
          "var(--md-sys-color-outline-variant)",
      },
      borderRadius: {
        "md-xs": "var(--md-sys-shape-corner-extra-small)",
        "md-sm": "var(--md-sys-shape-corner-small)",
        "md-md": "var(--md-sys-shape-corner-medium)",
        "md-lg": "var(--md-sys-shape-corner-large)",
        "md-xl": "var(--md-sys-shape-corner-extra-large)",
        "md-full": "var(--md-sys-shape-corner-full)",
      },
      boxShadow: {
        "md-1": "var(--md-sys-elevation-level1)",
        "md-2": "var(--md-sys-elevation-level2)",
        "md-3": "var(--md-sys-elevation-level3)",
        "md-4": "var(--md-sys-elevation-level4)",
        "md-5": "var(--md-sys-elevation-level5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
