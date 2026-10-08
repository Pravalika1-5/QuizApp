const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    timer: { type: Number, required: true }, // minutes
    scheduledAt: { type: Date },
    link: { type: String },
    isActive: { type: Boolean, default: true },
    shuffleQuestions: { type: Boolean, default: false },
    shuffleAnswers: { type: Boolean, default: false },
    showResults: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
