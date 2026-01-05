/**
 * Category type definitions.
 */

export interface CategoryValue {
    class: string;
    text: string;
}

export const categoryMap: Record<string, CategoryValue> = {
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

export type Category = keyof typeof categoryMap;
