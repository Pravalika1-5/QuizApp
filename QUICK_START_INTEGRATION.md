# ⚡ Quick Start - Integrating Fallback Quizzes (5 Minutes)

## Step 1: Verify All Files Are in Place

```bash
# Check quiz data files
ls backend/src/data/cat_*_complete.json  # Should show 21 files

# Check config
cat backend/src/config/fallback_quiz_config.json

# Check matcher utility
cat backend/src/utils/quizCategoryMatcher.js
```

All files should be present. ✅

---

## Step 2: Update Your Quiz Controller

**File**: `backend/src/controllers/quizController.js`

Add this at the top:

```javascript
const categoryMatcher = require("../utils/quizCategoryMatcher");
const fs = require("fs");
const path = require("path");
```

Add these functions:

```javascript
// Handle natural language quiz search
async function searchQuizByQuery(req, res) {
  try {
    const { userQuery } = req.body;

    // Find category using NLP matcher
    const category = categoryMatcher.findCategory(userQuery);

    if (!category) {
      const suggestions = categoryMatcher.getSuggestions(userQuery);
      return res.status(404).json({
        error: "Category not found",
        suggestions: suggestions.map((c) => c.category_name),
      });
    }

    // Load quiz data from JSON file
    const filePath = path.join(__dirname, `../data/${category.filename}`);
    const quizData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    res.json({
      category: category.category_name,
      level: category.level,
      topics: Object.keys(quizData.topics),
      mcqCount: category.mcq_count,
      quizData: quizData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all categories
async function getAllCategories(req, res) {
  try {
    const categories = categoryMatcher.getAllCategories();
    res.json({
      totalCategories: categories.length,
      totalMCQs: categories.reduce((sum, c) => sum + c.mcq_count, 0),
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get by level
async function getQuizzesByLevel(req, res) {
  try {
    const { level } = req.params;
    const categories = categoryMatcher.getCategoriesByLevel(level);
    res.json({
      level,
      count: categories.length,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## Step 3: Add Routes

**File**: `backend/src/routes/quizRoutes.js`

Add these routes:

```javascript
// NLP-based quiz search (user asks for quiz on topic)
router.post("/search", quizController.searchQuizByQuery);

// Get all categories
router.get("/categories", quizController.getAllCategories);

// Get by level
router.get("/level/:level", quizController.getQuizzesByLevel);
```

---

## Step 4: Test the Integration

### Test 1: Start your backend

```bash
cd backend
npm start
```

### Test 2: Query the API

```bash
# Search for a quiz on arrays
curl -X POST http://localhost:5000/api/quiz/search \
  -H "Content-Type: application/json" \
  -d '{"userQuery": "quiz on arrays"}'

# Get all categories
curl http://localhost:5000/api/quiz/categories

# Get beginner level quizzes
curl http://localhost:5000/api/quiz/level/beginner
```

### Test 3: Verify Response

You should get:

```json
{
  "category": "DSA Basics",
  "level": "intermediate",
  "topics": ["Arrays", "Strings", "Linked Lists", "Stacks"],
  "mcqCount": 60,
  "quizData": { ... }
}
```

✅ **Success!** The system is working.

---

## Step 5: Frontend Integration (React)

**File**: `frontend/src/components/QuizSearch.jsx`

```jsx
import { useState } from "react";

export function QuizSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quiz/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: query }),
      });

      const data = await response.json();

      if (response.ok) {
        setCategory(data);
        setSuggestions([]);
      } else {
        setCategory(null);
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: 'quiz on arrays' or 'test me on ml'"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Start Quiz"}
        </button>
      </form>

      {category && (
        <div className="category-found">
          <h2>{category.category}</h2>
          <p>
            Level: <strong>{category.level}</strong>
          </p>
          <p>
            Questions: <strong>{category.mcqCount}</strong>
          </p>
          <p>Topics: {category.topics.join(", ")}</p>
          <button
            onClick={() => console.log("Start quiz with", category.quizData)}
          >
            Start Quiz
          </button>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>Did you mean?</h3>
          <ul>
            {suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Step 6: Example User Queries (Test These)

Copy-paste these into your search box to verify:

```
// Programming
quiz on arrays
test me on python
practice java
oops questions

// AI/ML
test me on cnn
ml basics
ai tokens
rag and hallucinations

// Developer Skills
questions on git
practice sql joins
web dev frontend
rest api http methods

// Infrastructure
operating systems
database fundamentals
networking tcp ip

// Data & Math
data science eda
gradient descent optimization

// Processes
sdlc agile
prompt engineering
nlp language models
```

Each should match to the correct category! 🎯

---

## 🎉 You're Done!

Your Smart Quiz App now has:

✅ **21 quiz categories** with 1,230 MCQs  
✅ **NLP matcher** for natural language queries  
✅ **Fallback dataset** for offline/disconnected scenarios  
✅ **Easy category browsing** by level or name  
✅ **Auto-suggestions** when user query doesn't match

**Users can now:**

- Type: "quiz on ml" → Get ML Basics quiz
- Type: "test git" → Get Git & Version Control quiz
- Type: "practice sql" → Get SQL Basics quiz
- Etc...

All without manually selecting categories! 🚀

---

## Troubleshooting

### Issue: "Cannot find module 'fallback_quiz_config.json'"

**Fix**: Ensure the file is at `backend/src/config/fallback_quiz_config.json`

### Issue: "Quiz data not loading"

**Fix**: Check that all `cat_*_complete.json` files are in `backend/src/data/`

### Issue: "Matcher returns null for valid queries"

**Fix**: Test with exact aliases:

```javascript
const matcher = require("./backend/src/utils/quizCategoryMatcher");
console.log(matcher.findCategory("arrays")); // Should work
```

### Issue: "Port 5000 already in use"

**Fix**: Kill existing process or use different port in .env

---

## Next Features to Build

- [ ] Save quiz attempts to database
- [ ] Track user progress and scores
- [ ] Show performance analytics
- [ ] Adaptive difficulty (harder if user scores well)
- [ ] Leaderboards
- [ ] Mobile app using same fallback dataset
- [ ] Offline mode with cached quizzes

---

**Ready to go!** 🚀 Your Smart Quiz App is now fully integrated with the fallback dataset system.
