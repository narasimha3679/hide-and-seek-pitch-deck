# Hide and Seek v3 - Interactive 3D Pitch

Your own version, built for smoothness first. The poker card fan from v2 is gone. There are no sticky DOM sections fighting the scroll anymore.

## How it works

- One fixed WebGL canvas, built with Three.js, no build step, no backend
- The story images are textures on 3D planes arranged in a dark tunnel with fog
- Scroll moves a camera through that tunnel. The camera eases toward your scroll position in a single animation loop, so motion stays smooth instead of jumping with every scroll event
- Mouse movement gives a gentle parallax look, also eased, never instant
- Text is one fixed layer. Only opacity and transform change, and only when the active scene changes
- Gold dust is one small draw call, 350 points, not a full screen particle storm
- Performance settings are capped on purpose: no antialiasing, pixel ratio capped at 1.5, basic materials with no lights, low anisotropy

## If WebGL fails

The site falls back to a plain vertical image gallery, so a producer still sees the story.

## Before you send the link

Replace `CONTACT_EMAIL` in `index.html` with Harsha's real email. That is the only placeholder.

## Deploy

Upload the whole folder as it is, keeping `assets/` next to `index.html`. Works on Vercel, Netlify, GitHub Pages, or any static host.
