const { Parser } = require("json2csv");
const mongoose = require("mongoose");
const { getAdminAnalytics, getQuizSessionResults } = require("../services/analyticsService");

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await getAdminAnalytics(req.user.id);
    res.json(analytics);
  } catch (err) {
    console.error("getAnalytics error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const result = await getQuizSessionResults(req.params.quizId, req.user.id);
    if (!result) {
      return res.status(404).json({ message: "Quiz not found or not authorized" });
    }
    res.json(result.sessions);
  } catch (err) {
    console.error("getQuizResults error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.exportResultsCSV = async (req, res) => {
  try {
    const result = await getQuizSessionResults(req.params.quizId, req.user.id);
    if (!result) {
      return res.status(404).json({ message: "Quiz not found or not authorized" });
    }

    const { quiz, sessions } = result;

    const fields = ["studentName", "studentEmail", "rollNo", "department", "score", "status", "completedAt", "violations"];
    const data = sessions.map((s) => ({
      studentName: s.studentId?.name || "N/A",
      studentEmail: s.studentId?.email || "N/A",
      rollNo: s.studentId?.rollNo || "N/A",
      department: s.studentId?.department || "N/A",
      score: `${Math.round(s.score || 0)}%`,
      status: s.status,
      completedAt: s.completedAt ? new Date(s.completedAt).toLocaleString() : "Incomplete",
      violations: s.violations?.length || 0,
    }));

    const csv = new Parser({ fields }).parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment(`quiz-results-${quiz.title.replace(/\s+/g, "-")}.csv`);
    res.send(csv);
  } catch (err) {
    console.error("exportResultsCSV error:", err);
    res.status(500).json({ message: err.message });
  }
};
