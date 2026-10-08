import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import QuestionBank from "./pages/QuestionBank";
import AIGenerator from "./pages/AIGenerator";
import StudentManagement from "./pages/StudentManagement";
import QuizManager from "./pages/QuizManager";
import QuizTaking from "./pages/QuizTaking";
import AdminResults from "./pages/AdminResults";
import Login from "./pages/Login";
import QuizList from "./pages/QuizList";

// Set axios base URL
import axios from "axios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/questions" element={<QuestionBank />} />
        <Route path="/ai-generator" element={<AIGenerator />} />
        <Route path="/users" element={<StudentManagement />} />
        <Route path="/quizzes" element={<QuizManager />} />
        <Route path="/quiz/:id" element={<QuizTaking />} />
        <Route path="/admin/results/:quizId" element={<AdminResults />} />
        {/* Add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;
