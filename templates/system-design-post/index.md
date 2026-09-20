---
# ─────────────────────────────────────────────────────────────────
# HOW TO USE THIS TEMPLATE
# 1. Copy this whole "system-design-post" folder into:
#      src/content/system-design/<your-post-slug>/
#    <your-slug>  = becomes the URL: /system-design/<your-post-slug>/
# 2. Rename the folder to your slug (lowercase-kebab-case).
# 3. Fill in the frontmatter fields below.
# 4. Delete this comment block before publishing (optional, but tidy).
# See also: AddABlog.md in the repo root for the full walkthrough.
# ─────────────────────────────────────────────────────────────────

title: "Design: Your System Title"
description: "One or two sentences. Shown in listings, cards, and meta tags."
date: 2026-08-10
# updated: 2026-08-15                # optional — uncomment if you revise later
tags: ["system-design"]
draft: true                          # keep true while writing; drafts are hidden from the production build
# cover: ./assets/cover.png          # optional social/listing image — only uncomment once the file exists
# coverAlt: "Description of the cover image"
---

<!--
  IMAGES: put files in ./assets/ next to this index.md, and reference them
  with a relative path, e.g.:

    ![Figure 1: caption describing the image](./assets/figure1.png)

  Astro optimizes them automatically at build time — no import needed.
  IMPORTANT: a broken image path fails the whole site build (even for a
  draft post), so only add an image reference once the file actually
  exists in ./assets/.
-->

## Problem Statement

What system are you designing, and for whom? One paragraph framing the
scenario as if it were an interview prompt or a real product need.

## Requirements

**Functional**
- What the system must do.

**Non-functional**
- Scale (users, QPS, data volume), latency, availability, consistency
  expectations, etc.

## High-Level Design

The overall architecture — describe the main components and how they fit
together. A diagram (see `./assets/`) usually goes here.

## Deep Dive

Zoom into the interesting or hard parts: data model, a specific algorithm,
partitioning/sharding strategy, caching, failure handling, etc.

## Trade-offs & Alternatives

What did you choose not to do, and why? What would you reconsider at 10x
the scale?

## Wrapping Up

Summary of the design and any open questions.
