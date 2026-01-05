/**
 * Sidebar navigation utilities - previous/next entry lookup.
 */

import type { ChildSection, Sidebar } from "./types";

/**
 * Get the previous entry in the sidebar relative to the current slug.
 */
export const getPreviousEntry = (
    slug: string,
    sidebar: Sidebar
): ChildSection | null => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug === slug);

    if (idx === 0) return null;
    return entries[idx - 1];
};

/**
 * Get the next entry in the sidebar relative to the current slug.
 */
export const getNextEntry = (
    slug: string,
    sidebar: Sidebar
): ChildSection | null => {
    const entries = sidebar.flatMap(section => section.children);
    const idx = entries.findIndex(e => e.entry.slug === slug);

    if (idx === entries.length - 1) return null;
    return entries[idx + 1];
};
