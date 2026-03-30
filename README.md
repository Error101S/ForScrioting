# LauUCodes Web Sign-In Demo

This is a simple single-page website with a main menu title (`LauUCodes`) and Google sign-in.

## What it does
- Shows a top main menu with `LauUCodes`.
- Allows users to sign in with Google.
- Remembers signed-in users in browser local storage so they stay signed in after reopening the site.

## Setup
1. Open `app.js`.
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your Google OAuth 2.0 **Web Client ID**.
3. Serve the folder using any static web server and open it in your browser.

### Quick local server example
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.
