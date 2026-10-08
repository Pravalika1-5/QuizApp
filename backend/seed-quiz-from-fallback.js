require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./src/models/Question");
const Quiz = require("./src/models/Quiz");

const SYSTEM_ADMIN_ID = "69837d6836444b906ec82710";

const CATEGORY_QUIZ_CONFIG = [
    { category: "Java Basics", title: "Java Basics Quiz", timer: 15 },
    { category: "Python Basics", title: "Python Basics Quiz", timer: 15 },
    { category: "C++ Basics", title: "C++ Basics Quiz", timer: 10 },
    { category: "JavaScript Basics", title: "JavaScript Basics Quiz", timer: 10 },
    { category: "SQL Basics", title: "SQL Basics Quiz", timer: 15 },
    { category: "Git & Version Control Basics", title: "Git & Version Control Quiz", timer: 10 },
    { category: "Web Development Basics", title: "Web Development Quiz", timer: 15 },
    { category: "OOPS Fundamentals", title: "OOPS Fundamentals Quiz", timer: 15 },
    { category: "DSA Basics", title: "DSA Basics Quiz", timer: 15 },
    { category: "DBMS Basics", title: "DBMS Basics Quiz", timer: 12 },
    { category: "Operating Systems Basics", title: "Operating Systems Quiz", timer: 12 },
    { category: "Computer Networks Basics", title: "Computer Networks Quiz", timer: 12 },
    { category: "REST API Basics", title: "REST API Basics Quiz", timer: 12 },
    { category: "Software Engineering Basics", title: "Software Engineering Quiz", timer: 12 },
    { category: "Data Science Basics", title: "Data Science Basics Quiz", timer: 12 },
    { category: "Mathematics for AI Basics", title: "Mathematics for AI Quiz", timer: 12 },
    { category: "Engineering Mathematics", title: "Engineering Mathematics Quiz", timer: 12 },
    { category: "Docker and DevOps", title: "Docker and DevOps Quiz", timer: 10 },
    { category: "Artificial Intelligence Basics", title: "Artificial Intelligence Quiz", timer: 12 },
    { category: "Machine Learning Basics", title: "Machine Learning Quiz", timer: 12 },
    { category: "Prompt Engineering", title: "Prompt Engineering Quiz", timer: 12 },
    { category: "Deep Learning Basics", title: "Deep Learning Quiz", timer: 12 },
    { category: "Reinforcement Learning Basics", title: "Reinforcement Learning Quiz", timer: 12 },
    { category: "Natural Language Processing Basics", title: "NLP Basics Quiz", timer: 12 },
    { category: "System Design", title: "System Design Quiz", timer: 10 },
    { category: "LLM Interview Topics", title: "LLM Interview Quiz", timer: 15 },
];

async function createQuizzesFromFallbackQuestions() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    let totalQuizzesCreated = 0;
    let totalSkipped = 0;

    for (const config of CATEGORY_QUIZ_CONFIG) {
        // Find questions for this category
        const questions = await Question.find({
            category: config.category,
            isFallback: true,
        });

        if (questions.length === 0) {
            console.log(`⚠️ No fallback questions found for: ${config.category}`);
            continue;
        }

        // Check if quiz already exists
        const existingQuiz = await Quiz.findOne({
            title: config.title,
            createdBy: SYSTEM_ADMIN_ID,
        });

        if (existingQuiz) {
            console.log(`⏭️ Quiz already exists: ${config.title}`);
            totalSkipped++;
            continue;
        }

        // Create quiz with up to 15 questions
        const quizQuestions = questions.slice(0, 15).map((q) => q._id);

        const quiz = new Quiz({
            title: config.title,
            description: `Test your knowledge of ${config.category}`,
            questions: quizQuestions,
            timer: config.timer,
            isActive: true,
            createdBy: SYSTEM_ADMIN_ID,
        });

        await quiz.save();
        console.log(`✅ Created quiz: ${config.title} with ${quizQuestions.length} questions`);
        totalQuizzesCreated++;
    }

    console.log(
        "\n📊 Summary: " + totalQuizzesCreated + " quizzes created, " + totalSkipped + " skipped",
    );
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
}

createQuizzesFromFallbackQuestions().catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
});
