# 🎯 DEMO MVP - Spesifikasi Teknis
**Aplikasi Manajemen Kompetensi Kimia Farma**

---

## 📋 EXECUTIVE SUMMARY

**Tech Stack:** Laravel 9 + React 18 + React Router v6 + TanStack Query
**Target Audiens Demo:** BOD Level (Direktur Keuangan, HR, Manajemen Risiko)
**Persona Focus:** **LEADERS** (100%)
**Waktu Estimasi Development:** 4-6 jam (core features only)
**Demo Duration:** 5 menit

---

## 🏗️ ARSITEKTUR APLIKASI

### Tech Stack Summary
```
Backend:  Laravel 9.19 (API Mode untuk demo bisa mock)
Frontend: React 18.3 + TypeScript
Routing:  React Router v6.27
State:    TanStack Query v5 + Context API (untuk auth)
Styling:  TailwindCSS + Radix UI components
Icons:    @tabler/icons-react
```

### Struktur Folder yang Akan Dibuat
```
resources/app/
├── competency/                    # 🆕 Modul Kompetensi
│   ├── pages/
│   │   ├── LeaderHome.tsx        # Dashboard KPI Tim
│   │   ├── LeaderTeam.tsx        # Daftar Anggota Tim
│   │   └── EmployeeDetail.tsx    # Detail Karyawan (8 Data Inti)
│   ├── components/
│   │   ├── KPICard.tsx           # Card untuk menampilkan KPI
│   │   ├── EmployeeCard.tsx      # Card list anggota tim
│   │   ├── AssessmentTable.tsx   # Tabel Assessment (HERO FEATURE)
│   │   ├── BottomNavLeader.tsx   # Bottom Navigation untuk Leader
│   │   └── DetailTabs.tsx        # Tab untuk 8 Data Inti
│   ├── hooks/
│   │   ├── useLeaderTeam.ts      # Hook untuk fetch tim leader
│   │   └── useEmployeeDetail.ts  # Hook untuk fetch detail karyawan
│   └── competency.router.tsx     # Router untuk modul kompetensi
│
├── types/
│   └── competency.d.ts           # 🆕 TypeScript definitions
│
mock-data/                         # ✅ Sudah ada
└── assessment_results.json        # 🆕 Data mock hasil assessment

app/Http/Controllers/
└── CompetencyController.php       # 🆕 Controller untuk API (optional untuk demo)
```

---

## 🎨 DESIGN SYSTEM

### Brand Colors (NON-NEGOTIABLE)
```css
:root {
  --primary-blue: #003A78;     /* Kimia Farma Blue */
  --secondary-orange: #F39200;  /* Kimia Farma Orange */

  /* Extended Palette */
  --primary-blue-light: #0057B7;
  --primary-blue-dark: #002654;
  --secondary-orange-light: #FFB84D;
  --secondary-orange-dark: #CC7600;

  /* Semantic Colors */
  --success: #10B981;  /* ✅ Fit */
  --warning: #F59E0B;  /* ⚠️ Gap */
  --info: #3B82F6;     /* ⬆️ Exceed */
}
```

### Typography Scale
```css
/* Headings */
h1: 32px (2rem) - font-bold
h2: 24px (1.5rem) - font-semibold
h3: 20px (1.25rem) - font-semibold
h4: 18px (1.125rem) - font-medium

/* Body */
body: 16px (1rem) - font-normal
small: 14px (0.875rem)
xs: 12px (0.75rem)
```

### Component Spacing
- Container padding: `px-4` (16px)
- Card padding: `p-6` (24px)
- Section gap: `gap-6` (24px)
- Element gap: `gap-4` (16px)

---

## 📱 UI SPECIFICATIONS

### 1. Bottom Navigation (Leader)
```tsx
// Tabs untuk Leader (semua aktif, tapi hanya 3 pertama yang functional)
[
  { icon: 'Home', label: 'Beranda', path: '/leader/home' },      // ✅ Functional
  { icon: 'Users', label: 'Tim', path: '/leader/team' },         // ✅ Functional
  { icon: 'ChartBar', label: 'Analisis', path: '/leader/analysis' }, // 🔜 Mockup only
  { icon: 'Bell', label: 'Notifikasi', path: '/leader/notifications' }, // 🔜 Placeholder
  { icon: 'DotsVertical', label: 'Lainnya', path: '/leader/more' } // 🔜 Placeholder
]
```

**Design Specs:**
- Height: `64px`
- Active state: `text-primary-blue`, `border-t-2` dengan `border-primary-blue`
- Inactive state: `text-gray-500`
- Icon size: `24px`
- Label size: `12px`

---

### 2. Halaman `🏠 Beranda` Leaders

**Layout:** Single column, scrollable

**Sections:**
```tsx
<LeaderHome>
  {/* Header */}
  <Header>
    <Avatar />
    <Greeting>Selamat Pagi, Lina Sari</Greeting>
    <JobTitle>Direktur Keuangan dan Manajemen Risiko</JobTitle>
  </Header>

  {/* KPI Cards */}
  <KPISection>
    <KPICard
      icon={<IconUsers />}
      title="Total Anggota Tim"
      value="24"
      trend="+2 dari bulan lalu"
    />
    <KPICard
      icon={<IconChartBar />}
      title="Rata-rata Fit Rate Tim"
      value="62%"
      trend="+5% dari bulan lalu"
      valueColor="success"
    />
    <KPICard
      icon={<IconAlertTriangle />}
      title="Gap Kritis"
      value="5"
      subtitle="Karyawan perlu development"
      valueColor="warning"
    />
  </KPISection>

  {/* Quick Stats (Optional) */}
  <QuickStats>
    <StatRow label="Fit" count={15} color="success" />
    <StatRow label="Gap" count={7} color="warning" />
    <StatRow label="Exceed" count={2} color="info" />
  </QuickStats>
</LeaderHome>
```

---

### 3. Halaman `👥 Tim`

**Layout:** Grid/List view dengan search bar (search bisa non-functional untuk demo)

```tsx
<LeaderTeam>
  {/* Search Bar */}
  <SearchBar placeholder="Cari nama karyawan..." />

  {/* Filter Chips (Optional) */}
  <FilterChips>
    <Chip active>Semua (24)</Chip>
    <Chip>✅ Fit (15)</Chip>
    <Chip>⚠️ Gap (7)</Chip>
    <Chip>⬆️ Exceed (2)</Chip>
  </FilterChips>

  {/* Employee List */}
  <EmployeeList>
    {employees.map(emp => (
      <EmployeeCard
        key={emp.id}
        avatar={emp.photo}
        name={emp.nama}
        position={emp.jabatan}
        function={emp.fungsi}
        status={emp.status_kompetensi}  // ✅ Fit / ⚠️ Gap / ⬆️ Exceed
        fitRate={emp.fit_rate_overall}   // "62%"
        onClick={() => navigate(`/leader/team/${emp.id}`)}
      />
    ))}
  </EmployeeList>
</LeaderTeam>
```

**EmployeeCard Specs:**
- Border: `border-l-4` dengan warna sesuai status (green=Fit, orange=Gap, blue=Exceed)
- Shadow: `shadow-sm hover:shadow-md` transition
- Padding: `p-4`
- Layout: Flexbox, avatar kiri, info tengah, badge kanan

---

### 4. Halaman `Detail Karyawan` (HERO PAGE)

**Route:** `/leader/team/:employeeId`

```tsx
<EmployeeDetail>
  {/* Header Profile */}
  <ProfileHeader>
    <Avatar size="lg" src={employee.photo} />
    <Name>{employee.nama}</Name>
    <Position>{employee.jabatan}</Position>
    <Function>{employee.fungsi}</Function>
    <Level>{employee.level}</Level>
    <StatusBadge status={employee.status_kompetensi} />
  </ProfileHeader>

  {/* Tabs untuk 8 Data Inti */}
  <Tabs defaultValue="assessment">
    <TabsList>
      <TabsTrigger value="work-history">Riwayat Pekerjaan</TabsTrigger>
      <TabsTrigger value="education">Pendidikan Formal</TabsTrigger>
      <TabsTrigger value="assessment">Hasil Assessment</TabsTrigger> {/* 🎯 DEFAULT & FOCUS */}
      <TabsTrigger value="training">Training</TabsTrigger>
      <TabsTrigger value="competency">Kompetensi</TabsTrigger>
      <TabsTrigger value="qualification">Personal Qualification</TabsTrigger>
      <TabsTrigger value="achievement">Achievement</TabsTrigger>
      <TabsTrigger value="kpi">KPI Personal</TabsTrigger>
    </TabsList>

    <TabsContent value="assessment">
      <AssessmentTable data={employee.assessment_results} />
    </TabsContent>

    {/* Other tabs bisa placeholder atau minimal data */}
  </Tabs>
</EmployeeDetail>
```

---

### 5. Component `AssessmentTable` (MOST CRITICAL)

**Format sesuai Bagian 5B Project Brief:**

```tsx
<AssessmentTable>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Kategori Kompetensi</TableHead>
        <TableHead className="text-center">Expected</TableHead>
        <TableHead className="text-center">Actual (Avg)</TableHead>
        <TableHead className="text-center">Fit Rate</TableHead>
        <TableHead className="text-center">Gap</TableHead>
        <TableHead className="text-center">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {assessments.map((item) => (
        <TableRow key={item.kategori} className="cursor-pointer hover:bg-gray-50">
          <TableCell className="font-medium">{item.kategori}</TableCell>
          <TableCell className="text-center">{item.expected}</TableCell>
          <TableCell className="text-center font-semibold">{item.actual_avg}</TableCell>
          <TableCell className="text-center">
            <Badge variant="outline">{item.fit_rate}%</Badge>
          </TableCell>
          <TableCell className="text-center">
            <GapIndicator value={item.gap} />
          </TableCell>
          <TableCell className="text-center">
            <StatusBadge status={item.status} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</AssessmentTable>
```

**Format Rules (NON-NEGOTIABLE):**
- **Expected:** Plain number (e.g., `3.0`, `4.0`)
- **Actual (Avg):** Plain number, bukan fraction (e.g., `2.4` BUKAN `2.4/5`)
- **Fit Rate:** Percentage dengan `%` (e.g., `40%`)
- **Gap:** Signed integer (e.g., `-1`, `0`, `+1`)
- **Status:** Icon + Label
  - `✅ Fit` (green background)
  - `⚠️ Gap` (orange background)
  - `⬆️ Exceed` (blue background)

**Interactive (Optional for v1):**
- Click row → Expand untuk menampilkan detail 24 item kompetensi
- Contoh expand "Core Values" → Show 5 items (Professional, Integrity, Teamwork, Innovation, Customer Oriented)

---

## 📊 DATA STRUCTURE

### TypeScript Definitions

```typescript
// resources/types/competency.d.ts

export type CompetencyStatus = '✅ Fit' | '⚠️ Gap' | '⬆️ Exceed';

export interface Employee {
  id: string;
  nama: string;
  jabatan: string;
  fungsi: string;
  level: string;
  photo?: string;
  email?: string;
  status_kompetensi: CompetencyStatus;
  fit_rate_overall: number; // 0-100
}

export interface CompetencyCategory {
  kategori: string;
  expected: number;
  actual_avg: number;
  fit_rate: number; // 0-100
  gap: number; // -5 to +5
  status: CompetencyStatus;
  items?: CompetencyItem[];
}

export interface CompetencyItem {
  nama: string;
  expected: number;
  actual: number;
  gap: number;
  status: CompetencyStatus;
}

export interface AssessmentResult {
  employee_id: string;
  assessed_date: string;
  assessments: CompetencyCategory[];
}

export interface LeaderTeamData {
  leader_id: string;
  leader_name: string;
  team_members: Employee[];
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
}
```

---

## 🔌 API ENDPOINTS (Mock untuk Demo)

### 1. Get Leader Team Data
```
GET /api/competency/leader/team
```

**Response:**
```json
{
  "leader_id": "L001",
  "leader_name": "Lina Sari",
  "leader_position": "Direktur Keuangan dan Manajemen Risiko",
  "team_kpi": {
    "total_members": 24,
    "avg_fit_rate": 62,
    "critical_gaps": 5,
    "status_distribution": {
      "fit": 15,
      "gap": 7,
      "exceed": 2
    }
  },
  "team_members": [
    {
      "id": "E001",
      "nama": "Budi Santoso",
      "jabatan": "Operator Produksi",
      "fungsi": "Operasi / Produksi",
      "level": "Staf (Pelaksana)",
      "photo": "https://i.pravatar.cc/150?u=E001",
      "status_kompetensi": "⚠️ Gap",
      "fit_rate_overall": 58
    },
    // ... 6 more employees
  ]
}
```

### 2. Get Employee Detail
```
GET /api/competency/employee/{id}
```

**Response:**
```json
{
  "employee": {
    "id": "E001",
    "nama": "Budi Santoso",
    "jabatan": "Operator Produksi",
    "fungsi": "Operasi / Produksi",
    "level": "Staf (Pelaksana)",
    "photo": "https://i.pravatar.cc/150?u=E001",
    "email": "budi.santoso@kimiafarma.co.id",
    "status_kompetensi": "⚠️ Gap",
    "fit_rate_overall": 58
  },
  "assessment_results": {
    "assessed_date": "2024-10-15",
    "assessments": [
      {
        "kategori": "Core Values",
        "expected": 3.0,
        "actual_avg": 2.4,
        "fit_rate": 40,
        "gap": -1,
        "status": "⚠️ Gap",
        "items": [
          {
            "nama": "Professional",
            "expected": 3,
            "actual": 2,
            "gap": -1,
            "status": "⚠️ Gap"
          },
          {
            "nama": "Integrity",
            "expected": 3,
            "actual": 3,
            "gap": 0,
            "status": "✅ Fit"
          }
          // ... 3 more items
        ]
      },
      {
        "kategori": "Generic",
        "expected": 3.0,
        "actual_avg": 3.0,
        "fit_rate": 100,
        "gap": 0,
        "status": "✅ Fit"
      },
      {
        "kategori": "Management",
        "expected": 3.0,
        "actual_avg": 3.2,
        "fit_rate": 75,
        "gap": 1,
        "status": "⬆️ Exceed"
      },
      {
        "kategori": "Leadership",
        "expected": 2.0,
        "actual_avg": 2.0,
        "fit_rate": 100,
        "gap": 0,
        "status": "✅ Fit"
      },
      {
        "kategori": "Technical (Farmasi)",
        "expected": 4.0,
        "actual_avg": 3.0,
        "fit_rate": 50,
        "gap": -1,
        "status": "⚠️ Gap"
      }
    ]
  },
  "work_history": [
    {
      "position": "Operator Produksi",
      "department": "Produksi Solid",
      "start_date": "2020-01-15",
      "end_date": null,
      "description": "Bertanggung jawab dalam proses produksi obat bentuk solid"
    }
  ],
  "education": [
    {
      "degree": "D3 Teknik Kimia",
      "institution": "Politeknik Negeri Jakarta",
      "year": "2019"
    }
  ],
  "achievements": [
    {
      "title": "Best Operator Q3 2023",
      "date": "2023-09-30",
      "description": "Pencapaian 0 defect selama 3 bulan berturut-turut"
    }
  ],
  "kpi": [
    {
      "name": "Kepatuhan terhadap CPOB & SOP",
      "target": "100%",
      "actual": "98%",
      "period": "Q3 2024"
    }
  ]
}
```

---

## 🎬 DEMO SCRIPT (Golden Path)

### Step-by-Step User Flow

**Duration: 5 menit**

#### 1. Login (15 detik)
- Open app → Auto redirect ke `/auth/login`
- Input dummy credentials (atau auto-login dengan button "Demo as Leader")
- Click "Masuk" → Navigate to `/leader/home`

#### 2. Landing di Beranda (45 detik)
**Presenter says:**
> "Ini adalah dashboard untuk seorang Leader, dalam hal ini Ibu Lina Sari, Direktur Keuangan dan Manajemen Risiko."

**Point out:**
- "Beliau memiliki 24 anggota tim"
- "Rata-rata Fit Rate tim saat ini 62%"
- "Ada 5 orang yang memerlukan development prioritas karena gap kritis"

**Action:** Scroll untuk show cards dengan smooth animation

#### 3. Navigasi ke Tim (1 menit)
**Action:** Click tab `👥 Tim` di bottom navigation

**Presenter says:**
> "Di sini Leader bisa melihat seluruh anggota timnya dengan status kompetensi masing-masing."

**Point out:**
- "Badge warna menunjukkan status: hijau = Fit, oranye = Gap, biru = Exceed"
- "Fit Rate ditampilkan langsung untuk quick assessment"

**Action:** Scroll list, show 6-7 karyawan

#### 4. Buka Detail Karyawan (1.5 menit)
**Action:** Click "Budi Santoso - Operator Produksi"

**Presenter says:**
> "Aplikasi ini adalah 'Single Source of Truth' untuk data karyawan. Semua informasi tersentralisasi."

**Point out tabs:**
- "Ada 8 jenis data yang terintegrasi"
- "Riwayat pekerjaan, pendidikan, hasil assessment, training, dst."

**Action:** Click tab `Hasil Assessment` (sudah default active)

#### 5. HERO MOMENT: Tabel Assessment (1.5 menit)
**Presenter says:**
> "Ini adalah fitur utama: Hasil Assessment Kompetensi."

**Point out tabel:**
- "Kita menggunakan 5 kategori kompetensi standar industri farmasi"
- "Terlihat Budi memiliki Gap di Core Values dan Technical"
- "Actual score 2.4, padahal expected 3.0"
- "Status otomatis dikategorikan: Gap, Fit, atau Exceed"
- "Fit Rate 40% berarti hanya 2 dari 5 kompetensi yang sudah memenuhi"

**Action (Optional):**
- Click row "Core Values" → Expand untuk show 5 items detail
- "Bisa drill down sampai ke individual kompetensi"

#### 6. Back to Team → Closure (30 detik)
**Action:** Click back, return to Tim page

**Presenter says:**
> "Dengan aplikasi ini, para Leaders dapat dengan cepat:
> - Melihat overview kompetensi tim
> - Mengidentifikasi siapa yang butuh development
> - Drill down ke detail individual untuk action plan
> - Semua data terintegrasi dalam satu platform mobile"

**End:** "Terima kasih."

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Setup & Routing (30 menit)
- [ ] Create folder structure `resources/app/competency/`
- [ ] Create TypeScript types `resources/types/competency.d.ts`
- [ ] Setup routes di `competency.router.tsx`
- [ ] Create `BottomNavLeader` component
- [ ] Test routing: `/leader/home`, `/leader/team`, `/leader/team/:id`

### Phase 2: Mock Data (30 menit)
- [ ] Create `mock-data/leader_team.json` (1 leader + 7 employees)
- [ ] Create `mock-data/assessment_results.json` (detailed assessment untuk 1 employee)
- [ ] Create mock API hooks:
  - `useLeaderTeam()` → return mock data
  - `useEmployeeDetail(id)` → return mock data
- [ ] Test data structure dengan TypeScript

### Phase 3: UI Components (2 jam)
- [ ] `KPICard.tsx` (reusable card untuk dashboard)
- [ ] `EmployeeCard.tsx` (card untuk list tim)
- [ ] `StatusBadge.tsx` (badge ✅ Fit / ⚠️ Gap / ⬆️ Exceed)
- [ ] `GapIndicator.tsx` (display gap dengan warna)
- [ ] Apply Kimia Farma colors (`#003A78`, `#F39200`)

### Phase 4: Pages (2 jam)
- [ ] `LeaderHome.tsx` (dashboard dengan 3 KPI cards)
- [ ] `LeaderTeam.tsx` (list 7 employees)
- [ ] `EmployeeDetail.tsx` (header + tabs)
- [ ] `AssessmentTable.tsx` (tabel sesuai format Bagian 5B)

### Phase 5: Polish & Testing (1 jam)
- [ ] Add loading states (skeleton)
- [ ] Add transitions (framer-motion sudah ada)
- [ ] Test seluruh flow: Login → Home → Team → Detail → Assessment
- [ ] Responsive check (mobile-first)
- [ ] Fix TypeScript errors
- [ ] Test di Chrome DevTools mobile view

### Phase 6: Demo Prep (30 menit)
- [ ] Create demo account auto-login
- [ ] Clear console errors
- [ ] Test script sesuai Demo Script di atas
- [ ] Prepare backup (screenshot jika ada error)
- [ ] Export APK/PWA untuk presentasi (optional)

---

## 🚨 NON-NEGOTIABLE REQUIREMENTS

### 1. Branding
- ✅ MUST use `#003A78` dan `#F39200`
- ❌ DO NOT use any other blue/orange variants

### 2. Assessment Table Format
- ✅ Average: `2.4` (plain number)
- ❌ NOT `2.4/5` or `2.4 / 5.0`
- ✅ Fit Rate: `40%` (with percentage sign)
- ✅ Gap: `-1`, `0`, `+1` (signed integer)
- ✅ Status: Icon + Label (`✅ Fit`, `⚠️ Gap`, `⬆️ Exceed`)

### 3. Competency Taxonomy
- ✅ MUST use 5 categories: Core Values, Generic, Management, Leadership, Technical
- ✅ MUST have 24 items total as per project brief Section 6
- ❌ DO NOT add/remove categories

### 4. Data Accuracy
- ✅ Mock data MUST be realistic (tidak boleh semua "Fit" atau semua "Gap")
- ✅ MUST have variation: 60% Fit, 30% Gap, 10% Exceed

---

## 🎯 SUCCESS METRICS

Demo dianggap sukses jika:
1. ✅ Flow end-to-end berjalan tanpa error (Login → Assessment Table)
2. ✅ Audiens memahami value proposition dalam 5 menit
3. ✅ Tabel Assessment menampilkan minimal 5 kategori dengan data bervariasi
4. ✅ UI konsisten dengan branding Kimia Farma
5. ✅ Tidak ada crash atau blank screen selama presentasi

---

## 📚 REFERENCE FILES

- [project_brief.md](../project_brief.md) - Source of truth untuk business rules
- [mock-data/leaders.csv](../mock-data/leaders.csv) - Data 6 Direktur
- [mock-data/employee.csv](../mock-data/employee.csv) - Data karyawan
- [mock-data/kompetensi.csv](../mock-data/kompetensi.csv) - Definisi kompetensi
- [package.json](../package.json) - Dependencies reference

---

## 🛠️ NEXT STEPS

1. Review dokumen ini dengan team
2. Konfirmasi tech stack & approach
3. Mulai Phase 1 (Setup & Routing)
4. Daily checkpoint progress
5. Final demo rehearsal H-1

---

**Document Version:** 1.0
**Last Updated:** 2024-11-04
**Owner:** Product Manager - Competency Module
**Status:** Ready for Development
