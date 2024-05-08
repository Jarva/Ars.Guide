import { z } from "zod";
import { zfd } from "zod-form-data";

const t = (text: string) => ({ text });

export const categoryMap = {
    "aggressive": {
        class: "combat",
        text: "Aggressive",
    },
    "defensive": {
        class: "combat",
        text: "Defensive",
    },
    "support": {
        class: "combat",
        text: "Support",
    },
    "exploration": {
        class: "other",
        text: "Exploration",
    },
    "utility": {
        class: "other",
        text: "Utility",
    },
    "automation": {
        class: "other",
        text: "Automation",
    },
    "fun": {
        class: "other",
        text: "Fun",
    },
};

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

export const versionMap = {
    "1.16.5": {},
    "1.18.2": {},
    "1.19.2": {},
    "1.20.1": {},
}

// GlyphRegistry.getSpellpartMap()
//     .entrySet()
//     .stream()
//     .filter((entry) -> entry.getKey().getNamespace().equals("ars_nouveau"))
//     .forEach((entry) -> { System.out.println("\"" + entry.getKey().toString() + "\": \"t(" + entry.getValue().getName() + "\")"); })
export const glyphMap = {
    // Ars Nouveau
    "ars_nouveau:glyph_invisibility": t("Invisibility"),
    "ars_nouveau:glyph_phantom_block": t("Conjure Mageblock"),
    "ars_nouveau:glyph_fortune": t("Luck"),
    "ars_nouveau:glyph_wither": t("Wither"),
    "ars_nouveau:glyph_toss": t("Toss"),
    "ars_nouveau:glyph_cut": t("Cut"),
    "ars_nouveau:glyph_grow": t("Grow"),
    "ars_nouveau:glyph_summon_wolves": t("Summon Wolves"),
    "ars_nouveau:glyph_name": t("Name"),
    "ars_nouveau:glyph_dampen": t("Dampen"),
    "ars_nouveau:glyph_gravity": t("Gravity"),
    "ars_nouveau:glyph_firework": t("Firework"),
    "ars_nouveau:glyph_split": t("Split"),
    "ars_nouveau:glyph_snare": t("Snare"),
    "ars_nouveau:wololo": t("Wololo"),
    "ars_nouveau:glyph_crush": t("Crush"),
    "ars_nouveau:glyph_evaporate": t("Evaporate"),
    "ars_nouveau:glyph_touch": t("Touch"),
    "ars_nouveau:glyph_conjure_water": t("Conjure Water"),
    "ars_nouveau:glyph_lightning": t("Lightning"),
    "ars_nouveau:glyph_pickup": t("Item Pickup"),
    "ars_nouveau:glyph_smelt": t("Smelt"),
    "ars_nouveau:glyph_launch": t("Launch"),
    "ars_nouveau:reset": t("Reset"),
    "ars_nouveau:glyph_rotate": t("Rotate"),
    "ars_nouveau:glyph_blink": t("Blink"),
    "ars_nouveau:glyph_animate_block": t("Animate Block"),
    "ars_nouveau:glyph_ignite": t("Ignite"),
    "ars_nouveau:glyph_harm": t("Harm"),
    "ars_nouveau:glyph_amplify": t("Amplify"),
    "ars_nouveau:glyph_bounce": t("Bounce"),
    "ars_nouveau:glyph_heal": t("Heal"),
    "ars_nouveau:glyph_glide": t("Glide"),
    "ars_nouveau:glyph_leap": t("Leap"),
    "ars_nouveau:glyph_fangs": t("Fangs"),
    "ars_nouveau:glyph_exchange": t("Exchange"),
    "ars_nouveau:glyph_fell": t("Fell"),
    "ars_nouveau:glyph_sensitive": t("Sensitive"),
    "ars_nouveau:glyph_redstone_signal": t("Redstone Signal"),
    "ars_nouveau:glyph_duration_down": t("Duration Down"),
    "ars_nouveau:glyph_intangible": t("Intangible"),
    "ars_nouveau:glyph_ender_inventory": t("Access Ender Inventory"),
    "ars_nouveau:glyph_interact": t("Interact"),
    "ars_nouveau:glyph_place_block": t("Place Block"),
    "ars_nouveau:glyph_harvest": t("Harvest"),
    "ars_nouveau:glyph_gust": t("Knockback"),
    "ars_nouveau:glyph_freeze": t("Freeze"),
    "ars_nouveau:glyph_randomize": t("Randomize"),
    "ars_nouveau:glyph_wall": t("Wall"),
    "ars_nouveau:glyph_summon_steed": t("Summon Steed"),
    "ars_nouveau:glyph_summon_vex": t("Summon Vex"),
    "ars_nouveau:glyph_self": t("Self"),
    "ars_nouveau:burst": t("Burst"),
    "ars_nouveau:glyph_aoe": t("AOE"),
    "ars_nouveau:glyph_decelerate": t("Decelerate"),
    "ars_nouveau:glyph_extend_time": t("Extend Time"),
    "ars_nouveau:glyph_orbit": t("Orbit"),
    "ars_nouveau:glyph_accelerate": t("Accelerate"),
    "ars_nouveau:glyph_break": t("Break"),
    "ars_nouveau:glyph_summon_undead": t("Summon Undead"),
    "ars_nouveau:glyph_rune": t("Rune"),
    "ars_nouveau:glyph_flare": t("Flare"),
    "ars_nouveau:glyph_explosion": t("Explosion"),
    "ars_nouveau:glyph_craft": t("Craft"),
    "ars_nouveau:glyph_wind_shear": t("Wind Shear"),
    "ars_nouveau:glyph_sense_magic": t("Sense Magic"),
    "ars_nouveau:glyph_pull": t("Pull"),
    "ars_nouveau:glyph_pierce": t("Pierce"),
    "ars_nouveau:glyph_slowfall": t("Slowfall"),
    "ars_nouveau:glyph_extract": t("Extract"),
    "ars_nouveau:glyph_delay": t("Delay"),
    "ars_nouveau:glyph_cold_snap": t("Cold Snap"),
    "ars_nouveau:glyph_summon_decoy": t("Summon Decoy"),
    "ars_nouveau:glyph_projectile": t("Projectile"),
    "ars_nouveau:glyph_infuse": t("Infuse"),
    "ars_nouveau:glyph_hex": t("Hex"),
    "ars_nouveau:glyph_underfoot": t("Underfoot"),
    "ars_nouveau:glyph_linger": t("Linger"),
    "ars_nouveau:glyph_light": t("Conjure Magelight"),
    "ars_nouveau:glyph_dispel": t("Dispel"),
    // Ars Additions
    "ars_additions:glyph_mark": t("Mark"),
    "ars_additions:glyph_retaliate": t("Retaliate"),
    "ars_additions:glyph_recall": t("Recall"),
    // Ars Elemental
    // ...
}

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

const transformMultiSelect = (map: ValueMap) => (val: string): string[] =>
    val.split(",").map(val => val in map ? map[val].text : val);

export const spellFormSchema = zfd.formData({
    author: zfd.text(
        z.string().min(1)
    ),
    description: zfd.text(
        z.string().min(1).catch("N/A")
    ),
    spell: zfd.text(
        z.string().min(1)
    ),
    glyphs: zfd.text(
        z.string().min(1)
    ).transform(transformMultiSelect(glyphMap)),
    category: zfd.text()
        .refine(val => val in categoryMap)
        .transform(val => transformMultiSelect(categoryMap)(val).join("\n")),
    addons: zfd.text(
        z.string().min(1).catch("None")
    ).transform(transformMultiSelect(addonMap)),
    versions: zfd.text(
        z.string().min(1)
    ).transform(val => val.split(",")),
    infinite: zfd.checkbox(),
});
