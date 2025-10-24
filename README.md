# Maria — Fire Hula Hoop Artiste (Portfolio)

This is a small static portfolio website built with HTML, CSS and JavaScript. It includes an animated SVG "hoop on fire", an About section, Showreel (embedded video), and a Contact form that opens your email client.

How to run

1. Open `index.html` in your browser. For the best experience, serve it with a local static server (optional):

```bash
# from the repository root
# python3 -m http.server 8000
# then open http://localhost:8000
```

Replace the showreel iframe `src` in `index.html` with your actual video URL. Update contact email addresses to Maria's real booking email.

Files

- `index.html` — main site markup and embedded SVG animation
- `styles.css` — styling and responsive layout
- `script.js` — small interactivity (nav, smooth scroll, hoop rotation)

Extras added

- `favicon.svg` — small SVG used as the site favicon.
- Header and footer social links (Instagram / YouTube / TikTok) were added to `index.html`.
- An animated "fire cursor" was implemented using a small DOM element that follows the mouse (`script.js`) and styles in `styles.css`. It degrades automatically on touch devices.

Illustration update

- Replaced the fire hoop visual with an illustrative octopus inside `index.html` (`#octo-illustration`). The octopus has 8 tentacles. One tentacle holds a hula hoop, one tentacle juggles three balls (animated), and one tentacle holds a wand. Tentacles, balls, hoop and wand have lightweight CSS animations.

Showreel and color update

- The showreel `iframe` was updated to the Instagram reel URL you provided. Note: Instagram sometimes blocks direct iframe embedding; a fallback link is included under the video.
- The site's palette was updated to an orange theme (octopus, hoop and accents). Tentacle motion and juggling timing were tuned for a livelier effect.

- The showreel was replaced with the YouTube Shorts link you later requested; the embed uses the standard YouTube embed URL and includes a fallback link to the Shorts page.
- The cursor is now a canvas-based particle fire system. It follows the mouse on desktop and gracefully degrades (no cursor canvas) on touch devices. The effect uses a lightweight particle emitter for good performance.

Notes

- The contact form uses a `mailto:` fallback. For production use, wire it to a backend or third-party form provider if you need server-side submission.
- The SVG and CSS animation are lightweight and intended as a visually striking placeholder; you can replace or enhance with canvas/particles for a richer fire effect.# session-09-idea