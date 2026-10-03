# Software Requirements Specification (SRS)

**Project:** Vehicle Tax Payment System (VTPS)
**Version:** 1.0
**Date:** September 15, 2026
**Author:** Muhammad Nebukhadnezar Manthoufani
**Status:** Prototype / Simulation

---

## 1. Pendahuluan

### 1.1 Tujuan

Dokumen ini mendefinisikan persyaratan fungsional dan non-fungsional
untuk sistem pembayaran pajak kendaraan berbasis web (VTPS).
Dokumen ini ditujukan untuk:

- **Project Engineer** — sebagai acuan pengembangan
- **Developer** — sebagai panduan implementasi
- **QA Engineer** — sebagai acuan testing
- **Stakeholder** — sebagai dokumentasi formal

### 1.2 Ruang Lingkup

Sistem ini adalah **prototipe frontend** yang menyimulasikan alur
pembayaran pajak kendaraan terintegrasi dengan:

- SAMSAT (Samsat Digital Nasional)
- Korlantas Polri (Regident)
- Bapenda (Pajak Daerah)
- Dukcapil (Verifikasi Identitas)

**Ruang lingkup prototype:**
- ✅ 5 halaman fungsional
- ✅ Multi-channel payment (QRIS, VA, E-wallet)
- ✅ Simulasi API Polri/Bapenda/Dukcapil
- ✅ Riwayat transaksi (localStorage)
- ✅ e-TBPKP siap cetak

**Di luar ruang lingkup:**
- ❌ Backend API produksi
- ❌ Integrasi payment gateway sungguhan
- ❌ Autentikasi biometrik
- ❌ Pajak 5 tahunan
- ❌ Deployment produksi

### 1.3 Definisi & Akronim

| Istilah | Arti |
|---|---|
| **PKB** | Pajak Kendaraan Bermotor |
| **SWDKLLJ** | Sumbangan Wajib Dana Kecelakaan Lalu Lintas Jalan |
| **NRKB** | Nomor Registrasi Kendaraan Bermotor |
| **TBPKP** | Tanda Bukti Pelunasan Kewajiban Pembayaran |
| **SAMSAT** | Sistem Administrasi Manunggal Satu Atap |
| **Bapenda** | Badan Pendapatan Daerah |
| **UU PDP** | Undang-Undang Perlindungan Data Pribadi |
| **SPBE** | Sistem Pemerintahan Berbasis Elektronik |
| **QRIS** | Quick Response Code Indonesian Standard |
| **VA** | Virtual Account |

### 1.4 Referensi

1. UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
2. Perpres No. 95 Tahun 2018 tentang SPBE
3. PMBOK Guide 7th Edition
4. Standar QRIS EMVCo
5. Dokumentasi Samsat Digital Nasional (SIGNAL)

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk

VTPS adalah **frontend web application** yang akan berkomunikasi
dengan backend API dari berbagai instansi pemerintah. Untuk
prototipe, komunikasi ini disimulasikan dengan dummy data.

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  VTPS Frontend  │
│  (React + TS)   │
└──────┬──────────┘
       │
       ├─────────────► Polri API (simulasi)
       ├─────────────► Bapenda API (simulasi)
       ├─────────────► Dukcapil API (simulasi)
       └─────────────► Payment Gateway (simulasi)
```

### 2.2 Fungsi Utama

| # | Fungsi | Deskripsi |
|---|---|---|
| 1 | Verifikasi Kendaraan | Input plat + STNK + rangka |
| 2 | Perhitungan Pajak | PKB + SWDKLLJ + denda |
| 3 | Pembayaran | QRIS, VA, E-wallet |
| 4 | Sinkronisasi | Write-back ke Polri & Bapenda |
| 5 | Riwayat Transaksi | Simpan & tampilkan |
| 6 | Bukti Pembayaran | e-TBPKP siap cetak |
| 7 | Timer Pembayaran | Countdown 15 menit |

### 2.3 Karakteristik Pengguna

| Pengguna | Deskripsi | Kemampuan |
|---|---|---|
| **Wajib Pajak** | Pemilik kendaraan, 17-70 tahun | Bisa pakai browser & mobile banking |
| **Petugas SAMSAT** | Verifikator (opsional) | Bisa akses dashboard admin |
| **Admin Sistem** | Pengelola (opsional) | Bisa kelola user & data |

### 2.4 Lingkungan Operasi

| Aspek | Detail |
|---|---|
| **Platform** | Web (desktop, tablet, mobile) |
| **Browser** | Chrome, Firefox, Safari, Edge (versi terbaru) |
| **Jaringan** | Minimal 3G |
| **Bahasa** | Bahasa Indonesia |
| **Zona Waktu** | WIB (GMT+7) |

---

## 3. Functional Requirements

### FR-01: Input Data Kendaraan

**Deskripsi:** User dapat memasukkan data kendaraan untuk dicek.

**Input:**
- Nomor plat kendaraan (format: `XX 1234 XXX`)
- 5 digit terakhir nomor STNK
- 5 digit terakhir nomor rangka mesin

**Proses:**
1. Validasi format input
2. Cari data di database (simulasi)
3. Tampilkan hasil atau error

**Output:**
- Data kendaraan (jika ditemukan)
- Pesan error (jika tidak ditemukan)

**Prioritas:** Tinggi

---

### FR-02: Validasi Input

**Deskripsi:** Sistem memvalidasi format input user.

**Aturan:**
- Plat: format `XX 1234 XXX` (huruf + angka + huruf)
- STNK: tepat 5 digit angka
- Rangka: tepat 5 digit angka
- Semua field wajib diisi

**Output:**
- Pesan error spesifik jika tidak valid
- Lanjut ke proses berikutnya jika valid

**Prioritas:** Tinggi

---

### FR-03: Tampil Tagihan Pajak

**Deskripsi:** Sistem menampilkan rincian tagihan pajak.

**Output:**
- Data kendaraan (merk, model, tahun, warna)
- Data pemilik (nama, alamat)
- Rincian pajak:
  - Pajak Pokok (PKB)
  - SWDKLLJ
  - Denda (jika ada)
  - Total
- Jatuh tempo
- Status (lunas/belum lunas)

**Prioritas:** Tinggi

---

### FR-04: Pilih Metode Pembayaran

**Deskripsi:** User memilih metode pembayaran.

**Opsi:**
- QRIS (semua e-wallet & m-banking)
- Virtual Account (BCA, Mandiri, BNI)
- E-Wallet (GoPay, OVO, DANA)

**Output:**
- Detail metode pembayaran (QR code, nomor VA, dll)
- Instruksi pembayaran

**Prioritas:** Tinggi

---

### FR-05: Proses Pembayaran

**Deskripsi:** Sistem memproses pembayaran.

**Proses:**
1. Generate nomor transaksi unik
2. Generate QR code / nomor VA (sesuai metode)
3. Tampilkan timer countdown 15 menit
4. Verifikasi pembayaran (simulasi)
5. Generate e-TBPKP

**Output:**
- Halaman sukses dengan e-TBPKP
- Status sinkronisasi ke SAMSAT & Polri

**Prioritas:** Tinggi

---

### FR-06: Riwayat Transaksi

**Deskripsi:** Sistem menyimpan dan menampilkan riwayat transaksi.

**Fitur:**
- Simpan transaksi ke localStorage
- Tampilkan daftar transaksi
- Hapus semua riwayat (opsional)

**Data yang disimpan:**
- Nomor transaksi
- Tanggal
- Metode pembayaran
- Data kendaraan
- Total pembayaran

**Prioritas:** Sedang

---

### FR-07: Print e-TBPKP

**Deskripsi:** User dapat mencetak bukti pembayaran.

**Fitur:**
- Print-friendly CSS
- Format PDF (via browser print)
- Sembunyikan elemen UI saat print

**Output:**
- File PDF / print preview
- Layout rapi tanpa header/tombol

**Prioritas:** Sedang

---

## 4. Non-Functional Requirements

### NFR-01: Performance

| Aspek | Target |
|---|---|
| Waktu muat halaman | < 3 detik |
| Simulasi pencarian | < 2 detik |
| Responsivitas UI | < 100ms |
| Ukuran bundle | < 500 KB (gzipped) |

### NFR-02: Security

- ✅ Komunikasi via HTTPS
- ✅ Tidak menyimpan data sensitif di localStorage
- ✅ Sesuai UU PDP No. 27/2022
- ✅ Data biometrik tidak disimpan > 24 jam
- ✅ Audit trail untuk semua operasi sensitif

### NFR-03: Usability

- ✅ Responsif di mobile & desktop
- ✅ Aksesibel (WCAG 2.1 AA)
- ✅ Bahasa Indonesia
- ✅ Font mudah dibaca (Inter)
- ✅ Tombol minimal 44x44 px

### NFR-04: Reliability

| Aspek | Target |
|---|---|
| Uptime | 99% (production) |
| Data persistence | localStorage |
| Error handling | Semua error tertangani |
| Recovery | Auto-save |

### NFR-05: Maintainability

- ✅ Kode modular dengan komponen reusable
- ✅ Dokumentasi lengkap (README, komentar)
- ✅ Git version control
- ✅ Conventional commits
- ✅ Clean code principles

### NFR-06: Compliance

- ✅ UU PDP No. 27/2022
- ✅ Perpres 95/2018 (SPBE)
- ✅ Standar QRIS EMVCo
- ✅ Standar BPMN 2.0

---

## 5. Use Case Diagram

```
                    ┌───────────────────────┐
                    │    Wajib Pajak        │
                    └───────────┬───────────┘
                                │
            ┌───────────────────┼───────────────────┬──────────────┐
            │                   │                   │              │
            ▼                   ▼                   ▼              ▼
       ┌────────┐          ┌────────┐          ┌────────┐    ┌──────────┐
       │  Cek   │          │ Lihat  │          │ Bayar  │    │ Lihat    │
       │Tagihan │          │Tagihan │          │ Pajak  │    │ Riwayat  │
       └────────┘          └────────┘          └────────┘    └──────────┘
            │                   │                   │              │
            └───────────────────┴───────────────────┴──────────────┘
                                │
                                ▼
                        ┌──────────────┐
                        │  Sistem      │
                        │  VTPS        │
                        └──────────────┘
                                │
            ┌───────────────────┼───────────────────┬──────────────┐
            │                   │                   │              │
            ▼                   ▼                   ▼              ▼
       ┌────────┐          ┌────────┐          ┌────────┐    ┌──────────┐
       │ Polri  │          │Bapenda │          │Dukcapil│    │ Payment  │
       │  API   │          │  API   │          │  API   │    │ Gateway  │
       └────────┘          └────────┘          └────────┘    └──────────┘
```

### Use Case Detail

| Use Case | Aktor | Precondition | Postcondition |
|---|---|---|---|
| Cek Tagihan | Wajib Pajak | Data kendaraan tersedia | Tagihan ditampilkan |
| Lihat Tagihan | Wajib Pajak | Tagihan sudah ditampilkan | User bisa bayar |
| Bayar Pajak | Wajib Pajak | Tagihan valid & belum lunas | Pembayaran sukses |
| Lihat Riwayat | Wajib Pajak | Ada transaksi tersimpan | Riwayat ditampilkan |

---

## 6. User Interface Requirements

### 6.1 Layout

- **Mobile-first** — responsif dari 320px ke atas
- **Konsisten** — warna, font, spacing seragam
- **Aksesibel** — kontras warna memadai

### 6.2 Design System

- **Warna Utama:** Biru (#2563EB)
- **Warna Sukses:** Hijau (#16A34A)
- **Warna Error:** Merah (#DC2626)
- **Warna Warning:** Kuning (#FBBF24)
- **Font:** Inter (Google Fonts)
- **Border Radius:** 8-12px

### 6.3 Komponen Utama

| Komponen | Fungsi |
|---|---|
| **Header** | Logo, judul, info layanan |
| **Form Input** | Input plat, STNK, rangka |
| **Card** | Container untuk konten |
| **Button** | Aksi utama (biru) & sekunder |
| **Modal** | Dialog konfirmasi |
| **Timer** | Countdown pembayaran |
| **QR Code** | Tampilan QRIS |
| **Alert** | Notifikasi error/sukses |

### 6.4 Aksesibilitas

- ✅ Keyboard navigasi
- ✅ Screen reader friendly
- ✅ Contrast ratio minimal 4.5:1
- ✅ Focus state yang jelas
- ✅ Alt text untuk gambar

---

## 7. Batasan

### 7.1 Batasan Teknis

- Hanya frontend (tanpa backend asli)
- Data dummy (bukan API asli)
- localStorage untuk persistensi (bukan database)
- Tidak ada autentikasi biometrik

### 7.2 Batasan Hukum

- UU PDP No. 27/2022 — tidak boleh pakai data asli
- Perpres 95/2018 — standar SPBE
- Peraturan Polri No. 7/2021 — Regident Ranmor

### 7.3 Batasan Bisnis

- Hanya pajak tahunan (bukan 5 tahunan)
- Hanya untuk kendaraan roda 2 & 4
- Prototipe untuk portofolio

### 7.4 Asumsi

- User punya akses internet
- User bisa pakai browser modern
- API pemerintah akan tersedia di masa depan
- Data kendaraan akurat di database

---

## 8. Roadmap Pengembangan

| Fase | Status | Deliverable |
|---|---|---|
| Phase 1: Design | ✅ | Charter, BPMN, Architecture, API Contract, SRS |
| Phase 2: Implementation | ✅ | React app (5 halaman) |
| Phase 3: Testing | ✅ | Full feature testing |
| Phase 4: Documentation | ✅ | README, artikel |

---

## 9. Approval

| Role | Name | Signature | Date |
|---|---|---|---|
| Project Engineer | Muhammad Nebukhadnezar Manthoufani | _______ | 2026-09-15 |

---

**Document Version:** 1.0
**Last Updated:** 2026-09-15
**Author:** Muhammad Nebukhadnezar Manthoufani
**Contact:** mhdnebukhadnezarmanthoufani@gmail.com
