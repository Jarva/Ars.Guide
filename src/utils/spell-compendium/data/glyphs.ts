import Ars_Nouveau from "./glyphs/ars_nouveau.ts";
import Ars_Additions from "./glyphs/ars_additions.ts";
import Ars_Trinkets from "./glyphs/ars_trinkets.ts"

// GlyphRegistry.getSpellpartMap()
//     .entrySet()
//     .stream()
//     .filter((entry) -> entry.getKey().getNamespace().equals("ars_nouveau"))
//     .forEach((entry) -> { System.out.println("\"" + entry.getKey().getPath() + "\": \"t(" + entry.getValue().getName() + "\")"); })
export const glyphMap = {
    ...Ars_Nouveau,
    ...Ars_Additions,
    ...Ars_Trinkets,
    // ...
}

export type Glyph = keyof typeof glyphMap | string;
