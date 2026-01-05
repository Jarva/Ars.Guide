import { z } from "zod";
import { zfd } from "zod-form-data";
import {
    valueMapToArray,
    getMapText as createGetMapText,
    transformMultiSelect as createTransformMultiSelect,
    splitToArray,
} from "../lib/utils/value-map";
import { type Version, versionMap } from "../lib/types/version";
import { type Addon, addonMap } from "../lib/types/addon";
import { type Category, categoryMap } from "../lib/types/category";
import { type Glyph, glyphMap } from "../lib/data/glyphs";

// Export arrays for TomSelect options
export const categories = valueMapToArray(categoryMap);
export const addons = valueMapToArray(addonMap);
export const versions = valueMapToArray<object>(versionMap);
export const glyphs = valueMapToArray(glyphMap);

// Re-export utilities for backward compatibility
export const getMapText = createGetMapText;
export const transformMultiSelect = createTransformMultiSelect;

export const spellFormSchema = zfd.formData({
    author: zfd.text(
        z.string().min(1)
    ),
    description: zfd.text(
        z.string().min(1)
    ),
    spell: zfd.text(
        z.string().min(1)
    ),
    glyphs: zfd.text(
        z.string().min(1)
    )
    .transform(text => text.toLowerCase().replace(" ", "_"))
    .transform(splitToArray<Glyph>),
    category: zfd.text(
        z.custom<Category>(val => val in categoryMap)
    ),
    addons: zfd.text(
        z.string()
    ).transform(splitToArray<Addon>).optional(),
    versions: zfd.text(
        z.string().min(1)
    ).transform(splitToArray<Version>),
    style: z.string().optional()
});
