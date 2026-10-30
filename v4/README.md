# Hide and Seek v4 - Original Assets Only

This version uses no director deck images at all. The deck story was used as inspiration only.

## Assets in this folder, and nowhere else

- `assets/hero.webp` - original generated theatre, magician silhouette in a spotlight
- `assets/mansion.webp` - original generated mansion turned into a theatre, with design tools in the foreground
- `assets/cabinet.webp` - original generated illusion cabinet, door open, gold light, floating ace
- `assets/finale.webp` - original generated empty stage, spotlight on a single chair and doll

All other visuals are code: a gold wireframe ring, floating wireframe boxes, and gold dust, all built in Three.js.

## How it plays

One fixed WebGL canvas. Scroll moves a camera through a dark tunnel. The camera eases toward your scroll position in a single animation loop, for smooth motion. Text is one fixed layer, changing by opacity and transform only. Performance is capped on purpose: no antialiasing, pixel ratio capped at 1.5, no lights, basic materials.

## If WebGL fails

A plain image gallery fallback shows the four original images in order.

## Before you send the link

Replace `CONTACT_EMAIL` in `index.html` with Harsha's real email. That is the only placeholder.

## Deploy

Upload the whole folder as it is, keeping `assets/` next to `index.html`. Works on Vercel, Netlify, GitHub Pages, or any static host.
