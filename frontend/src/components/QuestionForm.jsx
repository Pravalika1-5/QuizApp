import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: question?.type || "mcq",
    questionText: question?.questionText || "",
    options: question?.options || ["", "", "", ""],
    correctAnswer: question?.correctAnswer || "",
    difficulty: question?.difficulty || "easy",
    marks: question?.marks || 1,
    explanation: question?.explanation || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "options") {
      const index = e.target.dataset.index;
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions, correctAnswer: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.questionText.trim()) {
      newErrors.questionText = "Question text is required";
    }
    if (
      formData.type === "mcq" &&
      formData.options.some((opt) => !opt.trim())
    ) {
      newErrors.options = "All options are required";
    }
    if (!formData.correctAnswer) {
      newErrors.correctAnswer = "Please select the correct answer";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (question) {
        await axios.put(`/api/questions/${question._id}`, formData, config);
      } else {
        await axios.post("/api/questions", formData, config);
      }
      onSave();
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "2rem",
        marginBottom: "2rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#1F2937",
        }}
      >
        {question ? "Edit Question" : "Add New Question"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Question Type */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Question Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              border: `2px solid ${errors.type ? "#EF4444" : "#E5E7EB"}`,
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="mcq">Multiple Choice (MCQ)</option>
            <option value="true/false">True/False</option>
            <option value="short answer">Short Answer</option>
          </select>
        </div>

        {/* Question Text */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Question Text <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            placeholder="Enter your question here..."
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              border: `2px solid ${errors.questionText ? "#EF4444" : "#E5E7EB"}`,
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              background: "#F9FAFB",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          {errors.questionText && (
            <p
              style={{
                color: "#EF4444",
                fontSize: "12px",
                marginTop: "0.25rem",
              }}
            >
              {errors.questionText}
            </p>
          )}
        </div>

        {/* Options for MCQ */}
        {formData.type === "mcq" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
              }}
            >
              Answer Options <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              {formData.options.map((opt, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#E5E7EB",
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <input
                    type="text"
                    data-index={i}
                    name="options"
                    value={opt}
                    onChange={handleChange}
                    placeholder={`Option ${i + 1}`}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      border: "2px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "14px",
                      outline: "none",
                      background: "#F9FAFB",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer Dropdown */}
            <div style={{ marginTop: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Select Correct Answer{" "}
                <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                disabled={formData.options.some((opt) => !opt.trim())}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: `2px solid ${errors.correctAnswer ? "#EF4444" : "#E5E7EB"}`,
                  borderRadius: "10px",
                  fontSize: "14px",
                  outline: "none",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <option value="">
                  {formData.options.some((opt) => !opt.trim())
                    ? "Fill all options first to select correct answer"
                    : "-- Select the correct answer --"}
                </option>
                {formData.options
                  .filter((opt) => opt.trim())
                  .map((opt, i) => (
                    <option key={i} value={opt}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </option>
                  ))}
              </select>
              {errors.correctAnswer && (
                <p
                  style={{
                    color: "#EF4444",
                    fontSize: "12px",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.correctAnswer}
                </p>
              )}
            </div>
          </div>
        )}

        {/* True/False */}
        {formData.type === "true/false" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.75rem",
              }}
            >
              Correct Answer <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              {["True", "False"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, correctAnswer: option })
                  }
                  style={{
                    flex: 1,
                    padding: "1rem",
                    border: `2px solid ${formData.correctAnswer === option ? "#10B981" : "#E5E7EB"}`,
                    borderRadius: "10px",
                    background:
                      formData.correctAnswer === option
                        ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                        : "white",
                    color:
                      formData.correctAnswer === option ? "white" : "#374151",
                    fontWeight: "600",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.correctAnswer && (
              <p
                style={{
                  color: "#EF4444",
                  fontSize: "12px",
                  marginTop: "0.5rem",
                }}
              >
                {errors.correctAnswer}
              </p>
            )}
          </div>
        )}

        {/* Short Answer */}
        {formData.type === "short answer" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Expected Answer <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Enter the expected answer"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: `2px solid ${errors.correctAnswer ? "#EF4444" : "#E5E7EB"}`,
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                background: "#F9FAFB",
                boxSizing: "border-box",
              }}
            />
            {errors.correctAnswer && (
              <p
                style={{
                  color: "#EF4444",
                  fontSize: "12px",
                  marginTop: "0.25rem",
                }}
              >
                {errors.correctAnswer}
              </p>
            )}
          </div>
        )}

        {/* Difficulty and Marks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "2px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Marks
            </label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min="1"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "2px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                background: "#F9FAFB",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Explanation */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Explanation (Optional)
          </label>
          <textarea
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            placeholder="Add an explanation for the correct answer..."
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              border: "2px solid #E5E7EB",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              background: "#F9FAFB",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.75rem 1.5rem",
              background: "white",
              color: "#6B7280",
              border: "2px solid #E5E7EB",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {question ? "Update Question" : "Save Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
