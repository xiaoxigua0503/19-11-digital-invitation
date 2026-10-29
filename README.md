# International Men's Day digital invitation

A responsive, anime-inspired campus invitation for **International Men's Day, November 19, 2026**. The app is built with Next.js 14, React, and TypeScript. Its opening uses a CSS envelope animation and original inline vector artwork, so no optional art or music is needed for the site to render.

## Event configuration

Edit `src/lib/wedding.ts` to update the event name, date, organizer, venue, description, and FAQ. The date is known; time, venue, agenda, and organizer details remain explicitly unconfirmed. Calendar actions currently create an all-day entry for November 19, 2026. Do not publish unconfirmed logistics.

## RSVP and integrations

The RSVP form validates and submits through `/api/rsvp`, and guests can retrieve/update an existing response by email or phone through `/api/rsvp/lookup`. Next.js forwards requests to Google Apps Script, which persists the existing RSVP sheet structure. Confirmation email remains optional and does not block an RSVP. Google Calendar links and `.ics` downloads use the configured event date.

Configure these server environment variables in the deployment environment (never commit `.env` files):

- `GOOGLE_SCRIPT_URL`
- `GOOGLE_SCRIPT_TOKEN`
- `RSVP_TOKEN` in Apps Script Script Properties
- `EMAIL_USER` and `EMAIL_PASS` for confirmation email
- `NEXT_PUBLIC_SITE_URL` for canonical site links

See [apps-script/README.md](./apps-script/README.md) and [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for setup. RSVP API contracts and sheet columns are unchanged.

## Run locally

```bash
npm install
npm run dev
```

Available checks: `npm run lint` and `npm run build`.

## Optional assets

The previous wedding images and audio are not used by the redesigned page. See [ASSET_GUIDE.md](./ASSET_GUIDE.md) for optional replacement asset paths and formats. The site remains complete without those files.
