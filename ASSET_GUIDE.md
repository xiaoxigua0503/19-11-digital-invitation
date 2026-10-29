# Optional asset guide

The invitation intentionally works without external images or audio. Current legacy wedding photos and music are not appropriate for this event and are not used. Supply only original or properly licensed materials; do not use unofficial event branding or unlicensed character art.

| Asset | Exact destination | Recommended format / dimensions | Purpose | Replacement instructions |
| --- | --- | --- | --- | --- |
| Campus background illustration/photo | `public/event/campus-background.webp` | WebP, 1920×1200, landscape | Optional section background | Add a licensed campus scene, then update the relevant CSS in `src/app/globals.css`; keep a pastel overlay for readable text. |
| Anime character illustration | `public/event/letter-character.svg` (or `.webp`) | SVG or transparent WebP, 1000×1200 | Optional replacement for inline envelope presenter in `src/components/IntroEnvelope.tsx` | Use original/licensed artwork with permission; replace the inline SVG and preserve responsive sizing and meaningful alternative text if informative. |
| Event music | `public/audio/event-theme.mp3` | MP3, 192 kbps or higher | Optional ambient audio | Add licensed music and change the source in `src/app/ClientApp.tsx`; keep the user gesture and accessible play/pause controls. |
| Event mark | `public/event/event-mark.svg` | SVG, square viewBox | Optional mark for metadata and invitation accents | Use only an approved mark; update metadata in `src/app/layout.tsx` and relevant visual components. |

Do not upload attendee photos, private materials, or artwork without consent. No assets listed above are required for deployment.
