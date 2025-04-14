import Ars_Nouveau from "./glyphs/ars_nouveau.ts";
import Ars_Additions from "./glyphs/ars_additions.ts";
import Ars_Trinkets from "./glyphs/ars_trinkets.ts"
import Ars_Elemental from "./glyphs/ars_elemental.ts";

// GlyphRegistry.getSpellpartMap()
//     .entrySet()
//     .stream()
//     .filter((entry) -> entry.getKey().getNamespace().equals("ars_nouveau"))
//     .forEach((entry) -> { System.out.println("\"" + entry.getKey().getPath() + "\": \"t(" + entry.getValue().getName() + "\")"); })
export const glyphMap = {
    ...Ars_Nouveau,
    ...Ars_Additions,
    ...Ars_Trinkets,
    ...Ars_Elemental,
    // ...
}
export const glyphLookup = {
    ...buildGlyphMap(Ars_Elemental, "ars_elemental"),
    ...buildGlyphMap(Ars_Nouveau, "ars_nouveau"),
    ...buildGlyphMap(Ars_Additions, "ars_additions"),
    ...buildGlyphMap(Ars_Trinkets, "ars_trinkets"),
    // ...
};

export function getRegistryKeyFromInternal(value: string): string | undefined {
    const match = Object.values(glyphLookup).find(g => g.value === value);
    return match?.registryKey;
}

function buildGlyphMap(glyphObj: Record<string, { text: string }>, source: string) {
    const map = new Map<string, any>();

    for (const [key, { text }] of Object.entries(glyphObj)) {
        const registryKey = `${source}:glyph_${key}`;
        map.set(registryKey, {
            value: key,
            text,
            source,
            registryKey,
        });
    }

    console.log(map)
    return Object.fromEntries(map);
}



export type Glyph = keyof typeof glyphMap | string;
