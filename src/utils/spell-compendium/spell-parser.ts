import {getRegistryKeyFromInternal} from "./data/glyphs.ts";

export function parseJsonSpell(jsonStr:string) {
    try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.version !== 1) return null;

        return {
            name: parsed.name,
            glyphs: parsed.parts || []
        };
    } catch {
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
            const len = view.getUint16(offset); offset += 2;
            const strBytes = new Uint8Array(buffer, offset, len); offset += len;
            return decoder.decode(strBytes);
        };

        const name = readUTF();
        const partCount = view.getInt32(offset); offset += 4;

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

export function exportToJson(name: string, glyphs: string[]) {

    const spell_parts = glyphs.map(glyph => {
        // use reverse lookup to get the registry key
        const match = getRegistryKeyFromInternal(glyph)
        if (match) {
            return match;
        }else{
            console.warn("Failed to find registry key for glyph:", glyph);
        }
        return ""
    });

    // Construct the JSON object and convert it to a string
    return JSON.stringify({
        version: 1,
        name: name,
        parts: spell_parts
    });
}

export function exportToBase64(name: string, glyphs: string[]) {
    // Generate the JSON string
    const jsonString = exportToJson(name, glyphs);

    // Encode the JSON string to Base64 using btoa
    return btoa(jsonString);
}