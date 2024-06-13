import {t} from "../../text.ts";

export const addonMap = {
    "tmg": t("Too Many Glyphs"),
    "neg": t("Not Enough Glyphs"),
    "omega": t("Ars Omega"),
    "artifice": t("Ars Artifice"),
    "additions": t("Ars Additions"),
    "elemental": t("Ars Elemental"),
    "plus": t("Ars Plus"),
    "trinkets": t("Ars Trinkets"),
}

export type Addon = keyof typeof addonMap | string;
