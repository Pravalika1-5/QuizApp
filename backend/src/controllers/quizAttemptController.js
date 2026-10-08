const Quiz = require("../models/Quiz");
const QuizSession = require("../models/QuizSession");

exports.getQuizForStudent = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz || !quiz.isActive)
      return res.status(404).json({ message: "Quiz not found or inactive" });

    const now = new Date();
    if (quiz.scheduledAt && now < quiz.scheduledAt)
      return res.status(403).json({ message: "Quiz not yet available" });

    // Check if student already has a session
    const existingSession = await QuizSession.findOne({
      quizId: req.params.id,
      studentId: req.user.id,
    });
    if (existingSession && existingSession.status === "completed")
      return res.status(403).json({ message: "Quiz already completed" });

    res.json({ quiz, session: existingSession });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.startQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    let session = await QuizSession.findOne({ quizId, studentId: req.user.id });
    if (!session) {
      session = new QuizSession({ quizId, studentId: req.user.id });
      await session.save();
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveAnswer = async (req, res) => {
  const { questionId, selectedAnswer, timeSpent } = req.body;
  try {
    const session = await QuizSession.findOne({
      quizId: req.params.quizId,
      studentId: req.user.id,
    });
    if (!session || session.status !== "inProgress")
      return res.status(403).json({ message: "Invalid session" });

    const answerIndex = session.answers.findIndex(
      (a) => a.questionId.toString() === questionId,
    );
    if (answerIndex > -1) {
      session.answers[answerIndex] = { questionId, selectedAnswer, timeSpent };
    } else {
      session.answers.push({ questionId, selectedAnswer, timeSpent });
    }
    await session.save();
    res.json({ message: "Answer saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const session = await QuizSession.findOne({
      quizId: req.params.quizId,
      studentId: req.user.id,
    }).populate("quizId");
    if (!session || session.status !== "inProgress")
      return res.status(403).json({ message: "Invalid session" });

    session.completedAt = new Date();
    session.status = "completed";

    // Calculate score
    const quiz = session.quizId;
    let correct = 0;
    session.answers.forEach((answer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId.toString(),
      );
      if (question) {
        if (question.type === "mcq") {
          answer.isCorrect = answer.selectedAnswer === question.correctAnswer;
        } else if (question.type === "single") {
          // Exact match or keyword match
          const studentAns = answer.selectedAnswer.toLowerCase();
          const correctAns = question.correctAnswer.toLowerCase();
          answer.isCorrect =
            studentAns === correctAns ||
            correctAns
              .split(" ")
              .some((keyword) => studentAns.includes(keyword));
        }
        if (answer.isCorrect) correct++;
      }
    });
    session.score = (correct / quiz.questions.length) * 100;

    await session.save();
    res.json({ session, score: session.score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const session = await QuizSession.findOne({
      quizId: req.params.quizId,
      studentId: req.user.id,
    }).populate("quizId");
    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logViolation = async (req, res) => {
  try {
    const { type } = req.body;
    const session = await QuizSession.findOne({
      quizId: req.params.quizId,
      studentId: req.user.id,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.violations.push({ type, timestamp: new Date() });
    await session.save();
    res.json({ message: "Violation logged" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
