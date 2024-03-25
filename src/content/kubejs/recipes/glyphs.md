---
title: "Glyphs"
description: "Example recipes for Glyphs"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
menu:
  kubejs:
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

## Remove a glyph

<span class="badge text-bg-dark server-scripts">server_scripts</span>

```kjs
ServerEvents.recipes((event) => {
  event.remove({ id: "ars_nouveau:glyph_blink", type: "ars_nouveau:glyph" });
});
```

## Change a glyph recipe

<span class="badge text-bg-dark server-scripts">server_scripts</span>

```kjs
const getItem = (item) => ({
  item: item.startsWith("#") ? { tag: item.substring(1) } : { item },
});

ServerEvents.recipes((event) => {
  event.remove({ id: "ars_nouveau:glyph_blink", type: "ars_nouveau:glyph" });
  event
    .custom({
      type: "ars_nouveau:glyph",
      count: 1,
      exp: 160,
      inputItems: [
        getItem("ars_nouveau:manipulation_essence"),
        getItem("ars_nouveau:manipulation_essence"),
        getItem("#forge:ender_pearls"),
        getItem("#forge:ender_pearls"),
        getItem("#forge:ender_pearls"),
      ],
      output: "ars_nouveau:glyph_blink",
    })
    .id("ars_nouveau:glyph_blink");
});
```
