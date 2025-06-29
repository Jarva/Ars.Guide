import {getRegistryKeyFromInternal} from "./data/glyphs.ts";
import type {SpellColor, SpellSound} from "./spells.ts";
import pako from "pako";

export function parseJsonSpell(jsonStr: string): {
    name: string;
    glyphs: string[];
    color?: SpellColor | null;
    sound?: SpellSound | null;
    particleTimeline?: Record<string, any>
} | null {
    try {
        const parsed = JSON.parse(jsonStr);

        if (!parsed.name || !Array.isArray(parsed.recipe)) {
            console.warn("Invalid spell JSON format.");
            return null;
        }

        return {
            name: parsed.name,
            glyphs: parsed.recipe,
            color: parsed.color || null,
            sound: parsed.sound || null,
            particleTimeline: parsed.particleTimeline || null
        };
    } catch (e) {
        console.warn("Failed to parse JSON:", e);
        return null;
    }
}

export function exportToJson(name: string, glyphs: string[], color?: SpellColor, sound?: SpellSound, spell_timeline?: Record<string, any>): string {

    const spell_parts = glyphs.map(glyph => {
        const match = getRegistryKeyFromInternal(glyph);
        if (match) {
            return match;
        } else {
            // console.warn("Failed to find registry key for glyph:", glyph);
            return "";
        }
    }).filter(Boolean); // Remove invalid/empty strings

    // Default color if not provided
    if (!color) {
        color = {
            id: "ars_nouveau:constant",
            r: 255,
            g: 255,
            b: 255
        }
    }

    if (!sound) {
        sound = {
            id: "ars_nouveau:fire_family",
            pitch: 1,
            volume: 1
        }
    }

    return JSON.stringify({
        name,
        color,
        sound,
        recipe: spell_parts,
        particleTimeline: spell_timeline || {}
    }, null, 2);

}

export function parseCompressedSpell(base64Str: string): {
    name: string;
    glyphs: string[];
    particleTimeline?: object;
} | null {
    try {
        const binary = Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));
        const decompressed = pako.ungzip(binary, {to: 'string'});
        const parsed = JSON.parse(decompressed);

        if (!parsed.name || !Array.isArray(parsed.recipe)) {
            console.warn("Invalid spell JSON format.");
            return null;
        }

        return {
            name: parsed.name,
            glyphs: parsed.recipe,
            particleTimeline: parsed.particleTimeline || null
        };
    } catch (e) {
        console.error("Failed to parse compressed spell:", e);
        return null;
    }
}


export function exportCompressedSpell(
    name: string, recipe: string[], color?: SpellColor, sound?: SpellSound, particle_timeline: object = {}
): string {
    const jsonStr = exportToJson(name, recipe, color, sound, particle_timeline);
    const compressed = pako.gzip(jsonStr);
    return btoa(String.fromCharCode(...compressed));
}
