// Status values without emojis for cleaner code and better icon rendering
export type CompetencyStatus = "fit" | "gap" | "exceed";

export interface Employee {
  id: string;
  nama: string;
  jabatan: string;
  fungsi: string;
  level: string;
  photo?: string;
  email?: string;
  phone?: string;
  department?: string;
  join_date?: string;
  status_kompetensi: CompetencyStatus;
  fit_rate_overall: number;
}

export interface CompetencyItem {
  nama: string;
  expected: number;
  actual: number;
  gap: number;
  status: CompetencyStatus;
}

export interface CompetencyCategory {
  kategori: string;
  expected: number;
  actual_avg: number;
  fit_rate: number;
  gap: number;
  status: CompetencyStatus;
  items?: CompetencyItem[];
}

export interface AssessmentResult {
  assessed_date: string;
  assessor?: string;
  assessments: CompetencyCategory[];
}

export interface WorkHistory {
  id: string;
  position: string;
  department: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  major: string;
  year_start: string;
  year_end: string;
  gpa: number | null;
  description: string | null;
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  date: string;
  duration: string;
  certificate_number: string;
  status: string;
}

export interface PersonalQualification {
  id: string;
  type: string;
  name: string;
  issuer: string;
  issued_date: string;
  expiry_date: string;
  credential_id: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  awarded_by: string;
}

export interface KPIPersonal {
  id: string;
  name: string;
  category: string;
  target: string;
  actual: string;
  period: string;
  status: string;
  notes: string;
}

export interface LeaderTeamData {
  leader_id: string;
  leader_name: string;
  leader_position: string;
  leader_function?: string;
  leader_division?: string;
  leader_email?: string;
  leader_photo?: string;
  leader_phone?: string;
  team_kpi: {
    total_members: number;
    avg_fit_rate: number;
    critical_gaps: number;
    status_distribution: {
      fit: number;
      gap: number;
      exceed: number;
    };
  };
  team_members: Employee[];
}

export interface EmployeeDetailData {
  employee: Employee;
  assessment_results: AssessmentResult;
  work_history?: WorkHistory[];
  education?: Education[];
  training?: Training[];
  personal_qualification?: PersonalQualification[];
  achievement?: Achievement[];
  kpi_personal?: KPIPersonal[];
}
