/**
 * Service for fetching Caster Tome data from GitHub.
 */

import { fetchFromCDN, fetchGitHubContents } from './github';

const REPO = "baileyholl/Ars-Nouveau";
const BRANCH = "main";
const TOMES_PATH = "src/generated/resources/data/ars_nouveau/recipe/tomes/";

// Fallback tomes in case GitHub API is unavailable
const FALLBACK_TOMES = [
    { path: `${TOMES_PATH}alex_tome.json` },
    { path: `${TOMES_PATH}arachne_tome.json` },
];

export interface TomeColor {
    r: number;
    g: number;
    b: number;
    id: string;
}

export interface TomeSound {
    sound?: {
        id: string;
    };
}

export interface Tome {
    type: string;
    name: string;
    flavour_text: string;
    spell: string[];
    sound: TomeSound;
    color: TomeColor;
}

/**
 * Fetch the list of tome files from the repository.
 */
async function fetchTomeList(): Promise<Array<{ path: string }>> {
    try {
        const list = await fetchGitHubContents<Array<{ path: string }> | { message: string }>(
            REPO,
            TOMES_PATH
        );

        // Handle rate limit or error response
        if ('message' in list) {
            console.warn('GitHub API returned error, using fallback tomes:', list.message);
            return FALLBACK_TOMES;
        }

        return list;
    } catch (error) {
        console.warn('Failed to fetch tome list, using fallbacks:', error);
        return FALLBACK_TOMES;
    }
}

/**
 * Fetch a single tome by path.
 */
async function fetchTome(path: string): Promise<Tome> {
    return fetchFromCDN<Tome>(REPO, BRANCH, path);
}

/**
 * Fetch all caster tomes from the Ars Nouveau repository.
 */
export async function fetchAllTomes(): Promise<Tome[]> {
    const tomeList = await fetchTomeList();

    const tomePaths = tomeList.filter(tome => tome.path.endsWith('.json'));

    return Promise.all(tomePaths.map(tome => fetchTome(tome.path)));
}

/**
 * Format a tome color for display.
 */
export function formatTomeColor(color: TomeColor): string {
    if (color.id === "ars_nouveau:rainbow") {
        return "Rainbow";
    }
    return `R: ${color.r}, G: ${color.g}, B: ${color.b}`;
}

/**
 * Get icon styling for a tome color.
 */
export function getTomeColorIconStyle(color: TomeColor): {
    style: Record<string, string>;
    className?: string;
    color?: string;
} {
    const baseStyle = { verticalAlign: "initial" };

    if (color.id === "ars_nouveau:rainbow") {
        return {
            style: { ...baseStyle, animationDuration: "5s" },
            className: "rainbow",
        };
    }

    return {
        style: baseStyle,
        color: `rgb(${color.r}, ${color.g}, ${color.b})`,
    };
}

/**
 * Extract the glyph name from a full registry path.
 * e.g., "ars_nouveau:glyph_touch" -> "touch"
 */
export function extractGlyphName(glyphPath: string): string {
    let g = glyphPath;

    // Remove namespace prefix
    const colonIdx = g.indexOf(":");
    if (colonIdx !== -1) {
        g = g.slice(colonIdx + 1);
    }

    // Remove glyph_ prefix
    const glyphPrefix = "glyph_";
    if (g.startsWith(glyphPrefix)) {
        g = g.slice(glyphPrefix.length);
    }

    // Remove _glyph suffix
    const glyphSuffix = "_glyph";
    if (g.endsWith(glyphSuffix)) {
        g = g.slice(0, g.length - glyphSuffix.length);
    }

    return g;
}
