# 📚 KAEF HRIS - Demo MVP Documentation

Selamat datang di dokumentasi Demo MVP Aplikasi Manajemen Kompetensi Kimia Farma.

---

## 🎯 QUICK START

**Baru mulai?** Baca dokumen ini secara berurutan:

1. **[TACTICAL PLAN (Product Manager Brief)](#1-tactical-plan)** ⬅️ START HERE
2. **[IMPLEMENTATION GUIDE](#2-implementation-guide)** - Quick start untuk coding
3. **[TECHNICAL SPEC](#3-technical-specification)** - Detail lengkap
4. **[WIREFRAME](#4-wireframe--mockup)** - Visual reference

---

## 📖 DOCUMENT INDEX

### 1. TACTICAL PLAN
**Lokasi:** Root folder - `project_brief.md`

**Isi:**
- Business requirements & rules
- User personas (Leaders vs Karyawan)
- 8 Data Inti Karyawan (Single Source of Truth)
- Competency Taxonomy (5 kategori, 24 items)
- Assessment table format (NON-NEGOTIABLE)
- Branding guidelines (Kimia Farma colors)

**Kapan baca:**
- ✅ Sebelum mulai coding (untuk memahami business context)
- ✅ Saat ada konflik keputusan desain (source of truth)

**Link:** [project_brief.md](../project_brief.md)

---

### 2. IMPLEMENTATION GUIDE
**Lokasi:** `docs/IMPLEMENTATION_GUIDE.md`

**Isi:**
- Quick start (30 menit setup)
- Folder structure
- TypeScript type definitions
- Router setup
- Mock data hooks
- 5 Reusable components (code lengkap)
- 3 Pages (code lengkap)
- Testing checklist
- Demo rehearsal script
- Troubleshooting

**Kapan baca:**
- ✅ Saat mulai coding (guide utama)
- ✅ Saat butuh copy-paste component

**Link:** [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

---

### 3. TECHNICAL SPECIFICATION
**Lokasi:** `docs/DEMO_MVP_SPEC.md`

**Isi:**
- Tech stack detail (Laravel + React + TypeScript)
- Arsitektur folder lengkap
- Design system (colors, typography, spacing)
- UI specifications untuk setiap halaman
- Component API specs
- Data structure & TypeScript types
- Mock API endpoints
- Demo script (Golden Path)
- Implementation checklist
- Success metrics

**Kapan baca:**
- ✅ Setelah quick start, untuk detail arsitektur
- ✅ Saat butuh referensi design system
- ✅ Untuk memahami data structure

**Link:** [DEMO_MVP_SPEC.md](./DEMO_MVP_SPEC.md)

---

### 4. WIREFRAME & MOCKUP
**Lokasi:** `docs/WIREFRAME_DEMO.md`

**Isi:**
- ASCII wireframe untuk 4 screens:
  - Leader Home (Dashboard)
  - Leader Team (List)
  - Employee Detail
  - Assessment Table (expanded)
- Color palette reference
- Component hierarchy diagram
- User flow diagram
- Responsive breakpoints
- Interaction states
- Typography examples
- Visual checklist

**Kapan baca:**
- ✅ Saat coding UI (untuk visual reference)
- ✅ Saat butuh alignment/spacing guidance
- ✅ Untuk understanding user flow

**Link:** [WIREFRAME_DEMO.md](./WIREFRAME_DEMO.md)

---

## 📊 MOCK DATA

### Data Files
Lokasi: `mock-data/` folder

1. **leader_team.json**
   - Leader profile (Lina Sari)
   - Team KPI aggregation
   - 7 team members dengan status bervariasi

2. **employee_detail_E001.json**
   - Full profile Budi Santoso
   - Assessment results (5 categories, all items)
   - Work history
   - Education
   - Training
   - Achievements
   - KPI personal

3. **Existing CSV files** (reference only):
   - leaders.csv
   - employee.csv
   - kompetensi.csv
   - kpi.csv
   - achievement.csv

### Using Mock Data
```typescript
// In your hooks
import leaderTeamMock from '@/../../mock-data/leader_team.json';
import employeeE001Mock from '@/../../mock-data/employee_detail_E001.json';
```

---

## 🎨 DESIGN SYSTEM QUICK REF

### Brand Colors
```css
Primary Blue:    #003A78  (buttons, headers, active states)
Secondary Orange: #F39200  (highlights, warnings)
Success Green:    #10B981  (✅ Fit status)
Warning Orange:   #F59E0B  (⚠️ Gap status)
Info Blue:        #3B82F6  (⬆️ Exceed status)
```

### Status Mapping
```
✅ Fit     → Green (#10B981)
⚠️ Gap    → Orange (#F59E0B)
⬆️ Exceed → Blue (#3B82F6)
```

### Format Rules (NON-NEGOTIABLE)
```
Expected:    3.0          (plain number)
Actual (Avg): 2.4          (NOT 2.4/5)
Fit Rate:    40%          (with %)
Gap:         -1, 0, +1    (signed integer)
Status:      ✅ Fit       (icon + label)
```

---

## 🚀 DEVELOPMENT WORKFLOW

### Phase 1: Setup (30 min)
1. Create folder structure
2. Setup TypeScript types
3. Configure router
4. Add Tailwind colors
5. Create mock data hooks

**Checklist:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#-quick-start-30-menit-setup)

### Phase 2: Components (2 hours)
Build 5 reusable components:
1. StatusBadge
2. KPICard
3. EmployeeCard
4. AssessmentTable (HERO)
5. BottomNavLeader

**Code:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#-build-reusable-components)

### Phase 3: Pages (2 hours)
Build 3 main pages:
1. LeaderHome (Dashboard)
2. LeaderTeam (List)
3. EmployeeDetail (Detail + Tabs)

**Code:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#-build-pages)

### Phase 4: Testing (1 hour)
- Flow testing
- Responsive testing
- Format validation
- Polish & transitions

**Checklist:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#-final-checklist)

### Phase 5: Demo Rehearsal (30 min)
Practice 5-minute presentation flow

**Script:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#-demo-rehearsal)

---

## 📋 KEY DECISIONS & RATIONALE

### Why Focus on Leaders (not Karyawan)?
**Decision:** Demo 100% fokus pada Leader persona

**Rationale:**
- Audiens = BOD level Direktur → Mereka adalah Leaders
- "Organizational view" lebih strategis & menjual
- Time constraint → lebih baik 1 flow perfect daripada 2 flow setengah

### Why Assessment Table is HERO Feature?
**Decision:** 70% development time untuk Assessment Table

**Rationale:**
- Ini adalah "Single Source of Truth" untuk kompetensi
- Most complex UI component
- Core value proposition: Gap analysis
- Format sangat specific (NON-NEGOTIABLE rules)

### Why Mock Data (not real API)?
**Decision:** Frontend-only demo dengan JSON mock

**Rationale:**
- Speed: API development butuh 2-3 hari
- Demo: Read-only, no mutations needed
- Flexibility: Gampang adjust data untuk presentasi
- Risk reduction: No backend dependencies

---

## ⚠️ NON-NEGOTIABLE RULES

### 1. Branding
```
❌ NEVER use blue/orange selain:
   #003A78 (Kimia Farma Blue)
   #F39200 (Kimia Farma Orange)
```

### 2. Assessment Table Format
```
❌ NEVER format average sebagai fraction (2.4/5)
✅ ALWAYS use plain number (2.4)

❌ NEVER skip percentage sign on Fit Rate
✅ ALWAYS show with % (40%)

❌ NEVER show gap without sign for positive
✅ ALWAYS show +1 (not 1)
```

### 3. Competency Taxonomy
```
❌ NEVER add/remove categories
✅ ALWAYS use 5 categories from project brief:
   1. Core Values (5 items)
   2. Generic (3 items)
   3. Management (4 items)
   4. Leadership (6 items)
   5. Technical (6 items)
```

---

## 🎯 SUCCESS CRITERIA

Demo dianggap **SUKSES** jika:

- [ ] Flow end-to-end berjalan tanpa error (Login → Assessment)
- [ ] Assessment Table menampilkan 5 kategori dengan format benar
- [ ] Warna branding konsisten (#003A78, #F39200)
- [ ] Audiens memahami value proposition dalam 5 menit
- [ ] Status badges (✅ ⚠️ ⬆️) terlihat jelas
- [ ] Responsive di mobile (375px tested)
- [ ] No console errors during demo

---

## 🔧 TROUBLESHOOTING

### "TypeScript errors on import"
→ Check path aliases di `tsconfig.json`

### "Routes not working"
→ Verify `competencyRoutes` merged ke main router

### "Mock data not found"
→ Adjust path: `@/../../mock-data/` atau `../../../../mock-data/`

### "Tailwind classes not applied"
→ Run `npm run build` untuk regenerate

**More:** See [IMPLEMENTATION_GUIDE.md - Troubleshooting](./IMPLEMENTATION_GUIDE.md#-troubleshooting)

---

## 📞 RESOURCES

### Internal Docs
- [Project Brief](../project_brief.md) - Business requirements
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Coding guide
- [Technical Spec](./DEMO_MVP_SPEC.md) - Architecture
- [Wireframe](./WIREFRAME_DEMO.md) - UI mockups

### External References
- [React Router v6](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Tabler Icons](https://tabler-icons.io/)
- [Tailwind CSS](https://tailwindcss.com/)

### Mock Data
- [leader_team.json](../mock-data/leader_team.json)
- [employee_detail_E001.json](../mock-data/employee_detail_E001.json)

---

## 📊 PROJECT STATUS

**Created:** 2024-11-04
**Status:** 📝 Documentation Complete, Ready for Development
**Estimated Dev Time:** 4-6 hours
**Demo Target Audience:** BOD Level (Direktur HR, Finance, Risk Management)

---

## 🗂️ FILE STRUCTURE

```
kaef-hris/
├── docs/
│   ├── README.md                    ← YOU ARE HERE
│   ├── IMPLEMENTATION_GUIDE.md      ← Quick start & code samples
│   ├── DEMO_MVP_SPEC.md             ← Technical specification
│   └── WIREFRAME_DEMO.md            ← UI mockups
│
├── mock-data/
│   ├── leader_team.json             ← Team data (NEW)
│   ├── employee_detail_E001.json    ← Employee detail (NEW)
│   ├── leaders.csv                  ← Reference
│   ├── employee.csv                 ← Reference
│   └── ...                          ← Other CSV files
│
├── project_brief.md                 ← Business requirements (SOURCE OF TRUTH)
│
└── resources/
    ├── app/
    │   ├── competency/              ← TO BE CREATED
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── competency.router.tsx
    │   └── ...
    │
    └── types/
        └── competency.d.ts          ← TO BE CREATED
```

---

## ✅ NEXT STEPS

1. ✅ **Review semua dokumen** (estimasi: 30 menit)
2. ✅ **Konfirmasi understanding** dengan PM/stakeholder
3. 🔜 **Start Phase 1: Setup** (30 menit)
4. 🔜 **Build Components** (2 jam)
5. 🔜 **Build Pages** (2 jam)
6. 🔜 **Testing & Polish** (1 jam)
7. 🔜 **Demo Rehearsal** (30 menit)

**Total:** 6.5 jam (termasuk review docs)

---

**Document Version:** 1.0
**Last Updated:** 2024-11-04
**Maintained By:** Product Manager - Competency Module
