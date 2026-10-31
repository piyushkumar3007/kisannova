# KisanNova – Cultivating Intelligence, Revolutionizing Agriculture

KisanNova is an AI-powered smart agriculture platform designed to make digital farming assistance more accessible.

## Features
- Nova AI farming assistant powered by Google Gemini.
- Multilingual farming assistance.
- Crop and plant image upload for AI-assisted symptom analysis.
- Guidance on crop care, soil health, irrigation and pest management.

## Technology
- Frontend: React, TypeScript and Vite
- Backend: Node.js and Express
- AI: Google Gemini API
- Package manager: pnpm

## Run the Nova backend
1. Open the nova-backend folder.
2. Run pnpm install.
3. Copy .env.example to .env.
4. Add your Gemini API key to .env.
5. Run pnpm start.

Default backend URL: http://localhost:3001

## API
- GET /api/health
- POST /api/chat

Image uploads support JPG, PNG and WebP up to 5 MB.

## Disclaimer
Nova provides AI-assisted farming guidance. Its suggestions are not a substitute for laboratory diagnosis or qualified agricultural advice.

## Team
KisanNova

## License
MIT
