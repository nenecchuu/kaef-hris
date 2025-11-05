# 📐 WIREFRAME & MOCKUP - Demo MVP

Dokumen ini berisi wireframe ASCII art untuk visualisasi UI demo.

---

## 📱 SCREEN 1: Leader Home (Dashboard)

```
┌─────────────────────────────────────┐
│ ╔═══════════════════════════════╗   │
│ ║  [👤]  Selamat Pagi,          ║   │
│ ║        Lina Sari              ║   │
│ ║  Direktur Keuangan dan        ║   │
│ ║  Manajemen Risiko             ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 👥 Total Anggota Tim          │ │
│ │     24                         │ │
│ │     +2 dari bulan lalu         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📊 Rata-rata Fit Rate Tim     │ │
│ │     62%                        │ │
│ │     +5% dari bulan lalu  🟢   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⚠️  Gap Kritis                 │ │
│ │     5                          │ │
│ │     Karyawan perlu development │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ Status Distribusi:            ║   │
│ ║ ✅ Fit: 15  (62.5%)           ║   │
│ ║ ⚠️  Gap: 7   (29.2%)          ║   │
│ ║ ⬆️  Exceed: 2 (8.3%)          ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │[🏠]  [👥]  [📊]  [🔔]  [⋯]   │   │
│ │Home  Tim  Analisis Notif More│   │
│ │ ━━                            │   │ ← Active indicator
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Key Elements:**
- Header dengan avatar & greeting
- 3 KPI Cards dengan icon, value, dan trend
- Quick stats section (distribusi status)
- Bottom Navigation (Home active)

**Colors:**
- Header background: `#003A78` (primary blue)
- KPI Cards: white dengan border subtle
- Trend positif: green
- Gap warning: `#F39200` (secondary orange)

---

## 📱 SCREEN 2: Leader Tim (Team List)

```
┌─────────────────────────────────────┐
│ ╔═══════════════════════════════╗   │
│ ║  Tim Saya                     ║   │
│ ║  24 Anggota                   ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Cari nama karyawan...        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Semua] [✅ Fit] [⚠️ Gap] [⬆️ Exceed]│ ← Filter chips
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┃ [👤] Budi Santoso             │ │ ← Orange border-left
│ │┃ Operator Produksi              │ │
│ │┃ Operasi / Produksi             │ │
│ │┃                    ⚠️ Gap 58% │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┃ [👤] Siti Nurhaliza           │ │ ← Green border-left
│ │┃ Analis Quality Control         │ │
│ │┃ Operasi / QA/QC                │ │
│ │┃                    ✅ Fit 92% │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┃ [👤] Ahmad Fauzi              │ │ ← Blue border-left
│ │┃ Staf PPIC                      │ │
│ │┃ Operasi / PPIC                 │ │
│ │┃                ⬆️ Exceed 105% │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┃ [👤] Rina Wijaya              │ │
│ │┃ Staf Gudang Farmasi            │ │
│ │┃ Operasi / Supply Chain         │ │
│ │┃                    ⚠️ Gap 67% │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ... (3 more employees) ...          │
│                                     │
│ ┌───────────────────────────────┐   │
│ │[🏠]  [👥]  [📊]  [🔔]  [⋯]   │   │
│ │Home  Tim  Analisis Notif More│   │
│ │      ━━                       │   │ ← Active indicator
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Key Elements:**
- Header dengan total count
- Search bar (non-functional untuk demo)
- Filter chips (optional)
- Employee cards dengan border-left warna status
- Bottom Navigation (Tim active)

**Interaction:**
- Click any card → Navigate to Employee Detail

---

## 📱 SCREEN 3: Employee Detail (Budi Santoso)

```
┌─────────────────────────────────────┐
│ [←] Detail Karyawan          [⋮]   │
│                                     │
│      ┌─────────────┐                │
│      │   [👤]      │                │ ← Large avatar
│      │   Photo     │                │
│      └─────────────┘                │
│                                     │
│   Budi Santoso                      │
│   Operator Produksi                 │
│   Operasi / Produksi                │
│   Staf (Pelaksana)                  │
│                                     │
│   ┌──────────────┐                  │
│   │ ⚠️ Gap 58% │                  │ ← Status badge
│   └──────────────┘                  │
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ TABS:                         ║   │
│ ║┌────┬────┬─────┬─────┬─────┐ ║   │
│ ║│Riw │Pend│Hasil│Train│Komp │ ║   │ ← Scrollable tabs
│ ║│Kerja│    │Ases │ing  │etensi│ ║   │
│ ║└────┴────┴──┬──┴─────┴─────┘ ║   │
│ ║             ▼ (Active)        ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┌────┬────┬────┬────┬───┐       │ │
│ ││Qual│Achi│KPI │    │   │       │ │ ← Second row tabs
│ ││ific│eve │Pers│    │   │       │ │
│ ││ation│ment│onal│    │   │       │ │
│ │└────┴────┴────┴────┴───┘       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ Hasil Assessment              ║   │
│ ║ Terakhir diupdate: 15 Okt 2024║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ [Scroll down untuk lihat tabel] ⬇️  │
│                                     │
│ ┌───────────────────────────────┐   │
│ │[🏠]  [👥]  [📊]  [🔔]  [⋯]   │   │
│ │Home  Tim  Analisis Notif More│   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

**After Scroll Down:**

```
┌─────────────────────────────────────┐
│ ... (header collapsed) ...          │
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║ Hasil Assessment              ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ Scroll horizontal untuk lihat semua →│
│ ┌───────────────────────────────┐   │
│ │┌──────────┬────┬────┬────┬───┐│   │
│ ││Kategori  │Exp │Act │Fit │Gap││   │ ← Table header
│ ││Kompetensi│ected│ual│Rate│   ││   │
│ │├──────────┼────┼────┼────┼───┤│   │
│ ││Core      │3.0 │2.4 │40% │-1 ││   │
│ ││Values    │    │    │    │   ││   │
│ ││          │    │    │    │⚠️││   │ ← Status badge
│ │├──────────┼────┼────┼────┼───┤│   │
│ ││Generic   │3.0 │3.0 │100%│ 0 ││   │
│ ││          │    │    │    │✅││   │
│ │├──────────┼────┼────┼────┼───┤│   │
│ ││Management│3.0 │3.2 │75% │+1 ││   │
│ ││          │    │    │    │⬆️││   │
│ │├──────────┼────┼────┼────┼───┤│   │
│ ││Leadership│2.0 │2.0 │100%│ 0 ││   │
│ ││          │    │    │    │✅││   │
│ │├──────────┼────┼────┼────┼───┤│   │
│ ││Technical │4.0 │3.0 │50% │-1 ││   │
│ ││(Farmasi) │    │    │    │⚠️││   │
│ │└──────────┴────┴────┴────┴───┘│   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💡 Rekomendasi Development:     │ │
│ │ • Core Values: Professional     │ │
│ │ • Technical: QMS, GMP/CPOB      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌───────────────────────────────┐   │
│ │[🏠]  [👥]  [📊]  [🔔]  [⋯]   │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Key Elements:**
- Profile header dengan avatar besar
- Status badge prominent
- 8 tabs untuk data inti (2 rows)
- Assessment table (HERO FEATURE)
- Recommendation section (optional)

**Table Specs:**
- Horizontal scroll pada mobile
- Row clickable untuk expand detail items
- Color-coded borders untuk status

---

## 📱 SCREEN 4: Assessment Table - Expanded Row

```
┌─────────────────────────────────────┐
│ ╔═══════════════════════════════╗   │
│ ║ Core Values (Detail)          ║   │
│ ╚═══════════════════════════════╝   │
│                                     │
│ Kategori: Core Values               │
│ Expected: 3.0  |  Actual: 2.4       │
│ Fit Rate: 40%  |  Gap: -1           │
│ Status: ⚠️ Gap                      │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │┌──────────────┬────┬────┬───┐  │ │
│ ││Item          │Exp │Act │Gap│  │ │
│ │├──────────────┼────┼────┼───┤  │ │
│ ││Professional  │ 3  │ 2  │-1 ⚠️││ │
│ │├──────────────┼────┼────┼───┤  │ │
│ ││Integrity     │ 3  │ 3  │ 0 ✅││ │
│ │├──────────────┼────┼────┼───┤  │ │
│ ││Teamwork      │ 3  │ 3  │ 0 ✅││ │
│ │├──────────────┼────┼────┼───┤  │ │
│ ││Innovation    │ 3  │ 2  │-1 ⚠️││ │
│ │├──────────────┼────┼────┼───┤  │ │
│ ││Customer      │ 3  │ 2  │-1 ⚠️││ │
│ ││Oriented      │    │    │   │  │ │
│ │└──────────────┴────┴────┴───┘  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📌 Gap Analysis:                │ │
│ │ • 3/5 items perlu development   │ │
│ │ • Fokus: Professional, Innovation│ │
│ │ • Rekomendasi Training: Workshop│ │
│ │   "Professional Excellence"     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Tutup Detail]                      │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 COLOR PALETTE REFERENCE

```
┌────────────────────────────────────┐
│ KIMIA FARMA BRAND COLORS           │
├────────────────────────────────────┤
│                                    │
│ PRIMARY BLUE                       │
│ ████████  #003A78                  │
│                                    │
│ SECONDARY ORANGE                   │
│ ████████  #F39200                  │
│                                    │
│ ────────────────────────────────── │
│ STATUS COLORS                      │
│                                    │
│ ✅ FIT (Success)                   │
│ ████████  #10B981                  │
│                                    │
│ ⚠️ GAP (Warning)                   │
│ ████████  #F59E0B                  │
│                                    │
│ ⬆️ EXCEED (Info)                   │
│ ████████  #3B82F6                  │
│                                    │
└────────────────────────────────────┘
```

---

## 📊 COMPONENT HIERARCHY

```
App
├── AuthRouter
│   └── Login (dummy)
│
└── CompetencyRouter
    ├── LeaderLayout
    │   ├── BottomNavLeader
    │   └── Outlet
    │       ├── LeaderHome
    │       │   ├── ProfileHeader
    │       │   ├── KPICard × 3
    │       │   └── QuickStats
    │       │
    │       ├── LeaderTeam
    │       │   ├── SearchBar
    │       │   ├── FilterChips
    │       │   └── EmployeeCard × 7
    │       │
    │       └── EmployeeDetail
    │           ├── ProfileHeader
    │           ├── DetailTabs
    │           │   ├── WorkHistory
    │           │   ├── Education
    │           │   ├── AssessmentTable ← HERO
    │           │   ├── Training
    │           │   ├── Competency
    │           │   ├── Qualification
    │           │   ├── Achievement
    │           │   └── KPI
    │           └── BottomNavLeader
    │
    └── (Employee routes - future)
```

---

## 🔄 USER FLOW DIAGRAM

```
START
  │
  ├─→ [Login Page]
  │      │
  │      ├─ Input credentials
  │      │  (or "Demo as Leader" button)
  │      │
  │      └─→ [Leader Home] ←─┐
  │             │             │
  │             ├─ View KPI   │
  │             ├─ View Stats │
  │             │             │
  │             ├─→ Click "Tim" tab
  │             │              │
  │             └──────────────┘
  │
  ├─→ [Leader Team]
  │      │
  │      ├─ Browse list
  │      ├─ (Optional) Search/Filter
  │      │
  │      └─→ Click Employee Card
  │              │
  │              └─→ [Employee Detail]
  │                     │
  │                     ├─ View Profile
  │                     ├─ Browse Tabs
  │                     │
  │                     └─→ Click "Hasil Assessment" tab
  │                            │
  │                            └─→ [Assessment Table] ← HERO MOMENT
  │                                   │
  │                                   ├─ View Category Summary
  │                                   ├─ (Optional) Expand Row
  │                                   ├─ View Item Details
  │                                   │
  │                                   └─→ [Back to Team]
  │                                          │
  │                                          └─→ END DEMO
```

---

## 📐 RESPONSIVE BREAKPOINTS

```
Mobile First (Primary Focus):
┌──────────────┐
│   320-480px  │  Phone portrait
│   481-768px  │  Phone landscape / Small tablet
└──────────────┘

Tablet (Secondary):
┌──────────────┐
│   769-1024px │  Tablet portrait
│  1025-1200px │  Tablet landscape
└──────────────┘

Desktop (Future):
┌──────────────┐
│   1201px+    │  Desktop
└──────────────┘
```

**Design Priority:**
1. ✅ Mobile Portrait (375px) - iPhone SE, iPhone 12/13/14
2. ✅ Mobile Landscape (667px)
3. 🔜 Tablet (768px)

---

## 🎭 INTERACTION STATES

### Button States
```
Default:  [  Masuk  ]  bg-primary-blue text-gray-100
Hover:    [  Masuk  ]  bg-primary-blue-dark
Active:   [  Masuk  ]  bg-primary-blue-dark scale-95
Loading:  [  ⟳...  ]  bg-gray-300 cursor-not-allowed
```

### Card States
```
Default:  border-gray-200 shadow-sm
Hover:    border-gray-300 shadow-md transform scale-[1.02]
Active:   border-primary-blue shadow-lg
```

### Tab States
```
Inactive: text-gray-500 border-b-2 border-transparent
Active:   text-primary-blue border-b-2 border-primary-blue font-semibold
```

---

## 📝 TYPOGRAPHY EXAMPLES

```
┌─────────────────────────────────────┐
│ Page Title                          │ ← 32px / 2rem / font-bold
│ Section Heading                     │ ← 24px / 1.5rem / font-semibold
│ Subsection Heading                  │ ← 20px / 1.25rem / font-semibold
│ Card Title                          │ ← 18px / 1.125rem / font-medium
│ Body Text (Default)                 │ ← 16px / 1rem / font-normal
│ Small Text / Metadata               │ ← 14px / 0.875rem / font-normal
│ Caption / Helper Text               │ ← 12px / 0.75rem / text-gray-500
└─────────────────────────────────────┘
```

---

## ✅ VISUAL CHECKLIST

### Before Demo
- [ ] All colors match brand guideline (#003A78, #F39200)
- [ ] Typography hierarchy jelas dan konsisten
- [ ] Icons size konsisten (24px untuk navigation, 20px untuk inline)
- [ ] Spacing konsisten (4, 8, 16, 24px grid system)
- [ ] Status badges visible dan jelas (✅ ⚠️ ⬆️)
- [ ] Bottom navigation active state terlihat jelas
- [ ] Loading states implemented (skeleton atau spinner)
- [ ] Transitions smooth (framer-motion)
- [ ] No console errors
- [ ] Responsive di 375px (iPhone SE) dan 414px (iPhone 12 Pro Max)

### Accessibility (Nice to have)
- [ ] Color contrast ratio minimal 4.5:1 untuk text
- [ ] Focus states untuk keyboard navigation
- [ ] Alt text untuk images
- [ ] ARIA labels untuk interactive elements

---

**Document Version:** 1.0
**Last Updated:** 2024-11-04
**Related:** [DEMO_MVP_SPEC.md](./DEMO_MVP_SPEC.md)
