import {t} from "../../text.ts";

export const addonMap = {
    // short names
    "tmg": t("Too Many Glyphs"),
    "neg": t("Not Enough Glyphs"),
    "omega": t("Ars Omega"),
    "artifice": t("Ars Artifice"),
    "additions": t("Ars Additions"),
    "elemental": t("Ars Elemental"),
    "plus": t("Ars Plus"),
    "trinkets": t("Ars Trinkets"),
    // full names alias
    "ars_nouveau": t("Ars Nouveau"),
    "ars_elemental": t("Ars Elemental"),
    "ars_additions": t("Ars Additions"),
    "ars_trinkets": t("Ars Trinkets"),
    "ars_omega": t("Ars Omega"),
    "ars_artifice": t("Ars Artifice"),
    "ars_plus": t("Ars Plus"),
    "too_many_glyphs": t("Too Many Glyphs"),
    "not_enough_glyphs": t("Not Enough Glyphs"),
}

export type Addon = keyof typeof addonMap | string;
