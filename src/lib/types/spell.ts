/**
 * Spell-related type definitions.
 * Centralized from utils/spell-compendium/spells.ts
 */

import type { Category } from './category';
import type { Addon } from './addon';
import type { Glyph } from './glyph';
import type { Version } from './version';

export interface SpellColor {
    id: string;
    r: number;
    g: number;
    b: number;
}

export interface SpellSound {
    id: string;
    pitch: number;
    volume: number;
}

export interface SpellStyle {
    particleColor?: SpellColor;
    [key: string]: unknown;
}

export interface Spell {
    glyphs: Glyph[];
    description: string;
    spell_color?: SpellColor;
    spell_sound?: string;
    style?: SpellStyle;
}

export interface Submission {
    name: string;
    category: Category;
    author: string;
    versions: Version[];
    addons: Addon[];
    spells: Spell[];
}
