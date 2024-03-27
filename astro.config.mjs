import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import purgecss from "astro-purgecss";
import {visit} from 'unist-util-visit'

import expressiveCode from "astro-expressive-code";
import rehypeSlug from 'rehype-slug'
import pagefind from "astro-pagefind";
// import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

const addHeaderLinks = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h2', 'h3', 'h4', 'h5'].includes(node.tagName) && node.properties.id) {
        node.children.push({
          type: 'element',
          tagName: 'a',
          properties: {
            class: 'anchor',
            'aria-hidden': true,
            href: '#' + node.properties.id
          },
          children: [
            { type: 'text', value: '#' }
          ]
        })
      }
    })
  }
}

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
  }), mdx(), react(), purgecss(), pagefind()],
  markdown: {
    rehypePlugins: [rehypeSlug, addHeaderLinks]
  }
});
