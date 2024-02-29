---
title: "Archwood Trees"
description: "A list of tweaks for Archwood Trees"
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

## Remove Wild Archwood Trees

<span class="badge text-bg-dark" style="color:var(--col-startup) !important">startup_scripts</span>

This prevents Archwood Trees from spawning anywhere outside of Archwood Forests.

```js
WorldgenEvents.remove(event => {
    event.removeFeatureById(/ars_nouveau:archwood_forest/, 'vegetal_decoration', ['ars_nouveau:placed_mixed_archwoods', 'ars_elemental:flashing_archwood'], );
});
```
