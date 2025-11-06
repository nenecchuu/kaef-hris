import * as React from "react";
import {
  IconArrowLeft,
  IconChartBar,
  IconChartPie,
  IconTrendingUp,
  IconAlertTriangle,
  IconTarget,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { LoadingFallback } from "@src/components/fallbacks";
import { Button } from "@src/ui/button";
import { useLeaderTeam } from "../hooks/useLeaderTeam";
import { StatusBadge } from "../components/StatusBadge";
import { BottomNavLeader } from "../components/BottomNavLeader";

// Colors for charts
const STATUS_COLORS = {
  fit: "#22c55e",
  gap: "#ef4444",
  exceed: "#3b82f6",
};

interface AssessmentCategory {
  kategori: string;
  fit_rate: number;
  status: "fit" | "gap" | "exceed";
  actual_avg: number;
  expected: number;
}

interface EmployeeData {
  id: string;
  nama: string;
  fit_rate_overall: number;
  status_kompetensi: "fit" | "gap" | "exceed";
  assessment_results?: {
    assessments: AssessmentCategory[];
  };
}

export function AnalysisPage() {
  const { data, isLoading } = useLeaderTeam();
  const navigate = useNavigate();
  const [allEmployeeData, setAllEmployeeData] = React.useState<EmployeeData[]>(
    []
  );

  React.useEffect(() => {
    // Load all employee data dynamically
    const loadEmployeeData = async () => {
      const employeeIds = ["E001", "E002", "E003", "E004", "E005", "E006", "E007", "E008", "E009", "E010"];
      const employees: EmployeeData[] = [];

      for (const id of employeeIds) {
        try {
          const module = await import(
            `../../../../mock-data/employee_detail_${id}.json`
          );
          const empData = module.default;
          employees.push({
            id: empData.employee.id,
            nama: empData.employee.nama,
            fit_rate_overall: empData.employee.fit_rate_overall,
            status_kompetensi: empData.employee.status_kompetensi,
            assessment_results: empData.assessment_results,
          });
        } catch (err) {
          console.warn(`Could not load data for ${id}`);
        }
      }

      setAllEmployeeData(employees);
    };

    loadEmployeeData();
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!data || allEmployeeData.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-gray-600">Data tidak tersedia</div>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  // ============ DATA PROCESSING ============

  // 1. Status Distribution
  const statusCounts = allEmployeeData.reduce(
    (acc, emp) => {
      acc[emp.status_kompetensi] = (acc[emp.status_kompetensi] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const statusDistributionData = [
    {
      name: "Fit",
      value: statusCounts.fit || 0,
      color: STATUS_COLORS.fit,
    },
    {
      name: "Gap",
      value: statusCounts.gap || 0,
      color: STATUS_COLORS.gap,
    },
    {
      name: "Exceed",
      value: statusCounts.exceed || 0,
      color: STATUS_COLORS.exceed,
    },
  ];

  // 2. Fit Rate Distribution
  const fitRateData = allEmployeeData
    .sort((a, b) => a.fit_rate_overall - b.fit_rate_overall)
    .map((emp) => ({
      name: emp.nama,
      "Fit Rate": emp.fit_rate_overall,
    }));

  // 3. Assessment Category Aggregates
  const categoryAggregates: Record<string, AssessmentCategory> = {};
  allEmployeeData.forEach((emp) => {
    emp.assessment_results?.assessments?.forEach((assess) => {
      if (!categoryAggregates[assess.kategori]) {
        categoryAggregates[assess.kategori] = {
          kategori: assess.kategori,
          fit_rate: 0,
          status: "fit",
          actual_avg: 0,
          expected: assess.expected,
        };
      }
      categoryAggregates[assess.kategori].fit_rate += assess.fit_rate;
      categoryAggregates[assess.kategori].actual_avg += assess.actual_avg;
    });
  });

  // Calculate averages
  const categoryData = Object.values(categoryAggregates).map((cat) => ({
    ...cat,
    fit_rate: Math.round(cat.fit_rate / allEmployeeData.length),
    actual_avg: parseFloat((cat.actual_avg / allEmployeeData.length).toFixed(2)),
  }));

  // 4. Gap Analysis - identify critical gaps
  const gapAnalysis = allEmployeeData
    .filter((emp) => emp.status_kompetensi === "gap")
    .sort((a, b) => a.fit_rate_overall - b.fit_rate_overall)
    .slice(0, 5);

  // 5. Top Performers
  const topPerformers = allEmployeeData
    .sort((a, b) => b.fit_rate_overall - a.fit_rate_overall)
    .slice(0, 5);

  // 6. Trend Simulation (mock data)
  const trendData = [
    { period: "Q1", avgFitRate: 72 },
    { period: "Q2", avgFitRate: 74 },
    { period: "Q3", avgFitRate: 76 },
    { period: "Q4 (Forecast)", avgFitRate: 78 },
  ];

  const avgFitRate =
    allEmployeeData.reduce((sum, emp) => sum + emp.fit_rate_overall, 0) /
    allEmployeeData.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-kf-blue to-kf-blue-dark text-gray-50 p-4 shadow-md">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 p-2 text-gray-50 hover:bg-white/20"
        >
          <IconArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Analisis Kompetensi Tim</h1>
        <p className="text-sm text-gray-50/80">
          Dashboard Analisis Gap & Tren Pengembangan
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 m-4">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-600">Total Karyawan</p>
          <p className="text-2xl font-bold text-kf-blue">
            {allEmployeeData.length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-600">Avg Fit Rate</p>
          <p className="text-2xl font-bold text-green-600">
            {avgFitRate.toFixed(0)}%
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-600">Gap Cases</p>
          <p className="text-2xl font-bold text-red-600">
            {statusCounts.gap || 0}
          </p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="mx-4 space-y-4">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
            <IconChartPie size={18} className="text-kf-blue" />
            Status Distribusi Tim
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Fit Rate by Employee Bar Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
            <IconChartBar size={18} className="text-kf-blue" />
            Fit Rate Karyawan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fitRateData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="Fit Rate" fill={STATUS_COLORS.fit} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Competency Category Averages */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
            <IconTarget size={18} className="text-kf-blue" />
            Average Fit Rate per Kategori Kompetensi
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="kategori"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fit_rate" fill={STATUS_COLORS.fit} name="Fit Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
            <IconTrendingUp size={18} className="text-kf-blue" />
            Trend Rata-rata Fit Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgFitRate"
                stroke={STATUS_COLORS.fit}
                strokeWidth={2}
                dot={{ fill: STATUS_COLORS.fit, r: 5 }}
                name="Avg Fit Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Gaps */}
        {gapAnalysis.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500">
            <h3 className="mb-3 font-semibold text-gray-900 flex items-center gap-2">
              <IconAlertTriangle size={18} className="text-red-600" />
              Karyawan dengan Gap Kritis
            </h3>
            <div className="space-y-2">
              {gapAnalysis.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-2 border rounded bg-red-50"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{emp.nama}</p>
                    <p className="text-xs text-gray-600">ID: {emp.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">
                      {emp.fit_rate_overall}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Performers */}
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <h3 className="mb-3 font-semibold text-gray-900">Top Performers</h3>
          <div className="space-y-2">
            {topPerformers.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-2 border rounded bg-green-50"
              >
                <div>
                  <p className="font-semibold text-gray-900">{emp.nama}</p>
                  <p className="text-xs text-gray-600">ID: {emp.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">
                    {emp.fit_rate_overall}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-kf-blue">
          <h3 className="mb-3 font-semibold text-gray-900">Rekomendasi Aksi</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-kf-blue">•</span>
              <span>
                Fokuskan development program untuk{" "}
                <strong>{statusCounts.gap || 0} karyawan</strong> dengan status
                gap
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kf-blue">•</span>
              <span>
                Leverage{" "}
                <strong>{statusCounts.exceed || 0} top performer</strong> sebagai
                mentor/coach untuk tim
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kf-blue">•</span>
              <span>
                Prioritaskan training untuk kategori kompetensi terendah:{" "}
                <strong>
                  {categoryData.sort((a, b) => a.fit_rate - b.fit_rate)[0]
                    ?.kategori || "N/A"}
                </strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-kf-blue">•</span>
              <span>
                Target: Tingkatkan average fit rate dari <strong>{avgFitRate.toFixed(0)}%</strong> menjadi{" "}
                <strong>85%</strong> dalam 6 bulan
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNavLeader />
    </div>
  );
}

export default AnalysisPage;
