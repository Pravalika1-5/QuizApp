const express = require("express");
const {
  getAnalytics,
  getQuizResults,
  exportResultsCSV,
} = require("../controllers/adminController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);
router.use(authorize(["admin"]));

router.get("/analytics", getAnalytics);
router.get("/quizzes/:quizId/results", getQuizResults);
router.get("/quizzes/:quizId/export", exportResultsCSV);

module.exports = router;
