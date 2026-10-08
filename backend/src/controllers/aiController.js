const { generateQuestions } = require("../services/aiService");
const Question = require("../models/Question");

exports.generateAIQuestions = async (req, res) => {
  const { topic, difficulty, numQuestions, type } = req.body;

  if (!topic || !difficulty || !numQuestions || !type) {
    return res.status(400).json({
      message: "Missing required fields: topic, difficulty, numQuestions, type",
    });
  }

  try {
    const result = await generateQuestions(
      topic,
      difficulty,
      numQuestions,
      type,
    );
    const questions = result.questions || result;
    const usedFallback = questions.some((q) => q.isFallback);

    if (usedFallback) {
      const docs = questions.map((q) => ({
        type: q.type || type,
        questionText: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty || difficulty,
        marks: 1,
        explanation: q.explanation,
        aiGenerated: false,
        createdBy: req.user.id,
      }));
      await Question.insertMany(docs);
      console.log(`📥 Auto-saved ${docs.length} fallback questions to MongoDB`);
    }

    res.json({ questions, usedFallback });
  } catch (err) {
    console.error("generateAIQuestions error:", err);
    res
      .status(500)
      .json({ message: "Failed to generate questions: " + err.message });
  }
};

module.exports = exports;
