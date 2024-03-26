import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content"
import "core-js/es/array/to-sorted";

export type GenericCollectionEntry = CollectionEntry<CollectionKey>

export interface ChildSection {
    entry: GenericCollectionEntry,
    active: boolean,
}

export type ParentSection = ChildSection & {
    children: ChildSection[],
}

interface SectionAccumulator {
    [k: string]: ParentSection
}

export type Sidebar = ParentSection[];

export const getSidebar = async (entry: GenericCollectionEntry): Promise<Sidebar> => {
    const allEntries = await getCollection(entry.collection);

    const sectionEntries = allEntries.reduce<SectionAccumulator>((acc, curr) => {
        const top = getTopLevel(curr)
        const section = acc[top] || { children: [], active: false };
        if (curr.slug === top) {
            section.entry = curr;
        } else {
            section.children.push({ entry: curr, active: curr.slug == entry.slug });
            section.children.sort((a, b) => a.entry.data.weight - b.entry.data.weight);
        }
        if (curr.slug == entry.slug) {
            section.active = true;
        }
        acc[top] = section;
        return acc;
    }, {})

    return Object.values(sectionEntries).toSorted((a, b) => a.entry.data.weight - b.entry.data.weight);
}

export const getPreviousEntry = (entry: GenericCollectionEntry, sidebar: Sidebar) => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug == entry.slug);
    if (idx == 0) return null;
    return entries[idx - 1];
}

export const getNextEntry = (entry: GenericCollectionEntry, sidebar: Sidebar) => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug == entry.slug);
    if (idx == entries.length - 1) return null;
    return entries[idx + 1];
}

export const getTopLevel = (entry: GenericCollectionEntry) => entry.slug.split("/")[0];
