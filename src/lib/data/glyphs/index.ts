/**
 * Aggregated glyph data from all Ars Nouveau addons.
 */

import ArsNouveau from './ars-nouveau';
import ArsAdditions from './ars-additions';
import ArsTrinkets from './ars-trinkets';
import ArsElemental from './ars-elemental';
import NotEnoughGlyphsRepack, {
    Scalaes,
    Toomanyglyphs,
    Not_Enough_Glyphs,
    ArsOmega,
} from './not-enough-glyphs';
import Starbunclemania from './starbunclemania';
import type { TextValue } from '../../utils/value-map';
import type { GlyphLookupEntry } from '../../types/glyph';

/**
 * Combined glyph map from all sources.
 */
export const glyphMap = {
    ...ArsNouveau,
    ...ArsAdditions,
    ...ArsTrinkets,
    ...ArsElemental,
    ...Starbunclemania,
    ...NotEnoughGlyphsRepack,
};

/**
 * Build a lookup map with registry keys.
 */
function buildGlyphMap(
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

/**
 * Glyph lookup by registry key.
 */
export const glyphLookup: Record<string, GlyphLookupEntry> = {
    ...buildGlyphMap(ArsElemental, "ars_elemental"),
    ...buildGlyphMap(ArsNouveau, "ars_nouveau"),
    ...buildGlyphMap(ArsAdditions, "ars_additions"),
    ...buildGlyphMap(ArsTrinkets, "ars_trinkets"),
    ...buildGlyphMap(Not_Enough_Glyphs, "not_enough_glyphs"),
    ...buildGlyphMap(Scalaes, "scalaes"),
    ...buildGlyphMap(ArsOmega, "ars_omega"),
    ...buildGlyphMap(Toomanyglyphs, "toomanyglyphs"),
    ...buildGlyphMap(Starbunclemania, "starbunclemania"),
};

/**
 * Get a registry key from an internal glyph value.
 */
export function getRegistryKeyFromInternal(value: string): string {
    const match = Object.values(glyphLookup).find(g => g.value === value);
    return match?.registryKey ?? "";
}

export type Glyph = keyof typeof glyphMap | string;

// Re-export individual glyph sets for direct access
export {
    ArsNouveau,
    ArsAdditions,
    ArsTrinkets,
    ArsElemental,
    Starbunclemania,
    NotEnoughGlyphsRepack,
    Scalaes,
    Toomanyglyphs,
    Not_Enough_Glyphs,
    ArsOmega,
};
