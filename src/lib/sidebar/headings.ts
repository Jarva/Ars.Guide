/**
 * Heading utilities - build hierarchical table of contents.
 */

import type { MarkdownHeading } from "astro";
import type { ParentHeading } from "./types";

/**
 * Recursively push a heading into the correct depth level.
 */
const pushHeading = (
    depth: number,
    heading: MarkdownHeading,
    parent: ParentHeading
): void => {
    if (depth === 2) {
        parent.children.push({ entry: heading, children: [] });
        return;
    }

    pushHeading(depth - 1, heading, parent.children[parent.children.length - 1]);
};

/**
 * Build a hierarchical heading structure from flat markdown headings.
 */
export const getHeadings = (headings: MarkdownHeading[]): ParentHeading[] => {
    return headings.reduce<ParentHeading[]>((acc, curr) => {
        if (curr.slug === "footnote-label") return acc;

        curr.depth = curr.depth - 1;

        if (curr.depth > 1) {
            const parent = acc[acc.length - 1];
            pushHeading(curr.depth, curr, parent);
        } else {
            acc.push({
                entry: curr,
                children: [],
            });
        }

        return acc;
    }, []);
};
