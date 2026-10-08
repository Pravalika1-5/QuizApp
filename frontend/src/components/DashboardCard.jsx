import React from "react";

const DashboardCard = ({ title, value, gradient }) => {
  const cardStyle = {
    background: gradient,
    color: "white",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={cardStyle}>
      <h3
        style={{
          margin: "0 0 0.5rem 0",
          fontSize: "14px",
          fontWeight: "500",
          opacity: 0.9,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "2.2rem", fontWeight: "bold", margin: "0" }}>
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;
