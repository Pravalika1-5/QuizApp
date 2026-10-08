/**
 * Category Controller
 * Exposes endpoints for category search, listing, and NLP resolution
 */

const quizCategoryMatcher = require("../utils/quizCategoryMatcher");

/**
 * GET /api/categories
 * List all categories with metadata
 */
exports.listCategories = (req, res) => {
  try {
    const categories = quizCategoryMatcher.getAllCategories();
    res.json({
      success: true,
      count: categories.length,
      categories: categories.map((cat) => ({
        category_name: cat.category_name,
        level: cat.level,
        topics: cat.topics,
        mcq_count: cat.mcq_count,
        aliases: cat.aliases,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/categories/search?q=...
 * Search categories by partial query (suggestions)
 */
exports.searchCategories = (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q) {
      return res
        .status(400)
        .json({ success: false, message: "Query param 'q' is required" });
    }
    const suggestions = quizCategoryMatcher.getSuggestions(
      q,
      parseInt(limit) || 5,
    );
    res.json({
      success: true,
      query: q,
      count: suggestions.length,
      suggestions: suggestions.map((cat) => ({
        category_name: cat.category_name,
        level: cat.level,
        aliases: cat.aliases,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/categories/resolve
 * Resolve a natural language query to a canonical category
 */
exports.resolveCategory = (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Body field 'query' (string) is required",
        });
    }

    const matched = quizCategoryMatcher.findCategory(query);
    if (!matched) {
      return res.json({
        success: true,
        query,
        matched: false,
        category: null,
        message: "No matching category found",
      });
    }

    // Determine which alias matched
    const normalizedQuery = quizCategoryMatcher.normalizeText(query);
    const keywords = quizCategoryMatcher.extractKeywords(query);
    let matchedAlias = null;

    // Find the specific alias that matched
    for (const alias of matched.aliases) {
      const normAlias = quizCategoryMatcher.normalizeText(alias);
      if (
        normAlias === normalizedQuery ||
        keywords.includes(normAlias) ||
        normalizedQuery.includes(normAlias) ||
        normAlias.includes(normalizedQuery)
      ) {
        matchedAlias = alias;
        break;
      }
    }

    res.json({
      success: true,
      query,
      matched: true,
      category: {
        category_name: matched.category_name,
        level: matched.level,
        topics: matched.topics,
        mcq_count: matched.mcq_count,
        filename: matched.filename,
      },
      matchedAlias,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/categories/levels/:level
 * Filter categories by difficulty level
 */
exports.getByLevel = (req, res) => {
  try {
    const { level } = req.params;
    const categories = quizCategoryMatcher.getCategoriesByLevel(level);
    res.json({
      success: true,
      level,
      count: categories.length,
      categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
