import {z} from "zod";
import {zfd} from "zod-form-data";
import {type Version, versionMap} from "./spell-compendium/data/versions.ts";
import {type Addon, addonMap} from "./spell-compendium/data/addons.ts";
import {type Category, categoryMap} from "./spell-compendium/data/categories.ts";
import {type Glyph, glyphMap} from "./spell-compendium/data/glyphs.ts";

type ValueObject = {
    text: string;
}

type ValueMap<T = ValueObject> = {
    [k: string]: T
};

const valueMapToArray = <T = ValueObject>(map: ValueMap<T>) =>
    Object.entries(map).map(([value, obj]) => ({ value, ...obj }));

export const categories = valueMapToArray(categoryMap);
export const addons = valueMapToArray(addonMap);
export const versions = valueMapToArray<object>(versionMap);
export const glyphs = valueMapToArray(glyphMap);

export const getMapText = (map: ValueMap) => (val: string) =>
    val in map ? map[val].text : val;

export const transformMultiSelect = (map: ValueMap) => (val: string): string[] =>
    val.split(",").map(getMapText(map));

const typeMultiSelect = <T>() => (val: string): T[] => val.split(",") as T[];

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
    .transform(typeMultiSelect<Glyph>()),
    category: zfd.text(
        z.custom<Category>(val => val in categoryMap)
    ),
    addons: zfd.text(
        z.string()
    ).transform(typeMultiSelect<Addon>()).optional(),
    versions: zfd.text(
        z.string().min(1)
    ).transform(typeMultiSelect<Version>()),
    style: z.string().optional()
});
