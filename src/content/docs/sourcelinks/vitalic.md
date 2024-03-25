---
title: "Vitalic Sourcelink"
description: "Technical Documentation for Vitalic Sourcelinks."
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

The Vitalic Sourcelink generates source from creatures dying and baby animals spawning and growing up.

| Max Source | Transfer Rate | Event Range (Blocks) |
| ---------- | ------------- | -------------------- |
| 2500       | 1000          | 15                   |

## Source Per Event

| Event Type                      | Source Generated       |
| ------------------------------- | ---------------------- |
| Entity Died[^1]                 | 200                    |
| Baby Entity Spawned             | 600                    |
| Baby Animal within 6 blocks[^2] | 10 source per 60 ticks |

[^1]: Entity must not be summoned (`ISummon`) or dispellable (`IDispellable`)
[^2]: Baby animals with growth disabled from Quark are ignored
