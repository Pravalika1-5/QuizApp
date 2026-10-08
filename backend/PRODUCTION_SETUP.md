# Production-Ready Folder Structure & Setup

## Recommended Folder Structure

```
QuizApp/
├── backend/
│   ├── public/                    # Static files to serve
│   │   ├── uploads/               # User-uploaded files
│   │   └── assets/                # Images, docs
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js        # DB connection with retry logic
│   │   │   └── env.js             # Environment validation (NEW)
│   │   │
│   │   ├── controllers/           # Business logic
│   │   │   ├── authController.js
│   │   │   ├── aiController.js
│   │   │   ├── quizController.js
│   │   │   ├── userController.js
│   │   │   ├── questionController.js
│   │   │   ├── quizAttemptController.js
│   │   │   └── adminController.js
│   │   │
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Quiz.js
│   │   │   ├── Question.js
│   │   │   ├── QuizSession.js
│   │   │   └── index.js           # Export all models (NEW)
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── aiRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   ├── questionRoutes.js
│   │   │   ├── quizAttemptRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── index.js           # Register all routes (NEW)
│   │   │
│   │   ├── middleware/            # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js    # Global error handler (NEW)
│   │   │   ├── validation.js      # Input validation (NEW)
│   │   │   └── logging.js         # Request logging (NEW)
│   │   │
│   │   ├── utils/
│   │   │   ├── aiHelper.js
│   │   │   ├── auth.js
│   │   │   └── validators.js      # Data validation helpers (NEW)
│   │   │
│   │   ├── services/              # External services (NEW)
│   │   │   ├── groqService.js
│   │   │   └── emailService.js    # For future email features
│   │   │
│   │   └── constants/             # App-wide constants (NEW)
│   │       └── index.js
│   │
│   ├── tests/                     # Test files (NEW)
│   │   ├── unit/
│   │   ├── integration/
│   │   └── setup.js
│   │
│   ├── logs/                      # Log files (NEW - created at runtime)
│   │   └── .gitkeep
│   │
│   ├── .env                       # Local environment (⚠️ DO NOT COMMIT)
│   ├── .env.example               # Template for .env
│   ├── .env.production            # Production config (⚠️ DO NOT COMMIT)
│   ├── .env.test                  # Test config
│   │
│   ├── .gitignore                 # Updated to exclude env files
│   ├── server.js                  # Application entry point
│   ├── package.json
│   ├── package-lock.json
│   ├── docker-compose.yml         # Local dev Docker setup (NEW)
│   ├── Dockerfile                 # Production Docker image (NEW)
│   │
│   ├── DEBUG_GUIDE.md             # Debugging documentation
│   ├── PRODUCTION_SETUP.md        # This file
│   └── API_DOCUMENTATION.md       # API endpoint docs (NEW)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/              # API client services
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── .env
│   ├── .env.example
│   ├── .env.production
│   ├── vite.config.js
│   └── package.json
│
└── docker-compose.yml             # Root compose file (NEW)
```

---

## New Files to Create for Production

### 1. `src/config/env.js` - Environment Validation

```javascript
const requiredEnvVars = {
  development: ["MONGO_URI", "JWT_SECRET", "GROQ_API_KEY"],
  production: ["MONGO_URI", "JWT_SECRET", "GROQ_API_KEY", "NODE_ENV"],
  test: ["MONGO_URI_TEST", "JWT_SECRET"],
};

function validateEnvironment() {
  const env = process.env.NODE_ENV || "development";
  const required = requiredEnvVars[env] || requiredEnvVars.development;

  const missing = required.filter(
    (key) => !process.env[key] || process.env[key].trim() === "",
  );

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  // Validate GROQ API key format
  if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.startsWith("sk-")) {
    throw new Error('GROQ_API_KEY must start with "sk-"');
  }

  return true;
}

module.exports = { validateEnvironment };
```

### 2. `src/middleware/errorHandler.js` - Global Error Handler

```javascript
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] Error:`, {
    status,
    message,
    path: req.path,
    method: req.method,
    userId: req.user?.id,
  });

  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
```

### 3. `src/middleware/logging.js` - Request Logger

```javascript
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`,
    );
  });

  next();
};

module.exports = requestLogger;
```

### 4. `src/services/groqService.js` - Groq API Wrapper

```javascript
const Groq = require("groq-sdk");

class GroqService {
  constructor() {
    this.client = null;
    this.isInitialized = false;
  }

  initialize() {
    if (this.isInitialized) return this.client;

    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey || apiKey.length < 20) {
      throw new Error("Invalid GROQ_API_KEY");
    }

    this.client = new Groq({ apiKey });
    this.isInitialized = true;
    return this.client;
  }

  async generateText(prompt, options = {}) {
    const client = this.initialize();
    return await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: options.model || "llama-3.3-70b-versatile",
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 4000,
      ...options,
    });
  }
}

module.exports = new GroqService();
```

### 5. `.gitignore` - Updated

```
# Environment files
.env
.env.local
.env.*.local
.env.production

# Logs
logs/
*.log
npm-debug.log*

# Dependencies
node_modules/
package-lock.json

# Build artifacts
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Uploads
public/uploads/*
!public/uploads/.gitkeep

# Test coverage
coverage/
```

---

## Environment Configuration Strategy

### Development (`.env`)

```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=dev-secret-not-for-production
GROQ_API_KEY=sk-your-dev-key
FRONTEND_URL=http://localhost:5174
LOG_LEVEL=debug
```

### Production (`.env.production` - on server only)

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/quizapp
JWT_SECRET=<strong-random-secret-from-vault>
GROQ_API_KEY=<production-api-key-from-vault>
FRONTEND_URL=https://quizapp.example.com
LOG_LEVEL=info
CORS_ORIGIN=https://quizapp.example.com
```

### Test (`.env.test`)

```env
NODE_ENV=test
MONGO_URI=mongodb://localhost:27017/quizapp_test
JWT_SECRET=test-secret
GROQ_API_KEY=test-key
```

---

## Docker Setup for Production

### `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### `docker-compose.yml`

```yaml
version: "3.8"

services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: quizapp

  app:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongodb:27017/quizapp
      - JWT_SECRET=dev-secret
      - GROQ_API_KEY=${GROQ_API_KEY}
      - FRONTEND_URL=http://localhost:5174
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "5174:5174"
    environment:
      - VITE_API_URL=http://localhost:5000/api
    depends_on:
      - app

volumes:
  mongo_data:
```

---

## Server Startup Checklist

- [ ] All environment variables configured
- [ ] MongoDB running and accessible
- [ ] Groq API key validated and active
- [ ] Dependencies installed (`npm install`)
- [ ] No syntax errors (`npm run lint`)
- [ ] Tests passing (`npm test`)
- [ ] Server starts successfully
- [ ] Health check endpoint responds
- [ ] All routes accessible
- [ ] Error handling working
- [ ] Logging configured
- [ ] Database backups configured
- [ ] Rate limiting enabled
- [ ] HTTPS configured (production)
- [ ] Security headers set (helmet)
- [ ] CORS properly restricted
- [ ] API keys rotated regularly

---

## Performance Optimization

1. **Caching**
   - Add Redis for session/token caching
   - Cache generated questions with TTL

2. **Database**
   - Index frequently queried fields
   - Use connection pooling
   - Archive old quiz attempts

3. **API**
   - Implement pagination for large datasets
   - Compress responses (gzip)
   - Use CDN for static files

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API latency
   - Track Groq API usage/costs

---

## Scaling Considerations

- Use PM2 or similar for process management
- Implement horizontal scaling with load balancer
- Use separate database replicas for read operations
- Queue long-running tasks (Bull, RabbitMQ)
- Cache frequently accessed data
- Consider microservices for AI generation
