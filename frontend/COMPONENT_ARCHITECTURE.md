# React Component Architecture & Implementation Guide

## Project Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx (optional)
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   └── DataTable.jsx
│   ├── dashboard/
│   │   ├── MetricCard.jsx
│   │   ├── QuickActions.jsx
│   │   └── DashboardGrid.jsx
│   ├── auth/
│   │   └── LoginForm.jsx
│   ├── ai-generator/
│   │   ├── HeroSection.jsx
│   │   ├── FeatureChips.jsx
│   │   └── GeneratorForm.jsx
│   ├── student-management/
│   │   ├── SummaryCards.jsx
│   │   ├── UploadSection.jsx
│   │   └── StudentTable.jsx
│   └── quiz-manager/
│       ├── QuizForm.jsx
│       ├── QuestionSelector.jsx
│       ├── QuizSettings.jsx
│       └── QuizLinksList.jsx
├── pages/
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── AIGenerator.jsx
│   ├── StudentManagement.jsx
│   ├── QuizManager.jsx
│   ├── QuestionBank.jsx
│   ├── QuizList.jsx
│   └── QuizTaking.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useForm.js
│   ├── useLocalStorage.js
│   └── useToast.js
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── animations.css
│   └── responsive.css
├── utils/
│   ├── api.js
│   ├── validators.js
│   ├── formatters.js
│   └── constants.js
├── App.jsx
├── App.css
└── main.jsx
```

---

## Core Component Specifications

### 1. BUTTON COMPONENT

```jsx
// Button.jsx
export const Button = ({
  children,
  variant = "primary", // primary, secondary, danger, ghost
  size = "md", // sm, md, lg
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null, // Left icon
  iconRight = null, // Right icon
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={`
        btn btn--${variant} btn--${size}
        ${fullWidth ? "btn--full-width" : ""}
        ${loading || disabled ? "btn--disabled" : ""}
        ${className}
      `}
      onclick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className="btn__spinner" />}
      {icon && <span className="btn__icon-left">{icon}</span>}
      {children}
      {iconRight && <span className="btn__icon-right">{iconRight}</span>}
    </button>
  );
};
```

**Styling (CSS)**:

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-family);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 200ms ease-in-out;
  text-decoration: none;
}

.btn--primary {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn--primary:hover:not(:disabled) {
  box-shadow: var(--shadow-lg);
  transform: scale(1.02);
}

.btn--secondary {
  background: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn--secondary:hover:not(:disabled) {
  background: #f3e8ff;
}

.btn--danger {
  background: var(--color-error);
  color: white;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
}

.btn--md {
  padding: 12px 16px;
  font-size: 14px;
}

.btn--lg {
  padding: 14px 24px;
  font-size: 16px;
}

.btn--full-width {
  width: 100%;
}

.btn--disabled,
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

### 2. CARD COMPONENT

```jsx
// Card.jsx
export const Card = ({
  children,
  variant = "default", // default, elevated, outline, gradient
  padding = "md", // sm, md, lg
  radius = "lg", // sm, md, lg, xl
  className,
  ...props
}) => {
  return (
    <div
      className={`card card--${variant} card--padding-${padding} card--radius-${radius} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

**Styling (CSS)**:

```css
.card {
  background: var(--bg-secondary);
  box-shadow: var(--shadow-md);
  transition: all 200ms ease-in-out;
}

.card--default {
  border: none;
}

.card--elevated:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card--outline {
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.card--gradient {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  color: white;
}

.card--padding-sm {
  padding: 12px;
}

.card--padding-md {
  padding: 20px;
}

.card--padding-lg {
  padding: 24px;
}

.card--radius-sm {
  border-radius: var(--radius-sm);
}

.card--radius-md {
  border-radius: var(--radius-md);
}

.card--radius-lg {
  border-radius: var(--radius-lg);
}

.card--radius-xl {
  border-radius: var(--radius-xl);
}
```

---

### 3. INPUT COMPONENT

```jsx
// Input.jsx
export const Input = ({
  placeholder,
  value,
  onChange,
  error,
  icon,
  iconRight,
  disabled,
  type = "text",
  size = "md", // sm, md, lg
  className,
  ...props
}) => {
  return (
    <div
      className={`input-wrapper input-wrapper--${size} ${error ? "input-wrapper--error" : ""}`}
    >
      {icon && <span className="input__icon-left">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input input--${size} ${className}`}
        {...props}
      />
      {iconRight && <span className="input__icon-right">{iconRight}</span>}
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
```

**Styling (CSS)**:

```css
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 14px;
  transition: all 200ms ease-in-out;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.input__icon-left {
  position: absolute;
  left: 12px;
  color: var(--text-secondary);
  pointer-events: none;
}

.input-wrapper--error .input {
  border-color: var(--color-error);
}

.input__error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: var(--color-error);
}
```

---

### 4. METRIC CARD COMPONENT

```jsx
// MetricCard.jsx
export const MetricCard = ({
  icon,
  number,
  label,
  trend = null, // { value: '+12%', positive: true }
  gradient = "gradient-1", // gradient-1, gradient-2, etc.
}) => {
  return (
    <Card variant="gradient" className={`metric-card metric-card--${gradient}`}>
      <div className="metric-card__icon">{icon}</div>
      <div className="metric-card__number">{number}</div>
      <div className="metric-card__label">{label}</div>
      {trend && (
        <div
          className={`metric-card__trend ${trend.positive ? "positive" : "negative"}`}
        >
          {trend.positive ? "↑" : "↓"} {trend.value}
        </div>
      )}
    </Card>
  );
};
```

**Styling (CSS)**:

```css
.metric-card {
  padding: 24px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
  justify-content: space-between;
}

.metric-card--gradient-1 {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
}

.metric-card--gradient-2 {
  background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
}

.metric-card--gradient-3 {
  background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%);
}

.metric-card--gradient-4 {
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
}

.metric-card__icon {
  font-size: 32px;
  opacity: 0.9;
}

.metric-card__number {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.metric-card__label {
  font-size: 14px;
  opacity: 0.95;
}

.metric-card__trend {
  font-size: 12px;
  font-weight: 600;
}

.metric-card__trend.positive {
  color: #d1fae5;
}
```

---

### 5. NAVBAR COMPONENT

```jsx
// Navbar.jsx
import { useState } from "react";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Left: Logo */}
        <div className="navbar__logo">
          <span>📚 QuizApp</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar__links">
          <a href="/dashboard" className="navbar__link">
            Dashboard
          </a>
          <a href="/questions" className="navbar__link">
            Questions
          </a>
          <a href="/students" className="navbar__link">
            Students
          </a>
          <a href="/reports" className="navbar__link">
            Reports
          </a>
        </div>

        {/* Right: User Menu */}
        <div className="navbar__user">
          <div className="navbar__avatar">👤</div>
          <div
            className="navbar__dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Admin User
            <span className="navbar__dropdown-arrow">▼</span>
          </div>
          {dropdownOpen && (
            <div className="navbar__menu">
              <a href="/profile" className="navbar__menu-item">
                Profile
              </a>
              <a href="/settings" className="navbar__menu-item">
                Settings
              </a>
              <hr />
              <a
                href="/logout"
                className="navbar__menu-item navbar__menu-item--danger"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
```

**Styling (CSS)**:

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--bg-secondary);
  box-shadow: var(--shadow-md);
  z-index: var(--z-navbar);
}

.navbar__container {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar__links {
  display: flex;
  gap: 24px;
}

.navbar__link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 200ms ease-in-out;
}

.navbar__link:hover {
  color: var(--color-primary);
}

.navbar__user {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.navbar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3e8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.navbar__dropdown {
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.navbar__dropdown-arrow {
  font-size: 10px;
  transition: transform 200ms ease-in-out;
}

.navbar__menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  margin-top: 8px;
  overflow: hidden;
}

.navbar__menu-item {
  display: block;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 14px;
  transition: background 200ms ease-in-out;
}

.navbar__menu-item:hover {
  background: #f9fafb;
}

.navbar__menu-item--danger {
  color: var(--color-error);
}

@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }
}
```

---

### 6. DATA TABLE COMPONENT

```jsx
// DataTable.jsx
export const DataTable = ({
  columns, // [{ key: 'name', label: 'Name', width: '180px' }, ...]
  data, // Array of row objects
  onDelete,
  actions = true,
}) => {
  return (
    <Card className="data-table-card">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
            {actions && <th style={{ width: "80px" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td>
                  <button
                    className="action-btn action-btn--delete"
                    onClick={() => onDelete(row.id)}
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
```

**Styling (CSS)**:

```css
.data-table-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  padding: 14px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
}

.data-table td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  color: var(--text-primary);
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 200ms ease-in-out;
  padding: 4px 8px;
  border-radius: var(--radius-md);
}

.action-btn--delete:hover {
  background: #fee2e2;
}
```

---

### 7. TOAST/NOTIFICATION COMPONENT

```jsx
// Toast.jsx
import { useEffect } from "react";

export const Toast = ({
  message,
  type = "success", // success, error, info, warning
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">
        {type === "success"
          ? "✓"
          : type === "error"
            ? "✕"
            : type === "info"
              ? "ℹ"
              : "⚠"}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};
```

**Styling (CSS)**:

```css
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: var(--z-toast);
  animation: slideIn 300ms ease-out;
}

.toast--success {
  border-left: 4px solid var(--color-success);
}

.toast--success .toast__icon {
  color: var(--color-success);
}

.toast--error {
  border-left: 4px solid var(--color-error);
}

.toast--error .toast__icon {
  color: var(--color-error);
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## Page Component Implementations

### LOGIN PAGE

```jsx
// pages/Login.jsx
import { useState } from "react";
import { Button, Input, Card } from "../components/common";

export const Login = () => {
  const [tab, setTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // API call
      console.log("Login:", { tab, email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card" radius="xl">
          <div className="login-header">
            <h1 className="login-title">QuizApp</h1>
            <p className="login-subtitle">Welcome back</p>
          </div>

          {/* Tab Toggle */}
          <div className="login-tabs">
            <button
              className={`login-tab ${tab === "admin" ? "active" : ""}`}
              onClick={() => setTab("admin")}
            >
              Admin Login
            </button>
            <button
              className={`login-tab ${tab === "student" ? "active" : ""}`}
              onClick={() => setTab("student")}
            >
              Student Login
            </button>
          </div>

          {/* Form */}
          <div className="login-form">
            <Input
              placeholder="Email"
              icon="📧"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              icon="🔒"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth loading={loading} onClick={handleLogin}>
              Sign In
            </Button>
          </div>

          <div className="login-footer">
            <a href="#forgot" className="login-link">
              Forgot password?
            </a>
            <span className="login-divider">•</span>
            <a href="#signup" className="login-link">
              Create account
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};
```

**Styling (CSS)**:

```css
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.login-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
}

.login-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: var(--radius-lg);
}

.login-tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease-in-out;
}

.login-tab.active {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.login-footer {
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
}

.login-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 200ms ease-in-out;
}

.login-link:hover {
  text-decoration: underline;
}

.login-divider {
  margin: 0 8px;
}
```

---

### ADMIN DASHBOARD PAGE

```jsx
// pages/AdminDashboard.jsx
import { Navbar, MetricCard, Card, Button } from "../components/common";
import { QuickActions, DashboardGrid } from "../components/dashboard";

export const AdminDashboard = () => {
  const metrics = [
    {
      icon: "📝",
      number: "286",
      label: "Total Questions",
      trend: { value: "+12%", positive: true },
    },
    {
      icon: "👥",
      number: "1,240",
      label: "Registered Users",
      trend: { value: "+8%", positive: true },
    },
    {
      icon: "📊",
      number: "942",
      label: "Quiz Attempts",
      trend: { value: "-3%", positive: false },
    },
    {
      icon: "⭐",
      number: "78.5%",
      label: "Average Score",
      trend: { value: "+5%", positive: true },
    },
  ];

  return (
    <>
      <Navbar />
      <main className="admin-dashboard">
        <div className="page-container">
          <div className="page-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Here's your quiz management overview.</p>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <MetricCard
                key={i}
                icon={m.icon}
                number={m.number}
                label={m.label}
                trend={m.trend}
                gradient={`gradient-${(i % 4) + 1}`}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Charts/Reports Section - Optional */}
          <Card className="reports-section">
            <h3>Recent Activity</h3>
            <div className="chart-placeholder">Chart goes here...</div>
          </Card>
        </div>
      </main>
    </>
  );
};
```

**Styling (CSS)**:

```css
.admin-dashboard {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  background: var(--bg-primary);
  padding: 24px;
}

.page-container {
  max-width: 1280px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.page-header p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.reports-section {
  padding: 24px;
  border-radius: var(--radius-lg);
}
```

---

## Global Styles Reference

```css
/* globals.css */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  color-scheme: light;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.2;
}

h1 {
  font-size: 32px;
}
h2 {
  font-size: 24px;
}
h3 {
  font-size: 20px;
}
h4 {
  font-size: 16px;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

button {
  font-family: var(--font-family);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Focus states for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

---

## Implementation Checklist

- [ ] Set up CSS variables in `styles/variables.css`
- [ ] Create base components (Button, Card, Input, etc.)
- [ ] Create Navbar component with responsive menu
- [ ] Create MetricCard with gradient variants
- [ ] Create Login page with tab toggle
- [ ] Create Admin Dashboard with metric cards
- [ ] Create AI Generator page with hero section
- [ ] Create Student Management page with table
- [ ] Create Quiz Manager with form fields
- [ ] Add Toast/Notification system
- [ ] Add loading spinners and skeleton screens
- [ ] Test responsive behavior at all breakpoints
- [ ] Implement accessibility features (ARIA labels, keyboard nav)
- [ ] Add smooth page transitions
- [ ] Set up error boundaries
- [ ] Optimize bundle size

---
