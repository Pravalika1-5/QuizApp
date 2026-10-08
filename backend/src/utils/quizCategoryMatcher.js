/**
 * Quiz Category Matcher - NLP Keyword Matching Layer
 * Automatically maps user queries to quiz categories using alias-based matching
 *
 * Example Usage:
 * matcher.findCategory("quiz on arrays") -> "DSA Basics"
 * matcher.findCategory("test me on cnn") -> "Deep Learning Basics"
 * matcher.findCategory("practice sql joins") -> "SQL Basics"
 */

const fallbackConfig = require("../config/fallback_quiz_config.json");

class QuizCategoryMatcher {
  constructor(config = fallbackConfig) {
    this.config = config;
    this.categories = config.quiz_categories;
    this.aliasMap = this.buildAliasMap();
  }

  /**
   * Build reverse map: alias -> category_name for O(1) lookup
   */
  buildAliasMap() {
    const map = {};
    this.categories.forEach((category) => {
      category.aliases.forEach((alias) => {
        const normalizedAlias = this.normalizeText(alias);
        map[normalizedAlias] = category.category_name;
      });
    });
    return map;
  }

  /**
   * Normalize text for matching
   */
  normalizeText(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ");
  }

  /**
   * Extract keywords from user query
   */
  extractKeywords(query) {
    const normalized = this.normalizeText(query);
    return normalized.split(" ").filter((word) => word.length > 2);
  }

  /**
   * Find matching category from user query
   * @param {string} userQuery - User's natural language query
   * @returns {object|null} - Category object or null if not found
   */
  findCategory(userQuery) {
    if (!userQuery || typeof userQuery !== "string") {
      return null;
    }

    const normalized = this.normalizeText(userQuery);
    const keywords = this.extractKeywords(userQuery);

    // Direct match on normalized query
    const directMatch = this.aliasMap[normalized];
    if (directMatch) {
      return this.getCategoryByName(directMatch);
    }

    // Try matching individual keywords
    for (const keyword of keywords) {
      const match = this.aliasMap[keyword];
      if (match) {
        return this.getCategoryByName(match);
      }
    }

    // Fuzzy match: check if query contains any alias
    for (const [alias, categoryName] of Object.entries(this.aliasMap)) {
      if (normalized.includes(alias) || alias.includes(normalized)) {
        return this.getCategoryByName(categoryName);
      }
    }

    return null;
  }

  /**
   * Get category object by name
   */
  getCategoryByName(categoryName) {
    return (
      this.categories.find((cat) => cat.category_name === categoryName) || null
    );
  }

  /**
   * Get all categories
   */
  getAllCategories() {
    return this.categories;
  }

  /**
   * Get categories by level
   */
  getCategoriesByLevel(level) {
    return this.categories.filter((cat) => cat.level === level);
  }

  /**
   * Search multiple queries and return matches
   */
  searchMultiple(queries) {
    return queries.map((query) => ({
      query,
      category: this.findCategory(query),
      confidence: this.findCategory(query) ? "high" : "none",
    }));
  }

  /**
   * Get suggestions for category search
   */
  getSuggestions(partialQuery, limit = 5) {
    if (!partialQuery) return [];

    const normalized = this.normalizeText(partialQuery);
    const suggestions = this.categories.filter((cat) => {
      return (
        cat.aliases.some((alias) => alias.includes(normalized)) ||
        cat.category_name.toLowerCase().includes(normalized)
      );
    });

    return suggestions.slice(0, limit);
  }
}

// Export singleton instance
module.exports = new QuizCategoryMatcher();
