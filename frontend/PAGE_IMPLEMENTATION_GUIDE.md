# Detailed Page Implementation Guide

## Page Implementations with Complete Layout Code

---

## 1. LOGIN PAGE

### HTML Structure

```jsx
// pages/Login.jsx
import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [tab, setTab] = useState("admin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: tab,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle successful login
      localStorage.setItem("token", data.token);
      window.location.href = tab === "admin" ? "/dashboard" : "/quiz-list";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card radius="xl" className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">📚 QuizApp</h1>
            <p className="login-subtitle">Welcome Back</p>
          </div>

          {/* Tab Toggle */}
          <div className="login-tabs">
            <button
              className={`login-tab ${tab === "admin" ? "active" : ""}`}
              onClick={() => {
                setTab("admin");
                setError("");
              }}
            >
              Admin Login
            </button>
            <button
              className={`login-tab ${tab === "student" ? "active" : ""}`}
              onClick={() => {
                setTab("student");
                setError("");
              }}
            >
              Student Login
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail size={18} />}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              icon={<Lock size={18} />}
              required
            />

            <Button fullWidth loading={loading} type="submit">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="login-footer">
            <a href="#forgot" className="login-link">
              Forgot password?
            </a>
            <span className="login-separator">•</span>
            <a href="#signup" className="login-link">
              Create account
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

### Styling

```css
/* pages/login.css */

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  padding: var(--space-4);
}

.login-container {
  width: 100%;
  max-width: 400px;
  animation: slideUp 500ms ease-out;
}

.login-card {
  padding: var(--space-10);
  border-radius: 16px;
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.login-title {
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--space-2);
}

.login-subtitle {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.login-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  background: var(--bg-tertiary);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-6);
}

.login-tab {
  padding: var(--space-3);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.login-tab.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.login-error {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: #fee2e2;
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-4);
  border-left: 4px solid var(--color-error);
}

.login-error-icon {
  font-size: 18px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.login-footer {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.login-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

.login-link:hover {
  color: var(--color-primary-600);
  text-decoration: underline;
}

.login-separator {
  margin: 0 var(--space-2);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .login-card {
    padding: var(--space-6);
  }

  .login-title {
    font-size: 24px;
  }

  .login-subtitle {
    font-size: var(--font-size-base);
  }
}
```

---

## 2. ADMIN DASHBOARD PAGE

### HTML Structure

```jsx
// pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import MetricCard from "../components/dashboard/MetricCard";
import QuickActions from "../components/dashboard/QuickActions";
import Card from "../components/common/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Users, Target, Award } from "lucide-react";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalQuestions: 286,
    registeredUsers: 1240,
    quizAttempts: 942,
    averageScore: "78.5%",
  });

  const metrics_data = [
    {
      icon: <BookOpen size={32} />,
      number: metrics.totalQuestions,
      label: "Total Questions",
      trend: { value: "+12%", positive: true },
      gradient: "gradient-1",
    },
    {
      icon: <Users size={32} />,
      number: metrics.registeredUsers,
      label: "Registered Users",
      trend: { value: "+8%", positive: true },
      gradient: "gradient-2",
    },
    {
      icon: <Target size={32} />,
      number: metrics.quizAttempts,
      label: "Quiz Attempts",
      trend: { value: "-3%", positive: false },
      gradient: "gradient-3",
    },
    {
      icon: <Award size={32} />,
      number: metrics.averageScore,
      label: "Average Score",
      trend: { value: "+5%", positive: true },
      gradient: "gradient-4",
    },
  ];

  const chartData = [
    { name: "Mon", attempts: 40 },
    { name: "Tue", attempts: 60 },
    { name: "Wed", attempts: 45 },
    { name: "Thu", attempts: 75 },
    { name: "Fri", attempts: 90 },
    { name: "Sat", attempts: 55 },
    { name: "Sun", attempts: 30 },
  ];

  return (
    <>
      <Navbar />
      <main className="admin-dashboard">
        <div className="page-container">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back! Here's your quiz management overview.</p>
            </div>
            <div className="page-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="metrics-grid">
            {metrics_data.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Charts Section */}
          <div className="charts-section">
            <Card>
              <div className="chart-header">
                <h3>Quiz Attempts This Week</h3>
                <div className="chart-actions">
                  <button className="chart-filter">Last 7 days</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="attempts"
                    fill="#7C3AED"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
```

### Styling

```css
/* pages/dashboard.css */

.admin-dashboard {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  background: var(--bg-primary);
  padding: var(--space-6);
}

.page-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-8);
}

.page-header h1 {
  font-size: 32px;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.page-header p {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
}

.page-date {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  background: white;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.charts-section {
  margin-top: var(--space-8);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.chart-header h3 {
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.chart-filter {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-color);
  background: white;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.chart-filter:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-dashboard {
    padding: var(--space-4);
  }

  .page-header {
    flex-direction: column;
    gap: var(--space-4);
  }

  .page-header h1 {
    font-size: 24px;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
}

@media (max-width: 640px) {
  .admin-dashboard {
    padding: var(--space-3);
    margin-top: 64px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
}
```

---

## 3. AI QUESTION GENERATOR PAGE

### HTML Structure

```jsx
// pages/AIGenerator.jsx
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import Textarea from "../components/common/Textarea";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { Cpu, Zap, Brain, Sparkles } from "lucide-react";

export default function AIGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [quantity, setQuantity] = useState("5");
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          quantity: parseInt(quantity),
        }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");

      const data = await response.json();
      setGeneratedQuestions(data.questions);
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Zap size={16} />, label: "Fast Generation" },
    { icon: <Brain size={16} />, label: "Topic-Aware" },
    { icon: <Sparkles size={16} />, label: "Multiple Difficulties" },
    { icon: <Cpu size={16} />, label: "Preview & Edit" },
  ];

  return (
    <>
      <Navbar />
      <main className="ai-generator">
        {/* Hero Section */}
        <div className="ai-hero">
          <div className="ai-hero-content">
            <div className="ai-hero-icon">
              <Cpu size={64} />
            </div>
            <h1>AI Question Generator</h1>
            <p>Create quality questions instantly powered by AI</p>

            {/* Feature Chips */}
            <div className="ai-features">
              {features.map((feature, idx) => (
                <Badge key={idx} variant="info">
                  <span className="badge-icon">{feature.icon}</span>
                  {feature.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="page-container">
          <Card className="ai-form-card">
            <form onSubmit={handleGenerate} className="ai-form">
              <div className="form-group">
                <label htmlFor="topic">Topic/Concept</label>
                <Textarea
                  id="topic"
                  placeholder="e.g., 'React Hooks and state management'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                />
                <small className="form-helper">
                  Be specific for better quality questions
                </small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty Level</label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="form-select"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Number of Questions</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-select"
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              <Button
                fullWidth
                loading={loading}
                type="submit"
                className="btn-generate"
              >
                {loading ? "Generating..." : "Generate Questions"}
              </Button>
            </form>
          </Card>

          {/* Generated Questions Preview */}
          {generatedQuestions.length > 0 && (
            <div className="ai-results">
              <h2>Generated Questions</h2>
              <div className="questions-list">
                {generatedQuestions.map((q, idx) => (
                  <Card key={idx} className="question-card">
                    <div className="question-header">
                      <span className="question-number">Q{idx + 1}</span>
                      <Badge variant="success">{q.difficulty}</Badge>
                    </div>
                    <p className="question-text">{q.text}</p>
                    <div className="question-options">
                      {q.options.map((opt, oidx) => (
                        <label key={oidx} className="option">
                          <input type="radio" name={`q${idx}`} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
```

### Styling

```css
/* pages/ai-generator.css */

.ai-generator {
  min-height: 100vh;
  background: var(--bg-primary);
}

.ai-hero {
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.ai-hero-content {
  max-width: var(--container-2xl);
  margin: 0 auto;
}

.ai-hero-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  margin: 0 auto var(--space-6);
  animation: pulse 2s ease-in-out infinite;
}

.ai-hero h1 {
  font-size: 40px;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
}

.ai-hero p {
  font-size: 18px;
  opacity: 0.95;
  margin-bottom: var(--space-8);
}

.ai-features {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.badge-icon {
  display: inline-flex;
  margin-right: var(--space-2);
}

.page-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: var(--space-6);
}

.ai-form-card {
  margin-top: -var(--space-8);
  margin-bottom: var(--space-8);
  position: relative;
  z-index: 10;
}

.ai-form {
  padding: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.form-helper {
  display: block;
  margin-top: var(--space-2);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.form-select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  background: white;
  cursor: pointer;
  transition: all var(--transition-base);
}

.form-select:hover {
  border-color: var(--color-primary);
}

.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.btn-generate {
  margin-top: var(--space-4);
}

.ai-results {
  margin-top: var(--space-8);
}

.ai-results h2 {
  font-size: 24px;
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.questions-list {
  display: grid;
  gap: var(--space-4);
}

.question-card {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.question-number {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.question-text {
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.option:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
}

.option input {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .ai-hero {
    padding: var(--space-8) var(--space-4);
  }

  .ai-hero h1 {
    font-size: 28px;
  }

  .ai-features {
    gap: var(--space-2);
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
```

---

## 4. STUDENT MANAGEMENT PAGE

### HTML Structure

```jsx
// pages/StudentManagement.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import DataTable from "../components/common/DataTable";
import MetricCard from "../components/dashboard/MetricCard";
import Card from "../components/common/Card";
import {
  Upload,
  Download,
  Trash2,
  Users,
  CheckCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [uploading, setUploading] = useState(false);

  const summaryMetrics = [
    {
      icon: <Users size={32} />,
      number: "1,240",
      label: "Total Students",
      gradient: "gradient-1",
    },
    {
      icon: <CheckCircle size={32} />,
      number: "892",
      label: "Eligible",
      gradient: "gradient-3",
    },
    {
      icon: <AlertCircle size={32} />,
      number: "348",
      label: "Ineligible",
      gradient: "gradient-2",
    },
    {
      icon: <CheckCircle2 size={32} />,
      number: "756",
      label: "Tests Completed",
      gradient: "gradient-4",
    },
  ];

  const columns = [
    { key: "rollNo", label: "Roll No", width: "120px" },
    { key: "name", label: "Name", width: "180px" },
    { key: "email", label: "Email", width: "200px" },
    { key: "department", label: "Department", width: "150px" },
    { key: "year", label: "Year", width: "100px" },
    {
      key: "eligible",
      label: "Eligibility",
      width: "120px",
      render: (value) => (
        <span className={`badge badge--${value ? "success" : "error"}`}>
          {value ? "✓ Eligible" : "✕ Ineligible"}
        </span>
      ),
    },
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(file);
    }
  };

  const handleFileUpload = async () => {
    if (!fileSelected) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileSelected);

    try {
      const response = await fetch("/api/students/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setStudents(data.students);
      setFileSelected(null);
      // Show success toast
    } catch (error) {
      console.error("Upload error:", error);
      // Show error toast
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`/api/students/${studentId}`, { method: "DELETE" });
        setStudents(students.filter((s) => s.id !== studentId));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/templates/students-template.csv";
    link.download = "students-template.csv";
    link.click();
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm),
  );

  return (
    <>
      <Navbar />
      <main className="student-management">
        <div className="page-container">
          {/* Page Header */}
          <div className="page-header">
            <h1>Student Management</h1>
            <p>Manage your student list and eligibility</p>
          </div>

          {/* Summary Cards */}
          <div className="metrics-grid">
            {summaryMetrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>

          {/* Upload Section */}
          <Card className="upload-section">
            <h3>Upload Student List</h3>
            <div className="upload-container">
              <div className="upload-icon">
                <Upload size={48} />
              </div>
              <p className="upload-text">Drop your CSV or Excel file here</p>
              <p className="upload-subtext">
                Download template to see required format
              </p>
              <div className="upload-actions">
                <Button
                  variant="secondary"
                  icon={<Download size={18} />}
                  onClick={handleDownloadTemplate}
                >
                  Download Template
                </Button>
                <label className="file-input-label">
                  <Button
                    icon={<Upload size={18} />}
                    loading={uploading}
                    disabled={uploading}
                  >
                    Browse File
                  </Button>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                </label>
                {fileSelected && (
                  <Button
                    onClick={handleFileUpload}
                    loading={uploading}
                    disabled={uploading}
                  >
                    Upload File
                  </Button>
                )}
              </div>
              {fileSelected && (
                <p className="file-selected">✓ {fileSelected.name} selected</p>
              )}
            </div>
          </Card>

          {/* Search Bar */}
          <div className="search-section">
            <Input
              placeholder="Search by name, email, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={filteredStudents}
            onDelete={handleDelete}
            actions={true}
          />
        </div>
      </main>
    </>
  );
}
```

### Styling

```css
/* pages/student-management.css */

.student-management {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  background: var(--bg-primary);
  padding: var(--space-6);
}

.upload-section {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  margin: var(--space-6) 0;
}

.upload-section h3 {
  margin-bottom: var(--space-6);
}

.upload-container {
  background: var(--color-primary-50);
  border: 2px dashed var(--color-primary-300);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
  transition: all var(--transition-base);
}

.upload-container:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-100);
}

.upload-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-4);
  color: var(--color-primary);
}

.upload-text {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.upload-subtext {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.upload-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.file-input-label {
  position: relative;
  cursor: pointer;
}

.file-input-label input {
  display: none;
}

.file-selected {
  margin-top: var(--space-4);
  color: var(--color-success);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.search-section {
  margin: var(--space-6) 0;
}

.badge--success {
  background: #d1fae5;
  color: #047857;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  display: inline-block;
}

.badge--error {
  background: #fee2e2;
  color: #dc2626;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  display: inline-block;
}

/* Responsive */
@media (max-width: 768px) {
  .upload-actions {
    flex-direction: column;
  }

  .upload-actions button {
    width: 100%;
  }

  .upload-container {
    padding: var(--space-6);
  }
}
```

---

## Summary: Implementation Best Practices

### Do's ✅

- Use CSS custom properties for theming
- Implement mobile-first responsive design
- Add loading states for all async operations
- Use semantic HTML
- Implement proper error handling
- Add accessibility attributes (ARIA, labels)
- Use consistent spacing from the design system
- Optimize images and use lazy loading
- Test at all breakpoints

### Don'ts ❌

- Don't use hardcoded colors
- Don't create responsive hacks
- Don't forget loading states
- Don't use divs for everything
- Don't ignore accessibility
- Don't over-animate
- Don't make cards too wide on desktop
- Don't forget error boundaries
- Don't skip testing on mobile

---
