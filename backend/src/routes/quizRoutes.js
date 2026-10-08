const express = require("express");
const {
  createQuiz,
  getPublicQuizzes,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public route for students
router.get("/public", getPublicQuizzes);

// Admin routes
router.use(auth);
router.use(authorize(["admin"]));

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;
