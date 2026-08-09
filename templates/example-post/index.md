---
# ─────────────────────────────────────────────────────────────────
# HOW TO USE THIS TEMPLATE
# 1. Copy this whole "example-post" folder into:
#      src/content/<category>/<your-post-slug>/
#    <category>   = any top-level folder name under src/content
#                   (e.g. papers, til, notes) — new names just work,
#                   there is nothing to register anywhere else.
#    <your-slug>  = becomes the URL: /<category>/<your-slug>/
# 2. Rename the folder to your slug (lowercase-kebab-case).
# 3. Fill in the frontmatter fields below.
# 4. Delete this comment block before publishing (optional, but tidy).
# See also: AddABlog.md in the repo root for the full walkthrough.
# ─────────────────────────────────────────────────────────────────

title: "Your Post Title"
description: "One or two sentences. Shown in listings, cards, and meta tags."
date: 2026-08-10
# updated: 2026-08-15                # optional — uncomment if you revise later
tags: ["example", "template"]
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

## Introduction

Write your post here using normal Markdown (or MDX, if you need components).

## A section with an image

Add an image reference here once you've dropped the file into `./assets/`
(see the comment above for the exact syntax).

Every `##`/`###` heading you add automatically shows up in the right-hand
table of contents on the published page.

## Wrapping up

Delete this template content and write your own. When it's ready, set
`draft: false` in the frontmatter above, then commit and push.
