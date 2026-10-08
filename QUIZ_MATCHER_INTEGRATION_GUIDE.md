/\*\*

- QUIZ CATEGORY MATCHER - INTEGRATION GUIDE
-
- This guide shows how to integrate the QuizCategoryMatcher NLP layer
- into your Smart Quiz application for automatic category detection.
  \*/

// ============================================================================
// BASIC USAGE IN YOUR CONTROLLERS
// ============================================================================

// In backend/src/controllers/quizController.js:

const categoryMatcher = require('../utils/quizCategoryMatcher');

/\*\*

- Example 1: User asks for a quiz on a topic
- User: "I want to quiz on arrays"
- System: Automatically maps to DSA Basics
  \*/
  async function getQuizByUserRequest(req, res) {
  try {
  const { userQuery } = req.body;
      // Find matching category using NLP
      const category = categoryMatcher.findCategory(userQuery);

      if (!category) {
        return res.status(404).json({
          error: 'Category not found',
          suggestions: categoryMatcher.getSuggestions(userQuery)
        });
      }

      // Load quiz data from JSON file
      const quizData = require(`../data/${category.filename}`);

      return res.json({
        category: category.category_name,
        filename: category.filename,
        level: category.level,
        topics: category.topics,
        mcqCount: category.mcq_count,
        quizData: quizData
      });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  }

// ============================================================================
// EXAMPLE QUERIES & EXPECTED MAPPINGS
// ============================================================================

const testQueries = [
// Core Programming
"quiz on arrays", // → DSA Basics
"test me on python", // → Python Basics
"practice java", // → Java Basics
"oops questions", // → OOPS Fundamentals

// AI/ML
"test me on cnn", // → Deep Learning Basics
"ml basics questions", // → Machine Learning Basics
"ai tokens quiz", // → LLM Interview Topics
"rag and hallucinations", // → LLM Interview Topics

// Developer Essentials
"questions on git", // → Git & Version Control Basics
"practice sql joins", // → SQL Basics
"web dev frontend", // → Web Development Basics
"rest api http methods", // → REST API Basics

// Infrastructure
"operating systems quiz", // → Operating Systems Basics
"database fundamentals", // → DBMS Basics
"networking tcp ip", // → Computer Networks Basics

// Data & Math
"data science eda", // → Data Science Basics
"gradient descent optimization", // → Mathematics for AI Basics

// Process & Soft Skills
"sdlc agile scrum", // → Software Engineering Basics
"prompt engineering llm", // → Prompt Engineering
"nlp language models", // → Natural Language Processing Basics
];

// ============================================================================
// DETAILED INTEGRATION EXAMPLES
// ============================================================================

/\*\*

- Example 2: Category Search with Suggestions
  \*/
  async function searchQuizCategory(req, res) {
  try {
  const { searchTerm } = req.query;
      // Get direct match
      const exact = categoryMatcher.findCategory(searchTerm);

      // Get suggestions if no exact match
      const suggestions = categoryMatcher.getSuggestions(searchTerm);

      return res.json({
        exactMatch: exact,
        suggestions: suggestions
      });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  }

/\*\*

- Example 3: Browse by Level
  \*/
  async function getQuizzesByLevel(req, res) {
  try {
  const { level } = req.params; // 'beginner', 'intermediate', 'advanced'
      const categories = categoryMatcher.getCategoriesByLevel(level);

      return res.json({
        level,
        count: categories.length,
        categories: categories
      });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  }

/\*\*

- Example 4: Get All Categories for Frontend
  \*/
  async function getAllCategories(req, res) {
  try {
  const categories = categoryMatcher.getAllCategories();
      return res.json({
        totalCategories: categories.length,
        totalMCQs: categories.reduce((sum, cat) => sum + cat.mcq_count, 0),
        categories: categories
      });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  }

// ============================================================================
// FRONTEND INTEGRATION (React Example)
// ============================================================================

/\*
// In your React component:

import { useState } from 'react';

function QuizSearch() {
const [query, setQuery] = useState('');
const [results, setResults] = useState(null);
const [loading, setLoading] = useState(false);

const handleSearch = async (e) => {
e.preventDefault();
setLoading(true);

    try {
      // Call your backend endpoint
      const response = await fetch('/api/quiz/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query })
      });

      const data = await response.json();
      setResults(data);

      // Load quiz if category found
      if (data.category) {
        console.log(`Found category: ${data.category.category_name}`);
        // Load quiz questions from data.quizData
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }

};

return (
<div className="quiz-search">
<form onSubmit={handleSearch}>
<input
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="e.g., 'quiz on arrays' or 'test me on ml'"
/>
<button type="submit" disabled={loading}>
{loading ? 'Searching...' : 'Search'}
</button>
</form>

      {results?.category && (
        <div className="category-found">
          <h3>{results.category}</h3>
          <p>Level: {results.level}</p>
          <p>Questions: {results.mcqCount}</p>
          <button onClick={() => startQuiz(results)}>Start Quiz</button>
        </div>
      )}

      {results?.suggestions && (
        <div className="suggestions">
          <h4>Did you mean:</h4>
          <ul>
            {results.suggestions.map(cat => (
              <li key={cat.category_name}>{cat.category_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

);
}
\*/

// ============================================================================
// ROUTE SETUP
// ============================================================================

/\*
// In backend/src/routes/quizRoutes.js:

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// NLP-based quiz search
router.post('/search', quizController.getQuizByUserRequest);
router.get('/search', quizController.searchQuizCategory);

// Browse by level
router.get('/level/:level', quizController.getQuizzesByLevel);

// Get all categories
router.get('/categories', quizController.getAllCategories);

module.exports = router;
\*/

// ============================================================================
// TESTING THE MATCHER
// ============================================================================

/\*
// Run this in your terminal to test:

const matcher = require('./backend/src/utils/quizCategoryMatcher');

// Test direct match
console.log(matcher.findCategory('quiz on arrays'));
// Output: { category_name: 'DSA Basics', ... }

// Test fuzzy match
console.log(matcher.findCategory('test me on cnn'));
// Output: { category_name: 'Deep Learning Basics', ... }

// Test suggestions
console.log(matcher.getSuggestions('ml'));
// Output: [{ category_name: 'Machine Learning Basics', ... }, ...]

// Test batch search
console.log(matcher.searchMultiple(['arrays', 'python', 'git']));
\*/

module.exports = {
testQueries,
categoryMatcher
};
