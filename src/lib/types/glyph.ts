/**
 * Glyph type definitions.
 */

import type { TextValue } from '../utils/value-map';

export interface GlyphLookupEntry {
    value: string;
    text: string;
    source: string;
    registryKey: string;
}

export type GlyphMap = Record<string, TextValue>;

/**
 * Build a lookup map from glyph objects with registry keys.
 */
export function buildGlyphMap(
    glyphObj: Record<string, TextValue>,
    source: string
): Record<string, GlyphLookupEntry> {
    const map = new Map<string, GlyphLookupEntry>();

    for (const [key, { text }] of Object.entries(glyphObj)) {
        const registryKey = `${source}:glyph_${key}`;
        map.set(registryKey, {
            value: key,
            text,
            source,
            registryKey,
        });
    }

    return Object.fromEntries(map);
}

// Note: The actual Glyph type is defined where glyphMap is aggregated,
// as it depends on the combined keys from all glyph sources.
export type Glyph = string;
