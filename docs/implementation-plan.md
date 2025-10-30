# Kimia Farma HRIS - BOD Prototype Implementation Plan

**Project:** HR Management System - Board of Directors Prototype
**Date:** October 30, 2025
**Status:** Ready for Implementation

---

## 1. Technical Architecture Overview

### Current Stack Analysis

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Laravel (PHP)
- **Styling:** Tailwind CSS with HSL custom color system
- **UI Components:** Radix UI + Custom component library
- **State Management:** @tanstack/react-query
- **Routing:** React Router v6
- **Icons:** @tabler/icons-react

### Component Reuse Strategy

**Reusable Components Identified:**

- ✅ `resources/ui/card.tsx` - KPI cards
- ✅ `resources/ui/table.tsx` - data tables
- ✅ `resources/ui/tabs.tsx` - division navigation
- ✅ `resources/ui/page.tsx` - page layout
- ✅ `resources/ui/button.tsx` - interactive elements
- ✅ `resources/ui/select.tsx` - filters/dropdowns
- ✅ `resources/components/badge` - status indicators

---

## 2. Brand Customization Tasks

### Phase 1: Visual Identity Update

#### Task 2.1: Update CSS Color System

**File:** `resources/css/app.css`
**Action:** Replace brand primary colors with Kimia Farma palette

**Kimia Farma Color System:**

```css
/* Primary Brand Colors */
--brand-primary: 24 52 24; /* #54361e - Metallic Bronze */
--brand-primary-light: 48 100 95; /* #fed235 - Sunglow (light shade) */
--brand-primary-dark: 24 52 15; /* Darker Bronze */

/* Accent */
--brand-accent: 32 100 50%; /* #f39200 - Tangerine */

/* Supporting */
--brand-gold: 48 100 62%; /* #fed235 - Sunglow */
```

**Implementation:**

- Replace all `--brand-primary` references
- Update `--color-base-primary` to use Kimia Farma bronze
- Adjust contrast ratios for accessibility
- Test all UI components with new colors

#### Task 2.2: Replace Logo Component

**File:** `resources/components/app-logo/app-logo/app-logo.jsx`
**Action:** Replace SVG content with Kimia Farma logo

**Steps:**

1. Download official Kimia Farma logo SVG from brandfetch
2. Extract SVG paths and viewBox
3. Replace entire SVG content in `app-logo.jsx`
4. Ensure proper sizing for sidebar (maintain proportions)
5. Test responsiveness

#### Task 2.3: Update Public Assets

**Files to Update:**

- `/public/app-logo.png` - Replace with Kimia Farma logo PNG
- `/public/favicons/favicon.ico` - Kimia Farma icon
- `/public/favicons/favicon.svg` - Kimia Farma SVG icon
- `/public/favicons/favicon-192.png` - 192x192 icon
- `/public/favicons/favicon-512.png` - 512x512 icon
- `/public/favicons/apple-icon-touch.png` - iOS icon
- `/public/favicons/manifest.webmanifest` - Update app name and theme color

**Manifest Updates:**

```json
{
  "name": "Kimia Farma HRIS",
  "short_name": "KF HRIS",
  "theme_color": "#54361e",
  "background_color": "#fed235",
  "icons": [...]
}
```

#### Task 2.4: Update Document Metadata

**Files:**

- `resources/views/app.blade.php` (if exists) or main HTML entry
- Update `<title>` to "Kimia Farma - Human Resources Information System"
- Update meta descriptions

---

## 3. BOD Dashboard Implementation

### Phase 2: Dashboard Architecture

#### File Structure (Clean Architecture)

```
resources/app/dashboard/
├── pages/
│   └── bod-dashboard.tsx          # Main BOD dashboard page
├── components/
│   ├── kpi-card.tsx               # Reusable KPI display card
│   ├── division-overview.tsx      # Division breakdown component
│   ├── talent-pipeline.tsx        # Succession planning widget
│   ├── compliance-indicator.tsx   # Compliance status component
│   ├── financial-summary.tsx      # HR financial metrics
│   └── chart-wrapper.tsx          # Chart container component
├── data/
│   └── mock-data.ts               # Realistic mock data
├── hooks/
│   └── use-dashboard-data.ts      # Data fetching logic
└── types/
    └── dashboard.types.ts          # TypeScript interfaces
```

### Phase 3: Component Development

#### Component 3.1: KPI Card (Small, Reusable)

**File:** `resources/app/dashboard/components/kpi-card.tsx`
**Props:**

```typescript
interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: ReactNode;
  status?: "success" | "warning" | "error" | "neutral";
}
```

**Reuses:** `Card` from `ui/card.tsx`, Tabler icons

#### Component 3.2: Division Overview

**File:** `resources/app/dashboard/components/division-overview.tsx`
**Features:**

- Horizontal bar chart showing headcount by division
- Percentage of total workforce
- Click to drill-down (future enhancement)
  **Data Structure:**

```typescript
interface DivisionData {
  name: string;
  headcount: number;
  percentage: number;
  status: "healthy" | "attention" | "critical";
}
```

#### Component 3.3: Talent Pipeline Visualization

**File:** `resources/app/dashboard/components/talent-pipeline.tsx`
**Features:**

- Succession readiness funnel
- High-potential employee count
- Critical role coverage percentage
  **Visualization:** Simple horizontal progress bars

#### Component 3.4: Compliance Dashboard

**File:** `resources/app/dashboard/components/compliance-indicator.tsx`
**Metrics:**

- Training completion rate (regulatory requirement)
- License/certification status
- Safety incident trends
- Audit findings summary

#### Component 3.5: Financial Summary

**File:** `resources/app/dashboard/components/financial-summary.tsx`
**Metrics:**

- Total HR cost (IDR billions)
- Cost per employee by division
- Payroll as % of revenue
- Training ROI

---

## 4. Mock Data Strategy

### Data Scale (Based on Research)

```typescript
const KIMIA_FARMA_SCALE = {
  totalEmployees: 10500,
  divisions: {
    retail: { name: "Retail (Apotek)", employees: 4200, outlets: 1300 },
    clinics: { name: "Klinik & Lab", employees: 2500, facilities: 400 },
    manufacturing: { name: "Manufaktur", employees: 1800, sites: 5 },
    distribution: { name: "Distribusi", employees: 1200, warehouses: 12 },
    marketing: { name: "Marketing & Sales", employees: 600 },
    corporate: { name: "Corporate & Support", employees: 200 },
  },
  annualRevenue: 12000000000000, // IDR 12 trillion (estimated)
  hrBudget: 1200000000000, // IDR 1.2 trillion (10% of revenue estimate)
};
```

### Mock Data File

**File:** `resources/app/dashboard/data/mock-data.ts`
**Includes:**

- KPI metrics with realistic values
- Division breakdown
- Trend data (last 12 months)
- Compliance metrics
- Financial data
- Talent pipeline data

---

## 5. Routing Integration

### Update User Router

**File:** `resources/app/user.router.tsx`
**Addition:**

```typescript
import { BODDashboardPage } from "@src/app/dashboard/pages/bod-dashboard";

// Add route under MfaGuard
<Route path="dashboard" element={<BODDashboardPage />} />
```

### Update Site Navigation

**File:** `resources/constants/site-navigation.js` (or .ts if exists)
**Addition:**

```typescript
{
  key: 'dashboard',
  name: 'Dashboard BOD',
  pathname: '/dashboard',
  icon: IconDashboard,
  userType: [1, 2] // Admin access
}
```

---

## 6. Design Patterns & Code Quality

### Clean Code Principles Applied

#### 1. **Single Responsibility Principle**

- Each component has one clear purpose
- KPI Card only displays KPIs
- Data fetching separated into hooks

#### 2. **DRY (Don't Repeat Yourself)**

- Reuse existing UI components
- Create shared KPI card component
- Centralized mock data

#### 3. **Separation of Concerns**

```
Presentation Layer (Components)
    ↓
Business Logic (Hooks)
    ↓
Data Layer (Mock Data / API)
```

#### 4. **Component Size**

- Max 200 lines per component
- Extract sub-components when needed
- Keep functions small and focused

#### 5. **TypeScript Best Practices**

- Strict typing for all props
- Interfaces in separate types file
- No `any` types

#### 6. **File Naming Convention**

- Components: `kebab-case.tsx`
- Types: `dashboard.types.ts`
- Hooks: `use-dashboard-data.ts`
- Utils: `format-currency.ts`

---

## 7. Implementation Sequence

### Step-by-Step Execution Order

**Sprint 1: Brand Update (1-2 hours)**

1. ✅ Update CSS color variables
2. ✅ Create/update Kimia Farma logo SVG component
3. ✅ Replace public assets (logo, favicons)
4. ✅ Update manifest and metadata
5. ✅ Visual QA across existing pages

**Sprint 2: Data & Types (30 min)** 6. ✅ Create TypeScript interfaces 7. ✅ Generate realistic mock data 8. ✅ Create data formatting utilities

**Sprint 3: Core Components (2-3 hours)** 9. ✅ Build KPI Card component 10. ✅ Build Division Overview component 11. ✅ Build Compliance Indicator component 12. ✅ Build Financial Summary component 13. ✅ Build Talent Pipeline component

**Sprint 4: Dashboard Assembly (1-2 hours)** 14. ✅ Create main BOD Dashboard page 15. ✅ Integrate all components 16. ✅ Add responsive layout 17. ✅ Implement loading states

**Sprint 5: Integration & Polish (1 hour)** 18. ✅ Add route to router 19. ✅ Add navigation menu item 20. ✅ Final QA and refinements 21. ✅ Performance optimization

---

## 8. Success Criteria

### Must Have

- [x] Kimia Farma brand colors throughout
- [x] Official logo displayed correctly
- [x] BOD dashboard with 5 key sections
- [x] Realistic data scale (10,500 employees)
- [x] Professional, executive-level design
- [x] Responsive (desktop-first for BOD presentation)
- [x] Fast load time (<2 seconds)

### Should Have

- [x] Hover interactions on charts
- [x] Smooth transitions
- [x] Print-friendly layout
- [x] Export capability (future)

### Could Have

- [ ] Real-time data updates
- [ ] Drill-down navigation
- [ ] Custom date range filters

---

## 9. Technical Debt Prevention

### Code Quality Checklist

- [ ] All components under 200 lines
- [ ] All functions have single responsibility
- [ ] No duplicate code
- [ ] Proper TypeScript typing
- [ ] Comments for complex logic
- [ ] Consistent naming conventions
- [ ] No console.logs in production code

### Performance Checklist

- [ ] Lazy loading for dashboard route
- [ ] Memoization for expensive calculations
- [ ] Optimized re-renders (React.memo where needed)
- [ ] No unnecessary API calls
- [ ] Efficient data structures

---

## 10. Next Steps Post-Implementation

### Client Validation

1. Present prototype to Director of HR
2. Gather feedback on:
   - Data accuracy and scale
   - KPI relevance
   - Visual design preferences
   - Additional metrics needed

### Iteration Plan

1. Incorporate BOD feedback
2. Add drill-down capabilities
3. Connect to real backend APIs
4. Add data export functionality
5. Implement role-based access control

---

**Document Owner:** IT Consultant Team
**Last Updated:** October 30, 2025
**Status:** Ready for Development
