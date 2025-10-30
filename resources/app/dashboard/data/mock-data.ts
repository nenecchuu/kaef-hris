/**
 * Mock Data for Kimia Farma BOD Dashboard
 * Based on realistic company scale and pharmaceutical industry standards
 */

import type { DashboardData } from "../types/dashboard.types";

/**
 * Realistic scale for PT Kimia Farma Tbk:
 * - 1,300+ retail outlets (Apotek)
 * - 400+ health clinics
 * - Manufacturing facilities
 * - Nationwide distribution network
 * - Total estimated workforce: ~10,500 employees
 */

export const BOD_DASHBOARD_DATA: DashboardData = {
  overview: {
    totalEmployees: 10542,
    employeeTrend: [
      { month: "Jan", value: 10245 },
      { month: "Feb", value: 10312 },
      { month: "Mar", value: 10389 },
      { month: "Apr", value: 10421 },
      { month: "May", value: 10468 },
      { month: "Jun", value: 10542 },
    ],
    hrBudgetUtilization: 87.3, // percentage
    criticalAlerts: 3,
  },

  divisions: [
    {
      id: "retail",
      name: "Retail & Apotek",
      headcount: 4235,
      percentage: 40.2,
      costPerEmployee: 85.5, // IDR millions per year
      status: "healthy",
      facilities: 1308, // number of outlets
    },
    {
      id: "clinics",
      name: "Klinik & Laboratorium",
      headcount: 2487,
      percentage: 23.6,
      costPerEmployee: 125.2,
      status: "healthy",
      facilities: 412,
    },
    {
      id: "manufacturing",
      name: "Manufaktur & Produksi",
      headcount: 1842,
      percentage: 17.5,
      costPerEmployee: 142.8,
      status: "attention",
      facilities: 5,
    },
    {
      id: "distribution",
      name: "Distribusi & Logistik",
      headcount: 1235,
      percentage: 11.7,
      costPerEmployee: 95.3,
      status: "healthy",
      facilities: 12,
    },
    {
      id: "marketing",
      name: "Marketing & Sales",
      headcount: 543,
      percentage: 5.2,
      costPerEmployee: 178.5,
      status: "healthy",
    },
    {
      id: "corporate",
      name: "Corporate & Support",
      headcount: 200,
      percentage: 1.9,
      costPerEmployee: 225.4,
      status: "healthy",
    },
  ],

  talent: {
    totalHighPotential: 342,
    successionReadiness: 78.5, // percentage of critical roles with identified successors
    criticalRoleCoverage: 85.2, // percentage of critical roles filled
    leadershipBench: {
      ready: 45, // ready now for leadership positions
      developing: 128, // in development programs
      identified: 169, // identified but not yet in programs
    },
  },

  compliance: [
    {
      category: "Training & Certification",
      score: 94.2,
      status: "compliant",
      details: "GMP & regulatory training up to date",
      lastAudit: "2024-09-15",
    },
    {
      category: "Pharmacy Licensing",
      score: 98.7,
      status: "compliant",
      details: "All pharmacy staff certifications current",
      lastAudit: "2024-10-01",
    },
    {
      category: "Safety & Health",
      score: 88.5,
      status: "warning",
      details: "3 manufacturing sites pending annual safety audit",
      lastAudit: "2024-08-20",
    },
    {
      category: "Labor Compliance",
      score: 96.1,
      status: "compliant",
      details: "All regulatory requirements met",
      lastAudit: "2024-09-28",
    },
    {
      category: "Quality Management",
      score: 92.8,
      status: "compliant",
      details: "ISO certification renewals on track",
      lastAudit: "2024-09-10",
    },
  ],

  financial: {
    totalHRCost: 1245000000000, // IDR 1.245 trillion
    costPerEmployee: 118100000, // IDR 118.1 million per employee per year
    payrollPercentOfRevenue: 10.4, // 10.4% of revenue
    trainingBudgetUtilization: 82.5, // 82.5% of allocated training budget used
    recruitmentCostPerHire: 12500000, // IDR 12.5 million per new hire
  },

  lastUpdated: new Date().toISOString(),
};

// Helper function to format currency in Indonesian Rupiah
export function formatIDR(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1000000000000) {
      // Trillions
      return `Rp ${(amount / 1000000000000).toFixed(2)} T`;
    } else if (amount >= 1000000000) {
      // Billions
      return `Rp ${(amount / 1000000000).toFixed(2)} M`;
    } else if (amount >= 1000000) {
      // Millions
      return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
    }
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to format percentages
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Helper function to format large numbers
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}
