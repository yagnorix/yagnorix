# Daily Motivation Popup — Odoo 19 Module

## Installation
1. Unzip this file inside your Odoo `addons` (or custom addons) directory, so the
   folder structure looks like: `addons/daily_motivation_popup/__manifest__.py`
2. Restart the Odoo server.
3. Go to **Apps**, click **Update Apps List**, search for "Daily Motivation Popup",
   and click **Install**.

## Usage
- Once installed, every user will see a motivational quote popup once per day,
  about 1.5 seconds after the backend finishes loading.
- Admins (Settings group) can manage quotes from the **Motivation > Quotes** menu.
- Users can click "Don't show again today" or "Close" to dismiss the popup;
  either way it won't show again until the next day.

## Technical Notes
- Only depends on `base` and `web` (no Apps Store dependency).
- Tracks last-shown date per user via a new field `motivation_last_shown_date`
  on `res.users`.
- Frontend uses an OWL service registered in `web.assets_backend`, compatible
  with Odoo 19's JS module system.
- Sample quotes are loaded via `data/quote_data.xml` (noupdate, so your edits
  won't be overwritten on module upgrade).

## Uninstall
Standard Odoo uninstall from Apps menu — all module data/views/fields will be
cleanly removed.
