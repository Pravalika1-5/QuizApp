import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import DashboardCard from "../components/DashboardCard";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, eligibleStudents: 0 });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/users", config);
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/users/stats", config);
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post("/api/users/upload", formData, config);
      alert("Students uploaded");
      fetchStudents();
      fetchStats();
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  const toggleEligibility = async (id, current) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `/api/users/${id}/eligibility`,
        { isEligible: !current },
        config,
      );
      fetchStudents();
      fetchStats();
    } catch (err) {
      console.error("Error updating eligibility:", err);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Delete student?")) {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/users/${id}`, config);
        fetchStudents();
        fetchStats();
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  const downloadTemplate = () => {
    const csvContent =
      "name,email,password,rollNo,department,year,isEligible\nJohn Doe,john@example.com,pass123,123,CSE,2023,true";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_template.csv";
    a.click();
  };

  const cardGradients = [
    "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
    "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
  ];

  return (
    <div>
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          padding: "80px 2rem 2rem 2rem",
          minHeight: "100vh",
          background: "#FAFAF9",
          color: "#1F2937",
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
          Student Management
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: "2rem",
            gap: "1.5rem",
          }}
        >
          <DashboardCard
            title="Total Students"
            value={stats.totalStudents}
            gradient="linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)"
          />
          <DashboardCard
            title="Eligible Students"
            value={stats.eligibleStudents}
            gradient="linear-gradient(135deg, #14B8A6 0%, #10B981 100%)"
          />
        </div>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "2px solid #E5E7EB",
              fontSize: "14px",
              color: "#1F2937",
            }}
          />
          <button
            onClick={handleUpload}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (
              (e.target.style.transform = "scale(1.02)"),
              (e.target.style.boxShadow = "0 8px 20px rgba(124, 58, 237, 0.3)")
            )}
            onMouseOut={(e) => (
              (e.target.style.transform = "scale(1)"),
              (e.target.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.2)")
            )}
          >
            Upload CSV
          </button>
          <button
            onClick={downloadTemplate}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(6, 182, 212, 0.2)",
              transition: "all 0.2s",
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
            Download Template
          </button>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#1F2937",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid #E5E7EB",
                background: "#F9FAFB",
              }}
            >
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Roll No
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Department
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Year
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Eligibility
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                style={{
                  borderBottom: "1px solid #E5E7EB",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#F9FAFB")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              >
                <td style={{ padding: "1rem", color: "#1F2937" }}>
                  {student.rollNo}
                </td>
                <td style={{ padding: "1rem", color: "#1F2937" }}>
                  {student.name}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {student.email}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {student.department}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {student.year}
                </td>
                <td style={{ padding: "1rem", color: "#6B7280" }}>
                  {student.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    onClick={() =>
                      toggleEligibility(student._id, student.isEligible)
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      background:
                        "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                      fontWeight: "500",
                      boxShadow: "0 2px 8px rgba(20, 184, 166, 0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => (
                      (e.target.style.transform = "translateY(-2px)"),
                      (e.target.style.boxShadow =
                        "0 4px 12px rgba(20, 184, 166, 0.3)")
                    )}
                    onMouseOut={(e) => (
                      (e.target.style.transform = "translateY(0)"),
                      (e.target.style.boxShadow =
                        "0 2px 8px rgba(20, 184, 166, 0.2)")
                    )}
                  >
                    {student.isEligible ? "Revoke" : "Grant"}
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#EF4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => (
                      (e.target.style.transform = "translateY(-2px)"),
                      (e.target.style.boxShadow =
                        "0 4px 12px rgba(239, 68, 68, 0.3)")
                    )}
                    onMouseOut={(e) => (
                      (e.target.style.transform = "translateY(0)"),
                      (e.target.style.boxShadow =
                        "0 2px 8px rgba(239, 68, 68, 0.2)")
                    )}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
