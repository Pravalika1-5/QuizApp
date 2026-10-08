const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/env");
const quizCategoryMatcher = require("../utils/quizCategoryMatcher");
const fallbackQuestionLoader = require("../utils/fallbackQuestionLoader");

let genAI = null;

const getGeminiModel = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(config.geminiApiKey);
  }
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

const resolveTopic = (topic) => {
  if (!topic || typeof topic !== "string") {
    return { resolved: false, categoryName: topic, matchedAlias: null };
  }

  const matched = quizCategoryMatcher.findCategory(topic);
  if (matched) {
    const normalizedQuery = quizCategoryMatcher.normalizeText(topic);
    const keywords = quizCategoryMatcher.extractKeywords(topic);
    let matchedAlias = null;

    for (const alias of matched.aliases) {
      const normAlias = quizCategoryMatcher.normalizeText(alias);
      if (
        normAlias === normalizedQuery ||
        keywords.includes(normAlias) ||
        normalizedQuery.includes(normAlias) ||
        normAlias.includes(normalizedQuery)
      ) {
        matchedAlias = alias;
        break;
      }
    }

    return {
      resolved: true,
      categoryName: matched.category_name,
      matchedAlias,
    };
  }

  return { resolved: false, categoryName: topic, matchedAlias: null };
};

const generateMockQuestions = (topic, difficulty, numQuestions, type) => {
  return Array.from({ length: parseInt(numQuestions) || 15 }, (_, i) => ({
    question: `${topic} Question ${i + 1}: What is concept ${i + 1} in ${topic}?`,
    type: type || "mcq",
    options: [`Option A${i}`, `Option B${i}`, `Option C${i}`, `Option D${i}`],
    correctAnswer: `Option ${["A", "B", "C", "D"][i % 4]}${i}`,
    explanation: `Mock question for ${topic} at ${difficulty} difficulty.`,
    difficulty: difficulty || "medium",
    category: topic.toLowerCase(),
    isFallback: true,
  }));
};

const generateQuestions = async (
  topic,
  difficulty,
  numQuestions,
  type,
  options = {},
) => {
  const numQ = parseInt(numQuestions) || 15;

  const resolution =
    options.resolveCategory !== false
      ? resolveTopic(topic)
      : { resolved: false, categoryName: topic, matchedAlias: null };
  const resolvedTopic = resolution.categoryName;

  try {
    const model = getGeminiModel();
    const prompt = `Generate ${numQ} ${type} questions on "${resolvedTopic}" (${difficulty} difficulty).
Return ONLY a JSON object with a "questions" array. Each item:
{"question": "...", "options": ["A","B","C","D"], "correctAnswer": "A", "explanation": "...", "difficulty": "${difficulty}", "category": "${resolvedTopic.toLowerCase()}"}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleaned = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();
    if (!cleaned) throw new Error("Empty response from Gemini API");

    const parsed = JSON.parse(cleaned);
    const questions = Array.isArray(parsed) ? parsed : parsed.questions || [];

    return {
      questions: questions.slice(0, numQ).map((q) => ({
        question: q.question,
        type: q.type || type,
        options: q.options || [],
        correctAnswer: q.correctAnswer || "",
        explanation: q.explanation || "",
        difficulty: q.difficulty || difficulty,
        category: q.category || resolvedTopic.toLowerCase(),
      })),
      resolution,
    };
  } catch (err) {
    console.error(
      "AI generation failed, trying fallback dataset:",
      err.message,
    );

    const fallbackQuestions = fallbackQuestionLoader.getFallbackQuestions(
      resolvedTopic,
      difficulty,
      numQ,
    );

    if (fallbackQuestions && fallbackQuestions.length > 0) {
      return {
        questions: fallbackQuestions,
        resolution,
      };
    }

    console.log("📚 No fallback dataset found, using mock questions");
    return {
      questions: generateMockQuestions(topic, difficulty, numQ, type),
      resolution,
    };
  }
};

module.exports = { generateQuestions, resolveTopic };
