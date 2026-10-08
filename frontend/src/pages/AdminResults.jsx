import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const AdminResults = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `/api/admin/quizzes/${quizId}/results`,
        config
      );
      setResults(response.data);
      if (response.data.length > 0) {
        setQuizTitle(response.data[0].quizId?.title || "Quiz Results");
      }
    } catch (err) {
      setError("Failed to load results. Please try again.");
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/quizzes/${quizId}/export`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `results-${quizId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      alert("Export failed. Please try again.");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10B981";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          padding: "80px 2rem 2rem 2rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Quiz Results
            </h1>
            {quizTitle && (
              <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                {quizTitle}
              </p>
            )}
          </div>
          <button
            onClick={exportCSV}
            style={{
              padding: "0.75rem 1.5rem",
              background: "var(--gradient-3)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(20, 184, 166, 0.2)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            ⬇ Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        {results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Total Attempts", value: results.length, color: "var(--gradient-1)" },
              {
                label: "Avg Score",
                value: `${Math.round(results.reduce((a, r) => a + (r.score || 0), 0) / results.length)}%`,
                color: "var(--gradient-3)",
              },
              {
                label: "Completed",
                value: results.filter((r) => r.status === "completed").length,
                color: "var(--gradient-4)",
              },
              {
                label: "Violations",
                value: results.filter((r) => r.violations?.length > 0).length,
                color: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: card.color,
                  borderRadius: "12px",
                  padding: "1.25rem",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>{card.value}</div>
                <div style={{ fontSize: "13px", opacity: 0.9, marginTop: "0.25rem" }}>{card.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* States */}
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
            Loading results...
          </div>
        )}
        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}
        {!loading && !error && results.length === 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "3rem",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📊</div>
            <h3 style={{ color: "var(--text-primary)" }}>No results yet</h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Students haven't attempted this quiz yet.
            </p>
          </div>
        )}

        {/* Results Table */}
        {!loading && results.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "2px solid #E5E7EB" }}>
                  {["Student Name", "Email", "Score", "Status", "Completed At", "Violations"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "var(--text-primary)",
                          fontSize: "14px",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr
                    key={result._id}
                    style={{ borderBottom: "1px solid #E5E7EB", transition: "background 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <td style={{ padding: "1rem", fontWeight: "500", color: "var(--text-primary)" }}>
                      {result.studentId?.name || "N/A"}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "14px" }}>
                      {result.studentId?.email || "N/A"}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "16px",
                          color: getScoreColor(result.score || 0),
                        }}
                      >
                        {Math.round(result.score || 0)}%
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background:
                            result.status === "completed"
                              ? "#D1FAE5"
                              : result.status === "violated"
                              ? "#FEE2E2"
                              : "#FEF3C7",
                          color:
                            result.status === "completed"
                              ? "#065F46"
                              : result.status === "violated"
                              ? "#991B1B"
                              : "#92400E",
                        }}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "14px" }}>
                      {result.completedAt
                        ? new Date(result.completedAt).toLocaleString()
                        : "—"}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          fontWeight: "600",
                          color: result.violations?.length > 0 ? "#EF4444" : "#10B981",
                        }}
                      >
                        {result.violations?.length || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResults;
