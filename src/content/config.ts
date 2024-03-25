import { defineCollection } from "astro:content";

const docsCollection = defineCollection({
    type: 'content'
});
const kubejsCollection = defineCollection({
    type: 'content'
});

export const collections = {
    'docs': docsCollection,
    'kubejs': kubejsCollection
};
