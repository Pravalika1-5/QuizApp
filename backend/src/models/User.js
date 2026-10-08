const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student"], required: true },
    name: { type: String, required: true },
    isEligible: { type: Boolean, default: false },
    rollNo: { type: String },
    department: { type: String },
    year: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
