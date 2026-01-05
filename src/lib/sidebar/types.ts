/**
 * Type definitions for sidebar functionality.
 */

import type { MarkdownHeading } from "astro";
import type { CollectionEntry, CollectionKey } from "astro:content";

export type GenericCollectionEntry = CollectionEntry<CollectionKey>;

export interface ChildSection {
    entry: GenericCollectionEntry;
    active: boolean;
}

export type ParentSection = ChildSection & {
    children: ChildSection[];
};

export interface SectionAccumulator {
    [k: string]: ParentSection;
}

export type Sidebar = ParentSection[];

export interface ChildHeading {
    entry: MarkdownHeading;
}

export type ParentHeading = ChildHeading & {
    children: ParentHeading[];
};
