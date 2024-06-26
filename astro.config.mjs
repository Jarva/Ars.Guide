import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import purgecss from "astro-purgecss";
import { visit } from 'unist-util-visit';
import expressiveCode from "astro-expressive-code";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import metaTags from "astro-meta-tags";
import lighthouse from "astro-lighthouse";
import tunnel from "astro-tunnel";
import compressor from "astro-compressor";
import svelte from "@astrojs/svelte";
const addHeaderLinks = () => {
  return tree => {
    visit(tree, 'element', node => {
      if (['h2', 'h3', 'h4', 'h5'].includes(node.tagName) && node.properties.id) {
        node.children.push({
          type: 'element',
          tagName: 'a',
          properties: {
            class: 'anchor',
            'aria-hidden': true,
            href: '#' + node.properties.id,
            'data-pagefind-ignore': 'all',
            'aria-label': `${node.properties.id} permalink`
          },
          children: [{
            type: 'text',
            value: '#'
          }]
        });
      }
    });
  };
};


// https://astro.build/config
export default defineConfig({
  publicDir: 'assets',
  outDir: 'public',
  site: 'https://ars.guide',
  integrations: [expressiveCode({
    themes: ['poimandres', 'material-theme-lighter'],
    themeCssSelector(theme) {
      return `[data-bs-theme="${theme.type}"]`;
    }
  }), mdx(), react(), purgecss(), pagefind(), sitemap(), robotsTxt(), metaTags(), lighthouse(), tunnel(), compressor(), svelte()],
  markdown: {
    rehypePlugins: [rehypeHeadingIds, addHeaderLinks]
  }
});