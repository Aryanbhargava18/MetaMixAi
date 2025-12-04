console.log("🔥🔥 aiRoutes.js LOADED FROM THIS FILE 🔥🔥");

const express = require("express");
const router = express.Router();
const axios = require("axios");
const Chat = require("../models/Chat");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ENV
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_LIST_URL = process.env.OPENROUTER_LIST_MODELS_URL;
const OPENROUTER_CHAT_URL = process.env.OPENROUTER_CHAT_URL;

const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY;
const DEEPINFRA_LIST_URL = process.env.DEEPINFRA_LIST_MODELS_URL;
const DEEPINFRA_CHAT_URL = process.env.DEEPINFRA_CHAT_URL;

console.log("🔑 OpenRouter key present:", !!OPENROUTER_API_KEY);
console.log("🔑 DeepInfra key present:", !!DEEPINFRA_API_KEY);

// FORMATTERS
function detectCategory(modelId, summary = "") {
  const id = modelId.toLowerCase();
  const text = summary.toLowerCase();

  if (id.includes("whisper") || text.includes("speech-to-text")) return "speech";
  if (id.includes("tts") || id.includes("kokoro")) return "tts";
  if (id.includes("clip") || id.includes("image-classification")) return "vision";
  if (id.includes("sd") || id.includes("stable-diffusion") || id.includes("image")) return "vision";
  if (id.includes("video") || text.includes("video")) return "video";
  if (id.includes("embed") || id.includes("embedding")) return "embeddings";
  if (id.includes("code") || id.includes("codellama")) return "code";

  return "chat";
}

const mapOpenRouter = (item) => ({
  id: `openrouter:${item.id}`,
  name: item.id,
  title: item.name || item.id,
  summary: item.description || "",
  image: item.icon || "",
  type: detectCategory(item.id, item.description),
  source: "openrouter",
});

const mapDeepInfra = (item) => ({
  id: `deepinfra:${item.id}`,
  name: item.id,
  title: item.title || item.id,
  summary: item.description || "",
  image: "",
  type: detectCategory(item.id, item.description),
  source: "deepinfra",
});




// ==================== GET MODELS ====================
router.get("/models", async (req, res) => {
  try {
    console.log("\n🔍 Fetching models from OpenRouter & DeepInfra...\n");

    const [openrouterRes, deepinfraRes] = await Promise.allSettled([
      axios.get(OPENROUTER_LIST_URL, {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Metamix AI",
        },
      }),

      axios.get(DEEPINFRA_LIST_URL, {
        headers: {
          "x-api-key": DEEPINFRA_API_KEY,
        },
      }),
    ]);

    let final = [];

    // OPENROUTER MODELS
    if (openrouterRes.status === "fulfilled") {
      console.log("✅ OpenRouter response:", openrouterRes.value.status);
      const data = openrouterRes.value.data;
      const arr = data?.data || []; // OPENROUTER uses "data"
      console.log("📦 OpenRouter models:", arr.length);
      final.push(...arr.map(mapOpenRouter));
    } else {
      console.error("❌ OpenRouter failed:", openrouterRes.reason);
    }

    // DEEPINFRA MODELS
    if (deepinfraRes.status === "fulfilled") {
      console.log("✅ DeepInfra response:", deepinfraRes.value.status);
      const data = deepinfraRes.value.data;
      const arr = data?.data || []; // DEEPINFRA uses "data"
      console.log("📦 DeepInfra models:", arr.length);
      final.push(...arr.map(mapDeepInfra));
    } else {
      console.error("❌ DeepInfra failed:", deepinfraRes.reason);
    }

    console.log("📊 TOTAL MODELS SENT:", final.length);

    return res.json({ success: true, models: final });
  } catch (err) {
    console.error("❌ ERROR /models:", err);
    return res.status(500).json({ success: false, models: [] });
  }
});

// ==================== FILE UPLOAD & CONTEXT ====================
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdf(dataBuffer);
      extractedText = data.text;
    } else {
      // Fallback for text files
      extractedText = fs.readFileSync(req.file.path, "utf8");
    }

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    return res.json({ success: true, text: extractedText });
  } catch (err) {
    console.error("❌ UPLOAD ERROR:", err);
    return res.status(500).json({ success: false, message: "File processing failed" });
  }
});

// ==================== CHAT ENDPOINT ====================
router.post("/chat", async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);

    // More robust body validation
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }

    const { modelId, prompt, params, context, inputType, fileData } = req.body;

    if (!modelId || typeof modelId !== 'string') {
      return res.status(400).json({ success: false, message: "modelId required and must be a string" });
    }

    const provider = modelId.startsWith("openrouter")
      ? "openrouter"
      : "deepinfra";

    const model = modelId.replace(`${provider}:`, "");
    const modelType = detectCategory(modelId, "");

    let response = { type: "text", content: "" };

    // Handle different model types
    switch (modelType) {
      case "speech": // Speech-to-text (Whisper)
        if (provider === "openrouter") {
          const payload = {
            model: model,
            messages: [{
              role: "user",
              content: [
                { type: "text", text: "Transcribe this audio:" },
                { type: "input_audio", input_audio: { data: fileData, format: inputType } }
              ]
            }]
          };

          const out = await axios.post(OPENROUTER_CHAT_URL, payload, {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "Metamix AI",
            },
          });

          response.content = out.data?.choices?.[0]?.message?.content || "Transcription failed";
        }
        break;

      case "tts": // Text-to-speech
        if (provider === "openrouter") {
          const payload = {
            model: model,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "audio" }
          };

          const out = await axios.post(OPENROUTER_CHAT_URL, payload, {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "Metamix AI",
            },
            responseType: 'arraybuffer'
          });

          response.type = "audio";
          response.content = Buffer.from(out.data).toString('base64');
          response.format = "mp3";
        }
        break;

      case "vision": // Image generation/analysis
        if (provider === "openrouter") {
          let messages = [];

          if (fileData) {
            // Image analysis
            messages = [{
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: `data:${inputType};base64,${fileData}` } }
              ]
            }];
          } else {
            // Image generation
            messages = [{ role: "user", content: prompt }];
          }

          const payload = {
            model: model,
            messages: messages,
            max_tokens: params?.max_tokens || 1000,
            temperature: params?.temperature ?? 0.7,
          };

          const out = await axios.post(OPENROUTER_CHAT_URL, payload, {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "Metamix AI",
            },
          });

          const content = out.data?.choices?.[0]?.message?.content;
          if (content && content.includes("data:image")) {
            response.type = "image";
            response.content = content;
          } else {
            response.content = content || "No response";
          }
        }
        break;

      case "video": // Video generation/analysis
        if (provider === "openrouter") {
          const payload = {
            model: model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: params?.max_tokens || 1000,
            temperature: params?.temperature ?? 0.7,
          };

          const out = await axios.post(OPENROUTER_CHAT_URL, payload, {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "Metamix AI",
            },
          });

          response.content = out.data?.choices?.[0]?.message?.content || "Video generation failed";
        }
        break;

      case "code": // Code generation
      case "embeddings": // Embedding models
      case "chat": // Regular text chat
      default:
        // Prepend context if available
        let finalPrompt = prompt;
        if (context) {
          finalPrompt = `Context:\n${context}\n\nQuestion: ${prompt}`;
        }

        if (provider === "openrouter") {
          const payload = {
            model: model,
            messages: [{ role: "user", content: finalPrompt }],
            max_tokens: params?.max_tokens || 1000,
            temperature: params?.temperature ?? 0.7,
            top_p: params?.top_p,
            top_k: params?.top_k,
            frequency_penalty: params?.frequency_penalty,
          };

          const out = await axios.post(OPENROUTER_CHAT_URL, payload, {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:5173",
              "X-Title": "Metamix AI",
            },
          });

          response.content = out.data?.choices?.[0]?.message?.content || "No response";
        } else if (provider === "deepinfra") {
          const payload = {
            input: finalPrompt,
            max_new_tokens: params?.max_tokens || 1000,
            temperature: params?.temperature,
            top_p: params?.top_p,
            top_k: params?.top_k,
            frequency_penalty: params?.frequency_penalty,
          };

          const out = await axios.post(
            `${DEEPINFRA_CHAT_URL}/${model}`,
            payload,
            {
              headers: { "x-api-key": DEEPINFRA_API_KEY },
            }
          );

          response.content = out.data?.results?.[0]?.generated_text || "No response";
        }
        break;
    }

    // Save to database if requested
    // if (saveToDB) {
    //   const chat = new Chat({
    //     userId: req.user.id,
    //     modelId,
    //     prompt,
    //     response: response.content,
    //     type: response.type,
    //     params: params || {},
    //     context: context || ''
    //   });
    //   await chat.save();
    // }

    return res.json({ success: true, ...response });

  } catch (err) {
    console.error("❌ CHAT ERROR:", err.response?.data || err.message);
    console.error("❌ Full error:", err);
    console.error("❌ Stack:", err.stack);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});


module.exports = router;
