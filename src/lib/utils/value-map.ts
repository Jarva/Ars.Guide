/**
 * Generic utilities for working with value maps (key-value objects with text labels).
 * Used across categories, addons, versions, and glyphs.
 */

/** Base type for objects with a text label */
export type TextValue = { text: string };

/** A map of string keys to objects with at least a text property */
export type ValueMap<T extends object = TextValue> = Record<string, T>;

/** Option type for TomSelect and similar dropdown components */
export type SelectOption<T extends object = TextValue> = { value: string } & T;

/**
 * Convert a ValueMap to an array of options for TomSelect.
 * Each entry becomes { value: key, ...properties }
 */
export const valueMapToArray = <T extends object>(map: ValueMap<T>): SelectOption<T>[] =>
    Object.entries(map).map(([value, obj]) => ({ value, ...obj }));

/**
 * Create a function that gets the text label for a key from a ValueMap.
 * Falls back to the key itself if not found.
 */
export const getMapText = <T extends TextValue>(map: ValueMap<T>) =>
    (key: string): string => key in map ? map[key].text : key;

/**
 * Transform a comma-separated string into an array of typed values.
 */
export const splitToArray = <T extends string>(val: string): T[] =>
    val.split(",") as T[];

/**
 * Create a function that transforms comma-separated values using a text lookup.
 */
export const transformMultiSelect = <T extends TextValue>(map: ValueMap<T>) =>
    (val: string): string[] => val.split(",").map(getMapText(map));

/**
 * Helper to create a TextValue object.
 */
export const t = (text: string): TextValue => ({ text });
