import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import purgecss from "astro-purgecss";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  publicDir: 'assets',
  outDir: 'public',
  site: 'https://ars.guide',
  integrations: [expressiveCode({
    themes: ['poimandres', 'material-theme-lighter'],
    themeCssSelector(theme) {
      return `[data-bs-theme="${theme.type}"]`
    },
    // themeCssRoot: 'html'
  }), mdx(), react(), purgecss()],
});
