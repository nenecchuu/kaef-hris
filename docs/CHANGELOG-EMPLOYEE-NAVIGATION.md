# Changelog: Employee Navigation & Drill-down Feature

## Tanggal: 2025-10-30

### 🎯 Fitur Baru: Navigasi Karyawan dengan Drill-down

Implementasi lengkap sistem navigasi karyawan dari level eksekutif hingga detail per divisi, dengan struktur organisasi PT Kimia Farma yang sebenarnya.

---

## 📋 Ringkasan Perubahan

### 1. Menu Sidebar Baru

**File:** `resources/constants/site-navigation.js`

Menambahkan menu "Karyawan" di sidebar dengan submenu:

- **Karyawan** (menu utama dengan icon IconUserCheck)
  - Ringkasan Karyawan → `/employees`

Menu ini tersedia untuk semua role:

- ✅ Admin
- ✅ Supervisor
- ✅ User

**Icon yang digunakan:** `IconUserCheck` dari `@tabler/icons-react`

---

### 2. Halaman Baru

#### A. Employee Overview Page (`employee-overview.tsx`)

**Route:** `/employees`

**Fitur:**

- Bird's eye view dari seluruh divisi (6 divisi Kimia Farma)
- Key highlights:
  - Total Karyawan: 10,542
  - Jumlah Divisi: 6
  - Divisi Terbesar: Retail & Apotek (4,235 karyawan)
  - Rata-rata per Divisi
  - Regional: 7 area operasional
- Kartu divisi yang dapat diklik menampilkan:
  - Nama divisi lengkap
  - Jumlah karyawan & persentase
  - Progress bar visual
  - Penanggung jawab (Direktur)
  - Jumlah sub-divisi
- Hover effects dengan scale animation
- Tombol back ke Dashboard Eksekutif

#### B. Employee List Page (`employee-list.tsx`)

**Route:** `/employees/:divisionCode`

**Fitur:**

- Detail karyawan per divisi
- Overview sub-divisi dengan kartu yang menampilkan:
  - Nama sub-divisi
  - Kepala sub-divisi & posisinya
  - Jumlah karyawan
  - Jumlah departemen
- Filter & Search:
  - 🔍 Search by: Nama, NIP, Posisi
  - 🔽 Filter by: Sub-divisi
  - ↻ Reset filters
- Tabel karyawan lengkap:
  - NIP (Nomor Induk Pegawai)
  - Nama & Email
  - Posisi & Level
  - Sub-Divisi & Departemen
  - Atasan
  - Lokasi & Regional
  - Status badge (Aktif, Cuti, Sakit, Dinas, Non-Aktif)
- Tombol back ke Employee Overview

---

### 3. Interaksi Click/Drill-down

#### Dashboard Eksekutif → Employee Overview

**Trigger:** Klik KPI card "Total Karyawan"

- Card sekarang clickable dengan hover effect (scale animation)
- Navigasi ke `/employees`

#### Dashboard Eksekutif → Employee List (langsung)

**Trigger:** Klik salah satu divisi di "Distribusi Karyawan per Divisi"

- Setiap baris divisi sekarang clickable
- Hover effect: background berubah ke gray-50
- Keyboard accessible (Enter/Space)
- Navigasi langsung ke `/employees/:divisionCode`

#### Employee Overview → Employee List

**Trigger:** Klik salah satu kartu divisi

- Navigasi ke `/employees/:divisionCode`

---

### 4. Routing Configuration

**File:** `resources/app/user.router.tsx`

```tsx
<Route path="employees">
  <Route index={true} element={<EmployeeOverviewPage />} />
  <Route path=":divisionCode" element={<EmployeeListPage />} />
</Route>
```

**URL Pattern:**

- `/employees` - Employee Overview
- `/employees/retail` - Retail & Apotek division
- `/employees/clinic` - Klinik & Laboratorium division
- `/employees/manufacturing` - Manufaktur division
- `/employees/distribution` - Distribusi division
- `/employees/marketing` - Pemasaran & Bisnis Baru division
- `/employees/corporate` - Corporate & Support division

---

### 5. Data & Struktur Organisasi

**File:** `resources/app/dashboard/data/employee-mock-data.ts`

Data mock yang akurat berdasarkan struktur PT Kimia Farma:

**6 Divisi Utama:**

1. **Retail & Apotek** (4,235 karyawan - 40.2%)
   - Operasional Apotek
   - Merchandising & Marketing Retail
   - Business Development Retail

2. **Klinik & Laboratorium** (2,150 karyawan - 20.4%)
   - Operasional Klinik
   - Layanan Kesehatan Rujukan
   - Laboratorium Diagnostik

3. **Manufaktur** (1,845 karyawan - 17.5%)
   - Produksi Farmasi
   - Quality Assurance & Control
   - Research & Development

4. **Distribusi** (1,280 karyawan - 12.1%)
   - Distribusi Wilayah
   - Warehouse & Logistics
   - Supply Chain Management

5. **Pemasaran & Bisnis Baru** (630 karyawan - 6.0%)
   - Marketing & Branding
   - New Business Development
   - Strategic Partnership

6. **Corporate & Support** (402 karyawan - 3.8%)
   - Human Resources
   - Finance & Accounting
   - IT & Digital Transformation
   - Legal & Compliance

**Struktur Regional:** 7 Regional

- Regional Jawa (terbesar)
- Regional Sumatera
- Regional Kalimantan
- Regional Sulawesi
- Regional Bali & Nusa Tenggara
- Regional Papua
- Regional Maluku

**Hierarki Level:**

- Director (Direktur)
- General Manager
- Manager
- Supervisor
- Staff

---

### 6. Type Definitions

**File:** `resources/app/dashboard/types/employee.types.ts`

Interface TypeScript lengkap:

```typescript
export interface Employee {
  id: string;
  nip: string;
  name: string;
  email?: string;
  division: DivisionCode;
  subDivision: string;
  department?: string;
  position: string;
  level: EmployeeLevel;
  manager?: string;
  status: EmployeeStatus;
  location: string;
  regional?: string;
}

export interface DivisionInfo {
  code: DivisionCode;
  name: string;
  fullName: string;
  director: string;
  headcount: number;
  subDivisions: SubDivisionInfo[];
}

export interface SubDivisionInfo {
  code: string;
  name: string;
  head: string;
  headPosition: string;
  headcount: number;
  departments?: DepartmentInfo[];
}

export type DivisionCode =
  | "retail"
  | "clinic"
  | "manufacturing"
  | "distribution"
  | "marketing"
  | "corporate";

export type EmployeeLevel =
  | "director"
  | "general_manager"
  | "manager"
  | "supervisor"
  | "staff";

export type EmployeeStatus =
  | "active"
  | "on_leave"
  | "sick_leave"
  | "business_trip"
  | "inactive";
```

---

### 7. Component Updates

#### A. KPICard Component

**File:** `resources/app/dashboard/components/kpi-card.tsx`

**Changes:**

- ✅ Added `onClick?: () => void` prop
- ✅ Wrapped in `<button>` when clickable
- ✅ Hover effect: `hover:scale-[1.02]`
- ✅ Maintains all existing functionality

#### B. DivisionOverview Component

**File:** `resources/app/dashboard/components/division-overview.tsx`

**Changes:**

- ✅ Added `onDivisionClick?: (divisionId: string) => void` prop
- ✅ Added `useNavigate` hook
- ✅ Made division rows clickable
- ✅ Hover effect: `hover:bg-gray-50`
- ✅ Keyboard accessible (Enter/Space keys)

#### C. BODDashboardPage

**File:** `resources/app/dashboard/pages/bod-dashboard.tsx`

**Changes:**

- ✅ Added `useNavigate` hook
- ✅ Added `onClick` handler to "Total Karyawan" KPI card
- ✅ Division Overview automatically navigates (uses default behavior)

---

### 8. Lokalisasi (Bahasa Indonesia)

Semua teks menggunakan bahasa Indonesia yang natural:

**UI Text:**

- "Ringkasan Karyawan" (tidak "Employee Overview")
- "Klik divisi untuk melihat detail karyawan"
- "Distribusi Karyawan per Divisi"
- "Penanggung Jawab" (tidak "Director")
- "Klik untuk detail →"
- "Tidak ada karyawan ditemukan"
- "Coba ubah filter atau kata kunci pencarian"

**Status Badge:**

- Aktif (Active)
- Cuti (On Leave)
- Sakit (Sick Leave)
- Dinas (Business Trip)
- Non-Aktif (Inactive)

---

## 🛠️ Technical Details

### Clean Code Principles

- ✅ All components < 300 lines
- ✅ DRY (Don't Repeat Yourself)
- ✅ Single Responsibility Principle
- ✅ Reusable components (Card, View, Button)
- ✅ Type-safe with TypeScript
- ✅ Proper separation of concerns

### Performance

- ✅ Efficient filtering (client-side for prototype)
- ✅ Optimized rendering
- ✅ CSS transitions (not JS animations)
- ✅ Lazy loading ready structure

### Accessibility

- ✅ Keyboard navigation support
- ✅ Proper ARIA labels
- ✅ Semantic HTML
- ✅ Focus management
- ✅ Screen reader friendly

### Responsive Design

- ✅ Grid layouts (1/2/3 columns based on screen size)
- ✅ Mobile-friendly tables (horizontal scroll)
- ✅ Flexible card layouts
- ✅ Optimized for desktop presentation

---

## 📦 Files Created

### New Files (5)

1. `resources/app/dashboard/pages/employee-overview.tsx` (200 lines)
2. `resources/app/dashboard/pages/employee-list.tsx` (280 lines)
3. `resources/app/dashboard/types/employee.types.ts` (120 lines)
4. `resources/app/dashboard/data/employee-mock-data.ts` (525 lines)
5. `docs/CHANGELOG-EMPLOYEE-NAVIGATION.md` (this file)

### Modified Files (5)

1. `resources/constants/site-navigation.js`
2. `resources/app/user.router.tsx`
3. `resources/app/dashboard/components/kpi-card.tsx`
4. `resources/app/dashboard/components/division-overview.tsx`
5. `resources/app/dashboard/pages/bod-dashboard.tsx`

**Total Lines Added:** ~1,125 lines
**Build Status:** ✅ No new TypeScript errors

---

## 🧪 Testing Guide

### Manual Testing Flow

1. **Login ke aplikasi**
2. **Dari Dashboard Eksekutif:**
   - Klik "Total Karyawan" → Harus redirect ke Employee Overview
   - Klik divisi di "Distribusi Karyawan per Divisi" → Langsung ke detail divisi
3. **Dari Sidebar:**
   - Klik "Karyawan" → expand submenu
   - Klik "Ringkasan Karyawan" → Employee Overview
4. **Di Employee Overview:**
   - Lihat 6 kartu divisi
   - Klik salah satu divisi → Detail karyawan divisi tersebut
5. **Di Employee List:**
   - Lihat sub-divisi cards
   - Coba search: ketik nama/NIP/posisi
   - Coba filter: pilih sub-divisi
   - Klik sub-divisi card untuk filter otomatis
   - Klik "Reset Filter" untuk clear
   - Klik back button → kembali ke overview

### Expected Results

- ✅ Semua navigasi berfungsi
- ✅ Data tampil sesuai struktur Kimia Farma
- ✅ Filter & search bekerja
- ✅ UI responsive dan smooth
- ✅ Bahasa Indonesia konsisten

---

## 🎨 Design Decisions

### Why Submenu?

Menu "Karyawan" dibuat sebagai submenu agar bisa diperluas di masa depan:

- Ringkasan Karyawan ✅ (implemented)
- Daftar per Divisi (via drill-down) ✅ (implemented)
- Future: Recruitment, Talent Management, Training, etc.

### Why Mock Data?

Data mock dibuat sangat detail dan realistis karena:

- Prototype untuk presentasi BOD
- Memberikan gambaran akurat struktur organisasi
- Siap diganti dengan API backend
- Membantu validasi UI/UX sebelum backend ready

### Why Indonesian?

Semua text menggunakan Bahasa Indonesia karena:

- Target user: Direksi BUMN Indonesia
- Familiar untuk decision makers
- Professional context
- Client requirement (Kimia Farma)

---

## 🚀 Future Enhancements

### Fase 2 (Recommended)

- [ ] Backend API integration
- [ ] Real-time data dengan live updates
- [ ] Export ke Excel/PDF
- [ ] Advanced filters (status, level, lokasi)
- [ ] Employee detail page dengan foto & riwayat
- [ ] Org chart visualization
- [ ] Performance metrics per employee

### Fase 3 (Optional)

- [ ] Talent management module
- [ ] Recruitment pipeline
- [ ] Training & development tracking
- [ ] Performance review system
- [ ] Succession planning dashboard

---

## 📞 Support

Jika ada pertanyaan atau issue terkait fitur ini:

1. Check dokumentasi struktur organisasi: `docs/struktur-organisasi-kimia-farma.md`
2. Review type definitions: `resources/app/dashboard/types/employee.types.ts`
3. Check mock data: `resources/app/dashboard/data/employee-mock-data.ts`

---

**Status:** ✅ Production Ready (untuk prototype/demo)
**Build:** ✅ No TypeScript Errors
**Testing:** ⏳ Manual testing recommended
**Documentation:** ✅ Complete
