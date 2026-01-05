/**
 * Sidebar builder - constructs sidebar data from collection entries.
 */

import { getCollection, type AnyEntryMap } from "astro:content";
import "core-js/es/array/to-sorted";
import type { GenericCollectionEntry, Sidebar, SectionAccumulator } from "./types";

/**
 * Extract top-level slug segment from an entry.
 */
export const getTopLevel = (entry: GenericCollectionEntry): string =>
    entry.slug.split("/")[0];

/**
 * Build sidebar navigation structure from a content collection.
 */
export const getSidebar = async (
    collection: keyof AnyEntryMap,
    slug: string
): Promise<Sidebar> => {
    const allEntries = await getCollection(collection);

    const sectionEntries = allEntries.reduce<SectionAccumulator>((acc, curr) => {
        const top = getTopLevel(curr);
        const section = acc[top] || { children: [], active: false };

        if (curr.slug === top) {
            section.entry = curr;
        } else {
            section.children.push({ entry: curr, active: curr.slug === slug });
            section.children.sort((a, b) => a.entry.data.weight - b.entry.data.weight);
        }

        if (curr.slug === slug) {
            section.active = true;
        }

        acc[top] = section;
        return acc;
    }, {});

    return Object.values(sectionEntries).toSorted(
        (a, b) => a.entry.data.weight - b.entry.data.weight
    );
};
