import {getRegistryKeyFromInternal} from "./data/glyphs.ts";
import type {SpellColor, SpellSound} from "./spells.ts";

export function parseJsonSpell(jsonStr: string) : {
    name: string;
    glyphs: string[];
    color?: SpellColor | null;
    sound?: SpellSound | null;
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
            sound: parsed.sound || null
        };
    } catch (e) {
        console.warn("Failed to parse JSON:", e);
        return null;
    }
}

export function parseBase64Spell(base64Str: string) {
    try {
        const buffer = Uint8Array.from(atob(base64Str), c => c.charCodeAt(0)).buffer;
        const view = new DataView(buffer);
        let offset = 0;

        const version = view.getUint8(offset++);
        if (version !== 2) return null;

        const decoder = new TextDecoder();

        const readUTF = () => {
            const len = view.getUint16(offset);
            offset += 2;
            const strBytes = new Uint8Array(buffer, offset, len);
            offset += len;
            return decoder.decode(strBytes);
        };

        const name = readUTF();
        const partCount = view.getInt32(offset);
        offset += 4;

        const glyphs = [];
        for (let i = 0; i < partCount; i++) {
            glyphs.push(readUTF());
        }

        return {
            name,
            glyphs
        };
    } catch (err) {
        console.error("Failed to decode Base64 spell:", err);
        return null;
    }
}

export function exportToJson(name: string, glyphs: string[], color?: SpellColor, sound?: SpellSound) {

    const spell_parts = glyphs.map(glyph => {
        const match = getRegistryKeyFromInternal(glyph);
        if (match) {
            return match;
        } else {
            console.warn("Failed to find registry key for glyph:", glyph);
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

    if (!sound){
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
        recipe: spell_parts
    }, null, 2);

}

export function exportToBase64(name: string, glyphs: string[]) {
    const encoder = new TextEncoder();
    const parts = glyphs;

    // Helper to write UTF strings in the Java DataOutputStream.writeUTF format
    const writeUTF = (str: string, bytes: number[]) => {
        const encoded = encoder.encode(str);
        if (encoded.length > 65535) {
            throw new Error("String too long for writeUTF");
        }
        // Java's writeUTF writes the length as a 2-byte unsigned int
        bytes.push((encoded.length >> 8) & 0xff, encoded.length & 0xff);
        bytes.push(...encoded);
    };

    const bytes: number[] = [];

    bytes.push(2); // version byte

    writeUTF(name, bytes);

    // Write part count (Java's writeInt: 4 bytes, big-endian)
    const partCount = parts.length;
    bytes.push((partCount >> 24) & 0xff);
    bytes.push((partCount >> 16) & 0xff);
    bytes.push((partCount >> 8) & 0xff);
    bytes.push(partCount & 0xff);

    // Write all parts
    for (let part of parts) {
        // if the glyph uses the internal registry, convert it to the lookup key
        if (!part.includes(":"))
            part = getRegistryKeyFromInternal(part);

        writeUTF(part, bytes);
    }

    // Convert to Base64
    const binaryString = String.fromCharCode(...bytes);
    return btoa(binaryString);
}