const config = require("./src/config/env"); // validates env on startup
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const userRoutes = require("./src/routes/userRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const quizAttemptRoutes = require("./src/routes/quizAttemptRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz", quizAttemptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => res.send("Quiz App Backend"));

app.listen(config.port, () => {
  console.log(`\n🚀 Server running on port ${config.port}`);
  console.log(`📍 API Base URL: http://localhost:${config.port}`);
  console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
});
