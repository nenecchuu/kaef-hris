# Changelog - Lokalisasi Bahasa Indonesia

## Perubahan yang Dilakukan (30 Oktober 2025)

### 1. Penamaan Menu

**Sebelum:** Dashboard BOD
**Sesudah:** Dashboard Eksekutif

**Alasan:** Istilah "BOD" (Board of Directors) terlalu eksplisit dan tidak familiar untuk konteks BUMN Indonesia. "Dashboard Eksekutif" lebih umum dan professional, cocok untuk presentasi tingkat Direksi.

---

### 2. Konsistensi Bahasa Indonesia

#### Dashboard Utama (`bod-dashboard.tsx`)

**Header:**

- Dashboard Board of Directors → **Dashboard Eksekutif Sumber Daya Manusia**
- Human Resources Executive Overview → **Ringkasan Eksekutif untuk Direksi**

**KPI Cards:**

- Total Karyawan: ✅ (sudah Indonesia)
  - Subtitle: "Across all divisions" → **"Seluruh divisi"**
- HR Budget Utilization → **Utilisasi Anggaran SDM**
  - Period: "YTD target" → **"target tahun berjalan"**
  - Subtitle: "used" → **"terpakai"**
- Succession Readiness → **Kesiapan Suksesi**
  - Period: "Q1 2024" → **"Kuartal I 2024"**
  - Subtitle: "Target BOD: 85%" → **"Target Direksi: 85%"**
- Critical Alerts → **Perhatian Kritis**
  - Subtitle: "Requires BOD attention" → **"Perlu perhatian Direksi"**

**Strategic Insights:**

- Strategic Insights & Recommendations → **Analisis Strategis & Rekomendasi**
- Strengths → **Kekuatan**
  - HR cost efficiency within BUMN targets → **Efisiensi biaya SDM sesuai target BUMN**
  - Strong compliance scores across categories → **Skor kepatuhan tinggi di semua kategori**
  - Healthy talent pipeline for growth → **Pipeline talenta sehat untuk pertumbuhan**
  - Retail division performing optimally → **Divisi retail beroperasi optimal**

- Areas for Attention → **Area Perhatian**
  - Manufacturing division staffing efficiency → **Efisiensi kepegawaian divisi manufaktur**
  - Safety audit pending at 3 sites → **Audit keselamatan pending di 3 lokasi**
  - Succession readiness below 85% target → **Kesiapan suksesi di bawah target 85%**
  - Training budget underutilized (82.5%) → **Anggaran pelatihan kurang termanfaatkan (82,5%)**

- Recommended Actions → **Tindakan yang Direkomendasikan**
  - Accelerate succession planning programs → **Percepat program perencanaan suksesi**
  - Complete pending safety audits by Q4 → **Selesaikan audit keselamatan pending sebelum Kuartal IV**
  - Optimize manufacturing workforce allocation → **Optimalisasi alokasi tenaga kerja manufaktur**
  - Increase training program participation → **Tingkatkan partisipasi program pelatihan**

**Footer Note:**

- "prototype untuk presentasi BOD" → **"prototype untuk presentasi kepada Direksi"**
- "mock data" → **"data simulasi"**
- "1,300+ outlets, 400+ clinics" → **"1.300+ apotek, 400+ klinik"**
- "production" → **"produksi"**

---

#### Komponen: Talent Pipeline

**Judul:**

- Talent & Succession Pipeline → **Pipeline Talenta & Suksesi**

**Metrics:**

- High-Potential Talent → **Talenta Berpotensi Tinggi**
- Succession Readiness → **Kesiapan Suksesi**
- Critical Role Coverage → **Cakupan Posisi Kritis**

**Leadership Bench:**

- Leadership Bench Strength → **Kekuatan Cadangan Kepemimpinan**
- Ready Now → **Siap Sekarang**
- In Development → **Dalam Pengembangan**
- Identified (Not Yet Developed) → **Teridentifikasi (Belum Dikembangkan)**

**Status:**

- "Pipeline talent dalam kondisi sehat untuk mendukung growth strategy" → **"Pipeline talenta dalam kondisi sehat untuk mendukung pertumbuhan"**

---

#### Komponen: Financial Summary

**Metrics:**

- Total HR Cost → **Total Biaya SDM**
- Cost per Employee → **Biaya per Karyawan**
- Payroll % of Revenue → **Gaji % dari Pendapatan**
- Training Budget Utilization → **Utilisasi Anggaran Pelatihan**
- Recruitment Cost per Hire → **Biaya Rekrutmen per Karyawan**

**Text:**

- "Industry avg: 11-13%" → **"Rata-rata industri: 11-13%"**
- "HR cost efficiency dalam target BUMN" → **"Efisiensi biaya SDM dalam target BUMN"** ✅
- "Payroll sebagai % of revenue" → **"Gaji sebagai % dari pendapatan"**

---

#### Komponen: Division Overview

✅ Sudah sepenuhnya dalam Bahasa Indonesia

#### Komponen: Compliance Indicator

✅ Sudah sepenuhnya dalam Bahasa Indonesia

#### Komponen: KPI Card

✅ Sudah sepenuhnya dalam Bahasa Indonesia (komponen umum, label dari props)

---

### 3. Sidebar Navigation

**Menu yang Dibersihkan:**
Removed disabled/placeholder menus:

- ❌ BIJPedia (external link)
- ❌ Financing (disabled)
- ❌ General Affair (disabled)
- ❌ Human Resource (disabled)
- ❌ Reporting (disabled)
- ❌ Help Desk (disabled)

**Menu yang Dipertahankan:**

- ✅ Home
- ✅ Dashboard Eksekutif (renamed from "Dashboard BOD")
- ✅ User Management (Admin only)
- ✅ Settings (Admin only)
- ✅ Profile (Regular users)

---

## Prinsip Lokalisasi yang Digunakan

### 1. Konsistensi Terminologi

- **BUMN Context:** Menggunakan istilah yang familiar di lingkungan BUMN Indonesia
- **Formal Professional:** Menggunakan bahasa formal yang sesuai untuk level Direksi
- **Clear & Direct:** Tetap jelas dan mudah dipahami

### 2. Penomoran & Format

- **Ribuan:** Menggunakan titik (.) bukan koma → 1.300 bukan 1,300
- **Desimal:** Menggunakan koma (,) bukan titik → 82,5% bukan 82.5%
- **Mata Uang:** Format Rupiah "Rp" dengan spasi

### 3. Istilah yang Dipertahankan (Mixed)

Beberapa istilah tetap menggunakan campuran untuk clarity:

- **Target, budget, training, pipeline:** Familiar dan umum digunakan dalam konteks corporate Indonesia
- **Status, pending, optimal:** Istilah teknis yang sudah familiar

### 4. Istilah Kunci BUMN

- **Direksi** (bukan BOD atau Board of Directors)
- **Eksekutif** (bukan Executive)
- **Talenta** (bukan Talent)
- **Kepatuhan** (bukan Compliance)
- **Suksesi** (bukan Succession)

---

## File yang Dimodifikasi

```
resources/
├── constants/
│   └── site-navigation.js         # Menu "Dashboard Eksekutif"
└── app/dashboard/
    ├── pages/
    │   └── bod-dashboard.tsx       # Full lokalisasi
    └── components/
        ├── talent-pipeline.tsx     # Full lokalisasi
        └── financial-summary.tsx   # Full lokalisasi
```

---

## Testing Checklist

- [x] Sidebar menu menampilkan "Dashboard Eksekutif"
- [x] Dashboard header dalam Bahasa Indonesia
- [x] Semua KPI cards dalam Bahasa Indonesia
- [x] Strategic insights dalam Bahasa Indonesia
- [x] Component talent pipeline dalam Bahasa Indonesia
- [x] Component financial summary dalam Bahasa Indonesia
- [x] Footer note dalam Bahasa Indonesia
- [x] Format angka sesuai konvensi Indonesia
- [x] No ESLint errors introduced
- [x] Build successful

---

## Rekomendasi untuk Fase Selanjutnya

### 1. Implementasi i18n Proper (Optional)

Jika aplikasi akan multi-bahasa di masa depan:

```typescript
// Pertimbangkan library seperti:
- react-i18next
- react-intl
- next-i18next (jika migrasi ke Next.js)
```

### 2. Locale Configuration

```typescript
// Setup proper locale untuk format angka dan tanggal
const locale = "id-ID";
const numberFormat = new Intl.NumberFormat(locale);
const dateFormat = new Intl.DateTimeFormat(locale);
```

### 3. Glossary BUMN

Buat glossary istilah standar untuk konsistensi:

- Direksi (Board of Directors)
- Dewan Komisaris (Board of Commissioners)
- RUPS (Rapat Umum Pemegang Saham)
- dll.

---

**Status:** ✅ Lokalisasi Selesai
**Tanggal:** 30 Oktober 2025
**Next Step:** Testing dengan stakeholder untuk konfirmasi terminologi
