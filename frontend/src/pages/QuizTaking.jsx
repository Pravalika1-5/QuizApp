import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizTaking = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [violations, setViolations] = useState(0);
  const [warning, setWarning] = useState("");
  const [results, setResults] = useState(null);

  // Refs to avoid stale closures and prevent double-submit
  const intervalRef = useRef(null);
  const isSubmittedRef = useRef(false);
  const violationsRef = useRef(0);

  useEffect(() => {
    fetchQuiz();
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      alert("Back button disabled during quiz.");
    };
    const savedAnswers = localStorage.getItem(`quiz_${id}_answers`);
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.onpopstate = null;
    };
  }, []);

  // Set initial time when quiz+session load, then start ONE interval
  useEffect(() => {
    if (!quiz || !session) return;

    const totalTime = quiz.timer * 60;
    const elapsed = Math.floor(
      (Date.now() - new Date(session.startedAt).getTime()) / 1000
    );
    const remaining = Math.max(totalTime - elapsed, 0);
    setTimeLeft(remaining);

    if (remaining <= 0) {
      handleSubmitQuiz();
      return;
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleSubmitQuiz();
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem(`quiz_${id}_time`, next);
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [quiz, session]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) logViolation("tabSwitch", "Switched away from tab");
    };
    const handleBlur = () => logViolation("blur", "Window lost focus");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`/api/quiz/${id}`, config);
      setQuiz(response.data.quiz);
      setSession(response.data.session);
      if (response.data.session) {
        setAnswers(
          Object.fromEntries(
            response.data.session.answers.map((a) => [
              a.questionId,
              a.selectedAnswer,
            ]),
          ),
        );
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
    }
  };

  const startQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(`/api/quiz/${id}/start`, {}, config);
      setSession(response.data);
    } catch (err) {
      console.error("Error starting quiz:", err);
    }
  };

  const saveAnswer = async (questionId, selectedAnswer) => {
    const newAnswers = { ...answers, [questionId]: selectedAnswer };
    setAnswers(newAnswers);
    localStorage.setItem(`quiz_${id}_answers`, JSON.stringify(newAnswers));
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(
        `/api/quiz/${id}/answer`,
        { questionId, selectedAnswer, timeSpent: 0 },
        config,
      );
    } catch (err) {
      console.error("Error saving answer:", err);
      // Retry logic
      setTimeout(() => saveAnswer(questionId, selectedAnswer), 5000);
    }
  };

  // useCallback so the function reference is stable for use in interval
  const handleSubmitQuiz = useCallback(async () => {
    // Guard against double-submit (timer + manual click)
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;

    if (intervalRef.current) clearInterval(intervalRef.current);
    // Clean up persisted quiz state
    localStorage.removeItem(`quiz_${id}_answers`);
    localStorage.removeItem(`quiz_${id}_time`);

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/quiz/${id}/submit`, {}, config);
      const resultsResponse = await axios.get(`/api/quiz/${id}/results`, config);
      setResults(resultsResponse.data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      isSubmittedRef.current = false; // Allow retry on network error
    }
  }, [id]);

  const logViolation = async (type, details) => {
    // Use ref to get current count without stale closure
    violationsRef.current += 1;
    const newCount = violationsRef.current;
    setViolations(newCount);
    setWarning(
      `Warning ${newCount}/3: ${
        type === "tabSwitch" ? "Tab switching detected!" : "Window focus lost!"
      }`
    );
    setTimeout(() => setWarning(""), 5000);

    if (newCount >= 3) {
      alert("Too many violations! Quiz will be submitted automatically.");
      handleSubmitQuiz();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/quiz/${id}/violation`, { type, details }, config);
    } catch (err) {
      console.error("Error logging violation:", err);
    }
  };

  if (!quiz)
    return (
      <div
        style={{
          padding: "2rem",
          background: "#FAFAF9",
          minHeight: "100vh",
          color: "#1F2937",
        }}
      >
        Loading...
      </div>
    );
  if (isSubmitted && results) {
    return (
      <div
        style={{
          background: "#FAFAF9",
          minHeight: "100vh",
          padding: "2rem",
          color: "#1F2937",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: "#1F2937",
            }}
          >
            Quiz Results
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "0.5rem",
                }}
              >
                Score
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {results.score || 0}%
              </div>
            </div>
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "0.5rem",
                }}
              >
                Violations
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: results.violations.length > 0 ? "#EF4444" : "#10B981",
                }}
              >
                {results.violations.length}
              </div>
            </div>
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1F2937",
            }}
          >
            Review
          </h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {results.answers &&
              results.answers.map((answer, index) => {
                const question =
                  results.quizId &&
                  results.quizId.questions.find(
                    (q) => q._id === answer.questionId,
                  );
                return (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      borderLeft: `4px solid ${answer.isCorrect ? "#10B981" : "#EF4444"}`,
                    }}
                  >
                    <div style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#6B7280",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Question {index + 1}
                      </div>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1F2937",
                          margin: "0 0 1rem 0",
                        }}
                      >
                        {question?.questionText}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "0.75rem",
                        fontSize: "14px",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: "600", color: "#6B7280" }}>
                          Your Answer:
                        </span>{" "}
                        <span
                          style={{
                            color: answer.isCorrect ? "#10B981" : "#EF4444",
                            fontWeight: "600",
                          }}
                        >
                          {answer.selectedAnswer || "Not answered"}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: "600", color: "#6B7280" }}>
                          Correct Answer:
                        </span>{" "}
                        <span style={{ color: "#10B981", fontWeight: "600" }}>
                          {question?.correctAnswer}
                        </span>
                      </div>
                      {question?.explanation && (
                        <div>
                          <span style={{ fontWeight: "600", color: "#6B7280" }}>
                            Explanation:
                          </span>{" "}
                          <span style={{ color: "#6B7280" }}>
                            {question.explanation}
                          </span>
                        </div>
                      )}
                      <div>
                        <span style={{ fontWeight: "600", color: "#6B7280" }}>
                          Time Taken:
                        </span>{" "}
                        <span style={{ color: "#1F2937" }}>
                          {answer.timeSpent || 0}s
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div
      style={{
        background: "#FAFAF9",
        minHeight: "100vh",
        padding: "2rem",
        color: "#1F2937",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1F2937",
            }}
          >
            {quiz.title}
          </h1>
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
                background: "white",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginBottom: "0.5rem",
                }}
              >
                Time Left
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: timeLeft <= 60 ? "#EF4444" : "#7C3AED",
                }}
              >
                {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </div>
            </div>
            <div
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginBottom: "0.5rem",
                }}
              >
                Progress
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#3B82F6",
                }}
              >
                {currentQuestion + 1} of {quiz.questions.length}
              </div>
              <div
                style={{
                  background: "#E5E7EB",
                  height: "6px",
                  borderRadius: "3px",
                  marginTop: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
                    height: "100%",
                    width: `${progress}%`,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginBottom: "0.5rem",
                }}
              >
                Violations
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: violations > 1 ? "#EF4444" : "#10B981",
                }}
              >
                {violations}/3
              </div>
            </div>
          </div>
        </div>

        {warning && (
          <div
            style={{
              background: "#FEE2E2",
              border: "2px solid #EF4444",
              color: "#EF4444",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ⚠️ {warning}
          </div>
        )}

        {!session ? (
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#6B7280",
                marginBottom: "1.5rem",
                fontSize: "16px",
              }}
            >
              Ready to start the quiz? Click below to begin.
            </p>
            <button
              onClick={startQuiz}
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
                transition: "all 0.2s",
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
          </div>
        ) : (
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "1.5rem",
                color: "#1F2937",
              }}
            >
              Question {currentQuestion + 1}: {question.questionText}
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              {question.type === "mcq" && (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {question.options &&
                    question.options.map((opt, i) => {
                      const optionLabel = String.fromCharCode(65 + i);
                      const isSelected = answers[question._id] === optionLabel;
                      return (
                        <label
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "1rem",
                            background: isSelected ? "#F0F4FF" : "#F9FAFB",
                            border: `2px solid ${isSelected ? "#7C3AED" : "#E5E7EB"}`,
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            !isSelected &&
                            (e.currentTarget.style.borderColor = "#D1D5DB")
                          }
                          onMouseLeave={(e) =>
                            !isSelected &&
                            (e.currentTarget.style.borderColor = "#E5E7EB")
                          }
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={optionLabel}
                            checked={isSelected}
                            onChange={(e) =>
                              saveAnswer(question._id, e.target.value)
                            }
                            style={{
                              marginRight: "1rem",
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          <span style={{ fontSize: "14px" }}>
                            <strong
                              style={{
                                color: "#7C3AED",
                                marginRight: "0.5rem",
                              }}
                            >
                              {optionLabel}.
                            </strong>
                            {opt}
                          </span>
                        </label>
                      );
                    })}
                </div>
              )}
              {question.type === "single" && (
                <input
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) => saveAnswer(question._id, e.target.value)}
                  placeholder="Type your answer here..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    border: "2px solid #E5E7EB",
                    borderRadius: "8px",
                    color: "#1F2937",
                    boxSizing: "border-box",
                  }}
                />
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                style={{
                  padding: "12px",
                  background: currentQuestion === 0 ? "#E5E7EB" : "white",
                  color: currentQuestion === 0 ? "#9CA3AF" : "#1F2937",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
              >
                ← Previous
              </button>

              <button
                onClick={handleSubmitQuiz}
                style={{
                  padding: "12px",
                  background:
                    "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                }}
                onMouseOver={(e) => (
                  (e.target.style.transform = "scale(1.02)"),
                  (e.target.style.boxShadow =
                    "0 4px 12px rgba(239, 68, 68, 0.3)")
                )}
                onMouseOut={(e) => (
                  (e.target.style.transform = "scale(1)"),
                  (e.target.style.boxShadow =
                    "0 2px 8px rgba(239, 68, 68, 0.2)")
                )}
              >
                Submit Quiz
              </button>

              <button
                disabled={currentQuestion === quiz.questions.length - 1}
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                style={{
                  padding: "12px",
                  background:
                    currentQuestion === quiz.questions.length - 1
                      ? "#E5E7EB"
                      : "white",
                  color:
                    currentQuestion === quiz.questions.length - 1
                      ? "#9CA3AF"
                      : "#1F2937",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  cursor:
                    currentQuestion === quiz.questions.length - 1
                      ? "not-allowed"
                      : "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTaking;
