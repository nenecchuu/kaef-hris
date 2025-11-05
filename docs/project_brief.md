# 📝 Product Brief: Aplikasi Manajemen Kompetensi Kimia Farma

Dokumen ini menjelaskan ruang lingkup produk, kebutuhan pengguna, dan aturan bisnis inti untuk aplikasi manajemen kompetensi Kimia Farma. Ini berfungsi sebagai panduan utama untuk pengembangan fitur dan desain.

## 1. 🎯 Ringkasan Produk (Product Overview)

* **Produk:** Aplikasi Seluler (Mobile App) untuk manajemen kompetensi.
* **Perusahaan:** Kimia Farma (BUMN Farmasi).
* **Total Pengguna:** 5.247 karyawan.

## 2. 👥 Persona & Kebutuhan Pengguna (User Personas)

Aplikasi ini memiliki dua peran pengguna yang berbeda dengan kebutuhan yang sangat berbeda:

### A. LEADERS

* **Siapa:** BOD, Manajer, HR.
* **Kebutuhan Inti:** Membutuhkan tampilan organisasi/tim (Organization/team view). Mereka perlu menganalisis, melacak, dan mengelola kompetensi tim mereka.

### B. KARYAWAN

* **Siapa:** Staf.
* **Kebutuhan Inti:** Membutuhkan tampilan *self-service* (Self-service view). Mereka perlu melihat profil kompetensi mereka sendiri dan melakukan asesmen mandiri.

## 3. 🗺️ Fungsionalitas Inti (Core Functionality)

Fungsionalitas inti untuk setiap peran didefinisikan oleh navigasi utama aplikasi:

* **Navigasi Bawah (Leaders):**
  * `🏠 Beranda` (Dashboard KPI Tim)
  * `📊 Analisis` (Analisis kompetensi & gap tim)
  * `👥 Tim` (Daftar & detail anggota tim)
  * `🔔 Notifikasi`
  * `⋯ Lainnya`

* **Navigasi Bawah (Karyawan):**
  * `🏠 Beranda` (Dashboard pribadi)
  * `📋 Profil` (Melihat detail data & profil kompetensi diri sendiri)
  * `📊 Asesmen` (Melakukan *self-assessment*)
  * `🔔 Notifikasi`
  * `⋯ Lainnya`

## 4. 🗂️ Data Inti Karyawan (PENEKANAN PENTING)

Salah satu inti utama dari aplikasi ini adalah sebagai **'Single Source of Truth'** untuk data karyawan. Tampilan 'Detail Karyawan' (baik untuk Leader yang melihat anggota timnya, maupun Karyawan yang melihat `📋 Profil` diri sendiri) harus menampilkan data komprehensif berikut:

* Riwayat Pekerjaan
* Pendidikan Formal
* Hasil Assessment (Termasuk format tampilan di bawah)
* Training
* Kompetensi
* Personal Qualification
* Achievement
* KPI Personal

Fungsi-fungsi lain seperti asesmen dan analisis bertujuan untuk mengisi dan memvisualisasikan data-data ini.

## 5. ⚖️ Aturan Bisnis & Rekomendasi

Aturan-aturan ini mendefinisikan standar untuk produk.

### A. Branding (NON-NEGOSIABEL)

* Warna brand harus menggunakan nilai eksak berikut:
  * `--primary-blue: #003A78` (Kimia Farma Blue)
  * `--secondary-orange: #F39200` (Kimia Farma Orange)

### B. Format Tampilan Tabel Asesmen (REKOMENDASI KUAT)

Ini adalah format yang **sangat direkomendasikan** untuk tampilan data asesmen, berdasarkan referensi dari "BIO LEADERS". **Perubahan apa pun pada format ini harus dikonfirmasi terlebih dahulu.**

* **Average:** Harus ditampilkan sebagai **angka biasa** (Contoh: `2.4`).
  * *Rekomendasi:* Jangan ditampilkan sebagai pecahan (Contoh: "2.4/5").
* **Fit Rate:** Harus ditampilkan **dengan tanda persen** (Contoh: `40%`).
* **Gap:** Harus ditampilkan sebagai angka positif/negatif (Contoh: `-1`, `0`, `+1`).
* **Status:** Harus menggunakan indikator ikon yang jelas:
  * `✅ Fit`
  * `⚠️ Gap`
  * `⬆️ Exceed`

### C. Logika Kalkulasi Inti (Rekomendasi)

* **Average Actual:** `sum(actual_scores) / count(items)`
* **Fit Rate:** `(count(gap === 0) / totalItems) * 100`

## 6. 📚 Taksonomi Kompetensi (Content Taxonomy)

Konten kompetensi bersifat tetap dan dibagi menjadi 5 kategori dengan total 24 item.

1. **Core Values** (5 item)
   * Professional, Integrity, Teamwork, Innovation, Customer Oriented
2. **Generic** (3 item)
   * Concern for Order, Thinking Ability, Empathy & Interpersonal Skill
3. **Management** (4 item)
   * Time Management, Organizational Awareness, Managing Work & Performance, Business Acumen
4. **Leadership** (6 item)
   * Problem Solving, Strategic Thinking, Visionary, Building Team, Change, Empowerment
5. **Technical** (6 item)
   * QMS, Risk Management, Documentation, HC Planning, Learning Management, Knowledge Management

## 7. 🚀 Prioritas Pengembangan Fitur

Pengembangan akan difokuskan dalam urutan prioritas fungsionalitas berikut untuk membangun MVP (Minimum Viable Product).

### Prioritas 1: Fondasi & Alur Pengguna Dasar

1. Halaman Login & Autentikasi Pengguna.
2. Navigasi Utama Aplikasi (Bottom Navigation).
3. Routing dasar yang membedakan alur `Leaders` vs `Karyawan`.

### Prioritas 2: Fungsionalitas Leaders

4. Halaman `Home Leaders` (Menampilkan dashboard KPI tim).
5. Halaman `Tim` (Menampilkan daftar karyawan di bawahnya).
6. Halaman `Analisis` (Visualisasi data kompetensi & gap tim, misal: heatmap).

### Prioritas 3: Fungsionalitas Inti Karyawan & Asesmen

 7. Halaman `Detail Karyawan` (Menampilkan 8 Data Inti dari Bagian 4).
 8. Fungsionalitas Tampilan `Hasil Assessment` (Mengikuti format Rekomendasi Kuat di Bagian 5B).
 9. Logika Bisnis untuk Kalkulasi Asesmen (average, fit rate).
10. Alur `Profil` dan `Asesmen` untuk Karyawan (Self-Service).

## 8. 💡 Prinsip Panduan (Untuk AI / Developer)

Saat menggunakan dokumen ini sebagai referensi, harap patuhi prinsip-prinsip berikut:

* **Fokus pada Peran:** Selalu bedakan antara kebutuhan `Leaders` dan `Karyawan`. Fitur dan UI sangat bergantung pada peran ini.
* **Patuhi Aturan Bisnis:** "Branding" adalah non-negosiabel. "Rekomendasi Kuat" (seperti format asesmen) harus diikuti kecuali ada konfirmasi perubahan.
* **Data Karyawan adalah Inti:** Ingat bahwa fungsionalitas asesmen dan analisis adalah *cara* untuk *mengisi* dan *memahami* data inti karyawan (di Bagian 4), yang merupakan pusat dari aplikasi ini.
* **Patuhi Taksonomi:** Semua fungsionalitas harus didasarkan pada 5 Kategori Kompetensi yang telah ditetapkan.
* **Fokus pada "Apa" & "Mengapa":** Dokumen ini mendefinisikan "Apa" yang dibuat dan "Mengapa". "Bagaimana" (arsitektur teknis) diserahkan kepada tim pengembang.
