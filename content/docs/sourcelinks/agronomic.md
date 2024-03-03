---
title: "Agronomic Sourcelink"
description: "Technical Documentation for Agronomic Sourcelinks."
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

The Agronomic Sourcelink generates source from crop and tree growth.

| Max Source | Transfer Rate | Event Range (Blocks) |
|------------|---------------|----------------------|
| 1000       | 1000          | <=15                 |

## Source Per Event

| Growth Type      | Source Generated |
|------------------|------------------|
| Non-Magical Crop | 20               |
| Magical Crop[^1] | 45               |
| Non-Magical Tree | 50               |
| Magical Tree[^2] | 100              |

[^1]: <span class="badge text-bg-info">Block Tag</span> <span class="badge text-bg-dark">ars_nouveau:magic_plants</span>
[^2]: <span class="badge text-bg-info">Block Tag</span> <span class="badge text-bg-dark">ars_nouveau:magic_saplings</span>
