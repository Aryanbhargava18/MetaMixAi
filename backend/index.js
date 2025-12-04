// backend/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // keep your auth
const aiRoutes = require("./routes/aiRoutes");     // marketplace & chat
const chatRoutes = require("./routes/chatRoutes"); // chat CRUD

const app = express();

// Allowed origins: include your local dev Vite ports and deployed origin
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:3000",
  "https://metamixai.vercel.app",
  "https://metamix-backend.onrender.com",
  "https://meta-mix-5ui6d42my-aryanbhargava18s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow curl/postman/non-browser
      if (origin && origin.startsWith("http://localhost:")) {
        console.log("✅ CORS ALLOWED local origin:", origin);
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("❌ CORS BLOCKED origin:", origin);
      return callback(new Error("CORS blocked"));
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON body parser
app.use(express.json());

// Connect to MongoDB (make sure MONGO_URI set)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// root sanity
app.get("/", (req, res) => res.send("🚀 Backend API is running!"));

// Routes
app.use("/api", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chats", chatRoutes);

// Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
