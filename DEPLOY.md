# Deploy to GitHub Pages

Do **not** run `gh` or publish from the agent box without founder approval.
This file only lists what to push when you’re ready.

## Push these (site root of the Pages branch / folder)

```
index.html
thanks.html
.nojekyll
assets/
```

Everything under `assets/` (css, js, fonts, img, video).

## Do **not** push

```
screenshots/
_build/
```

Also skip any local scratch, `.git` is fine as the repo itself; just don’t put `_build` or `screenshots` in the published tree.

## Suggested git add (from `/workspace/wftm_site`)

```
git add index.html thanks.html .nojekyll assets README.md DEPLOY.md
# intentionally omit: screenshots _build
```

If this folder becomes the whole repo root, a `.gitignore` with `_build/` and `screenshots/` is a good idea before the first push.

## After push

1. In the GitHub repo: Settings → Pages → deploy from the branch that contains these files (usually `main` / root).
2. Wait for the Pages build, then open the `*.github.io` URL.
3. Spot-check: hero video/poster, Instagram links, `#waitlist` “opens soon” block, FAQ, mobile layout.
