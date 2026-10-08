const express = require("express");
const { generateAIQuestions } = require("../controllers/aiController");
const { auth, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);
router.use(authorize(["admin"]));

router.post("/generate", generateAIQuestions);

module.exports = router;
