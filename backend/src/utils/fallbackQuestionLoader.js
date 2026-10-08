const fs = require("fs");
const path = require("path");
const fallbackConfig = require("../config/fallback_quiz_config.json");

const DATA_DIR = path.join(__dirname, "../data");

const DIFFICULTY_MAP = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  beginner: "easy",
  intermediate: "medium",
  advanced: "hard",
};

const ALL_DIFFICULTIES = ["easy", "medium", "hard", "interview"];

function normalizeDifficulty(difficulty) {
  const key = (difficulty || "medium").toLowerCase().trim();
  return DIFFICULTY_MAP[key] || "medium";
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeQuestion(q, difficulty, category) {
  const options = Array.isArray(q.options) ? q.options : [];
  let correctAnswer = q.correctAnswer || "";

  if (typeof q.correct_answer === "number" && options.length > 0) {
    correctAnswer = options[q.correct_answer] || "";
  }

  return {
    question: q.question || "",
    type: "mcq",
    options,
    correctAnswer,
    explanation: q.explanation || "",
    difficulty,
    category: category.toLowerCase(),
    isFallback: true,
  };
}

function extractQuestionsCommonFormat(data) {
  const questions = [];
  if (!data.topics) return questions;

  for (const topicName of Object.keys(data.topics)) {
    const topic = data.topics[topicName];
    if (!topic) continue;
    for (const diff of ALL_DIFFICULTIES) {
      if (Array.isArray(topic[diff])) {
        questions.push(...topic[diff]);
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
          questions.push(...topic.questions[diff]);
        }
      }
    }
  }
  return questions;
}

function getFallbackQuestions(categoryName, difficulty, numQuestions) {
  const numQ = parseInt(numQuestions) || 15;
  const difficultyKey = normalizeDifficulty(difficulty);

  const category = fallbackConfig.quiz_categories.find(
    (cat) =>
      cat.category_name.toLowerCase() === categoryName.toLowerCase() ||
      cat.aliases.some(
        (alias) => alias.toLowerCase() === categoryName.toLowerCase(),
      ),
  );

  if (!category || !category.filename) {
    console.log(`⚠️ No fallback config found for category: ${categoryName}`);
    return null;
  }

  const filePath = path.join(DATA_DIR, category.filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Fallback data file not found: ${filePath}`);
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    let rawQuestions = [];
    if (data.topics) {
      rawQuestions = extractQuestionsCommonFormat(data);
    } else if (data.subcategories) {
      rawQuestions = extractQuestionsAlternateFormat(data);
    }

    if (rawQuestions.length === 0) {
      console.log(`⚠️ No questions in fallback file: ${category.filename}`);
      return null;
    }

    const shuffled = shuffleArray(rawQuestions);
    const selected = shuffled.slice(0, numQ);

    const normalized = selected.map((q) =>
      normalizeQuestion(q, difficultyKey, category.category_name),
    );

    console.log(
      `📚 Loaded ${normalized.length} fallback questions from ${category.filename}`,
    );
    return normalized;
  } catch (err) {
    console.error(`❌ Error loading fallback file ${filePath}:`, err.message);
    return null;
  }
}

module.exports = { getFallbackQuestions };
