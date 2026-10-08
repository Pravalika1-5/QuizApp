require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const fallbackConfig = require("./src/config/fallback_quiz_config.json");
const Question = require("./src/models/Question");

const DATA_DIR = path.join(__dirname, "src/data");
const ALL_DIFFICULTIES = ["easy", "medium", "hard", "interview"];
const SYSTEM_ADMIN_ID = "69837d6836444b906ec82710";

function extractQuestionsCommonFormat(data) {
  const questions = [];
  if (!data.topics) return questions;
  for (const topicName of Object.keys(data.topics)) {
    const topic = data.topics[topicName];
    if (!topic) continue;
    for (const diff of ALL_DIFFICULTIES) {
      if (Array.isArray(topic[diff])) {
        topic[diff].forEach((q) => {
          questions.push({
            ...q,
            _difficulty: diff,
            _category: data.category_name,
          });
        });
      }
    }
  }
  return questions;
}

function extractQuestionsAlternateFormat(data) {
  const questions = [];
  if (!Array.isArray(data.subcategories)) return questions;
  for (const sub of data.subcategories) {
    if (!Array.isArray(sub.topics)) continue;
    for (const topic of sub.topics) {
      if (!topic.questions) continue;
      for (const diff of ALL_DIFFICULTIES) {
        if (Array.isArray(topic.questions[diff])) {
          topic.questions[diff].forEach((q) => {
            questions.push({
              ...q,
              _difficulty: diff,
              _category: data.category_name,
            });
          });
        }
      }
    }
  }
  return questions;
}

async function seedFallbackQuestions() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const category of fallbackConfig.quiz_categories) {
    const filePath = path.join(DATA_DIR, category.filename);
    if (!fs.existsSync(filePath)) {
      console.log("⚠️ File not found: " + category.filename);
      continue;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    let rawQuestions = [];
    if (data.topics) {
      rawQuestions = extractQuestionsCommonFormat(data);
    } else if (data.subcategories) {
      rawQuestions = extractQuestionsAlternateFormat(data);
    }

    if (rawQuestions.length === 0) {
      console.log("⚠️ No questions in: " + category.filename);
      continue;
    }

    const docs = [];
    for (const q of rawQuestions) {
      const options = Array.isArray(q.options) ? q.options : [];
      let correctAnswer = "";
      if (typeof q.correct_answer === "number" && options.length > 0) {
        correctAnswer = options[q.correct_answer] || "";
      } else if (q.correctAnswer) {
        correctAnswer = q.correctAnswer;
      }

      const exists = await Question.findOne({
        questionText: q.question,
        category: category.category_name,
      });

      if (exists) {
        totalSkipped++;
        continue;
      }

      docs.push({
        type: "mcq",
        questionText: q.question,
        options,
        correctAnswer,
        difficulty: q._difficulty === "interview" ? "hard" : q._difficulty,
        marks: 1,
        explanation: q.explanation || "",
        category: category.category_name,
        aiGenerated: false,
        isFallback: true,
        createdBy: SYSTEM_ADMIN_ID,
      });
    }

    if (docs.length > 0) {
      await Question.insertMany(docs);
      totalInserted += docs.length;
      console.log(
        "✅ " +
          category.category_name +
          ": inserted " +
          docs.length +
          " questions",
      );
    } else {
      console.log(
        "⏭️ " + category.category_name + ": all questions already exist",
      );
    }
  }

  console.log(
    "\n📊 Summary: " +
      totalInserted +
      " inserted, " +
      totalSkipped +
      " skipped (duplicates)",
  );
  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
}

seedFallbackQuestions().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
