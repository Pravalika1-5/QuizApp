const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: __dirname + "/../../.env" });

let genAI = null;

const getGeminiModel = (modelName) => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI.getGenerativeModel({ model: modelName });
};

const generateMockQuestions = (topic, difficulty, numQuestions, type) => {
  const numQ = parseInt(numQuestions) || 15;
  const mockQuestions = Array.from({ length: numQ }, (_, i) => ({
    question: `${topic} Question ${i + 1}: What is the ${i + 1}th concept in ${topic}?`,
    type: type || "mcq",
    options: [
      `Option A - Concept ${i + 1}a`,
      `Option B - Concept ${i + 1}b`,
      `Option C - Concept ${i + 1}c`,
      `Option D - Concept ${i + 1}d`,
    ],
    correctAnswer: `Option ${["A", "B", "C", "D"][i % 4]}`,
    explanation: `This is a mock question for ${topic} at ${difficulty} difficulty level. The AI service is currently unavailable.`,
    difficulty: difficulty || "medium",
    category: topic.toLowerCase(),
    isFallback: true,
  }));
  return mockQuestions;
};

const generateQuestions = async (topic, difficulty, numQuestions, type) => {
  console.log(
    `📝 Generating questions: topic=${topic}, difficulty=${difficulty}, count=${numQuestions}, type=${type}`,
  );

  const prompt = `Generate ${numQuestions} ${difficulty} level ${type} questions about "${topic}". Each question should have 4 options (A, B, C, D) with one correct answer. Format as JSON array with structure: [{"question": "text", "options": ["A) opt1", "B) opt2", "C) opt3", "D) opt4"], "correctAnswer": "A", "explanation": "brief explanation"}]`;
  const models = ["gemini-2.5-pro", "gemini-2.5-flash"];

  for (const modelName of models) {
    try {
      console.log(`🔄 Sending request to Gemini API using ${modelName}...`);
      const model = getGeminiModel(modelName);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      let questions;
      try {
        questions = JSON.parse(text);
      } catch (parseError) {
        console.log(
          "❌ Failed to parse JSON response, falling back to mock questions",
        );
        return generateMockQuestions(topic, difficulty, numQuestions, type);
      }

      console.log(
        `✅ Successfully generated ${questions.length} questions from ${modelName}`,
      );
      return questions;
    } catch (error) {
      console.log(`❌ ${modelName} failed:`, error.message);
      if (models.indexOf(modelName) === models.length - 1) {
        console.log("📚 Falling back to mock questions");
        return generateMockQuestions(topic, difficulty, numQuestions, type);
      }
      console.log("➡️ Trying next supported Gemini model...");
    }
  }
};

module.exports = { generateQuestions };
