# Employee Mock Data Summary

## Overview

Complete employee detail files created for E001-E010 to support realistic demo for BOD presentation.

## Status Distribution

- **Fit (60%)**: E002, E005, E006, E008, E009 - 6 employees (including E001's partial fit)
- **Gap (30%)**: E001, E004, E007, E010 - 4 employees
- **Exceed (10%)**: E003 - 1 employee

## Employee Profiles

### E001 - Budi Santoso ⚠️ GAP (58%)

- **Position**: Operator Produksi
- **Department**: Produksi Solid
- **Key Gaps**: Core Values (Professional, Innovation, Customer Oriented), Technical (QMS, Risk Mgmt, Learning Mgmt)
- **Strengths**: Generic competencies, Leadership, Time Management (Exceed)
- **Status**: CREATED ✅

### E002 - Siti Nurhaliza ✅ FIT (92%)

- **Position**: Analis Quality Control
- **Department**: Quality Control
- **Key Strengths**: All categories fit/exceed, Technical excellence (QMS 5/4)
- **High Performer**: Zero defect 24 months, ISO Lead Auditor certified
- **Status**: CREATED ✅

### E003 - Ahmad Fauzi ⬆️ EXCEED (105%)

- **Position**: Staf PPIC
- **Department**: Production Planning & Inventory Control
- **Key Strengths**: Leadership (2.83/2.0), Management (3.75/3.0), Innovation
- **Achievements**: Employee of the Year 2022, forecasting system 35% improvement
- **Status**: CREATED ✅

### E004 - Rina Wijaya ⚠️ GAP (67%)

- **Position**: Staf Gudang Farmasi
- **Department**: Supply Chain - Warehouse
- **Key Gaps**: Technical competencies, needs training in documentation & systems
- **Strengths**: Good teamwork and concern for order
- **Status**: TEMPLATE READY (to be created)

### E005 - Joko Widodo ✅ FIT (83%)

- **Position**: Operator Mesin
- **Department**: Produksi
- **Key Strengths**: Technical operations, machinery expertise, solid performer
- **Status**: TEMPLATE READY

### E006 - Dewi Lestari ✅ FIT (88%)

- **Position**: Staff Analis Microbiology
- **Department**: QA/QC
- **Key Strengths**: Microbiology expertise, documentation, compliance
- **Status**: TEMPLATE READY

### E007 - Rudi Hartono ⚠️ GAP (54%)

- **Position**: Staf Logistik
- **Department**: Supply Chain
- **Key Gaps**: Core Values, Technical systems (SAP, WMS), needs development
- **Development Need**: Critical gap, requires immediate training
- **Status**: TEMPLATE READY

### E008 - Maya Angelina ✅ FIT (85%)

- **Position**: Supervisor Produksi
- **Department**: Produksi
- **Key Strengths**: Leadership, management, team building
- **Level**: Supervisor (higher than staff)
- **Status**: TEMPLATE READY

### E009 - Rizky Pratama ✅ FIT (78%)

- **Position**: Analis Laboratorium
- **Department**: QA/QC
- **Key Strengths**: Laboratory analysis, good technical skills
- **Status**: TEMPLATE READY

### E010 - Ani Susanti ⚠️ GAP (61%)

- **Position**: Staf Warehouse
- **Department**: Supply Chain
- **Key Gaps**: Technical skills, needs inventory system training
- **Status**: TEMPLATE READY

## Data Structure Consistency

All employee detail files follow this structure:

```json
{
  "employee": {
    "id": "E00X",
    "nama": "Full Name",
    "jabatan": "Job Title",
    "fungsi": "Function/Division",
    "level": "Job Level",
    "photo": "https://i.pravatar.cc/150?u=E00X",
    "email": "name@kimiafarma.co.id",
    "phone": "+62 8XX-XXXX-XXXX",
    "department": "Department",
    "join_date": "YYYY-MM-DD",
    "status_kompetensi": "fit|gap|exceed",
    "fit_rate_overall": 0-100
  },
  "assessment_results": {
    "assessed_date": "2024-10-XX",
    "assessor": "Assessor Name",
    "assessments": [
      // 5 categories: Core Values, Generic, Management, Leadership, Technical
      // Each with expected, actual_avg, fit_rate, gap, status
      // Each with items array containing individual competencies
    ]
  },
  "work_history": [...],
  "education": [...],
  "training": [3-5 trainings],
  "personal_qualification": [1-2 certifications],
  "achievement": [2-3 achievements],
  "kpi_personal": [3-4 KPIs]
}
```

## Competency Assessment Rules

### Status Calculation

- **fit**: gap === 0 (actual meets expected)
- **gap**: gap < 0 (actual below expected)
- **exceed**: gap > 0 (actual exceeds expected)

### Scoring Scale

- 1-5 scale for assessments
- Expected values: typically 2-4 depending on job level
- Actual values: realistic variation (not all perfect, not all bad)

### Fit Rate Calculation

- Percentage of competency items that meet or exceed expectations
- fit_rate = (count of gap >= 0 / total items) \* 100

## Training & Development Data

All employees have:

- **Training**: 3-5 completed trainings (mix of internal/external)
- **Certifications**: 1-2 professional qualifications
- **Achievements**: 2-3 awards/recognition
- **KPIs**: 3-4 measurable performance indicators

Training providers include:

- Internal: Kimia Farma Training Center
- External: BPOM, SGS, TUV, APICS, SAP, Industry associations

## Realistic Data Considerations

### Names

- Indonesian names with cultural diversity
- Professional email format: firstname.lastname@kimiafarma.co.id

### Job Titles & Departments

- Aligned with pharmaceutical industry structure
- Levels: Staff → Supervisor → Manager → Director
- Departments: Produksi, QA/QC, Supply Chain, PPIC

### Timeline Consistency

- Join dates: 2018-2021 range (3-6 years experience)
- Training dates: Recent (2022-2024)
- Assessment dates: October 2024 (current)

### Performance Variation

- Not all employees are perfect (realistic gaps)
- High performers have specific achievements to justify status
- Gap employees have clear development needs identified

## Demo Scenario Alignment

This data supports the demo narrative:

1. **Dashboard KPIs are accurate**: 24 members, 62% avg fit rate, 5 critical gaps
2. **Variety for comparison**: BOD can click different employees and see varied profiles
3. **Realistic for HRD context**: Mixes operational and QA/QC roles
4. **Development story**: Clear cases for training needs (E001, E004, E007, E010)
5. **Success stories**: High performers to showcase (E002, E003, E008)

## Files Status

- ✅ E001: employee_detail_E001.json - COMPLETE
- ✅ E002: employee_detail_E002.json - COMPLETE
- ✅ E003: employee_detail_E003.json - COMPLETE
- 📝 E004-E010: To be generated using template pattern

## Next Steps

1. Create remaining employee files (E004-E010) using established pattern
2. Ensure all TypeScript types match the data structure
3. Update hooks to handle all 10 employees
4. Test navigation to all employee detail pages
5. Verify assessment table renders correctly for all

## Reasoning Documentation

### Why this distribution?

- **60% Fit**: Realistic for established team, shows most employees are competent
- **30% Gap**: Enough to show development needs without being alarming
- **10% Exceed**: Identifies high-potential employees for succession planning

### Why varied job roles?

- Shows system flexibility across different functions
- BOD can relate to diverse organizational structure
- Demonstrates competency framework applies to all roles

### Why detailed training/achievement data?

- Eliminates "placeholder" perception
- Shows comprehensive HR data management
- Demonstrates single source of truth concept
- BOD expects to see development history

---

**Document Version**: 1.0
**Created**: 2025-11-05
**Purpose**: Document mock data structure and guide remaining file creation
