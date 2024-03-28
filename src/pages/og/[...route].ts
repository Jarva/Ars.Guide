import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import type { GenericCollectionEntry } from '../../utils/sidebar';

const docs = await getCollection('docs');
const kubejs = await getCollection('kubejs');

const collectionEntries: GenericCollectionEntry[] = docs.concat(kubejs as any);

const pages = Object.fromEntries(collectionEntries.map(({ collection, slug, data }) => [`${collection}/${slug}`, data]));

export const { getStaticPaths, GET } = OGImageRoute({
  pages: pages,
  param: 'route',
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    border: {
        color: [0, 255, 0],
        width: 20,
        side: "block-start"
    },
    logo: {
        path: "./assets/ars-guide-logo.png",
        size: [1000],
    },
    bgImage: {
        path: "./assets/archwood-bg.png"
    }
  }),
});
