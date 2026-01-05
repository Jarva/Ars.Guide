/**
 * Text transformation utilities.
 */

// Re-export t from value-map for convenience
export { t } from './value-map';

/**
 * Convert a snake_case or kebab-case string to Title Case.
 */
export function toTitleCase(str: string): string {
    return str
        .replaceAll("_", " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
