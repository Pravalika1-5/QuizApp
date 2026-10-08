const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  const {
    type,
    questionText,
    options,
    correctAnswer,
    difficulty,
    marks,
    explanation,
    aiGenerated,
  } = req.body;
  try {
    const question = new Question({
      type,
      questionText,
      options: type === "mcq" ? options : [],
      correctAnswer,
      difficulty,
      marks,
      explanation,
      aiGenerated: aiGenerated ?? false,
      createdBy: req.user.id || "admin",
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPublicQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
      .select("-createdBy")
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  const {
    type,
    questionText,
    options,
    correctAnswer,
    difficulty,
    marks,
    explanation,
  } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        type,
        questionText,
        options: type === "mcq" ? options : [],
        correctAnswer,
        difficulty,
        marks,
        explanation,
      },
      { new: true },
    );
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
