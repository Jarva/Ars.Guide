---
title: "Wilden"
description: "A list of tweaks for Wilden"
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

## Re-enable random Wilden Spawns

<span class="badge text-bg-dark server-scripts">server_scripts</span>

This tweak re-enables the random overworld Wilden spawns that occurred before the Wilden update in 1.19.2.

```js
const spawns = [
  ["#minecraft:is_overworld", "wilden_hunter"],
  ["#minecraft:is_overworld", "wilden_stalker"],
  ["#forge:is_cold/overworld", "wilden_guardian"],
];

ServerEvents.highPriorityData(event => {
  spawns.forEach(([biomes, wilden]) => {
    event.addJson(`ars_nouveau:forge/biome_modifier/${wilden}_spawn`, {
      type: "forge:add_spawns",
      biomes: biomes,
      spawners: {
        type: `ars_nouveau:${wilden}`,
        maxCount: 1,
        minCount: 1,
        weight: 50,
      }
    });
  });
});
```