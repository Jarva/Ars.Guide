import type { MarkdownHeading } from "astro";
import { getCollection, type CollectionEntry, type CollectionKey, type AnyEntryMap } from "astro:content"
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

export const getSidebar = async (collection: keyof AnyEntryMap, slug: string): Promise<Sidebar> => {
    const allEntries = await getCollection(collection);

    const sectionEntries = allEntries.reduce<SectionAccumulator>((acc, curr) => {
        const top = getTopLevel(curr)
        const section = acc[top] || { children: [], active: false };
        if (curr.slug === top) {
            section.entry = curr;
        } else {
            section.children.push({ entry: curr, active: curr.slug == slug });
            section.children.sort((a, b) => a.entry.data.weight - b.entry.data.weight);
        }
        if (curr.slug == slug) {
            section.active = true;
        }
        acc[top] = section;
        return acc;
    }, {})

    return Object.values(sectionEntries).toSorted((a, b) => a.entry.data.weight - b.entry.data.weight);
}

export const getPreviousEntry = (slug: string, sidebar: Sidebar) => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug == slug);
    if (idx == 0) return null;
    return entries[idx - 1];
}

export const getNextEntry = (slug: string, sidebar: Sidebar) => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug == slug);
    if (idx == entries.length - 1) return null;
    return entries[idx + 1];
}

interface ChildHeading {
    entry: MarkdownHeading;
}

export type ParentHeading = ChildHeading & {
    children: ParentHeading[]
}

const pushHeading = (depth: number, heading: MarkdownHeading, parent: ParentHeading) => {
    if (depth == 2) {
        parent.children.push({ entry: heading, children: [] });
        return;
    }

    pushHeading(depth - 1, heading, parent.children[parent.children.length - 1])
}

export const getHeadings = (headings: MarkdownHeading[]) => {
    return headings.reduce<ParentHeading[]>((acc, curr) => {
        if (curr.slug == "footnote-label") return acc;
        curr.depth = curr.depth - 1;

        if (curr.depth > 1) {
            const parent = acc[acc.length - 1];
            pushHeading(curr.depth, curr, parent)
        } else {
            acc.push({
                entry: curr,
                children: []
            })
        }

        return acc;
    }, [])
}

export const getTopLevel = (entry: GenericCollectionEntry) => entry.slug.split("/")[0];
