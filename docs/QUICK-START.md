# Quick Start Guide - Kimia Farma HRIS Dashboard

**For:** Board of Directors Presentation
**Date:** October 30, 2025

---

## Start the Application

### Option 1: Development Server (Recommended)

```bash
# 1. Navigate to project directory
cd /Users/ei/works/ei/kaef-hris

# 2. Start the development server
npm run dev

# 3. Open browser to: http://localhost:5173
```

### Option 2: Production Build

```bash
# 1. Build the application
npm run build

# 2. Serve the production build
# (Instructions depend on your deployment setup)
```

---

## Access the Dashboard

1. **Login** with your existing credentials

2. **Click "Dashboard BOD"** in the sidebar
   - It's the second menu item (with chart icon)
   - Located between "Home" and "User Management"

3. **Alternative:** Direct URL
   - Navigate to: `http://localhost:5173/dashboard`

---

## Dashboard Sections Overview

### 📊 Top KPI Cards (4 metrics)

- Total Karyawan: 10,542
- HR Budget Utilization: 87.3%
- Succession Readiness: 78.5%
- Critical Alerts: 3

### 🏢 Division Overview (Left Column)

- Shows 6 business divisions
- Headcount per division
- Cost per employee
- Status indicators

### 💰 Financial Summary (Left Column)

- Total HR Cost: Rp 1.245T
- Cost per employee
- Payroll % of revenue
- Training budget utilization

### 👥 Talent Pipeline (Right Column)

- 342 high-potential employees
- Succession readiness: 78.5%
- Leadership bench breakdown

### ✅ Compliance Indicators (Right Column)

- 5 compliance categories
- Average score: 94.1%
- Last audit dates
- Action items

### 💡 Strategic Insights (Bottom)

- Strengths
- Areas for Attention
- Recommended Actions

---

## Important Notes

### This is a Prototype

- All data is **mock data** (not real)
- Data is scaled to Kimia Farma's actual size
- Based on research: 1,300+ outlets, 400+ clinics, 10,500+ employees

### Branding

- ✅ Kimia Farma colors applied
- ✅ Logo updated
- ✅ Professional BOD-level design

### Next Steps

After BOD presentation, we can:

1. Connect to real HRIS database
2. Add interactivity and drill-down
3. Implement data export features
4. Add role-based access control

---

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# The dev server will automatically try port 5174, 5175, etc.
# Or specify a port:
npm run dev -- --port 3000
```

### Application Won't Start

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Dashboard Not Showing in Sidebar

- Make sure you're logged in
- Dashboard visible to all users (no admin requirement)
- Refresh the page if needed

---

## For the Presentation

### Demo Flow Recommendation:

1. Show the **Kimia Farma branding** (logo, colors)
2. Explain **data scale** matches company reality
3. Walk through **each section** top to bottom
4. Highlight **strategic insights**
5. Emphasize this is a **prototype** ready for expansion

### Key Points to Mention:

- Built specifically for BOD-level decision making
- Clean, maintainable code architecture
- Ready to integrate with existing systems
- Realistic data based on company research
- Professional design appropriate for BUMN presentation

---

## Need Help?

### Documentation

- Full research: `docs/kimia-farma-research.md`
- Implementation plan: `docs/implementation-plan.md`
- Complete summary: `docs/project-summary.md`

### Code Location

```
resources/app/dashboard/
├── pages/bod-dashboard.tsx    # Main dashboard
├── components/                # Reusable components
├── data/mock-data.ts         # All dashboard data
└── types/dashboard.types.ts  # TypeScript definitions
```

---

**Ready for BOD Presentation** ✅

For questions or support, contact the IT Consultant team.
