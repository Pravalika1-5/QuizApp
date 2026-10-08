require("dotenv").config({ path: __dirname + "/.env" });
const fs = require("fs");
const path = require("path");
const connectDB = require("./src/config/database");
const Question = require("./src/models/Question");
const User = require("./src/models/User");

const DATA_DIR = path.join(__dirname, "src/data");

const seedQuestions = async () => {
  try {
    await connectDB();

    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.error("❌ No admin user found. Run seed.js first.");
      process.exit(1);
    }

    const files = fs
      .readdirSync(DATA_DIR)
      .filter((f) => f.startsWith("cat_") && f.endsWith(".json"));

    let totalInserted = 0;

    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf-8"));
      const category = data.category;
      const docs = [];

      for (const [, topicData] of Object.entries(data.topics || {})) {
        for (const difficulty of ["easy", "medium", "hard"]) {
          for (const q of topicData[difficulty] || []) {
            docs.push({
              type: "mcq",
              questionText: q.question,
              options: q.options,
              correctAnswer: q.options[q.correct_answer],
              difficulty,
              marks: difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3,
              explanation: "",
              aiGenerated: false,
              createdBy: admin._id,
              category: category.toLowerCase(),
            });
          }
        }
      }

      if (docs.length === 0) continue;

      // Skip if already seeded for this category
      const existing = await Question.countDocuments({
        createdBy: admin._id,
        category: category.toLowerCase(),
      });

      if (existing > 0) {
        console.log(`ℹ️  Skipping "${category}" — already seeded (${existing} questions)`);
        continue;
      }

      await Question.insertMany(docs);
      console.log(`✅ Seeded ${docs.length} questions for "${category}"`);
      totalInserted += docs.length;
    }

    console.log(`\n🎉 Done! Total inserted: ${totalInserted} questions`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedQuestions();
