---
title: "Drygmy"
description: "A list of tweaks for Drygmy"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: ""
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

{{< callout context="note" title="Note" icon="info-circle" >}}
Some scripts on this page require [LootJS](https://modrinth.com/mod/lootjs) to function. These scripts will be marked with a <span class="badge text-bg-primary">LootJS</span> badge.

Additionally, the scripts that utilise LootJS require the below snippet to exist in the same file as them to work.
```js
const DRYGMY_UUID = "[I;1946194541,268914259,-2012236738,1743961897]";
const onlyDrygmy = (builder) => builder
    .matchKiller(entity => 
        entity.nbt(`{UUID:${DRYGMY_UUID}}`)
    );
```

{{< /callout >}}

## Minecraft

### Iron Golem

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweaks removes Iron Golems from the default Drygmy blacklist, allowing a Drygmy Henge to produce iron when an Iron Golem is nearby.

```js
ServerEvents.tags("entity_type", event => {
    event.remove("ars_nouveau:drygmy_blacklist", [
        "minecraft:iron_golem",
    ]);
});
```

### Wither

<span class="badge text-bg-dark server-scripts">server_scripts</span><span class="badge text-bg-primary">LootJS</span>

Withers, and other boss mobs in Minecraft, do not use loot tables to produce their loot. Instead they rely on spawning the loot during the death event, which means that Drygmys are unable to farm loot from these entities.  

This tweak creates a special loot table that produces Nether Stars only for Drygmy kills, preventing the double drop on player kill that would occur from a normal loot table.

```js
LootJS.modifiers(event => {
    onlyDrygmy(event.addEntityLootModifier("minecraft:wither"))
        .addLoot("minecraft:nether_star");
});
```

## Irons Spellbooks

### Scrolls

<span class="badge text-bg-dark server-scripts">server_scripts</span><span class="badge text-bg-primary">LootJS</span>

This tweak removes Irons Spellbooks scrolls from all entity drops in Drygmy farms.

```js
LootJS.modifiers(event => {
    onlyDrygmy(event.addLootTypeModifier(LootType.ENTITY))
        .removeLoot("irons_spellbooks:scroll");
});
```
### Netherite Scrap

<span class="badge text-bg-dark server-scripts">server_scripts</span><span class="badge text-bg-primary">LootJS</span>

This tweak prevents Ancient Knights (`irons_spellbooks:citadel_keeper`) from dropping Netherite Scrap in Drygmy farms.

```js
LootJS.modifiers(event => {
    onlyDrygmy(event.addEntityLootModifier("irons_spellbooks:citadel_keeper"))
        .removeLoot("minecraft:netherite_scrap");
});
```

#### Boss Mobs

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak prevents Irons Spellbooks boss mobs from producing any loot in a Drygmy Henge.

```js
ServerEvents.tags("entity_type", event => {
    event.add("ars_nouveau:drygmy_blacklist", [
        "irons_spellbooks:dead_king",
        "irons_spellbooks:archevoker",
    ]);
});
```


## Artifacts

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak blacklists Mimics from being farmed in a Drygmy Henge.

```js
ServerEvents.tags("entity_type", event => {
    event.add("ars_nouveau:drygmy_blacklist", [
        "artifacts:mimic",
    ]);
});
```

## Occultism

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak blacklists all Occultism mobs from being farmed in a Drygmy Henge.

```js
ServerEvents.tags("entity_type", event => {
    event.add("ars_nouveau:drygmy_blacklist", [
        /occultism:.+/,
    ]);
});
```

## Cataclysm

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak blacklists all Cataclysm mobs from being farmed in a Drygmy Henge.

```js
ServerEvents.tags("entity_type", event => {
    event.add("ars_nouveau:drygmy_blacklist", [
        /cataclysm:.+/,
    ]);
});
```

## Productive Bees

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak blacklists all productive bees from being farmed in a Drygmy Henge.

```js
ServerEvents.tags("entity_type", event => {
    event.add("ars_nouveau:drygmy_blacklist", [
        /productivebees:.+/,
    ]);
});
```

## Apotheosis

### Treasure Goblins

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak prevents treasure goblins from being farmable in a Drygmy Henge.
```js
LootJS.modifiers(event => {
    onlyDrygmy(event.addLootTableModifier("apotheosis:entity/treasure_goblin"))
        .removeLoot(/.*/);
});
```
