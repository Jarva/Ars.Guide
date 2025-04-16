import { t } from "../../../text";

export const Scalaes = {
    resize: t("Resize"),
};

export const ArsOmega = {
    flatten: t("Flatten"),
    missile: t("Missile"),
    overhead: t("Overhead"),
    propagate_missile: t("Propagate Missile"),
    propagate_overhead: t("Propagate Overhead"),
    propagate_projectile: t("Propagate Projectile"),
    propagate_self: t("Propagate Self"),
    propagate_underfoot: t("Propagate Underfoot"),
};

export const Not_Enough_Glyphs = {
    filter_dark: t("Filter: Dark"),
    filter_light: t("Filter: Light"),
    momentum: t("Momentum"),
    plow: t("Plow"),
    propagate_plane: t("Propagate Plane"),
    trail: t("Echoing Trail"),
}

export const Toomanyglyphs = {
    chaining: t("Chaining"),
    filter_animal: t("Filter: Animal"),
    filter_block: t("Filter: Block"),
    filter_entity: t("Filter: Entity"),
    filter_is_baby: t("Filter: Baby"),
    filter_is_mature: t("Filter: Mature"),
    filter_item: t("Filter: Item"),
    filter_living: t("Filter: Living"),
    filter_living_not_monster: t("Filter: Not Monster"),
    filter_living_not_player: t("Filter: Not Player"),
    filter_monster: t("Filter: Monster"),
    filter_player: t("Filter: Player"),
    ray: t("Ray"),
    reverse_direction: t("Reverse Direction")
}


export default {
    ...Not_Enough_Glyphs,
    ...Scalaes,
    ...ArsOmega,
    ...Toomanyglyphs,
};