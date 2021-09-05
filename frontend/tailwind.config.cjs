const defaultTheme = require("tailwindcss/defaultTheme");
const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

const svelteClassColonExtractor = (content) => {
  return content.match(/(?<=class:)([a-zA-Z0-9_-]+)/gm) || [];
};

module.exports = {
  mode: 'jit',
  purge: {
    // enabled: process.env.NODE_ENV === 'production',
    content: ["./src/**/*.svelte", "./src/**/*.html", "./src/**/*.css", "./index.html"],
    preserveHtmlElements: true,
    // options: {
    //   safelist: [/svelte-/],
    //   defaultExtractor: (content) => {
    //     // WARNING: tailwindExtractor is internal tailwind api
    //     // if this breaks after a tailwind update, report to svite repo
    //     return [...tailwindExtractor(content), ...svelteClassColonExtractor(content)];
    //   },
    //   keyframes: true,
    // },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xs": "320px",
      xs: "480px",
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
