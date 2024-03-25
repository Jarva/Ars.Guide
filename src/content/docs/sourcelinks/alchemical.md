---
title: "Alchemical Sourcelink"
description: "Technical Documentation for Alchemical Sourcelinks."
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

The Alchemical Sourcelink generates source from consuming nearby potion jars.

| Max Source | Transfer Rate | Event Range (Blocks) |
| ---------- | ------------- | -------------------- |
| 20000      | 10000         | 1                    |

## Source Per Potion

Potions are consumed per 100mb

Each effect in the potion jar is evaluated as:  
`(duration / 50) + (amplifier * 250) + 150`[^1]

The source produced by the potion is evaluated as:  
`75 + (each effect total)`

If the potion has multiple effects, then an additional modifier is applied:  
`total * (2.1 ^ effects)`

[^1]: The duration is calculated in ticks
