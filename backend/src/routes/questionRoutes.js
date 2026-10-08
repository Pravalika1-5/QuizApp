const express = require("express");
const {
  createQuestion,
  getQuestions,
  getPublicQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public get all questions
router.get("/public", getPublicQuestions);

// All routes require admin auth
router.use(auth);
router.use(authorize(["admin"]));

router.post("/", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
