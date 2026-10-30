# Hide and Seek v2 - Visual Pitch Site

This is the visual-first rebuild. Images lead, words stay to a minimum. One page, no backend, no build step.

## What makes it different from v1

- Full screen theatre stack: each image covers the last one as you scroll
- WebGL gold dust over the whole page, built with Three.js, plus mouse parallax
- Spotlight search section: move your light across a dark theatre to find the scene
- 3D card fan that turns with your cursor, hover a card to lift it
- Drag gallery, split character panels, and a three beat twist reveal
- Almost no paragraphs. Each scene is a title plus one short line.

## Before you send the link

Replace `CONTACT_EMAIL` in `index.html` with Harsha's real email. That is the only placeholder.

## Deploy

Upload the whole folder as it is, keeping `assets/` next to `index.html`. Works on Vercel, Netlify, GitHub Pages, or any static host. Drag the folder into Vercel or Netlify, or push it to a repo for GitHub Pages.

## About Rive

Rive was not used here, on purpose. Rive is best for hand animated vector characters and UI, and it needs a .riv file made in its editor. For a photo heavy cinematic pitch, real time WebGL with Three.js plus CSS 3D gives the same motion, runs from code alone, and needs no extra editor file or subscription.

## Fallbacks

If Three.js or WebGL fails to load, the site still shows every image and every section in 2D. Touch devices get the same images, with drag and tap instead of hover and cursor effects.
