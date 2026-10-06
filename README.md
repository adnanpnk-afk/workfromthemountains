# Work From The Mountains · one-page site (GitHub Pages)

Static HTML/CSS + one small JS file. No build step. Hosting target: **GitHub Pages**.

Preview locally:
```
cd /workspace/wftm_site && python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## Status
- Public page ready to push (see `DEPLOY.md`).
- **Waitlist form is deferred.** The `#waitlist` section is a short “Waitlist opens soon” block that links to Instagram (`https://instagram.com/workfromthemountains`).
- `FORM_MODE` in `assets/js/site.js` stays `"local"`. Do not wire FormSubmit, Formspree, or Netlify Forms until approved.
- `thanks.html` is kept for a future form; not linked from the live page right now.

## Files
- `index.html` — the page (hero, idea, who, place, sample day, Instagram, waitlist-soon, FAQ, footer)
- `thanks.html` — reserved for a future form success page
- `assets/css/site.css`, `assets/js/site.js`
- `assets/fonts/` — Fraunces + Inter, self-hosted woff2
- `assets/video/` — flyover concept webm/mp4 (loaded only when useful)
- `assets/img/` — poster, stills, Instagram tiles, logos, og.jpg
- `screenshots/`, `_build/` — local only; **do not deploy** (see `DEPLOY.md`)
- `.nojekyll` — tells GitHub Pages to serve assets without Jekyll processing

## Before / after going live
1. Push only the files listed in `DEPLOY.md`.
2. Enable GitHub Pages on the repo (branch `main` / root, or `docs/`, or `gh-pages` — match whatever you use).
3. Optional later: make `og:image` an absolute URL once the public hostname is known.
4. Optional later: restore the waitlist form and set `FORM_MODE` + an endpoint — only with founder approval.
