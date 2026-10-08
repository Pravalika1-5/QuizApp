const QuizSession = require("../models/QuizSession");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const mongoose = require("mongoose");

const getAdminAnalytics = async (adminId) => {
  const objectId = new mongoose.Types.ObjectId(adminId);

  const [totalQuizzes, totalStudents, attemptStats] = await Promise.all([
    Quiz.countDocuments({ createdBy: objectId }),
    User.countDocuments({ role: "student" }),
    QuizSession.aggregate([
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz",
        },
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.createdBy": objectId } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          avgScore: { $avg: "$score" },
        },
      },
    ]),
  ]);

  const stats = attemptStats[0] || { totalAttempts: 0, avgScore: 0 };

  return {
    totalQuizzes,
    totalStudents,
    totalAttempts: stats.totalAttempts,
    averageScore: Math.round((stats.avgScore || 0) * 100) / 100,
  };
};

const getQuizSessionResults = async (quizId, adminId) => {
  const quiz = await Quiz.findOne({ _id: quizId, createdBy: adminId });
  if (!quiz) return null;

  const sessions = await QuizSession.find({ quizId })
    .populate("studentId", "name email rollNo department")
    .populate("quizId", "title timer")
    .sort({ completedAt: -1 })
    .lean();

  return { quiz, sessions };
};

module.exports = { getAdminAnalytics, getQuizSessionResults };
