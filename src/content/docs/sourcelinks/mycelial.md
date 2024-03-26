---
title: "Mycelial Sourcelink"
description: "Technical Documentation for Mycelial Sourcelinks."
weight: 810
---

The Mycelial Sourcelink generates source from consuming edible items.

| Max Source | Transfer Rate | Event Range (Blocks) |
| ---------- | ------------- | -------------------- |
| 1000       | 1000          | 1                    |

## Source Per Item

| Item Type        | Source Generated                       |
| ---------------- | -------------------------------------- |
| Base             | `(11 * nutrition) + (30 * saturation)` |
| Magic Plants[^1] | `(Base + 10) * 2`                      |
| Magic Food[^2]   | `(Base + 10) * 2`                      |

[^1]: <span class="badge text-bg-info">Item Tag</span> <span class="badge text-bg-dark">ars_nouveau:magic_food</span>
[^2]: <span class="badge text-bg-info">Block Tag</span> <span class="badge text-bg-dark">ars_nouveau:magic_plants</span>
