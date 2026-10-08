# Quick Start - API Request Troubleshooting

## Most Common Issue: API Key Space

```env
❌ WRONG
GROQ_API_KEY= sk-xxxxxxxxxxxx
                 ↑ space here breaks everything

✅ CORRECT
GROQ_API_KEY=sk-xxxxxxxxxxxx
```

**Fix in 30 seconds:**

1. Open `.env` file
2. Find `GROQ_API_KEY=` line
3. Remove any spaces before/after the `=` sign
4. Remove any spaces after the `=` and before `sk-`
5. Save file
6. Restart server (`node server.js`)

---

## Verify Your Setup Works

### Step 1: Check Environment Loading

```bash
# Should show the key without spaces
node -e "require('dotenv').config(); console.log('Key:', JSON.stringify(process.env.GROQ_API_KEY))"
```

### Step 2: Check Server Startup

```bash
node server.js
```

**Expected Output:**

```
✅ Environment validation passed
✅ GROQ API Key loaded: sk-xxxx...
✅ MongoDB URI: mongodb://localhost:27017/quizapp
✅ Frontend URL: http://localhost:5174
🔌 Connecting to MongoDB...
✅ MongoDB connected successfully
✅ Groq client initialized successfully
🚀 Server running on port 5000
```

**If You See Errors:**
| Error | Fix |
|-------|-----|
| ❌ Missing environment variables: GROQ_API_KEY | Check `.env` file exists, has GROQ_API_KEY |
| ❌ GROQ_API_KEY appears invalid (too short) | Key has spaces or incomplete |
| ❌ MongoDB connection failed | Start MongoDB: `mongod` |
| ❌ No response content from Groq API | API key is invalid, check https://console.groq.com |

### Step 3: Test API Endpoint

```bash
# Generate test questions
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "topic": "Physics",
    "difficulty": "easy",
    "numQuestions": 5,
    "type": "mcq"
  }'
```

**Success Response:**

```json
{
  "questions": [
    {
      "question": "What is Newton's first law?",
      "options": ["Inertia", "..."],
      "correctAnswer": "Inertia",
      "explanation": "...",
      "difficulty": "easy",
      "category": "physics"
    }
  ],
  "usedFallback": false
}
```

---

## Console Log Guide

### 🟢 Good Signs (Everything Working)

```
✅ Environment validation passed
✅ GROQ API Key loaded: sk-xxxx...
✅ MongoDB connected successfully
✅ Groq client initialized successfully
📝 Generating questions: topic=Physics...
🔄 Sending request to Groq API...
✅ Groq API response received
✅ Successfully generated 5 questions
```

### 🔴 Bad Signs (Issues to Fix)

```
❌ Missing environment variables: GROQ_API_KEY
→ Fix: Verify GROQ_API_KEY is in .env file

❌ GROQ_API_KEY appears invalid (too short)
→ Fix: Remove spaces: GROQ_API_KEY=sk-xxxxx (no space after =)

❌ MongoDB connection failed
→ Fix: Start MongoDB with: mongod

❌ Groq not initialized - API key issue detected
→ Fix: Check console logs above for specific issue

⚠️  Groq client not initialized
📚 Falling back to mock questions
→ Info: API failed, using test data
```

---

## File Changes Made

| File                              | Changes                                              |
| --------------------------------- | ---------------------------------------------------- |
| `.env`                            | Removed space after `GROQ_API_KEY=`                  |
| `server.js`                       | Added environment validation, removed secret logging |
| `src/utils/aiHelper.js`           | Added API key validation, better error messages      |
| `src/config/database.js`          | Added connection debugging, helpful error messages   |
| `src/controllers/aiController.js` | Added input validation, request logging              |

---

## New Documentation Created

| File                  | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `.env.example`        | Template for environment variables        |
| `DEBUG_GUIDE.md`      | Detailed troubleshooting for all issues   |
| `PRODUCTION_SETUP.md` | Production-ready folder structure & setup |
| `QUICK_START.md`      | This file - fast reference                |

---

## Key Improvements Made

✅ **Fixed .env Formatting**

- Removed spaces in `GROQ_API_KEY=` line

✅ **Added Environment Validation**

- Checks all required vars on startup
- Validates API key format
- Validates database connection

✅ **Enhanced Error Handling**

- Better error messages for debugging
- Graceful fallback to mock questions
- Stack traces in development mode

✅ **Debug Logging**

- Shows what's being loaded
- Tracks API request flow
- Identifies exact failure points

✅ **Security Improvements**

- No longer logs all environment variables
- Only shows key fingerprints (first/last chars)

---

## Next Steps

1. **Restart your server** after .env fix
2. **Monitor console logs** to identify any remaining issues
3. **Test an API request** using the curl example above
4. **Check DEBUG_GUIDE.md** if any errors appear
5. **Review PRODUCTION_SETUP.md** for production deployment

---

## Get Help

**For this issue**, check the error message in console logs:

- Use the **Quick Ref** table above to find your error
- Read detailed solutions in **DEBUG_GUIDE.md**
- Follow the **Verify Your Setup Works** section above

**For API key issues**, visit:

- Groq Console: https://console.groq.com/keys
- Verify API key is active
- Check usage/quota
