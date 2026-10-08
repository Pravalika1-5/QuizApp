import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : {};
        const token = localStorage.getItem("token");

        let endpoint = "/api/quizzes/public";
        if (user.role === "admin") {
          endpoint = "/api/quizzes";
        }

        const config =
          user.role === "admin"
            ? {
                headers: { Authorization: `Bearer ${token}` },
              }
            : {};

        const res = await axios.get(endpoint, config);
        setQuizzes(res.data);
      } catch (err) {
        setError("Failed to load quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div
      style={{ minHeight: "100vh", background: "#FAFAF9", color: "#1F2937" }}
    >
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          padding: "80px 2rem 2rem 2rem",
          maxWidth: "1280px",
          margin: "0 auto",
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
          Available Quizzes
        </h1>
        {error && (
          <p
            style={{ color: "#EF4444", fontSize: "16px", marginBottom: "1rem" }}
          >
            {error}
          </p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.12)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.08)")
              }
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#1F2937",
                }}
              >
                {quiz.title}
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  marginBottom: "1rem",
                  fontSize: "14px",
                }}
              >
                {quiz.description}
              </p>
              <Link to={`/quiz/${quiz._id}`} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    width: "100%",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
                  }}
                  onMouseOver={(e) => (
                    (e.target.style.transform = "scale(1.02)"),
                    (e.target.style.boxShadow =
                      "0 8px 20px rgba(124, 58, 237, 0.3)")
                  )}
                  onMouseOut={(e) => (
                    (e.target.style.transform = "scale(1)"),
                    (e.target.style.boxShadow =
                      "0 4px 12px rgba(124, 58, 237, 0.2)")
                  )}
                >
                  Start Quiz
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
