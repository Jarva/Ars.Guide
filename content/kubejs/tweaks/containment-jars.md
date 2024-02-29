---
title: "Containment Jars"
description: "A list of tweaks for Containment Jars"
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

## Prevent Spellbooks From Entering Jars

<span class="badge text-bg-dark" style="color:var(--col-server) !important">server_scripts</span>

```js
ServerEvents.tags('item', (event) => {
    event.get('ars_nouveau:interact_jar_blacklist').add([/ars_nouveau:.*_spell_book/]);
});
```