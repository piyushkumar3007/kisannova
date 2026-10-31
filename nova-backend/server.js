
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const API_KEY = process.env.GEMINI_API_KEY;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const app = express();

// Allow local development frontends.
app.use(
  cors({
    origin(origin, callback) {
      const isLocalDevelopment =
        !origin ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (isLocalDevelopment) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin not allowed by Nova backend CORS policy")
      );
    },
  })
);

app.use(express.json({ limit: "1mb" }));

// Image upload configuration.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
  },
  fileFilter(_req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Unsupported image type. Upload a JPG, PNG, or WebP image.")
      );
    }

    callback(null, true);
  },
});

// Health check.
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    assistant: "Nova",
    configured: Boolean(API_KEY),
    model: MODEL,
  });
});

// Chat endpoint: accepts text, an image, or both.
app.post("/api/chat", upload.single("image"), async (req, res) => {
  if (!API_KEY) {
    return res.status(503).json({
      error:
        "Nova backend is missing GEMINI_API_KEY. Add it to nova-backend/.env and restart the server.",
    });
  }

  const body = req.body ?? {};
  const message = typeof body.message === "string" ? body.message : "";
  const language =
    typeof body.language === "string" ? body.language : "Auto-detect";
  const imageFile = req.file;

  console.log("Nova chat request:", {
    messageReceived: Boolean(message.trim()),
    imageReceived: Boolean(imageFile),
    language,
  });

  if (!message.trim() && !imageFile) {
    return res.status(400).json({
      error: "Please enter a question or upload an image.",
    });
  }

  if (message.length > 4000) {
    return res.status(400).json({
      error: "Please keep your question under 4000 characters.",
    });
  }

  const selectedLanguage = language.slice(0, 60) || "Auto-detect";

  const prompt = `
ROLE AND KNOWLEDGE:
- Help with crop care, soil health, irrigation, pests, plant diseases,
  fertilizers, and practical farming methods.
- Give accurate, practical, farmer-friendly answers using simple language.
- When an image is supplied, describe visible symptoms and possible causes.
  Do not claim a definite crop disease diagnosis from an image alone.
- If the image is unclear, ask for a clearer photo or more context.
- For pesticide use, advise following the product label and local agricultural
  expert guidance. Do not invent pesticide dosages.
- Do not invent government scheme eligibility, live weather, or market prices.
  Explain when current information needs verification.

LANGUAGE:
- Reply in the user's selected language: ${selectedLanguage}.
- If the selection is Auto-detect, use the language of the question.
- If there is no text question, use clear English.
- Keep technical terms understandable.

FORMATTING:
- Produce clean, readable Markdown.
- Use short paragraphs and simple bullet points.
- Use headings only when helpful.
- Never wrap the entire response in Markdown code fences.

ANSWER QUALITY:
- Answer the actual question directly.
- Give actionable steps when appropriate.
- Include safety precautions when relevant.
- If essential information is missing, ask a concise follow-up question.
- Do not invent facts to fill gaps.

Farmer's question:
${
  message.trim() ||
  "Analyze the uploaded crop or plant image. Describe visible symptoms, possible causes, and practical next steps."
}
`;

  // Build Gemini request.
  const parts = [];

  if (imageFile) {
    parts.push({
      inlineData: {
        mimeType: imageFile.mimetype,
        data: imageFile.buffer.toString("base64"),
      },
    });
  }

  parts.push({ text: prompt });

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  let lastError;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: "user", parts }],
      });

      const reply =
        typeof result.text === "string" && result.text.trim()
          ? result.text.trim()
          : "Sorry, I couldn't generate a response. Please try again.";

      return res.json({
        assistant: "Nova",
        reply,
      });
    } catch (error) {
      lastError = error;

      console.error("Gemini underlying error:", {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        causeCode: error?.cause?.code,
      });

      const errorText = String(error?.message || error);

      const temporary =
        /503|UNAVAILABLE|429|RESOURCE_EXHAUSTED|504|DEADLINE_EXCEEDED/i.test(
          errorText
        );

      if (!temporary || attempt === 2) {
        break;
      }

      const delay = 1000 * 2 ** attempt;

      console.warn(
        `Gemini temporary error; retry ${attempt + 1}/2 in ${delay}ms.`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  const detail = String(lastError?.message || "Unknown Gemini API error");
  console.error("Nova API error:", detail);

  const isQuotaError = /429|RESOURCE_EXHAUSTED/i.test(detail);
  const isUnavailable = /503|UNAVAILABLE|504|DEADLINE_EXCEEDED/i.test(detail);

  const status = isQuotaError ? 429 : isUnavailable ? 503 : 500;

  const userMessage = isQuotaError
    ? "Nova is temporarily out of AI request quota. Please try again later."
    : isUnavailable
      ? "Nova's AI service is temporarily unavailable. Please try again shortly."
      : "Nova couldn't process your request. Please try again.";

  return res.status(status).json({
    error: userMessage,
    model: MODEL,
  });
});

// Handle upload errors and other backend errors.
app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Image is too large. Please upload an image smaller than 5 MB."
        : "Image upload failed. Please upload a JPG, PNG, or WebP image.";

    return res.status(400).json({ error: message });
  }

  if (error?.message?.startsWith("Unsupported image type")) {
    return res.status(400).json({ error: error.message });
  }

  if (
    error?.message === "Origin not allowed by Nova backend CORS policy"
  ) {
    return res.status(403).json({ error: error.message });
  }

  console.error("Nova backend error:", error);

  return res.status(500).json({
    error: "Unexpected Nova backend error.",
  });
});

app.listen(PORT, () => {
  console.log(`Nova backend running at http://localhost:${PORT}`);
  console.log(`Gemini model configured: ${MODEL}`);

  if (!API_KEY) {
    console.warn(
      "GEMINI_API_KEY is missing. Create nova-backend/.env before using chat."
    );
  }
});
