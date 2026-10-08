const express = require("express");
const {
  listCategories,
  searchCategories,
  resolveCategory,
  getByLevel,
} = require("../controllers/categoryController");

const router = express.Router();

// Public routes — no auth required for browsing categories
router.get("/", listCategories);
router.get("/search", searchCategories);
router.post("/resolve", resolveCategory);
router.get("/levels/:level", getByLevel);

module.exports = router;
