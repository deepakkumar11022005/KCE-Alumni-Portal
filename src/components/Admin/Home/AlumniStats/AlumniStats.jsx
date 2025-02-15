import React, { useState, useEffect } from "react";
import {
  Users,
  Loader,
  AlertCircle,
  PieChart as PieIcon,
  BarChart as BarIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./AlumniStats.css";

const COLORS = [
  "#4ADE80",
  "#2563EB",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="admin-stats-tooltip">
        <p className="admin-stats-tooltip-title">
          {data.batch.replace("batch_", "")}
        </p>
        <p className="admin-stats-tooltip-content">Count: {data.count}</p>
        <p className="admin-stats-tooltip-content">
          Percentage: {data.percentage.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const AlumniStats = ({ adminAuthData }) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/students-count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminAuthData?.token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setStatsData(data);
        } else {
          throw new Error("Failed to fetch statistics");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [adminAuthData]);

  if (loading) {
    return (
      <div className="admin-feedback-section">
        <div className="admin-feedback-loading">
          <Loader className="admin-feedback-spinner" />
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-feedback-section">
        <div className="admin-feedback-error">
          <AlertCircle />
          <p>Error loading statistics: {error}</p>
        </div>
      </div>
    );
  }

  const prepareChartData = () => {
    return statsData.batchWithCount
      .filter((batch) => batch.count > 0)
      .map((batch) => ({
        ...batch,
        year: parseInt(batch.batch.replace("batch_", "")),
        percentage: (batch.count / statsData.totalStudentsCount) * 100,
      }))
      .sort((a, b) => a.year - b.year); // Sort by year in ascending order
  };

  const chartData = prepareChartData();

  return (
    <div className="admin-stats-container">
      <div className="admin-stats-header">
        <div className="admin-stats-header-content">
          <h2 className="admin-stats-header-title">
            <Users size={24} />
            Alumni Statistics
          </h2>
          <span className="admin-stats-total-count">
            {statsData.totalStudentsCount} Students
          </span>
        </div>
        <div className="admin-stats-chart-controls">
          <button
            className={`admin-stats-control-button ${
              chartType === "bar" ? "active" : ""
            }`}
            onClick={() => setChartType("bar")}
          >
            <BarIcon size={20} />
          </button>
          <button
            className={`admin-stats-control-button ${
              chartType === "pie" ? "active" : ""
            }`}
            onClick={() => setChartType("pie")}
          >
            <PieIcon size={20} />
          </button>
        </div>
      </div>

      <div className="admin-stats-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === "bar" ? (
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
            >
              <XAxis 
                dataKey={(d) => ""}
                label={{ 
                  value: 'Batches', 
                  position: 'bottom',
                  offset: 0
                }}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#2563EB">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey={(d) => d.batch.replace("batch_", "")}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlumniStats;