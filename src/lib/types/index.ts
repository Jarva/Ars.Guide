/**
 * Centralized type exports.
 */

// Spell types
export type { Spell, SpellColor, SpellSound, SpellStyle, Submission } from './spell';

// Data types
export type { Category, CategoryValue } from './category';
export { categoryMap } from './category';

export type { Addon } from './addon';
export { addonMap } from './addon';

export type { Version } from './version';
export { versionMap } from './version';

export type { Glyph, GlyphMap, GlyphLookupEntry } from './glyph';
export { buildGlyphMap } from './glyph';

// Component-specific types
export type { Tome, TomeSpell, TomeSpellColor } from './tome';

export type {
    ExportedGlyph,
    ExportedGlyphMap,
    ExportedGlyphComponent,
    ExportedGlyphSpellSchool,
    ExportedGlyphAugments,
    ExportedGlyphDefaults,
    LangMap,
} from './exported-glyph';
