# KisanNova Architecture

1. Farmer interacts with the KisanNova frontend.
2. Nova Assistant sends farming questions to the Express backend.
3. Backend communicates with Google Gemini.
4. AI-generated farming guidance is returned to the frontend.

Main components:
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- AI integration: Google Gemini

API:
- GET /api/health
- POST /api/chat
