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
//     .forEach((entry) -> { System.out.println("\"" + entry.getKey().getPath() + "\": \"t(" + entry.getValue().getName() + "\")"); })
export const glyphMap = {
    // Ars Nouveau
    "invisibility": t("Invisibility"),
    "phantom_block": t("Conjure Mageblock"),
    "fortune": t("Luck"),
    "wither": t("Wither"),
    "toss": t("Toss"),
    "cut": t("Cut"),
    "grow": t("Grow"),
    "summon_wolves": t("Summon Wolves"),
    "name": t("Name"),
    "dampen": t("Dampen"),
    "gravity": t("Gravity"),
    "firework": t("Firework"),
    "split": t("Split"),
    "snare": t("Snare"),
    "wololo": t("Wololo"),
    "crush": t("Crush"),
    "evaporate": t("Evaporate"),
    "touch": t("Touch"),
    "conjure_water": t("Conjure Water"),
    "lightning": t("Lightning"),
    "pickup": t("Item Pickup"),
    "smelt": t("Smelt"),
    "launch": t("Launch"),
    "reset": t("Reset"),
    "rotate": t("Rotate"),
    "blink": t("Blink"),
    "animate_block": t("Animate Block"),
    "ignite": t("Ignite"),
    "harm": t("Harm"),
    "amplify": t("Amplify"),
    "bounce": t("Bounce"),
    "heal": t("Heal"),
    "glide": t("Glide"),
    "leap": t("Leap"),
    "fangs": t("Fangs"),
    "exchange": t("Exchange"),
    "fell": t("Fell"),
    "sensitive": t("Sensitive"),
    "redstone_signal": t("Redstone Signal"),
    "duration_down": t("Duration Down"),
    "intangible": t("Intangible"),
    "ender_inventory": t("Access Ender Inventory"),
    "interact": t("Interact"),
    "place_block": t("Place Block"),
    "harvest": t("Harvest"),
    "gust": t("Knockback"),
    "freeze": t("Freeze"),
    "randomize": t("Randomize"),
    "wall": t("Wall"),
    "summon_steed": t("Summon Steed"),
    "summon_vex": t("Summon Vex"),
    "self": t("Self"),
    "burst": t("Burst"),
    "aoe": t("AOE"),
    "decelerate": t("Decelerate"),
    "extend_time": t("Extend Time"),
    "orbit": t("Orbit"),
    "accelerate": t("Accelerate"),
    "break": t("Break"),
    "summon_undead": t("Summon Undead"),
    "rune": t("Rune"),
    "flare": t("Flare"),
    "explosion": t("Explosion"),
    "craft": t("Craft"),
    "wind_shear": t("Wind Shear"),
    "sense_magic": t("Sense Magic"),
    "pull": t("Pull"),
    "pierce": t("Pierce"),
    "slowfall": t("Slowfall"),
    "extract": t("Extract"),
    "delay": t("Delay"),
    "cold_snap": t("Cold Snap"),
    "summon_decoy": t("Summon Decoy"),
    "projectile": t("Projectile"),
    "infuse": t("Infuse"),
    "hex": t("Hex"),
    "underfoot": t("Underfoot"),
    "linger": t("Linger"),
    "light": t("Conjure Magelight"),
    "dispel": t("Dispel"),
    // Ars Additions
    "mark": t("Mark"),
    "retaliate": t("Retaliate"),
    "recall": t("Recall"),
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

export const getMapText = (map: ValueMap) => (val: string) =>
    val in map ? map[val].text : val;

export const transformMultiSelect = (map: ValueMap) => (val: string): string[] =>
    val.split(",").map(getMapText(map));

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
    ).transform(text => text.toLowerCase().replace(" ", "_")),
    category: zfd.text()
        .refine(val => val in categoryMap),
    addons: zfd.text(
        z.string().min(1).catch("")
    ),
    versions: zfd.text(
        z.string().min(1)
    )
});
