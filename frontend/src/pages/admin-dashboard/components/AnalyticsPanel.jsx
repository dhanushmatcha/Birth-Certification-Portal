import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPanel = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch("/api/admin/stats", {
          headers: { "x-auth-token": token },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "Failed to fetch analytics.");

        setStats(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger shadow-sm rounded-4 p-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );

  const summaryStats = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: "bi-file-earmark-text",
      color: "primary",
      gradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
    },
    {
      label: "Certificates Issued",
      value: stats.totalCertificatesIssued,
      icon: "bi-award",
      color: "success",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
    {
      label: "Pending",
      value: stats.pendingApplications,
      icon: "bi-hourglass-split",
      color: "warning",
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    },
    {
      label: "Rejected",
      value: stats.rejectedApplications,
      icon: "bi-x-circle",
      color: "danger",
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    },
  ];

  return (
    <div className="mb-5">
      {/* Header */}
      <div
        className="p-4 rounded-4 mb-4 shadow-lg dashboard-card-header"
        style={{
          background: "linear-gradient(135deg, var(--dashboard-background), var(--widget-background))",
        }}
      >
        <h2 className="fw-bold mb-1 dashboard-text-primary">
          <i className="bi bi-graph-up-arrow me-2 dashboard-text-accent"></i>Analytics Overview
        </h2>
        <p className="mb-0 dashboard-text-secondary">
          Monitor application trends, doctor performance, and key statistics.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="row g-4 mb-4">
        {summaryStats.map((stat, index) => (
          <div className="col-sm-6 col-lg-3" key={index}>
            <div
              className="card h-100 border-0 text-white shadow-lg rounded-4 p-4"
              style={{
                background: stat.gradient,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25"
                  style={{ width: "56px", height: "56px" }}
                >
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <h6 className="text-uppercase fw-bold mb-1 opacity-75">
                    {stat.label}
                  </h6>
                  <h3 className="fw-bold mb-0">{stat.value || 0}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications Chart */}
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4">
        <h5 className="fw-semibold mb-3">
          <i className="bi bi-bar-chart-line-fill me-2 text-primary"></i>
          Applications Over Time
        </h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={stats.applicationsOverTime}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsPanel;
