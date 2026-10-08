const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["mcq", "single"], required: true },
    questionText: { type: String, required: true },
    options: [{ type: String }], // For MCQ
    correctAnswer: { type: String, required: true }, // Index for MCQ, text for single
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    marks: { type: Number, required: true, min: 1 },
    explanation: { type: String },
    category: { type: String },
    aiGenerated: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Question", questionSchema);
