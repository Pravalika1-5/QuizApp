const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  const {
    title,
    description,
    questions,
    timer,
    scheduledAt,
    shuffleQuestions,
    shuffleAnswers,
    showResults,
  } = req.body;
  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      timer,
      scheduledAt,
      isActive: true,
      createdBy: req.user.id,
    });
    await quiz.save();
    // Generate link
    const link = `${process.env.FRONTEND_URL}/quiz/${quiz._id}`;
    quiz.link = link;
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPublicQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isActive: true }).populate("questions");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id }).populate(
      "questions",
    );
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    if (quiz.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const {
      title,
      description,
      questions,
      timer,
      scheduledAt,
      addQuestion,
      removeQuestion,
    } = req.body;

    if (addQuestion) {
      if (!quiz.questions.includes(addQuestion)) {
        quiz.questions.push(addQuestion);
      }
    }
    if (removeQuestion) {
      quiz.questions = quiz.questions.filter(
        (id) => id.toString() !== removeQuestion,
      );
    }
    if (title !== undefined) quiz.title = title;
    if (description !== undefined) quiz.description = description;
    if (Array.isArray(questions)) quiz.questions = questions;
    if (timer !== undefined) quiz.timer = timer;
    if (scheduledAt !== undefined) quiz.scheduledAt = scheduledAt;

    await quiz.save();
    const populatedQuiz = await Quiz.findById(quiz._id).populate("questions");
    res.json(populatedQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
