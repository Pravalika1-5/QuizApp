const express = require("express");
const multer = require("multer");
const {
  getStudents,
  uploadStudents,
  updateEligibility,
  deleteStudent,
  getStudentStats,
} = require("../controllers/userController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.use(auth);
router.use(authorize(["admin"]));

router.get("/", getStudents);
router.post("/upload", upload.single("file"), uploadStudents);
router.put("/:id/eligibility", updateEligibility);
router.delete("/:id", deleteStudent);
router.get("/stats", getStudentStats);

module.exports = router;
