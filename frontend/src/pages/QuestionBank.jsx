import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import QuestionForm from "../components/QuestionForm";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [adminQuizzes, setAdminQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    fetchQuestions();
    fetchAdminQuizzes();
  }, []);

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

  const fetchAdminQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/quizzes", config);
      setAdminQuizzes(response.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const addToQuiz = async (questionId) => {
    if (!selectedQuiz) {
      alert("Please select a quiz first");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `/api/quizzes/${selectedQuiz}`,
        { addQuestion: questionId },
        config,
      );
      alert("Question added to quiz!");
      setSelectedQuiz("");
    } catch (err) {
      alert(
        "Failed to add question: " +
          (err.response?.data?.message || err.message),
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this question?")) {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/questions/${id}`, config);
        fetchQuestions();
      } catch (err) {
        console.error("Error deleting question:", err);
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingQuestion(null);
    fetchQuestions();
  };

  const toggleExpand = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return { bg: "#D1FAE5", text: "#065F46", label: "Easy" };
      case "medium":
        return { bg: "#FEF3C7", text: "#92400E", label: "Medium" };
      case "hard":
        return { bg: "#FEE2E2", text: "#991B1B", label: "Hard" };
      default:
        return { bg: "#E5E7EB", text: "#374151", label: difficulty };
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "multiple choice":
        return { bg: "#DBEAFE", text: "#1E40AF", label: "Multiple Choice" };
      case "true/false":
        return { bg: "#E0E7FF", text: "#3730A3", label: "True/False" };
      case "short answer":
        return { bg: "#FCE7F3", text: "#9D174D", label: "Short Answer" };
      default:
        return { bg: "#E5E7EB", text: "#374151", label: type };
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.questionText
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "all" ||
      q.difficulty?.toLowerCase() === filterDifficulty;
    const matchesType =
      filterType === "all" ||
      q.type?.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesDifficulty && matchesType;
  });

  // Get unique types for filter
  const uniqueTypes = [
    ...new Set(questions.map((q) => q.type).filter(Boolean)),
  ];

  return (
    <div>
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          padding: "80px 2rem 2rem 2rem",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#1F2937",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                Question Bank
              </h1>
              <p style={{ color: "#6B7280", marginTop: "0.5rem" }}>
                Manage and organize your quiz questions
              </p>
            </div>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseOver={(e) => (
                (e.target.style.transform = "translateY(-2px)"),
                (e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.5)")
              )}
              onMouseOut={(e) => (
                (e.target.style.transform = "translateY(0)"),
                (e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)")
              )}
              onClick={() => setShowForm(true)}
            >
              <span style={{ fontSize: "18px" }}>+</span> Add Question
            </button>
          </div>

          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                padding: "1.25rem",
                color: "white",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {questions.length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Total Questions
              </div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                borderRadius: "12px",
                padding: "1.25rem",
                color: "white",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {
                  questions.filter(
                    (q) => q.difficulty?.toLowerCase() === "easy",
                  ).length
                }
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Easy</div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                borderRadius: "12px",
                padding: "1.25rem",
                color: "white",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {
                  questions.filter(
                    (q) => q.difficulty?.toLowerCase() === "medium",
                  ).length
                }
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Medium</div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                borderRadius: "12px",
                padding: "1.25rem",
                color: "white",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {
                  questions.filter(
                    (q) => q.difficulty?.toLowerCase() === "hard",
                  ).length
                }
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Hard</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "2px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                border: "2px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
                background: "white",
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                border: "2px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
                background: "white",
              }}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Forms */}
        {showForm && (
          <QuestionForm
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        )}
        {editingQuestion && (
          <QuestionForm
            question={editingQuestion}
            onSave={handleSave}
            onCancel={() => setEditingQuestion(null)}
          />
        )}

        {/* Questions List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredQuestions.length === 0 ? (
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "3rem",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📝</div>
              <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>
                No questions found
              </h3>
              <p style={{ color: "#6B7280" }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const diffColors = getDifficultyColor(q.difficulty);
              const typeColors = getTypeColor(q.type);
              const isExpanded = expandedQuestion === q._id;

              return (
                <div
                  key={q._id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    transition: "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      padding: "1.5rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                    onClick={() => toggleExpand(q._id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "0.75rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            background: diffColors.bg,
                            color: diffColors.text,
                          }}
                        >
                          {diffColors.label}
                        </span>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            background: typeColors.bg,
                            color: typeColors.text,
                          }}
                        >
                          {typeColors.label}
                        </span>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            background: "#F3F4F6",
                            color: "#374151",
                          }}
                        >
                          {q.marks} marks
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1F2937",
                          margin: 0,
                          lineHeight: "1.5",
                        }}
                      >
                        {q.questionText}
                      </h3>
                      {q.category && (
                        <p
                          style={{
                            color: "#6B7280",
                            fontSize: "14px",
                            marginTop: "0.5rem",
                          }}
                        >
                          Category: {q.category}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "#6B7280",
                          fontSize: "14px",
                          transition: "transform 0.3s",
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: "0 1.5rem 1.5rem 1.5rem",
                        borderTop: "1px solid #E5E7EB",
                      }}
                    >
                      {/* Answer Options */}
                      {q.options && q.options.length > 0 && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <h4
                            style={{
                              color: "#374151",
                              fontSize: "14px",
                              fontWeight: "600",
                              marginBottom: "0.75rem",
                            }}
                          >
                            Answer Options:
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.5rem",
                            }}
                          >
                            {q.options.map((option, idx) => (
                              <div
                                key={idx}
                                style={{
                                  padding: "0.75rem 1rem",
                                  borderRadius: "8px",
                                  background:
                                    q.correctAnswer === option ||
                                    q.correctAnswer === idx
                                      ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                      : "#F9FAFB",
                                  color:
                                    q.correctAnswer === option ||
                                    q.correctAnswer === idx
                                      ? "white"
                                      : "#374151",
                                  fontWeight:
                                    q.correctAnswer === option ||
                                    q.correctAnswer === idx
                                      ? "600"
                                      : "400",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.75rem",
                                }}
                              >
                                <span
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    background:
                                      q.correctAnswer === option ||
                                      q.correctAnswer === idx
                                        ? "rgba(255,255,255,0.3)"
                                        : "#E5E7EB",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                {option}
                                {q.correctAnswer === option ||
                                  (q.correctAnswer === idx && (
                                    <span
                                      style={{
                                        marginLeft: "auto",
                                        fontSize: "12px",
                                      }}
                                    >
                                      ✓ Correct
                                    </span>
                                  ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Short Answer */}
                      {q.type?.toLowerCase() === "short answer" &&
                        q.correctAnswer && (
                          <div style={{ marginTop: "1.5rem" }}>
                            <h4
                              style={{
                                color: "#374151",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "0.75rem",
                              }}
                            >
                              Expected Answer:
                            </h4>
                            <div
                              style={{
                                padding: "1rem",
                                borderRadius: "8px",
                                background:
                                  "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                                color: "white",
                              }}
                            >
                              {q.correctAnswer}
                            </div>
                          </div>
                        )}

                      {/* Add to Quiz + Action Buttons */}
                      <div
                        style={{
                          marginTop: "1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                            alignItems: "center",
                          }}
                        >
                          <select
                            value={selectedQuiz}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                            style={{
                              padding: "0.5rem",
                              borderRadius: "6px",
                              border: "1px solid #D1D5DB",
                              flex: 1,
                            }}
                          >
                            <option value="">Select Quiz...</option>
                            {adminQuizzes.map((quiz) => (
                              <option key={quiz._id} value={quiz._id}>
                                {quiz.title} ({quiz.questions.length} questions)
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => addToQuiz(q._id)}
                            disabled={!selectedQuiz}
                            style={{
                              padding: "0.5rem 1rem",
                              background: selectedQuiz
                                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                : "#9CA3AF",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: selectedQuiz ? "pointer" : "not-allowed",
                              fontWeight: "500",
                            }}
                          >
                            ➕ Add to Quiz
                          </button>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingQuestion(q);
                            }}
                            style={{
                              padding: "0.625rem 1.25rem",
                              background:
                                "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "500",
                              boxShadow: "0 2px 10px rgba(236, 72, 153, 0.3)",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) => (
                              (e.target.style.transform = "translateY(-2px)"),
                              (e.target.style.boxShadow =
                                "0 4px 15px rgba(236, 72, 153, 0.4)")
                            )}
                            onMouseOut={(e) => (
                              (e.target.style.transform = "translateY(0)"),
                              (e.target.style.boxShadow =
                                "0 2px 10px rgba(236, 72, 153, 0.3)")
                            )}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(q._id);
                            }}
                            style={{
                              padding: "0.625rem 1.25rem",
                              background: "white",
                              color: "#EF4444",
                              border: "2px solid #EF4444",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "500",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) => (
                              (e.target.style.background = "#EF4444"),
                              (e.target.style.color = "white")
                            )}
                            onMouseOut={(e) => (
                              (e.target.style.background = "white"),
                              (e.target.style.color = "#EF4444")
                            )}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
