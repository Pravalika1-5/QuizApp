# Debug Guide - Common Issues & Solutions

## 1. API Key Requests Failing

### Issue: "API key not recognized" or "Unauthorized"

**Root Cause:** Common formatting issues in `.env` file:

```env
❌ WRONG: GROQ_API_KEY= sk-xxxx    (space after =)
❌ WRONG: GROQ_API_KEY =sk-xxxx    (space before =)
✅ CORRECT: GROQ_API_KEY=sk-xxxx   (no spaces)
```

**Fix:**

1. Open `.env` file
2. Verify `GROQ_API_KEY` has **NO spaces** around the `=` sign
3. Verify the key starts with `sk-` and is 40+ characters
4. Restart the server

**Debug Check:**

```bash
# Run this to see loaded key
node -e "require('dotenv').config(); console.log('Key:', process.env.GROQ_API_KEY);"
```

---

## 2. MongoDB Connection Failed

### Issue: "MongoDB connected" not appearing in logs

**Common Causes:**

- MongoDB service not running
- Wrong connection URI
- Port 27017 blocked

**Fix:**

**Windows:**

```bash
# Start MongoDB service
net start MongoDB

# Or start mongod directly
mongod
```

**Linux/Mac:**

```bash
# Start MongoDB
mongod
```

**Verify Connection:**

```bash
# Test MongoDB is listening
netstat -an | find ":27017"    # Windows
lsof -i :27017                  # Linux/Mac
```

**Alternative URI to Test:**

```env
# If remote MongoDB needed
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp?retryWrites=true
```

---

## 3. Groq Client Not Initializing

### Issue: "Groq not initialized - API key issue detected"

**Causes:**

1. Environment variable not loaded → Restart server
2. API key has spaces → Fix .env
3. API key is too short → Check if full key was copied
4. API key format invalid → Should start with `sk-`

**Debug Logs to Watch:**

```
✅ Groq API Key loaded: sk-xxxx...    → Key found
❌ GROQ_API_KEY not configured        → Missing from .env
❌ GROQ_API_KEY appears invalid       → Too short or malformed
✅ Groq client initialized successfully → Ready to use
```

---

## 4. Questions Generation Timeout

### Issue: Long delay before fallback to mock questions

**Causes:**

- Network latency to Groq API
- Groq API is down/overloaded
- Large number of questions requested (max 100 recommended)

**Fix:**

```bash
# Reduce number of questions in request
# Recommended: 5-15 questions per request
```

---

## 5. Environment Variables Not Loading

### Issue: `process.env.PORT` or other vars are `undefined`

**Causes:**

- `.env` file not in `/backend` directory
- `.env` file not named exactly `.env`
- Server started before dotenv loads
- TypeScript issue: Use `process.env.VAR!` with non-null assertion

**Fix:**

1. Verify file location: `backend/.env` (not backend/src/.env)
2. Verify filename: exactly `.env` (case-sensitive on Linux/Mac)
3. Restart server
4. Check console output for validation messages

---

## 6. CORS Errors

### Issue: Frontend can't reach API

**Fix in server.js:**

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Must match frontend URL
    credentials: true,
  }),
);
```

**Verify:**

- Frontend running on: `http://localhost:5174` (or configured URL)
- `FRONTEND_URL` in `.env` matches exactly
- Both URLs use `http://` or `https://` (not mixed)

---

## 7. Rate Limiting Issues

### Issue: "Too many requests" error

**Default:** 100 requests per 15 minutes
**Solution:**

- Wait 15 minutes, or
- Modify in `server.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Increase limit
});
```

---

## How to Debug Effectively

### 1. Enable Full Logging

```bash
# Run with verbose output
node server.js 2>&1 | tee server.log
```

### 2. Check Key Loading

```bash
# Verify .env parsing
node -e "require('dotenv').config(); console.log(JSON.stringify(process.env, null, 2));" | grep GROQ
```

### 3. Test API Endpoint

```bash
# Generate test questions
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"topic":"Math","difficulty":"easy","numQuestions":5,"type":"mcq"}'
```

### 4. Monitor Groq API

- Check Groq console: https://console.groq.com
- Verify API key is active
- Check usage/quota

### 5. Check MongoDB Logs

```bash
# Windows
Get-Content $env:APPDATA\MongoDB\mongod.log -Tail 50

# Linux/Mac
tail -50 /var/log/mongodb/mongod.log
```

---

## Emergency Diagnostics

Run this script to generate a diagnostic report:

```javascript
// diagnostic.js
require("dotenv").config();
const mongoose = require("mongoose");

console.log("=== QUIZ APP DIAGNOSTICS ===\n");

console.log("1. ENVIRONMENT VARIABLES:");
console.log("   PORT:", process.env.PORT || "NOT SET");
console.log("   MONGO_URI:", process.env.MONGO_URI || "NOT SET");
console.log("   JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "NOT SET");
console.log(
  "   GROQ_API_KEY:",
  process.env.GROQ_API_KEY
    ? `SET (${process.env.GROQ_API_KEY.length} chars)`
    : "NOT SET",
);
console.log(
  "   GROQ key format:",
  process.env.GROQ_API_KEY?.startsWith("sk-") ? "✅ Valid" : "❌ Invalid",
);
console.log(
  "   GROQ key length:",
  process.env.GROQ_API_KEY?.trim().length || 0,
  "chars",
);

console.log("\n2. MONGODB CONNECTION:");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("   ✅ MongoDB Connected"))
  .catch((err) => console.log("   ❌ MongoDB Failed:", err.message))
  .finally(() => process.exit(0));
```

Run with: `node diagnostic.js`

---

## Quick Fix Checklist

- [ ] `.env` file exists in `/backend` directory
- [ ] `GROQ_API_KEY` has NO spaces around `=`
- [ ] `GROQ_API_KEY` starts with `sk-`
- [ ] `GROQ_API_KEY` is 40+ characters
- [ ] `MONGO_URI` points to running MongoDB
- [ ] MongoDB is running (`mongod` process active)
- [ ] `FRONTEND_URL` matches actual frontend URL
- [ ] Server logs show validation passed (✅)
- [ ] No `undefined` variables in startup logs
