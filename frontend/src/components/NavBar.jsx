import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail") || "admin@example.com";
  const userRole =
    JSON.parse(localStorage.getItem("user") || "{}")?.role || "student";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/quizzes", label: "Quizzes", icon: "📝" },
    { path: "/questions", label: "Questions", icon: "❓" },
    { path: "/users", label: "Users", icon: "👥" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 2rem",
        background: "#FFFFFF",
        color: "#1F2937",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        to={userRole === "admin" ? "/dashboard" : "/quiz-list"}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            cursor: "pointer",
          }}
        >
          📚 QuizApp
        </div>
      </Link>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {userRole === "admin" &&
          navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "0.625rem 1.25rem",
                  background: isActive(item.path)
                    ? "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)"
                    : "white",
                  color: isActive(item.path) ? "white" : "#6B7280",
                  border: isActive(item.path) ? "none" : "2px solid #E5E7EB",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.2s",
                  boxShadow: isActive(item.path)
                    ? "0 4px 15px rgba(124, 58, 237, 0.3)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.borderColor = "#7C3AED";
                    e.target.style.color = "#7C3AED";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.borderColor = "#E5E7EB";
                    e.target.style.color = "#6B7280";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        {userRole === "student" && (
          <Link to="/quiz-list" style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "0.625rem 1.25rem",
                background:
                  location.pathname === "/quiz-list"
                    ? "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)"
                    : "white",
                color: location.pathname === "/quiz-list" ? "white" : "#6B7280",
                border:
                  location.pathname === "/quiz-list"
                    ? "none"
                    : "2px solid #E5E7EB",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
                boxShadow:
                  location.pathname === "/quiz-list"
                    ? "0 4px 15px rgba(124, 58, 237, 0.3)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "16px" }}>📋</span>
              Available Quizzes
            </div>
          </Link>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            cursor: "pointer",
            color: "#6B7280",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            transition: "all 0.2s",
            userSelect: "none",
            border: "2px solid #E5E7EB",
            background: "white",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => (
            (e.currentTarget.style.borderColor = "#7C3AED"),
            (e.currentTarget.style.color = "#7C3AED")
          )}
          onMouseLeave={(e) => (
            (e.currentTarget.style.borderColor = "#E5E7EB"),
            (e.currentTarget.style.color = "#6B7280")
          )}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>👤</span>
          Profile ▼
        </div>
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.5rem",
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              minWidth: "250px",
              zIndex: 1001,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem",
                borderBottom: "1px solid #E5E7EB",
                background: "linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginBottom: "0.25rem",
                  fontWeight: "500",
                }}
              >
                Logged in as
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1F2937",
                  wordBreak: "break-word",
                }}
              >
                {userEmail}
              </div>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setShowDropdown(false);
              }}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "none",
                background: "white",
                color: "#EF4444",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.2s",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#FEE2E2")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
