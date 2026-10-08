const express = require("express");
const {
  getQuizForStudent,
  startQuiz,
  saveAnswer,
  submitQuiz,
  logViolation,
  getResults,
} = require("../controllers/quizAttemptController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Student routes
router.get("/:id", auth, authorize(["student"]), getQuizForStudent);
router.post("/:quizId/start", auth, authorize(["student"]), startQuiz);
router.post("/:quizId/answer", auth, authorize(["student"]), saveAnswer);
router.post("/:quizId/submit", auth, authorize(["student"]), submitQuiz);
router.get("/:quizId/results", auth, authorize(["student"]), getResults);
router.post("/:quizId/violation", auth, authorize(["student"]), logViolation);

module.exports = router;
