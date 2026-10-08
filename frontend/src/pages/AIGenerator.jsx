import React, { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import QuestionForm from "../components/QuestionForm";

const AIGenerator = () => {
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "easy",
    numQuestions: 15,
    type: "mcq",
    useFallback: false,
  });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [usedFallback, setUsedFallback] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    setGeneratedQuestions([]);
    setUsedFallback(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { ...formData };
      const response = await axios.post("/api/ai/generate", payload, config);
      const questions = response.data.questions || response.data;
      setGeneratedQuestions(questions);
      setUsedFallback(response.data.usedFallback === true);
      if (response.data.usedFallback) {
        setError("AI unavailable - loaded sample questions (edit recommended)");
      }
    } catch (err) {
      setError("Generation failed. Check backend and retry.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = (index) => setEditingIndex(index);

  const handleSaveEdit = (updatedQuestion) => {
    const newQuestions = [...generatedQuestions];
    newQuestions[editingIndex] = updatedQuestion;
    setGeneratedQuestions(newQuestions);
    setEditingIndex(null);
  };

  const handleSaveAll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Step 1: Save each question to get IDs (Question model expects questionText, not question)
      const questionIds = [];
      for (const q of generatedQuestions) {
        const qRes = await axios.post(
          "/api/questions",
          {
            type: q.type,
            questionText: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            difficulty: q.difficulty || formData.difficulty,
            marks: 1,
            explanation: q.explanation,
            aiGenerated: !q.isFallback,
          },
          config,
        );
        questionIds.push(qRes.data._id);
      }

      // Step 2: Create quiz with question IDs and default timer (30 min)
      const title = `${formData.topic} Quiz - ${formData.difficulty} (${generatedQuestions.length} questions)`;
      const quizRes = await axios.post(
        "/api/quizzes",
        {
          title,
          description: `AI-generated quiz on ${formData.topic}`,
          questions: questionIds,
          timer: 1800, // 30 minutes in seconds
        },
        config,
      );

      alert(`New quiz "${title}" created! Link: ${quizRes.data.link}`);
      setGeneratedQuestions([]);
      setError("");
    } catch (err) {
      setError(
        "Save quiz failed: " + (err.response?.data?.message || err.message),
      );
      console.error(err);
    }
  };

  const getBadgeStyle = (isFallback) => ({
    background: isFallback ? "#FEF3C7" : "#D1FAE5",
    color: isFallback ? "#92400E" : "#065F46",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#FAFAF9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <div
        style={{
          flex: 1,
          padding: "2rem",
          marginTop: "64px",
          overflowY: "auto",
        }}
      >
        <h1 style={{ color: "#1F2937", marginBottom: "2rem" }}>
          AI Question Generator
        </h1>

        {error && (
          <div
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            {error}
            <button
              onClick={handleGenerate}
              style={{
                marginLeft: "1rem",
                background: "#F59E0B",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.25rem 0.5rem",
              }}
            >
              Retry
            </button>
          </div>
        )}

        <form
          style={{
            maxWidth: "400px",
            marginBottom: "2rem",
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Topic:
            </label>
            <input
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Difficulty:
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Questions:
            </label>
            <input
              type="number"
              name="numQuestions"
              value={formData.numQuestions}
              onChange={handleChange}
              min="1"
              max="100"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#374151", fontWeight: "500" }}>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            >
              <option value="mcq">MCQ</option>
              <option value="single">Short Answer</option>
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              <input
                type="checkbox"
                name="useFallback"
                checked={formData.useFallback}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }}
              />
              Use Sample Questions
            </label>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !formData.topic}
            style={{
              width: "100%",
              padding: "0.75rem",
              background:
                isGenerating || !formData.topic
                  ? "#9CA3AF"
                  : "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor:
                isGenerating || !formData.topic ? "not-allowed" : "pointer",
            }}
          >
            {isGenerating ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {generatedQuestions.length > 0 && (
          <div style={{ maxWidth: "800px" }}>
            <h2 style={{ color: "#1F2937", marginBottom: "1rem" }}>
              Generated Questions{" "}
              {usedFallback && "(Sample Fallback - Edit Recommended)"}
            </h2>
            <div
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                background: "#F0F9FF",
                borderRadius: "8px",
              }}
            >
              <strong>Total: {generatedQuestions.length} questions</strong> |
              <span
                style={{
                  marginLeft: "1rem",
                  padding: "0.25rem 0.5rem",
                  background: usedFallback ? "#FEF3C7" : "#D1FAE5",
                  borderRadius: "4px",
                  color: usedFallback ? "#92400E" : "#065F46",
                }}
              >
                {usedFallback ? "SAMPLE" : "AI"}
              </span>
              <button
                onClick={handleSaveAll}
                style={{
                  float: "right",
                  padding: "0.5rem 1rem",
                  background:
                    "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save All
              </button>
            </div>
            {generatedQuestions.map((q, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={getBadgeStyle(q.isFallback)}>
                    {q.isFallback ? "SAMPLE" : "AI-GENERATED"}
                  </span>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      padding: "0.5rem 1rem",
                      background:
                        "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </div>
                {editingIndex === index ? (
                  <QuestionForm
                    question={q}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingIndex(null)}
                  />
                ) : (
                  <>
                    <h3 style={{ color: "#1F2937", marginBottom: "0.5rem" }}>
                      {q.question}
                    </h3>
                    <p>
                      <strong>Type:</strong> {q.type} |{" "}
                      <strong>Difficulty:</strong> {q.difficulty}
                    </p>
                    {q.options && q.options.length > 0 && (
                      <p>
                        <strong>Options:</strong> {q.options.join(", ")}
                      </p>
                    )}
                    <p>
                      <strong>Correct:</strong> {q.correctAnswer}
                    </p>
                    <p>
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenerator;
