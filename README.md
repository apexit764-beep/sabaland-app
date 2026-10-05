# Saba Land — mobile app prototype

Interactive prototype of the Saba Land (أرض سبأ) mobile app for the store owner and staff: WhatsApp conversations with the AI assistant, contacts, quick replies, campaigns, reports, team and settings — the same sections as the web dashboard, designed for the phone. Arabic and English, light and dark.

Live: https://sabaland-app.apexes.click/

## Run

Open `index.html` in a browser. It is one self-contained page (no server needed).

## Edit and rebuild

- `src/app.js` — screens, sheets, validation and behaviour
- `src/app.css` — design tokens and styles
- `src/shell.html` — page shell (phone frame + side panel)
- `src/logo-symbols.svg` — logo layers used by the splash animation
- `vendor/` — labels from the dashboard (`i18n-dashboard.js`), app labels (`i18n-app.js`) and sample data (`data.js`)

```bash
node build.js
```

This writes `index.html`. All data is sample data; the demo sign-in is prototype-only.
