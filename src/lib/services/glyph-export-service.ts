/**
 * Service for fetching exported glyph data from ArsAddonBuilder.
 */

import { fetchFromCDN } from './github';
import type { ExportedGlyph, ExportedGlyphMap, LangMap } from '../types/exported-glyph';

const REPO = "Jarva/ArsAddonBuilder";
const BRANCH = "refs/heads/1.21";

/**
 * Fetch all exported glyphs.
 */
export async function fetchExportedGlyphs(): Promise<ExportedGlyphMap> {
    return fetchFromCDN<ExportedGlyphMap>(REPO, BRANCH, "output/glyphs.json");
}

/**
 * Fetch localization strings.
 */
export async function fetchLang(locale: string = "en_us"): Promise<LangMap> {
    return fetchFromCDN<LangMap>(REPO, BRANCH, `output/lang/${locale}.json`);
}

/**
 * Fetch both glyphs and localization data.
 */
export async function fetchExportedGlyphData(): Promise<{
    glyphs: ExportedGlyphMap;
    lang: LangMap;
}> {
    const [glyphs, lang] = await Promise.all([
        fetchExportedGlyphs(),
        fetchLang(),
    ]);

    return { glyphs, lang };
}

/**
 * Extract namespace from a registry name.
 * e.g., "ars_nouveau:touch" -> "ars_nouveau"
 */
export function getNamespace(location: string): string {
    return location.replace(/:.*$/, "");
}

/**
 * Extract path from a registry name.
 * e.g., "ars_nouveau:touch" -> "touch"
 */
export function getPath(location: string): string {
    return location.replace(/^.*:/, "");
}

/**
 * Build the texture URL for a glyph.
 */
export function getGlyphTextureUrl(glyph: ExportedGlyph): string {
    const ns = getNamespace(glyph.registryName)
        .replace(/^(not_enough_glyphs|toomanyglyphs|arsomega|ars_scalaes)$/, "notenoughglyphs");
    const textureNs = getNamespace(glyph.texture);
    const texturePath = getPath(glyph.texture);
    const extension = glyph.animated ? "gif" : "png";

    return `https://cdn.jsdelivr.net/gh/Jarva/ArsAddonBuilder@1.21/output/resources/${ns}/assets/${textureNs}/textures/${texturePath}.${extension}?raw=true`;
}

/**
 * Build augment description lookup from lang file.
 */
export function buildAugmentDescriptions(lang: LangMap): Map<string, string> {
    return new Map(
        Object.entries(lang)
            .filter(([k]) => k.includes(".augment_desc."))
            .map(([k, v]) => [k.replace(/^([^.]*.){2}/, ""), v])
    );
}
