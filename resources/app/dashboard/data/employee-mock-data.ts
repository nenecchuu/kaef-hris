/**
 * Mock Employee Data - PT Kimia Farma Tbk
 * Struktur organisasi berdasarkan data resmi
 */

import type {
  DivisionCode,
  DivisionInfo,
  Employee,
} from "../types/employee.types";

// =============================================================================
// DIVISION STRUCTURE DATA
// =============================================================================

export const KIMIA_FARMA_DIVISIONS: Record<DivisionCode, DivisionInfo> = {
  retail: {
    code: "retail",
    name: "Retail & Apotek",
    fullName: "Divisi Retail & Apotek",
    director: "Direktur Komersial",
    headcount: 4235,
    subDivisions: [
      {
        code: "ops_apotek",
        name: "Operasional Apotek",
        head: "Budi Santoso",
        headPosition: "General Manager Operasional Apotek",
        headcount: 3200,
        departments: [
          {
            code: "regional_jawa",
            name: "Regional Jawa",
            head: "Siti Nurhaliza",
            headPosition: "Manager Regional Jawa",
            headcount: 1500,
          },
          {
            code: "regional_sumatera",
            name: "Regional Sumatera",
            head: "Ahmad Fauzi",
            headPosition: "Manager Regional Sumatera",
            headcount: 800,
          },
          {
            code: "regional_kalimantan",
            name: "Regional Kalimantan",
            head: "Dewi Lestari",
            headPosition: "Manager Regional Kalimantan",
            headcount: 400,
          },
          {
            code: "regional_sulawesi",
            name: "Regional Sulawesi & Indonesia Timur",
            head: "Made Wirawan",
            headPosition: "Manager Regional Sulawesi",
            headcount: 350,
          },
          {
            code: "regional_bali",
            name: "Regional Bali & Nusa Tenggara",
            head: "Ketut Suardana",
            headPosition: "Manager Regional Bali",
            headcount: 150,
          },
        ],
      },
      {
        code: "merchandising",
        name: "Merchandising & Category Management",
        head: "Rina Wijaya",
        headPosition: "Manager Merchandising",
        headcount: 650,
      },
      {
        code: "quality_retail",
        name: "Quality & Compliance Apotek",
        head: "Dr. Amir Hakim",
        headPosition: "Manager Quality Assurance Retail",
        headcount: 385,
      },
    ],
  },
  clinics: {
    code: "clinics",
    name: "Klinik & Laboratorium",
    fullName: "Divisi Klinik & Laboratorium",
    director: "Direktur Komersial",
    headcount: 2487,
    subDivisions: [
      {
        code: "ops_klinik",
        name: "Operasional Klinik",
        head: "Dr. Ratna Sari",
        headPosition: "General Manager Klinik",
        headcount: 1500,
        departments: [
          {
            code: "medical_services",
            name: "Medical Services",
            head: "Dr. Bambang Suryanto",
            headPosition: "Manager Medical Services",
            headcount: 800,
          },
          {
            code: "nursing",
            name: "Nursing Services",
            head: "Ns. Wulandari, S.Kep",
            headPosition: "Manager Nursing",
            headcount: 700,
          },
        ],
      },
      {
        code: "laboratorium",
        name: "Laboratorium Klinik",
        head: "Dr. Indra Gunawan, Sp.PK",
        headPosition: "Manager Laboratorium",
        headcount: 687,
      },
      {
        code: "healthcare_services",
        name: "Healthcare Services",
        head: "Dr. Maya Kusuma",
        headPosition: "Manager Healthcare Services",
        headcount: 300,
      },
    ],
  },
  manufacturing: {
    code: "manufacturing",
    name: "Manufaktur & Produksi",
    fullName: "Divisi Manufaktur & Produksi",
    director: "Direktur Produksi & Supply Chain",
    headcount: 1842,
    subDivisions: [
      {
        code: "plant_production",
        name: "Plant Production",
        head: "Ir. Hendra Gunawan",
        headPosition: "General Manager Production",
        headcount: 1100,
        departments: [
          {
            code: "plant_jakarta",
            name: "Plant Jakarta",
            head: "Agus Wijaya",
            headPosition: "Plant Manager Jakarta",
            headcount: 350,
          },
          {
            code: "plant_bandung",
            name: "Plant Bandung",
            head: "Dedi Kurniawan",
            headPosition: "Plant Manager Bandung",
            headcount: 280,
          },
          {
            code: "plant_semarang",
            name: "Plant Semarang",
            head: "Tri Wahyuni",
            headPosition: "Plant Manager Semarang",
            headcount: 220,
          },
          {
            code: "plant_medan",
            name: "Plant Medan",
            head: "Yusuf Rahman",
            headPosition: "Plant Manager Medan",
            headcount: 150,
          },
          {
            code: "plant_surabaya",
            name: "Plant Surabaya",
            head: "Eko Prasetyo",
            headPosition: "Plant Manager Surabaya",
            headcount: 100,
          },
        ],
      },
      {
        code: "rnd",
        name: "Research & Development",
        head: "Dr. Sri Mulyani, M.Si",
        headPosition: "Manager R&D",
        headcount: 420,
      },
      {
        code: "qa_qc",
        name: "Quality Assurance",
        head: "Apt. Dian Kartika, S.Farm",
        headPosition: "Manager QA/QC",
        headcount: 322,
      },
    ],
  },
  distribution: {
    code: "distribution",
    name: "Distribusi & Logistik",
    fullName: "Divisi Distribusi & Logistik",
    director: "Direktur Produksi & Supply Chain",
    headcount: 1235,
    subDivisions: [
      {
        code: "warehouse",
        name: "Warehouse Management",
        head: "Rudi Hartono",
        headPosition: "Manager Warehouse",
        headcount: 550,
        departments: [
          {
            code: "dc_jakarta",
            name: "Distribution Center Jakarta",
            head: "Budi Setiawan",
            headPosition: "DC Manager Jakarta",
            headcount: 180,
          },
          {
            code: "dc_regional",
            name: "DC Regional",
            head: "Hasan Basri",
            headPosition: "Manager DC Regional",
            headcount: 370,
          },
        ],
      },
      {
        code: "logistics",
        name: "Logistics & Transportation",
        head: "Joko Widodo",
        headPosition: "Manager Logistics",
        headcount: 485,
      },
      {
        code: "supply_chain",
        name: "Supply Chain Planning",
        head: "Lina Marlina",
        headPosition: "Manager Supply Chain",
        headcount: 200,
      },
    ],
  },
  marketing: {
    code: "marketing",
    name: "Marketing & Sales",
    fullName: "Divisi Marketing & Sales",
    director: "Direktur Komersial",
    headcount: 543,
    subDivisions: [
      {
        code: "marketing_team",
        name: "Marketing",
        head: "Fitri Handayani",
        headPosition: "Manager Marketing",
        headcount: 180,
      },
      {
        code: "sales_force",
        name: "Sales Force",
        head: "Andi Wijaya",
        headPosition: "Manager Sales",
        headcount: 283,
      },
      {
        code: "bizdev",
        name: "Business Development",
        head: "Reza Pahlevi",
        headPosition: "Manager Business Development",
        headcount: 80,
      },
    ],
  },
  corporate: {
    code: "corporate",
    name: "Corporate & Support",
    fullName: "Divisi Corporate & Support",
    director: "Multiple Directors",
    headcount: 200,
    subDivisions: [
      {
        code: "finance",
        name: "Finance & Accounting",
        head: "Rini Susanti, SE, M.Ak",
        headPosition: "Manager Finance",
        headcount: 65,
      },
      {
        code: "hc",
        name: "Human Capital",
        head: "Eko Wahyudi, S.Psi, M.M",
        headPosition: "Manager Human Capital",
        headcount: 45,
      },
      {
        code: "it",
        name: "IT & Digital Transformation",
        head: "Arief Rachman, S.Kom",
        headPosition: "Manager IT",
        headcount: 38,
      },
      {
        code: "legal",
        name: "Legal & Corporate Secretary",
        head: "Santi Dewi, S.H, M.H",
        headPosition: "Manager Legal",
        headcount: 28,
      },
      {
        code: "internal_audit",
        name: "Internal Audit & Risk Management",
        head: "Agung Nugroho, CIA",
        headPosition: "Manager Internal Audit",
        headcount: 24,
      },
    ],
  },
};

// =============================================================================
// SAMPLE EMPLOYEE DATA (Representatives from each division)
// =============================================================================

export const SAMPLE_EMPLOYEES: Employee[] = [
  // Retail & Apotek
  {
    id: "EMP001",
    nip: "KF-2015-001",
    name: "Budi Santoso",
    email: "budi.santoso@kimiafarma.co.id",
    phone: "081234567001",
    division: "retail",
    subDivision: "ops_apotek",
    position: "General Manager Operasional Apotek",
    level: "general_manager",
    joinDate: "2015-03-15",
    status: "active",
    location: "Head Office Jakarta",
  },
  {
    id: "EMP002",
    nip: "KF-2016-102",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@kimiafarma.co.id",
    division: "retail",
    subDivision: "ops_apotek",
    department: "regional_jawa",
    position: "Manager Regional Jawa",
    level: "manager",
    manager: "Budi Santoso",
    joinDate: "2016-07-20",
    status: "active",
    location: "Jakarta",
    regional: "Jawa",
  },
  {
    id: "EMP003",
    nip: "KF-2018-254",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@kimiafarma.co.id",
    division: "retail",
    subDivision: "ops_apotek",
    department: "regional_sumatera",
    position: "Manager Regional Sumatera",
    level: "manager",
    manager: "Budi Santoso",
    joinDate: "2018-02-10",
    status: "active",
    location: "Medan",
    regional: "Sumatera",
  },
  {
    id: "EMP004",
    nip: "KF-2019-389",
    name: "Dewi Lestari",
    email: "dewi.lestari@kimiafarma.co.id",
    division: "retail",
    subDivision: "ops_apotek",
    department: "regional_kalimantan",
    position: "Manager Regional Kalimantan",
    level: "manager",
    manager: "Budi Santoso",
    joinDate: "2019-05-18",
    status: "active",
    location: "Balikpapan",
    regional: "Kalimantan",
  },

  // Klinik & Laboratorium
  {
    id: "EMP020",
    nip: "KF-2014-045",
    name: "Dr. Ratna Sari",
    email: "ratna.sari@kimiafarma.co.id",
    division: "clinics",
    subDivision: "ops_klinik",
    position: "General Manager Klinik",
    level: "general_manager",
    joinDate: "2014-08-01",
    status: "active",
    location: "Head Office Jakarta",
  },
  {
    id: "EMP021",
    nip: "KF-2016-178",
    name: "Dr. Bambang Suryanto",
    email: "bambang.suryanto@kimiafarma.co.id",
    division: "clinics",
    subDivision: "ops_klinik",
    department: "medical_services",
    position: "Manager Medical Services",
    level: "manager",
    manager: "Dr. Ratna Sari",
    joinDate: "2016-11-15",
    status: "active",
    location: "Jakarta",
  },

  // Manufacturing
  {
    id: "EMP040",
    nip: "KF-2012-022",
    name: "Ir. Hendra Gunawan",
    email: "hendra.gunawan@kimiafarma.co.id",
    division: "manufacturing",
    subDivision: "plant_production",
    position: "General Manager Production",
    level: "general_manager",
    joinDate: "2012-01-10",
    status: "active",
    location: "Head Office Jakarta",
  },
  {
    id: "EMP041",
    nip: "KF-2015-098",
    name: "Agus Wijaya",
    email: "agus.wijaya@kimiafarma.co.id",
    division: "manufacturing",
    subDivision: "plant_production",
    department: "plant_jakarta",
    position: "Plant Manager Jakarta",
    level: "manager",
    manager: "Ir. Hendra Gunawan",
    joinDate: "2015-06-05",
    status: "active",
    location: "Plant Jakarta",
  },

  // Distribution
  {
    id: "EMP060",
    nip: "KF-2016-245",
    name: "Rudi Hartono",
    email: "rudi.hartono@kimiafarma.co.id",
    division: "distribution",
    subDivision: "warehouse",
    position: "Manager Warehouse",
    level: "manager",
    joinDate: "2016-09-20",
    status: "active",
    location: "DC Jakarta",
  },

  // Marketing & Sales
  {
    id: "EMP080",
    nip: "KF-2017-334",
    name: "Fitri Handayani",
    email: "fitri.handayani@kimiafarma.co.id",
    division: "marketing",
    subDivision: "marketing_team",
    position: "Manager Marketing",
    level: "manager",
    joinDate: "2017-03-12",
    status: "active",
    location: "Head Office Jakarta",
  },

  // Corporate
  {
    id: "EMP100",
    nip: "KF-2013-067",
    name: "Rini Susanti, SE, M.Ak",
    email: "rini.susanti@kimiafarma.co.id",
    division: "corporate",
    subDivision: "finance",
    position: "Manager Finance",
    level: "manager",
    joinDate: "2013-04-22",
    status: "active",
    location: "Head Office Jakarta",
  },
  {
    id: "EMP101",
    nip: "KF-2014-123",
    name: "Eko Wahyudi, S.Psi, M.M",
    email: "eko.wahyudi@kimiafarma.co.id",
    division: "corporate",
    subDivision: "hc",
    position: "Manager Human Capital",
    level: "manager",
    joinDate: "2014-09-15",
    status: "active",
    location: "Head Office Jakarta",
  },
];

// Helper functions
export function getDivisionByCode(code: DivisionCode): DivisionInfo {
  return KIMIA_FARMA_DIVISIONS[code];
}

export function getAllDivisions(): DivisionInfo[] {
  return Object.values(KIMIA_FARMA_DIVISIONS);
}

export function getSubDivisionsByDivision(divisionCode: DivisionCode) {
  return KIMIA_FARMA_DIVISIONS[divisionCode].subDivisions;
}

export function getEmployeesByDivision(divisionCode: DivisionCode): Employee[] {
  return SAMPLE_EMPLOYEES.filter((emp) => emp.division === divisionCode);
}
