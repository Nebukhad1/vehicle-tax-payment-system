# Project Charter (Piagam Proyek)
## Prototipe Sistem Pembayaran Pajak Kendaraan
### Vehicle Tax Payment System (VTPS) — Prototype

---

## 1. Ikhtisar Proyek

| Item | Keterangan |
|---|---|
| **Nama Proyek** | Prototipe Sistem Pembayaran Pajak Kendaraan |
| **Kode Proyek** | VTPS-2026-001 |
| **Versi** | 1.0 |
| **Tanggal** | 15 September 2026 |
| **Project Engineer** | Muhammad Nebukhadnezar Manthoufani |
| **Durasi** | September 2026 - Desember 2026 (3 bulan) |
| **Status** | Prototipe / Simulasi |
| **Anggaran** | Rp 0 (menggunakan tools open-source) |

---

## 2. Latar Belakang & Tujuan

### 2.1 Pengalaman Pribadi

**Proyek ini lahir dari pengalaman pribadi saya sendiri.**

Saya memiliki seorang adik laki-laki yang sedang kuliah di
Pulau Jawa. Ia tinggal di Jawa, sementara keluarga kami
tinggal di Pekanbaru, Sumatra. Pajak kendaraan milik adik
saya **hanya bisa dibayarkan di SAMSAT tempat kendaraan
tersebut terdaftar, yaitu Pekanbaru**.

Setiap tahun, kami menghadapi masalah berikut:

| # | Masalah | Yang Sebenarnya Terjadi |
|---|---|---|
| 1 | Tidak bisa bayar di luar kota asal | Adik saya di Jawa, tapi pembayaran harus di Pekanbaru |
| 2 | Harus pemilik asli yang mengurus | Saya tidak bisa bayar atas namanya — harus dia sendiri |
| 3 | Harus memanggil adik pulang dari Jawa | Entah dia bolos kuliah untuk pulang, atau saya siapkan surat kuasa |
| 4 | Persiapan dokumen memakan waktu | Surat kuasa, fotokopi KTP, STNK asli, dll. |
| 5 | Kantor SAMSAT hanya buka hari kerja | Bentrok dengan pekerjaan dan kuliah |
| 6 | Tidak ada visibilitas progres | Setelah bayar, kami tidak bisa cek apakah SAMSAT dan Polri sudah update |

**Suatu tahun, untuk membayar pajak kendaraan adik saya, saya mengalami:**

- 3 hari persiapan (mengumpulkan dokumen)
- 2 kali kunjungan ke SAMSAT (kunjungan pertama ditolak karena dokumen tidak lengkap)
- Total 8 jam waktu tunggu
- Telepon dan pertukaran dokumen dengan adik saya (Jawa ⇄ Sumatra)
- Total waktu penyelesaian: **2 minggu**

**Ini masih menjadi kenyataan di Indonesia pada tahun 2026.**

### 2.2 Akar Masalah

Dari pengalaman ini, saya mengidentifikasi masalah fundamental berikut:

```
Akar Masalah: Proses pembayaran pajak kendaraan terikat pada "tempat" dan "orang"
    │
    ├── Kendala Geografis: Hanya di SAMSAT tempat registrasi
    ├── Kendala Prosedural: Hanya pemilik asli yang bisa mengurus
    └── Kendala Informasi: Tidak ada visibilitas status
```

### 2.3 Tujuan

1. **Bayar dari mana saja** — Hilangkan kendala geografis
2. **Verifikasi identitas minimal** — Plat + STNK + nomor rangka
3. **Pembayaran multi-channel** — QRIS, Virtual Account, E-wallet
4. **Status real-time** — Konfirmasi sinkronisasi ke SAMSAT & Polri
5. **Riwayat transaksi persisten** — Penyimpanan bukti pembayaran

### 2.4 Dampak yang Diharapkan

| Stakeholder | Kondisi Saat Ini | Setelah Perbaikan |
|---|---|---|
| Keluarga saya | Harus panggil adik pulang | Bisa bayar dari mana saja |
| Keluarga lain | Masalah yang sama | Solusi yang sama tersedia |
| SAMSAT | Antrian padat | Beban kerja berkurang |
| Polri | Update data terlambat | Sinkronisasi real-time |
| Bapenda | Risiko kebocoran pajak | Transparansi meningkat |

---

## 3. Ruang Lingkup

### 3.1 Termasuk (In Scope)

- ✅ Aplikasi web frontend (React + TypeScript)
- ✅ Simulasi data kendaraan (data dummy)
- ✅ Simulasi API Polri/Bapenda/Dukcapil
- ✅ Pembayaran multi-channel (QRIS, VA, E-wallet)
- ✅ Riwayat transaksi (localStorage)
- ✅ e-TBPKP siap cetak

### 3.2 Tidak Termasuk (Out of Scope)

- ❌ Backend API produksi
- ❌ Integrasi payment gateway sungguhan
- ❌ Autentikasi biometrik (face matching)
- ❌ Pajak 5 tahunan (perpanjangan plat)
- ❌ Deployment produksi

### 3.3 Alasan

Proyek ini adalah **prototipe untuk portofolio**. Akses ke API
pemerintah yang sebenarnya membutuhkan perjanjian formal. Selain
itu, berdasarkan **UU PDP No. 27/2022**, penggunaan data asli
harus dihindari.

---

## 4. Stakeholder

| Stakeholder | Peran | Kepentingan | Pengaruh |
|---|---|---|---|
| Adik saya (pengguna nyata) | End user | Kemudahan pembayaran | Tertinggi |
| Keluarga saya | Pembayar proxy | Beban berkurang | Tinggi |
| Wajib pajak umum | End user | Kemudahan pembayaran | Tinggi |
| SAMSAT | Penyedia data pajak | Akurasi & pendapatan | Tinggi |
| Korlantas Polri | Penyedia data kendaraan | Validitas data | Tinggi |
| Bapenda | Pengelola pendapatan | Pendapatan daerah | Sedang |
| Dukcapil | Verifikasi identitas | Kepatuhan UU PDP | Sedang |
| Payment gateway | Proses pembayaran | Keamanan transaksi | Sedang |

### Analisis Stakeholder

```
Pengaruh
  Tinggi │  Adik     SAMSAT    Polri
         │  Keluarga Bapenda
         │
  Sedang │           Dukcapil  PaymentGW
         │
  Rendah │
         └──────────────────────
            Rendah  Sedang  Tinggi  Kepentingan
```

---

## 5. Kriteria Sukses

### 5.1 Kriteria Sukses Teknis

| # | Kriteria | Target | Pengukuran |
|---|---|---|---|
| 1 | Jumlah halaman | 5 halaman | Cek implementasi |
| 2 | Metode pembayaran | 3+ jenis | Cek implementasi |
| 3 | Waktu pencarian simulasi | < 2 detik | Pengukuran |
| 4 | Persistensi data | Antar sesi | Cek localStorage |
| 5 | Dukungan cetak | e-TBPKP | Cek print preview |
| 6 | Kepatuhan UU PDP | Tidak pakai data asli | Code review |

### 5.2 Kriteria Sukses Personal

| # | Kriteria | Arti |
|---|---|---|
| 1 | Adik saya bisa menggunakannya | Bukti kepraktisan |
| 2 | Beban keluarga berkurang | Menyelesaikan pengalaman awal |
| 3 | Menjadi referensi orang lain | Nilai sosial |

---

## 6. Manajemen Risiko

### 6.1 Daftar Risiko

| # | Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|---|
| R1 | API pemerintah tidak tersedia | Tinggi | Tinggi | Pakai data dummy |
| R2 | Regulasi UU PDP ketat | Tinggi | Tinggi | Tidak pakai data asli |
| R3 | Scope creep | Sedang | Sedang | Batasi ke prototipe |
| R4 | Perbedaan format data | Sedang | Sedang | Adapter pattern |
| R5 | Kurang generalisasi | Sedang | Rendah | Desain generik |
| R6 | Keterlambatan jadwal | Sedang | Rendah | Prioritas |

### 6.2 Detail Risiko Utama

#### R1: API pemerintah tidak tersedia
- **Deskripsi:** API Polri/Bapenda tidak tersedia tanpa perjanjian formal
- **Mitigasi:** Simulasikan semua fitur dengan data dummy
- **Kontinjensi:** Desain agar bisa ganti API di masa depan

#### R2: Regulasi UU PDP
- **Deskripsi:** Penanganan data ketat berdasarkan UU Perlindungan Data Pribadi
- **Mitigasi:** Tidak pakai data asli, hanya data dummy
- **Kontinjensi:** Terapkan prinsip minimalisasi data

---

## 7. Batasan

| Jenis | Batasan |
|---|---|
| Waktu | 3 bulan (paruh waktu) |
| Tim | 1 orang (proyek solo) |
| Anggaran | Rp 0 (open-source saja) |
| Regulasi | UU PDP No. 27/2022 |
| Regulasi | Perpres 95/2018 (SPBE) |
| Teknologi | React + TypeScript |
| Data | Hanya data dummy |

---

## 8. Jadwal

### 8.1 Milestone

| Fase | Periode | Deliverable |
|---|---|---|
| Fase 1: Desain | Minggu 1-2 | Charter, BPMN, Arsitektur |
| Fase 2: Implementasi | Minggu 3-8 | Aplikasi React (5 halaman) |
| Fase 3: Testing | Minggu 9-10 | Testing semua fitur |
| Fase 4: Dokumentasi | Minggu 11-12 | SRS, README, artikel |

### 8.2 Gantt Chart

```
Minggu: 1  2  3  4  5  6  7  8  9 10 11 12
       ├──┴──┤
Desain    ████
         ├─────┴─────┴─────┴─────┤
Implementasi     ████████████████
                              ├──┴──┤
Testing                          ████
                                  ├──┴──┤
Dokumentasi                          ████
```

---

## 9. Deliverables

### 9.1 Deliverable Teknis

| # | Deliverable | Format |
|---|---|---|
| D1 | Aplikasi web | React + TypeScript |
| D2 | Kode sumber | Repositori GitHub |
| D3 | Aplikasi ter-deploy | URL Netlify |

### 9.2 Deliverable Dokumentasi

| # | Deliverable | Format |
|---|---|---|
| D4 | Project Charter | Markdown |
| D5 | Diagram BPMN | PNG |
| D6 | Arsitektur sistem | PNG |
| D7 | API contract | Markdown |
| D8 | SRS | Markdown |
| D9 | README | Markdown |
| D10 | Artikel proyek | LinkedIn / Medium |

---

## 10. Persetujuan

| Peran | Nama | Tanda Tangan | Tanggal |
|---|---|---|---|
| Project Engineer | Muhammad Nebukhadnezar Manthoufani | _______ | 2026-09-15 |

---

## Lampiran

### A. Detail Pengalaman Pribadi

**Pada tahun 2025, untuk membayar pajak kendaraan adik saya, saya mengalami:**

| Hari | Kejadian | Durasi |
|---|---|---|
| Hari 1 | Menghubungi adik, cek dokumen yang diperlukan | 1 jam |
| Hari 2-3 | Mengumpulkan dokumen (KTP, STNK, surat kuasa) | 2 hari |
| Hari 4 | Kunjungan SAMSAT ke-1 — ditolak karena dokumen tidak lengkap | 3 jam |
| Hari 5 | Menyiapkan ulang dokumen | 2 jam |
| Hari 6 | Kunjungan SAMSAT ke-2 — pembayaran selesai | 5 jam |
| **Total** | | **~2 minggu** |

**Pengalaman inilah yang menjadi asal mula proyek ini.**

### B. Daftar Istilah

| Istilah | Arti |
|---|---|
| PKB | Pajak Kendaraan Bermotor |
| SWDKLLJ | Sumbangan Wajib Dana Kecelakaan Lalu Lintas Jalan |
| NRKB | Nomor Registrasi Kendaraan Bermotor |
| TBPKP | Tanda Bukti Pelunasan Kewajiban Pembayaran |
| SAMSAT | Sistem Administrasi Manunggal Satu Atap |
| Bapenda | Badan Pendapatan Daerah |
| UU PDP | Undang-Undang Perlindungan Data Pribadi |
| SPBE | Sistem Pemerintahan Berbasis Elektronik |

### C. Referensi

1. UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
2. Perpres No. 95 Tahun 2018 tentang SPBE
3. PMBOK Guide 7th Edition
4. Dokumentasi Samsat Digital Nasional (SIGNAL)

### D. Peran sebagai Project Engineer

Melalui proyek ini, saya menunjukkan kemampuan Project Engineer berikut:

- ✅ **Definisi masalah dari pengalaman pribadi**
- ✅ **Definisi proyek** — latar belakang, tujuan, ruang lingkup
- ✅ **Manajemen stakeholder** — 8 instansi
- ✅ **Manajemen risiko** — Daftar risiko dengan mitigasi
- ✅ **Manajemen jadwal** — 4 fase, 12 minggu
- ✅ **Manajemen kualitas** — Definisi kriteria sukses
- ✅ **Dokumentasi** — 10 deliverables
- ✅ **Kepatuhan regulasi** — UU PDP, SPBE

---

**Document Version:** 1.0
**Last Updated:** 2026-09-15
**Author:** Muhammad Nebukhadnezar Manthoufani
**Contact:** mhdnebukhadnezarmanthoufani@gmail.com
