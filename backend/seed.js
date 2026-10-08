require("dotenv").config({ path: __dirname + "/.env" });
const connectDB = require("./src/config/database");
const User = require("./src/models/User");
const Question = require("./src/models/Question");
const Quiz = require("./src/models/Quiz");
const { hashPassword } = require("./src/utils/auth");

const seed = async () => {
  try {
    await connectDB();

    // ─── USERS ───────────────────────────────────────────────────────────────

    let admin = await User.findOne({ email: "admin@example.com" });
    if (!admin) {
      admin = await User.create({
        email: "admin@example.com",
        password: await hashPassword("Admin123"),
        role: "admin",
        name: "Admin User",
        isEligible: true,
      });
      console.log("✅ Admin created");
    } else {
      console.log("ℹ️  Admin already exists");
    }

    const studentData = [
      { name: "Alice Johnson", email: "alice@example.com", rollNo: "CS001", department: "Computer Science", year: 2 },
      { name: "Bob Smith",     email: "bob@example.com",   rollNo: "CS002", department: "Computer Science", year: 3 },
      { name: "Carol White",   email: "carol@example.com", rollNo: "EC001", department: "Electronics",      year: 1 },
    ];

    for (const s of studentData) {
      const exists = await User.findOne({ email: s.email });
      if (!exists) {
        await User.create({
          ...s,
          password: await hashPassword("Student123"),
          role: "student",
          isEligible: true,
        });
        console.log(`✅ Student created: ${s.email}`);
      } else {
        console.log(`ℹ️  Student already exists: ${s.email}`);
      }
    }

    // ─── QUESTIONS ───────────────────────────────────────────────────────────

    const existingCount = await Question.countDocuments({ createdBy: admin._id });
    if (existingCount > 0) {
      console.log(`ℹ️  Questions already seeded (${existingCount} found), skipping.`);
    } else {
      const questionsData = [
        // JavaScript
        {
          type: "mcq",
          questionText: "Which keyword is used to declare a block-scoped variable in JavaScript?",
          options: ["var", "let", "define", "block"],
          correctAnswer: "let",
          difficulty: "easy",
          marks: 1,
          explanation: "'let' declares a block-scoped variable, unlike 'var' which is function-scoped.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What does the '===' operator check in JavaScript?",
          options: ["Value only", "Type only", "Value and type", "Reference equality"],
          correctAnswer: "Value and type",
          difficulty: "easy",
          marks: 1,
          explanation: "'===' is the strict equality operator — it checks both value and type without coercion.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "Which method is used to add an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: "push()",
          difficulty: "easy",
          marks: 1,
          explanation: "Array.push() appends one or more elements to the end of an array.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What is a closure in JavaScript?",
          options: [
            "A function with no return value",
            "A function that remembers its outer scope even after the outer function has returned",
            "A way to close the browser window",
            "A method to terminate a loop",
          ],
          correctAnswer: "A function that remembers its outer scope even after the outer function has returned",
          difficulty: "medium",
          marks: 2,
          explanation: "Closures allow inner functions to access variables from their enclosing scope.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What is the output of: typeof null in JavaScript?",
          options: ["null", "undefined", "object", "string"],
          correctAnswer: "object",
          difficulty: "medium",
          marks: 2,
          explanation: "This is a known JavaScript bug — typeof null returns 'object' for historical reasons.",
          aiGenerated: false,
        },
        {
          type: "single",
          questionText: "What method converts a JSON string into a JavaScript object?",
          options: [],
          correctAnswer: "JSON.parse",
          difficulty: "easy",
          marks: 1,
          explanation: "JSON.parse() parses a JSON string and returns the corresponding JavaScript value.",
          aiGenerated: false,
        },

        // React
        {
          type: "mcq",
          questionText: "What hook is used to manage state in a React functional component?",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctAnswer: "useState",
          difficulty: "easy",
          marks: 1,
          explanation: "useState returns a stateful value and a function to update it.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "When does the useEffect hook run by default?",
          options: [
            "Only on mount",
            "Only on unmount",
            "After every render",
            "Only when props change",
          ],
          correctAnswer: "After every render",
          difficulty: "easy",
          marks: 1,
          explanation: "Without a dependency array, useEffect runs after every render cycle.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What is the purpose of the key prop in React lists?",
          options: [
            "To style list items",
            "To help React identify which items have changed",
            "To sort the list",
            "To add event listeners",
          ],
          correctAnswer: "To help React identify which items have changed",
          difficulty: "medium",
          marks: 2,
          explanation: "Keys help React's reconciliation algorithm efficiently update the DOM.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What does React.memo do?",
          options: [
            "Memoizes the return value of a function",
            "Prevents a component from re-rendering if props haven't changed",
            "Caches API responses",
            "Creates a ref to a DOM element",
          ],
          correctAnswer: "Prevents a component from re-rendering if props haven't changed",
          difficulty: "hard",
          marks: 3,
          explanation: "React.memo is a higher-order component that skips re-rendering when props are shallowly equal.",
          aiGenerated: false,
        },

        // Node.js / Express
        {
          type: "mcq",
          questionText: "Which module is used to create an HTTP server in Node.js?",
          options: ["fs", "path", "http", "net"],
          correctAnswer: "http",
          difficulty: "easy",
          marks: 1,
          explanation: "The built-in 'http' module provides utilities for creating HTTP servers and clients.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What does middleware in Express.js do?",
          options: [
            "Connects to the database",
            "Renders HTML templates",
            "Processes requests before they reach route handlers",
            "Minifies JavaScript files",
          ],
          correctAnswer: "Processes requests before they reach route handlers",
          difficulty: "medium",
          marks: 2,
          explanation: "Middleware functions have access to req, res, and next — they can modify the request or end the cycle.",
          aiGenerated: false,
        },
        {
          type: "single",
          questionText: "What command initializes a new Node.js project with a package.json file?",
          options: [],
          correctAnswer: "npm init",
          difficulty: "easy",
          marks: 1,
          explanation: "'npm init' creates a package.json file interactively. 'npm init -y' skips prompts.",
          aiGenerated: false,
        },

        // MongoDB
        {
          type: "mcq",
          questionText: "What type of database is MongoDB?",
          options: ["Relational", "Document-oriented NoSQL", "Graph", "Key-Value"],
          correctAnswer: "Document-oriented NoSQL",
          difficulty: "easy",
          marks: 1,
          explanation: "MongoDB stores data as BSON documents (similar to JSON) in collections.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "Which MongoDB method returns all documents in a collection?",
          options: ["findOne()", "find()", "getAll()", "select()"],
          correctAnswer: "find()",
          difficulty: "easy",
          marks: 1,
          explanation: "Collection.find() with no filter returns all documents in the collection.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What does the $lookup stage do in a MongoDB aggregation pipeline?",
          options: [
            "Filters documents",
            "Groups documents",
            "Performs a left outer join with another collection",
            "Sorts documents",
          ],
          correctAnswer: "Performs a left outer join with another collection",
          difficulty: "hard",
          marks: 3,
          explanation: "$lookup joins documents from another collection into the pipeline, similar to SQL JOIN.",
          aiGenerated: false,
        },

        // General CS
        {
          type: "mcq",
          questionText: "What does REST stand for?",
          options: [
            "Remote Execution State Transfer",
            "Representational State Transfer",
            "Request and Response Standard Template",
            "Reliable Endpoint Service Technology",
          ],
          correctAnswer: "Representational State Transfer",
          difficulty: "easy",
          marks: 1,
          explanation: "REST is an architectural style for distributed hypermedia systems.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "Which HTTP status code indicates a resource was successfully created?",
          options: ["200", "201", "204", "301"],
          correctAnswer: "201",
          difficulty: "easy",
          marks: 1,
          explanation: "HTTP 201 Created indicates the request succeeded and a new resource was created.",
          aiGenerated: false,
        },
        {
          type: "mcq",
          questionText: "What is the time complexity of binary search?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
          correctAnswer: "O(log n)",
          difficulty: "medium",
          marks: 2,
          explanation: "Binary search halves the search space each iteration, giving O(log n) complexity.",
          aiGenerated: false,
        },
        {
          type: "single",
          questionText: "What does CSS stand for?",
          options: [],
          correctAnswer: "Cascading Style Sheets",
          difficulty: "easy",
          marks: 1,
          explanation: "CSS is used to style and layout web pages.",
          aiGenerated: false,
        },
      ];

      const created = await Question.insertMany(
        questionsData.map((q) => ({ ...q, createdBy: admin._id }))
      );
      console.log(`✅ ${created.length} questions seeded`);

      // ─── QUIZ ─────────────────────────────────────────────────────────────

      const existingQuiz = await Quiz.findOne({ createdBy: admin._id });
      if (!existingQuiz) {
        // Pick first 10 questions for the sample quiz
        const quizQuestionIds = created.slice(0, 10).map((q) => q._id);

        const quiz = await Quiz.create({
          title: "Web Development Fundamentals",
          description: "A sample quiz covering JavaScript, React, Node.js, and MongoDB basics.",
          questions: quizQuestionIds,
          timer: 15,
          isActive: true,
          shuffleQuestions: false,
          shuffleAnswers: false,
          showResults: true,
          createdBy: admin._id,
        });

        // Set the shareable link
        quiz.link = `http://localhost:5174/quiz/${quiz._id}`;
        await quiz.save();

        console.log(`✅ Sample quiz created: "${quiz.title}"`);
        console.log(`   Link: ${quiz.link}`);
      } else {
        console.log("ℹ️  Quiz already exists, skipping.");
      }
    }

    console.log("\n─────────────────────────────────────────");
    console.log("🔑 Login Credentials:");
    console.log("   Admin   → admin@example.com   / Admin123");
    console.log("   Student → alice@example.com   / Student123");
    console.log("   Student → bob@example.com     / Student123");
    console.log("   Student → carol@example.com   / Student123");
    console.log("─────────────────────────────────────────\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err.message || err);
    process.exit(1);
  }
};

seed();
