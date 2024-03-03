---
title: "Volcanic Sourcelink"
description: "Technical Documentation for Volcanic Sourcelinks."
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

The Volcanic Sourcelink generates source from burning fuel items.

| Max Source | Transfer Rate | Event Range (Blocks) |
|------------|---------------|----------------------|
| 5000       | 1000          | 1                    |

## Source Per Item

| Item Type            | Source Generated |
|----------------------|------------------|
| Fire Essence         | 2000             |
| Blazing Archwood Log | 125              |
| Archwood Log[^1]     | 75               |
| Other Fuel           | `duration / 12`  |

[^1]: <span class="badge text-bg-info">Item Tag</span> <span class="badge text-bg-dark">forge:logs/archwood</span>
