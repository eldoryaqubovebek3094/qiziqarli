Save API — README

This small Node.js API allows the `editor.html` page to save edited JSON files directly to the project folder.

Files allowed to be written:
- test.json
- problems.json
- games.json
- comparison.json

Quick start (local):

1. Ensure Node.js is installed (>=14).
2. Install dependencies:

```bash
npm install
```

3. Set a token to protect the save endpoint. Example (Windows PowerShell):

```powershell
$env:SAVE_TOKEN = "your-secret-token-here"
npm start
```

Or on Linux/macOS:

```bash
export SAVE_TOKEN="your-secret-token-here"
npm start
```

By default the server listens on port `8001`. You can change it with `PORT` env var.

Usage from the editor:
- Open `editor.html` in a browser served by a static server (e.g. `python -m http.server`),
- Enter `http://localhost:8001/save-json` into the "Server URL" field,
- Enter the same token you set as `SAVE_TOKEN` into the "Save token" field,
- Click "Serverga saqlash" to POST the edited JSON to the server.

Security notes:
- This API uses a simple token in the `Authorization: Bearer <token>` header. Keep the token secret.
- Do NOT expose this server to the public internet without additional protections.

Docker:

Build:

```bash
docker build -t qiziqarli-save-api .
```

Run:

```bash
docker run -e SAVE_TOKEN="your-token" -p 8001:8001 qiziqarli-save-api
```
