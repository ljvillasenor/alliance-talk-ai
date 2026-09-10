# They’re Already Talking to It

Static sticky-nav talk site for Lyndon’s Alliance clinician block.

**Title:** They’re Already Talking to It  
**Subtitle:** Curiosity, boundaries, and what patients do with AI  
**Format:** Single-page HTML (not PowerPoint). Presenter advances sections on the projector.

## Files

| File | Role |
|------|------|
| `index.html` | Talk deck (all sections) |
| `styles.css` | Projector-friendly theme |
| `app.js` | Sticky active nav + keyboard |
| `ask-scripts.html` | Printable ask-scripts card (QR target) |
| `assets/` | Small SVG icons only |
| `AI-MH-chatbots-fact-pack-2026-09-15.md` | Optional reference pack (not part of the live deck) |

## How to present (Sam fullscreen + Lyndon advances)

1. On **Sam’s laptop** (projector): open `index.html` in Chrome or Edge.
2. Enter **fullscreen** (`F11`, or browser full-screen on the page).
3. **Lyndon advances** sections with:
   - **`j`** / **→** / **↓** — next section  
   - **`k`** / **←** / **↑** — previous section  
   - **`?`** — keyboard help · **`Esc`** — close help  
   - Click sticky nav to jump
4. Optional: open `ask-scripts.html` on a phone via local network or point a QR at that file once hosted; print the card for the room.
5. Opening film: replace the `#open` 16∶9 placeholder with a local embed/video before showtime.
6. Discreet no-recording note is already on the opening slide.

**Cut order if short on time:** Ableton/Rhapsody demo first; then deep Pew. **Never cut:** takeaways, youth, helpful≠safe, two AIs, discussion.

## Local preview

From this directory:

```bash
cd /workspace/alliance-talk && python3 -m http.server 8765
```

Then open: http://127.0.0.1:8765/

Or open `index.html` directly via `file://` — relative CSS/JS paths work either way.

## Hard fence

No PHI, no patient examples, no invented medical papal quotes. No internal tool/producer names on stage.

## Authoritative outline

`/workspace/alliance-outline/2026-09-10-alliance-outline-packet.md`
