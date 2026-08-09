# Nishant Thapa — Blog

A markdown-driven blog built with [Astro](https://astro.build). Drop a folder
with an `index.md` under `src/content/`, and it becomes a page — no manual
route registration, no CMS. Push to `main` and Vercel redeploys automatically.

See **[AddABlog.md](./AddABlog.md)** for the full step-by-step guide to
publishing a new post.

## How it works

- `src/content/<category>/<slug>/index.md` → `/<category>/<slug>/`
- Co-locate images in that post's own `assets/` folder and reference them
  with a relative path (`./assets/figure.png`) — Astro optimizes them
  automatically at build time.
- The sidebar navigation and homepage listing are generated from the content
  folder tree — a new category or post appears with zero code changes.
- `templates/example-post/` is the starting point for every new post; it's
  never picked up as content since it lives outside `src/content/`.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start the local dev server                  |
| `npm run build`     | Build the static site to `./dist/`          |
| `npm run preview`   | Preview the production build locally        |

## Deployment

Static output, deployed on [Vercel](https://vercel.com) using its zero-config
Astro preset. Every push to the connected branch rebuilds and redeploys the
live site automatically. See `AddABlog.md` for the one-time setup steps.
