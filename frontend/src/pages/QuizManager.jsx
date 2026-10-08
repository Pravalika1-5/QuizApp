import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const QuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
    timer: 30,
    scheduledAt: "",
    shuffleQuestions: false,
    shuffleAnswers: false,
    showResults: false,
  });

  const [aiForm, setAiForm] = useState({
    topic: "",
    numQuestions: 5,
    difficulty: "easy",
    type: "mcq",
  });
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  const handleGenerateAI = async () => {
    setIsAIGenerating(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        ...aiForm,
        topic: aiForm.topic.trim(),
        numQuestions: Number(aiForm.numQuestions) || 5,
        type: aiForm.type || "mcq",
      };
      const response = await axios.post("/api/ai/generate", payload, config);
      const generatedQuestions = response.data.questions || [];

      const savedQuestions = [];
      for (const question of generatedQuestions) {
        const saved = await axios.post(
          "/api/questions",
          {
            type: question.type || payload.type,
            questionText: question.question,
            options: question.options || [],
            correctAnswer: question.correctAnswer,
            difficulty: question.difficulty || payload.difficulty,
            marks: 1,
            explanation: question.explanation || "",
            aiGenerated: true,
          },
          config,
        );
        savedQuestions.push(saved.data);
      }

      setQuestions((prev) => [...savedQuestions, ...prev]);
      setFormData((prev) => ({
        ...prev,
        questions: savedQuestions.map((q) => q._id),
      }));
      setAiForm({ topic: "", numQuestions: 5, difficulty: "easy", type: "mcq" });
      alert(`${savedQuestions.length} AI questions generated and selected!`);
    } catch (err) {
      alert(
        "AI generation failed: " + (err.response?.data?.message || err.message),
      );
      console.error(err);
    } finally {
      setIsAIGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/quizzes", config);
      setQuizzes(response.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/questions", config);
      setQuestions(response.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "questions") {
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value,
      );
      setFormData({ ...formData, questions: selected });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleAiChange = (e) => {
    const { name, value } = e.target;
    setAiForm((prev) => ({
      ...prev,
      [name]: name === "numQuestions" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post("/api/quizzes", formData, config);
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        questions: [],
        timer: 30,
        scheduledAt: "",
        shuffleQuestions: false,
        shuffleAnswers: false,
        showResults: false,
      });
      fetchQuizzes();
    } catch (err) {
      console.error("Error creating quiz:", err);
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  const handleDelete = async (quizId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/quizzes/${quizId}`, config);
        fetchQuizzes();
        alert("Quiz deleted successfully!");
      } catch (err) {
        console.error("Error deleting quiz:", err);
        alert("Failed to delete quiz. Please try again.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          padding: "80px 2rem 2rem 2rem",
          minHeight: "100vh",
          background: "#FAFAF9",
          color: "#1F2937",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#1F2937",
          }}
        >
          Quiz Link Manager
        </h1>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "2rem",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (
            (e.target.style.transform = "scale(1.02)"),
            (e.target.style.boxShadow = "0 8px 20px rgba(124, 58, 237, 0.3)")
          )}
          onMouseOut={(e) => (
            (e.target.style.transform = "scale(1)"),
            (e.target.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.2)")
          )}
          onClick={() => setShowForm(true)}
        >
          Create New Quiz
        </button>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "600px",
              margin: "2rem 0",
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#1F2937", fontWeight: "600" }}>
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "#F9FAFB",
                  border: "2px solid #E5E7EB",
                  borderRadius: "6px",
                  color: "#1F2937",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#1F2937", fontWeight: "600" }}>
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "#F9FAFB",
                  border: "2px solid #E5E7EB",
                  borderRadius: "6px",
                  color: "#1F2937",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#1F2937", fontWeight: "600" }}>
                Questions:
              </label>
              <select
                name="questions"
                multiple
                value={formData.questions}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "#F9FAFB",
                  border: "2px solid #E5E7EB",
                  borderRadius: "6px",
                  color: "#1F2937",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              >
                {questions.map((q) => (
                  <option key={q._id} value={q._id}>
                    {q.questionText}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                background: "#F0F9FF",
                borderRadius: "8px",
                borderLeft: "4px solid #3B82F6",
              }}
            >
              <label
                style={{
                  color: "#1F2937",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Or Generate AI Questions:
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  alignItems: "end",
                }}
              >
                <div style={{ flex: "1", minWidth: "150px" }}>
                  <label
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Topic:
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={aiForm.topic}
                    onChange={handleAiChange}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: "0.25rem",
                      background: "#F9FAFB",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div style={{ flex: "0 0 auto", minWidth: "80px" }}>
                  <label
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Num:
                  </label>
                  <input
                    type="number"
                    name="numQuestions"
                    value={aiForm.numQuestions}
                    onChange={handleAiChange}
                    min="1"
                    max="20"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: "0.25rem",
                      background: "#F9FAFB",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div style={{ flex: "1", minWidth: "120px" }}>
                  <label
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Difficulty:
                  </label>
                  <select
                    name="difficulty"
                    value={aiForm.difficulty}
                    onChange={handleAiChange}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: "0.25rem",
                      background: "#F9FAFB",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div style={{ flex: "1", minWidth: "120px" }}>
                  <label
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Type:
                  </label>
                  <select
                    name="type"
                    value={aiForm.type}
                    onChange={handleAiChange}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginTop: "0.25rem",
                      background: "#F9FAFB",
                      border: "1px solid #D1D5DB",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="mcq">MCQ</option>
                    <option value="short answer">Short Answer</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isAIGenerating || !aiForm.topic.trim()}
                  style={{
                    padding: "0.5rem 1rem",
                    background:
                      "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: aiForm.topic ? "pointer" : "not-allowed",
                    fontWeight: "500",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isAIGenerating ? "Generating..." : "Generate AI"}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#1F2937", fontWeight: "600" }}>
                Time Limit (minutes):
              </label>
              <input
                type="number"
                name="timer"
                value={formData.timer}
                onChange={handleChange}
                min="1"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "#F9FAFB",
                  border: "2px solid #E5E7EB",
                  borderRadius: "6px",
                  color: "#1F2937",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "1rem",
                fontWeight: "600",
                boxShadow: "0 2px 8px rgba(20, 184, 166, 0.2)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (
                (e.target.style.transform = "translateY(-2px)"),
                (e.target.style.boxShadow =
                  "0 4px 12px rgba(20, 184, 166, 0.3)")
              )}
              onMouseOut={(e) => (
                (e.target.style.transform = "translateY(0)"),
                (e.target.style.boxShadow = "0 2px 8px rgba(20, 184, 166, 0.2)")
              )}
            >
              Create Quiz
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#D1D5DB",
                color: "#1F2937",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#BFDBFE")}
              onMouseOut={(e) => (e.target.style.background = "#D1D5DB")}
            >
              Cancel
            </button>
          </form>
        )}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "2rem",
            color: "#1F2937",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid #E5E7EB",
                background: "#F9FAFB",
              }}
            >
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Questions
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Timer
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Link
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr
                key={quiz._id}
                style={{
                  borderBottom: "1px solid #E5E7EB",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#F9FAFB")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              >
                <td style={{ padding: "1rem", color: "#1F2937" }}>
                  {quiz.title}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {quiz.questions.length}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {quiz.timer} min
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    onClick={() => copyLink(quiz.link)}
                    style={{
                      padding: "0.5rem 1rem",
                      background:
                        "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      boxShadow: "0 2px 8px rgba(6, 182, 212, 0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => (
                      (e.target.style.transform = "translateY(-2px)"),
                      (e.target.style.boxShadow =
                        "0 4px 12px rgba(6, 182, 212, 0.3)")
                    )}
                    onMouseOut={(e) => (
                      (e.target.style.transform = "translateY(0)"),
                      (e.target.style.boxShadow =
                        "0 2px 8px rgba(6, 182, 212, 0.2)")
                    )}
                  >
                    Copy Link
                  </button>
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/results/${quiz._id}`)
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      background:
                        "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      boxShadow: "0 2px 8px rgba(236, 72, 153, 0.2)",
                      transition: "all 0.2s",
                      marginRight: "0.5rem",
                    }}
                    onMouseOver={(e) => (
                      (e.target.style.transform = "translateY(-2px)"),
                      (e.target.style.boxShadow =
                        "0 4px 12px rgba(236, 72, 153, 0.3)")
                    )}
                    onMouseOut={(e) => (
                      (e.target.style.transform = "translateY(0)"),
                      (e.target.style.boxShadow =
                        "0 2px 8px rgba(236, 72, 153, 0.2)")
                    )}
                  >
                    View Results
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background:
                        "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => (
                      (e.target.style.transform = "translateY(-2px)"),
                      (e.target.style.boxShadow =
                        "0 4px 12px rgba(239, 68, 68, 0.3)")
                    )}
                    onMouseOut={(e) => (
                      (e.target.style.transform = "translateY(0)"),
                      (e.target.style.boxShadow =
                        "0 2px 8px rgba(239, 68, 68, 0.2)")
                    )}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizManager;
