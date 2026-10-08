import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import DashboardCard from "../components/DashboardCard";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    registeredUsers: 0,
    quizAttempts: 0,
    averageScore: 0,
  });

  useEffect(() => {
  
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("/api/admin/analytics", config);
        setStats({
          totalQuestions: response.data.totalQuizzes,
          registeredUsers: response.data.totalStudents,
          quizAttempts: response.data.totalAttempts,
          averageScore: response.data.averageScore,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const cardGradients = [
    "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)", // Purple to Blue
    "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)", // Pink to Purple
    "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)", // Teal to Green
    "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)", // Cyan to Blue
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#FAFAF9",
      }}
    >
      <NavBar />
      <div
        style={{
          flex: 1,
          width: "100%",
          background: "#FAFAF9",
          boxSizing: "border-box",
          padding: "2rem",
          marginTop: "64px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <h1
          style={{
            color: "#1F2937",
            margin: "0 0 2rem 0",
          }}
        >
          Admin Dashboard
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
            width: "100%",
          }}
        >
          <DashboardCard
            title="Total Questions"
            value={stats.totalQuestions}
            gradient={cardGradients[0]}
          />
          <DashboardCard
            title="Registered Users"
            value={stats.registeredUsers}
            gradient={cardGradients[1]}
          />
          <DashboardCard
            title="Quiz Attempts"
            value={stats.quizAttempts}
            gradient={cardGradients[2]}
          />
          <DashboardCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            gradient={cardGradients[3]}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Link to="/questions" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
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
              Add Question
            </button>
          </Link>
          <Link to="/ai-generator" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                width: "100%",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(236, 72, 153, 0.2)",
              }}
              onMouseOver={(e) => (
                (e.target.style.transform = "scale(1.02)"),
                (e.target.style.boxShadow =
                  "0 8px 20px rgba(236, 72, 153, 0.3)")
              )}
              onMouseOut={(e) => (
                (e.target.style.transform = "scale(1)"),
                (e.target.style.boxShadow =
                  "0 4px 12px rgba(236, 72, 153, 0.2)")
              )}
            >
              AI Generator
            </button>
          </Link>
          <button
            style={{
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.2s",
              boxShadow: "0 4px 12px rgba(6, 182, 212, 0.2)",
            }}
            onMouseOver={(e) => (
              (e.target.style.transform = "scale(1.02)"),
              (e.target.style.boxShadow = "0 8px 20px rgba(6, 182, 212, 0.3)")
            )}
            onMouseOut={(e) => (
              (e.target.style.transform = "scale(1)"),
              (e.target.style.boxShadow = "0 4px 12px rgba(6, 182, 212, 0.2)")
            )}
          >
            View Reports
          </button>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                width: "100%",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(20, 184, 166, 0.2)",
              }}
              onMouseOver={(e) => (
                (e.target.style.transform = "scale(1.02)"),
                (e.target.style.boxShadow =
                  "0 8px 20px rgba(20, 184, 166, 0.3)")
              )}
              onMouseOut={(e) => (
                (e.target.style.transform = "scale(1)"),
                (e.target.style.boxShadow =
                  "0 4px 12px rgba(20, 184, 166, 0.2)")
              )}
            >
              Manage Users
            </button>
          </Link>
          <Link to="/quizzes" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
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
              Quiz Templates
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
