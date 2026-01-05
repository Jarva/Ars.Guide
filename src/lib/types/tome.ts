/**
 * Tome type definitions for CasterTomes component.
 */

export interface TomeSpellColor {
    id: string;
    r: number;
    g: number;
    b: number;
}

export interface TomeSpell {
    validAugments: string[];
    recipe: string[];
    spellColor: TomeSpellColor;
}

export interface Tome {
    name: string;
    desc: string;
    tome_type: string;
    spells: TomeSpell[];
}
