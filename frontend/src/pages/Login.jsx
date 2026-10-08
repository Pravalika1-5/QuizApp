import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", res.data.user?.id || res.data.user?._id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/quiz-list");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      setSuccess(res.data.message || "Registered Successfully");
      setIsRegister(false);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FAFAF9 0%, #F3F4F6 100%)",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          border: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          📚 QuizApp
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>
            {success}
          </p>
        )}

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "15px",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
              required
            />
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" style={buttonStyle}>
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
            setSuccess("");
          }}
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#3B82F6",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Create Account"}
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "2px solid #E5E7EB",
  borderRadius: "8px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};