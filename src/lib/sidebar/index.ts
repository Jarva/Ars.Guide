/**
 * Sidebar module - central exports for sidebar functionality.
 */

// Types
export type {
    GenericCollectionEntry,
    ChildSection,
    ParentSection,
    Sidebar,
    ChildHeading,
    ParentHeading,
} from "./types";

// Builder
export { getSidebar, getTopLevel } from "./builder";

// Navigation
export { getPreviousEntry, getNextEntry } from "./navigation";

// Headings
export { getHeadings } from "./headings";
