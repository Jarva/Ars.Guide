/**
 * Type definitions for exported glyphs from the ArsAddonBuilder.
 * Used by ExportedGlyphs.astro component.
 */

export interface ExportedGlyphComponent {
    translate: string;
}

export interface ExportedGlyphSpellSchool {
    id: string;
    subschools: string[];
}

export interface ExportedGlyphAugments {
    compatible: string[];
    descriptions: Record<string, ExportedGlyphComponent>;
    costs: Record<string, number>;
    limits: Record<string, number>;
}

export interface ExportedGlyphDefaults {
    starter: boolean;
    perSpellLimit: number;
    augments: ExportedGlyphAugments;
    invalidCombinations: string[];
    tier: number;
    cost: number;
    enabled: boolean;
}

export interface ExportedGlyph {
    typeName: ExportedGlyphComponent;
    typeIndex: number;
    classes: string[];
    spellSchools: ExportedGlyphSpellSchool[];
    defaults: ExportedGlyphDefaults;
    name: string;
    texture: string;
    animated: boolean;
    registryName: string;
    localizationKey: string;
}

export type ExportedGlyphMap = Record<string, ExportedGlyph>;
export type LangMap = Record<string, string>;
