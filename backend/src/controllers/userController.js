const User = require("../models/User");
const csv = require("csv-parser");
const fs = require("fs");
const { hashPassword } = require("../utils/auth");

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadStudents = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const students = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => students.push(data))
    .on("end", async () => {
      try {
        for (const student of students) {
          const hashedPassword = await hashPassword(
            student.password || "defaultpass",
          );
          await User.create({
            email: student.email,
            password: hashedPassword,
            role: "student",
            name: student.name,
            rollNo: student.rollNo,
            department: student.department,
            year: student.year,
            isEligible: student.isEligible === "true",
          });
        }
        fs.unlinkSync(req.file.path); // Delete temp file
        res.json({ message: "Students uploaded successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
};

exports.updateEligibility = async (req, res) => {
  const { id } = req.params;
  const { isEligible } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isEligible },
      { new: true },
    );
    if (!user) return res.status(404).json({ message: "Student not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentStats = async (req, res) => {
  try {
    const total = await User.countDocuments({ role: "student" });
    const eligible = await User.countDocuments({
      role: "student",
      isEligible: true,
    });
    res.json({ totalStudents: total, eligibleStudents: eligible });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
