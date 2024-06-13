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

export type Category = keyof typeof categoryMap;
