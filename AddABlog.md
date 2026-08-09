# How to add a new blog post

## Every time you publish a post

1. **Pick a category.** This is any top-level folder name under
   `src/content/` — e.g. `papers`, `til`, `notes`. If the category doesn't
   exist yet, just create it; there is nothing to register anywhere else.

2. **Copy the template.** Duplicate `templates/example-post/` to:

   ```
   src/content/<category>/<your-post-slug>/
   ```

   The slug becomes the URL segment, so use lowercase-kebab-case, e.g.
   `attention-is-all-you-need` → `/papers/attention-is-all-you-need/`.

3. **Fill in the frontmatter** at the top of `index.md`:

   | Field         | Meaning                                                        |
   | ------------- | ---------------------------------------------------------------- |
   | `title`       | Post title, shown as the `<h1>` and in browser tabs               |
   | `description` | One or two sentences, shown in listings and meta tags             |
   | `date`        | Publish date, `YYYY-MM-DD`                                        |
   | `updated`     | Optional — set if you revise the post later                       |
   | `tags`        | Optional list of tags, e.g. `["nlp", "paper-review"]`              |
   | `draft`       | `true` while writing (hidden from the production build), `false` to publish |
   | `cover`       | Optional relative path to a listing/social image, e.g. `./assets/cover.png` |
   | `coverAlt`    | Alt text for the cover image                                      |

4. **Write the post** in Markdown below the frontmatter. `##`/`###` headings
   automatically populate the right-hand table of contents.

5. **Add images.** Put image files in that post's own `assets/` folder and
   reference them with a relative path:

   ```md
   ![Figure 1: caption text](./assets/figure1.png)
   ```

   Astro optimizes these automatically at build time — no import needed.
   Keep each post's images inside *its own* `assets/` folder, not a shared
   one, so posts stay self-contained and easy to move or delete.

6. **Preview locally:**

   ```sh
   npm run dev
   ```

   Open the printed `localhost` URL and find your post on the homepage or
   directly at `/<category>/<your-post-slug>/`. While `draft: true`, the
   post is visible in dev but excluded from `npm run build`.

7. **Publish:** set `draft: false`, then

   ```sh
   git add src/content/<category>/<your-post-slug>/
   git commit -m "Add post: <your post title>"
   git push
   ```

   Vercel picks up the push and redeploys automatically — no other action
   needed.

## One-time setup (only needed once, not per post)

You said you'll handle commit/push/deploy yourself — here's the reference
for the first-time setup:

1. **Initialize git** (from the project root, if not already done):

   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository** (via github.com or `gh repo create`), then
   connect it as the remote and push:

   ```sh
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Connect the repo on Vercel:**
   - Go to [vercel.com](https://vercel.com) → **Add New Project**
   - Import the GitHub repository
   - Vercel auto-detects the Astro framework preset (build command
     `astro build`, output directory `dist`) — no changes needed
   - Click **Deploy**

   From then on, every `git push` to the connected branch triggers a new
   build and deploy automatically.

## Troubleshooting

- **Post isn't showing up** → check `draft` isn't still `true`, and that the
  file is named exactly `index.md` inside its own folder (not `post.md` or
  similar — the router specifically looks for `index.md`/`index.mdx`).
- **Images aren't rendering** → check the relative path (`./assets/...`) is
  correct and the image lives in that post's own `assets/` folder, not a
  different post's or a shared top-level folder.
- **New category not appearing in the sidebar** → the sidebar is generated
  from folders that actually contain a published (non-draft) post; an empty
  category folder won't show up until it has at least one.
- **`npm run build` fails with `ImageNotFound`** → a markdown image
  reference (or a `cover:` in frontmatter) points at a file that doesn't
  exist in that post's `assets/` folder. This breaks the build even if the
  post is `draft: true`, since every post's content is validated at build
  time regardless of draft status. Fix the path or remove the reference
  until the image file actually exists.
