const fs = require("fs");
let content = fs.readFileSync("seed-fallback-questions.js", "utf-8");
content = content.replace(
  "difficulty: q._difficulty,",
  'difficulty: q._difficulty === "interview" ? "hard" : q._difficulty,',
);
fs.writeFileSync("seed-fallback-questions.js", content);
console.log("Fixed!");
