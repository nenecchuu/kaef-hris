export const ADMIN_TYPE = {
  super: 1,
  hr: 2,
  finance: 3,
} as const;

export const EMPLOYEE_TYPE = {
  inhouse: 1,
  outsourced: 2,
} as const;

export const ADMIN_TYPE_LABEL = {
  super: "Super Admin",
  hr: "HCM",
  finance: "Finance",
} as const;

export const EMPLOYEE_TYPE_LABEL = {
  inhouse: "In House",
  outsourced: "Alihdaya",
} as const;

export const EMPLOYEE_GRADE = {
  G1: 1,
  G2: 2,
  G3: 3,
  G4: 4,
} as const;

export const EMPLOYEE_GRADE_LABEL = {
  G1: "Grade 1",
  G2: "Grade 2",
  G3: "Grade 3",
  G4: "Grade 4",
} as const;

export const PPH21_TYPE = {
  pph21_1: 1,
  pph21_2: 2,
  pph21_3: 3,
  pph21_4: 4,
} as const;

export const PPH21_TYPE_LABEL = {
  pph21_1: "No PPh21",
  pph21_2: "Gross",
  pph21_3: "Nett (Ditanggung)",
  pph21_4: "Gross Up (Ditunjang)",
} as const;

export const BPJS_TYPE = {
  bpjs_1: 1,
  bpjs_2: 2,
} as const;

export const BPJS_TYPE_LABEL = {
  bpjs_1: "Normal",
  bpjs_2: "Gross",
} as const;
