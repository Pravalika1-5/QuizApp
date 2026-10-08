const mongoose = require("mongoose");

const quizSessionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedAnswer: String,
        isCorrect: Boolean,
        timeSpent: Number, // seconds
      },
    ],
    violations: [
      {
        type: String, // tabSwitch, blur
        timestamp: Date,
        details: String,
      },
    ],
    score: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["inProgress", "completed", "violated"],
      default: "inProgress",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("QuizSession", quizSessionSchema);
