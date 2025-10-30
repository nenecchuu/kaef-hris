/**
 * Dashboard TypeScript Type Definitions
 * PT Kimia Farma - BOD HRIS Dashboard
 */

export interface DivisionData {
  id: string;
  name: string;
  headcount: number;
  percentage: number;
  costPerEmployee: number; // in IDR millions
  status: "healthy" | "attention" | "critical";
  facilities?: number; // outlets, clinics, etc.
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: "up" | "down" | "neutral";
  };
  status?: "success" | "warning" | "error" | "neutral";
  icon?: string;
}

export interface ComplianceMetric {
  category: string;
  score: number; // percentage 0-100
  status: "compliant" | "warning" | "critical";
  details: string;
  lastAudit: string;
}

export interface TalentPipelineData {
  totalHighPotential: number;
  successionReadiness: number; // percentage
  criticalRoleCoverage: number; // percentage
  leadershipBench: {
    ready: number;
    developing: number;
    identified: number;
  };
}

export interface FinancialMetrics {
  totalHRCost: number; // in IDR
  costPerEmployee: number; // in IDR
  payrollPercentOfRevenue: number; // percentage
  trainingBudgetUtilization: number; // percentage
  recruitmentCostPerHire: number; // in IDR
}

export interface TrendDataPoint {
  month: string;
  value: number;
}

export interface DashboardData {
  overview: {
    totalEmployees: number;
    employeeTrend: TrendDataPoint[];
    hrBudgetUtilization: number;
    criticalAlerts: number;
  };
  divisions: DivisionData[];
  talent: TalentPipelineData;
  compliance: ComplianceMetric[];
  financial: FinancialMetrics;
  lastUpdated: string;
}
