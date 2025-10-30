# Kimia Farma - Strategic Research Document

**Project:** HR Management System for Board of Directors Presentation
**Client:** Director of HR, Risk Management & Finance, PT Kimia Farma Tbk
**Date:** October 30, 2025
**Purpose:** Deep research to inform BOD-level prototype development

---

## 1. Company Profile

### Overview

- **Full Name:** PT Kimia Farma Tbk (KAEF.JK)
- **Founded:** 1817 (207+ years - Indonesia's oldest pharmaceutical company)
- **Type:** State-Owned Enterprise (BUMN)
- **Headquarters:** Jakarta, Indonesia
- **Stock Exchange:** Jakarta Stock Exchange (JSX), Listed July 2002
- **Industry:** Pharmaceutical & Integrated Healthcare

### Company Scale & Significance

- **Market Position:** Indonesia's leading pharmaceutical company
- **Retail Network:** 1,300+ pharmaceutical outlets nationwide
- **Healthcare Facilities:** 400+ health clinics managed
- **Export Markets:** Asia, Europe, Australia, Africa, United States
- **Corporate Status:** Publicly-traded BUMN with BOD oversight

---

## 2. Business Divisions (Critical for HR Segmentation)

Kimia Farma operates as an **integrated healthcare company** with **six main business portfolios**:

### 2.1 Pharmaceutical Manufacturing

- Core pharmaceutical production
- Research & Development facilities
- Quality control and regulatory compliance

### 2.2 Marketing & Sales

- Brand management
- Market expansion strategies
- Sales force management

### 2.3 Distribution & Trading

- Nationwide distribution network
- Supply chain management
- Logistics operations

### 2.4 Pharmaceutical Retail

- 1,300+ Kimia Farma Apotek outlets
- Retail staff management
- Customer service operations

### 2.5 Clinical Laboratory

- Diagnostic services
- Laboratory technicians
- Quality assurance

### 2.6 Medical Clinics & Healthcare Services

- 400+ health clinics
- Medical professionals management
- Patient care services

### Product Lines

- Generic medications
- Consumer health products (herbal medicines & cosmetics)
- Branded ethical pharmaceuticals
- Antiretroviral drugs
- Narcotics (controlled substances)
- Contraceptives
- Raw pharmaceutical materials

---

## 3. Brand Identity Guidelines

### Official Brand Colors

Based on official Brandfetch data:

**Primary Colors:**

- **Metallic Bronze:** `#54361e` (Dark theme - represents heritage and trust)
- **Sunglow:** `#fed235` (Light theme - represents vitality and innovation)
- **Tangerine:** `#f39200` (Accent - represents energy and pharmaceutical excellence)

**Supporting Colors:**

- **Dark (Logo):** `#080808` (For text and logo elements)
- **White/Transparent:** For backgrounds and contrast

### Typography

- **Primary Font:** Source Sans Pro (Google Font)
- **Body Font:** Inter (current boilerplate) - acceptable modern alternative

### Logo Specifications

- **Formats Available:** PNG, SVG, JPEG
- **Icon Size:** 400×400px
- **Logo Size:** 820×295px with transparent background
- **Banner:** 1500×500px

### Brand Essence

- **Heritage:** Founded 1817 - emphasize longevity and trust
- **Positioning:** Indonesia's oldest and most trusted pharmaceutical company
- **Values:** Quality, Trust, Innovation, Public Service (BUMN mission)

---

## 4. Organizational Structure Insights

### Leadership Structure

- **Board of Directors (BOD):** Ultimate decision-makers
- **Director of Human Resources:** Recently appointed (2024, 5-year term until 2029)
- **Key Functions Reporting to BOD:**
  - HR & Human Capital Development
  - Risk Management
  - Finance & Treasury
  - Operations (across 6 business divisions)

### HR Strategic Focus Areas

According to published research on Kimia Farma's HC strategy:

1. **Human Resource Planning**
   - Workforce analytics
   - Succession planning
   - Strategic talent acquisition

2. **Human Resource Development**
   - Training programs
   - Career development
   - Leadership pipeline

3. **Performance Management**
   - KPI tracking
   - Performance reviews
   - Productivity metrics

4. **Remuneration System**
   - Compensation structure
   - Benefits administration
   - Salary benchmarking

5. **Human Capital Information System (HCIS)**
   - HR data management
   - Analytics and reporting
   - Digital transformation

---

## 5. BOD Presentation Requirements

### What the BOD Wants to See

Based on the brief and corporate context:

#### A. Strategic Overview (Top-Level View)

- **Total workforce metrics** across all 6 divisions
- **Headcount distribution** by business unit
- **HR cost analysis** as percentage of revenue
- **Key HR KPIs** at a glance

#### B. Risk & Compliance Dashboard

- **Regulatory compliance status** (pharmaceutical industry heavily regulated)
- **Safety incidents tracking** (critical in pharma operations)
- **Training completion rates** (regulatory requirement)
- **License/certification management**

#### C. Talent Management

- **Executive succession planning** status
- **High-potential employee pipeline**
- **Critical role vacancy rates**
- **Leadership bench strength**

#### D. Financial Impact

- **Payroll costs by division**
- **Training ROI metrics**
- **Recruitment cost per hire**
- **Turnover cost analysis**

#### E. Operational Excellence

- **Employee productivity metrics**
- **Absenteeism rates**
- **Time-to-fill for critical positions**
- **Employee satisfaction scores**

### Presentation Considerations

- **Familiarity:** Use Kimia Farma terminology, division names, and actual organizational structure
- **Data Realism:** Mock data should reflect a 1,300+ outlet, 400+ clinic operation scale
- **Visual Professionalism:** BOD expects polished, executive-level dashboards
- **Strategic Focus:** Top-down view, not operational details
- **Action-Oriented:** Highlight areas requiring BOD attention/approval

---

## 6. Technical Implementation Strategy

### Brand Customization Checklist

- [ ] Update CSS variables with Kimia Farma colors (#54361e, #fed235, #f39200)
- [ ] Replace logo in `/public/app-logo.png`
- [ ] Update favicons in `/public/favicons/`
- [ ] Update manifest.webmanifest with Kimia Farma branding
- [ ] Update page titles and metadata
- [ ] Ensure color contrast meets WCAG standards for executive dashboards

### Component Reuse Strategy

**Existing Components to Leverage:**

- `resources/ui/card.tsx` - for KPI cards
- `resources/ui/table.tsx` - for data tables
- `resources/ui/tabs.tsx` - for division navigation
- `resources/ui/page.tsx` - for layout structure
- Chart components (if available) - for visualizations

### Data Structure Considerations

**Realistic Scale for Mock Data:**

- Total employees: ~8,000-12,000 (estimated for operations of this scale)
- Retail staff: ~4,000-5,000 (1,300 outlets × 3-4 staff avg)
- Clinic staff: ~2,000-2,500 (400 clinics × 5-6 staff avg)
- Manufacturing: ~1,500-2,000
- Distribution: ~1,000-1,500
- Corporate/Support: ~500-1,000

---

## 7. Prototype MVP Features

### Phase 1: BOD Dashboard (Current Scope)

1. **Executive Summary Dashboard**
   - Total headcount with trend
   - HR budget utilization
   - Key alerts/risks
   - Strategic initiatives status

2. **Division Overview**
   - Headcount by 6 business divisions
   - Cost per division
   - Productivity metrics
   - Critical vacancies

3. **Talent & Succession**
   - Leadership pipeline visualization
   - Succession readiness score
   - High-potential talent pool
   - Critical role coverage

4. **Risk & Compliance**
   - Compliance score by category
   - Training completion status
   - Safety incident trends
   - Audit findings summary

5. **Financial Analytics**
   - Payroll cost trends
   - Cost per employee by division
   - Benefits utilization
   - Budget vs actual

### Design Principles

- **Clean Architecture:** Small, focused components
- **DRY Principle:** Reuse existing UI components
- **Separation of Concerns:** Data, UI, and business logic separated
- **Maintainability:** Clear file structure, self-documenting code
- **Performance:** Optimized for executive-level data visualization

---

## 8. Competitive Context & Industry Standards

### Pharmaceutical Industry HR Considerations

- **Highly Regulated:** Requires strict compliance tracking
- **Specialized Workforce:** Pharmacists, lab technicians, medical professionals
- **Certification Management:** Ongoing license renewals
- **Safety Critical:** Incident reporting and prevention
- **Quality Standards:** GMP (Good Manufacturing Practice) compliance

### BUMN Expectations

- **Transparency:** Government accountability
- **Strategic Alignment:** National healthcare objectives
- **Efficiency Metrics:** ROI on public investment
- **Social Impact:** Employment and community contribution

---

## 9. Key Success Factors for BOD Presentation

### Must-Haves

1. **Kimia Farma branding throughout** (colors, logo, terminology)
2. **Realistic data scale** reflecting actual company size
3. **Executive-level insights** not operational details
4. **Professional polish** appropriate for BOD presentation
5. **Clear ROI/value story** for HR system investment

### Risk Mitigation

- **Data validation:** Ensure numbers are internally consistent
- **Terminology accuracy:** Use correct Kimia Farma division names
- **Visual consistency:** Maintain brand guidelines throughout
- **Performance:** Fast load times for live demo

---

## 10. Next Steps & Recommendations

### Immediate Actions

1. Confirm with client: Specific division names and structure
2. Validate: Employee count ranges for realistic mock data
3. Clarify: Specific KPIs the BOD currently tracks
4. Verify: Any existing HR systems to integrate/replace

### Questions for Client

- What are the current pain points in HR reporting to BOD?
- Which metrics are most critical for BOD decision-making?
- Are there any sensitive data display considerations?
- Timeline for BOD presentation?
- Will this be a live demo or recorded presentation?

---

**Document Status:** Initial Research Complete
**Next Update:** Post-client validation meeting
**Owner:** IT Consultant Team
**Classification:** Client Confidential
