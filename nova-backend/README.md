# AgriNova backend

This is a separate Node.js/Express backend for the Nova assistant in AgriNova. It does not depend on the KisanNova folder.

## Requirements
- Node.js 20 or newer
- A Gemini API key from Google AI Studio

## Setup (Windows PowerShell)
1. Open a terminal in this `nova-backend` folder.
2. Install dependencies:
   ```powershell
   npm.cmd install
   ```
3. Create your local environment file:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Open `.env` and replace the placeholder with your own Gemini API key. Never share or commit this file.
5. Start the backend:
   ```powershell
   npm.cmd start
   ```
6. Check health at http://localhost:3001/api/health

The frontend's NovaAssistant calls `http://localhost:3001/api/chat`.

## Notes
- The default model is configurable via `GEMINI_MODEL`. A 503 is a Google service/model availability issue; retry handling is included, but cannot guarantee that the upstream service will respond.
- If Google reports that the selected model is unavailable to your project, set `GEMINI_MODEL` to a model shown as available in your Google AI Studio project.
