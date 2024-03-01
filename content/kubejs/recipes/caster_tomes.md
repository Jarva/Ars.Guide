---
title: "Caster Tomes"
description: "Example recipes for Caster Tomes"
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

## Remove a Caster Tome

<span class="badge text-bg-dark server-scripts">server_scripts</span>

The `id` of a Caster Tome can be found using the `/ars-tome` command and copying the auto-completed name.

```js
ServerEvents.recipes(event => {
    event.remove({
        mod: "ars_nouveau",
        id: "ars_nouveau:tomes/takeoff_tome",
        type: "ars_nouveau:caster_tome",
    });
});
```

## Add a new Caster Tome

<span class="badge text-bg-dark server-scripts">server_scripts</span>

The spell is not affected by glyph limits. The `.id` provided at the end controls the name of the tome in the `/ars-tome` command.

```js
ServerEvents.recipes(event => {
    event.custom({
        type: "ars_nouveau:caster_tome",
        flavour_text: "Vault without all those safety precautions.",
        name: "Danger Vault",
        sound: {
            family: "ars_nouveau:fire_family",
            pitch: 1,
            volume: 1,
        },
        spell: [
            "ars_nouveau:glyph_self",
            "ars_nouveau:glyph_leap",
            "ars_nouveau:glyph_amplify",
            "ars_nouveau:glyph_amplify",
        ],
        tome_type: "ars_nouveau:caster_tome",
    }).id("ars_nouveau:tomes/danger_vault")
});
```

## Add crafting recipe for Caster Tome

<span class="badge text-bg-dark server-scripts">server_scripts</span>

The highlighted line shows how to retrieve a tome from the id provided by /ars-tome. This can be used in any recipe that supports NBT output. The example below is a shapeless recipe for the Vault tome.

```js {hl_lines=2}
ServerEvents.recipes(event => {
  const [tome] = event.findRecipes({ id: "ars_nouveau:tomes/vault_tome" })

  event.shapeless(
    tome.getOriginalRecipeResult(),
    [
      'ars_nouveau:novice_spell_book',
      'ars_nouveau:air_essence',
      'minecraft:feather',
      'ars_nouveau:wilden_wing',
    ]
  )
});
```