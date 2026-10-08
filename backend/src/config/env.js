require("dotenv").config({ path: __dirname + "/../../.env" });

const required = ["MONGO_URI", "JWT_SECRET"];

const missing = required.filter(
  (key) => !process.env[key] || process.env[key].trim() === "",
);

if (missing.length > 0) {
  console.error("❌ Missing required environment variables:", missing);
  console.error("   Copy .env.example to .env and fill in all values.");
  process.exit(1);
}

const geminiApiKey = (
  process.env.GEMINI_API_KEY ||
  process.env.GROQ_API_KEY ||
  ""
).trim();

if (!geminiApiKey) {
  console.error(
    "❌ Missing API key: set GEMINI_API_KEY or GROQ_API_KEY in .env",
  );
  process.exit(1);
}

const config = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT) || 5000,
  geminiApiKey,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
};

module.exports = config;
