# API Contract

Dokumentasi API untuk integrasi Vehicle Tax Payment System (VTPS)
dengan sistem eksternal.

## Base URLs

| Environment | URL |
|---|---|
| Development | `https://api-dev.vtps.go.id/v1` |
| Staging | `https://api-staging.vtps.go.id/v1` |
| Production | `https://api.vtps.go.id/v1` |

## Authentication

Semua endpoint membutuhkan API key dan bearer token:

```http
X-API-Key: <your_api_key>
Authorization: Bearer <access_token>
```

---

## 1. POLRI API (Korlantas)

### 1.1 Get Vehicle Data by Plate

Mendapatkan data kendaraan berdasarkan nomor plat.

**Endpoint:**
```
GET /polri/vehicle/{plat}
```

**Request:**
```http
GET /polri/vehicle/BM1234XYZ
X-API-Key: <polri_api_key>
```

**Path Parameters:**
| Parameter | Type | Deskripsi |
|---|---|---|
| `plat` | string | Nomor plat tanpa spasi (contoh: BM1234XYZ) |

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "plat": "BM 1234 XYZ",
    "merk": "Honda",
    "model": "Beat 2020",
    "tahun": 2020,
    "warna": "Hitam",
    "nomor_rangka": "MH1JFB...67890",
    "nomor_mesin": "JFB1E...12345",
    "pemilik": {
      "nama": "Budi Santoso",
      "nik": "1471...****",
      "alamat": "Jl. Sudirman No. 10, Pekanbaru"
    },
    "status_kendaraan": "aktif",
    "tanggal_registrasi": "2020-03-15",
    "berlaku_sampai": "2026-03-15"
  }
}
```

**Response (404 Not Found):**
```json
{
  "status": "error",
  "error": {
    "code": "VEHICLE_NOT_FOUND",
    "message": "Kendaraan dengan plat BM 9999 ZZZ tidak ditemukan",
    "timestamp": "2026-09-15T00:46:00Z"
  }
}
```

---

## 2. BAPENDA API (Pajak)

### 2.1 Get Tax Amount

Mendapatkan jumlah pajak yang harus dibayar.

**Endpoint:**
```
GET /bapenda/tax/{plat}
```

**Request:**
```http
GET /bapenda/tax/BM1234XYZ
X-API-Key: <bapenda_api_key>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "plat": "BM 1234 XYZ",
    "tahun_pajak": 2026,
    "pkb_pokok": 350000,
    "swdkllj": 35000,
    "denda": 0,
    "total": 385000,
    "jatuh_tempo": "2026-12-15",
    "status": "belum_lunas"
  }
}
```

### 2.2 Write-Back Payment Status

Mengirim status pembayaran ke Bapenda setelah user bayar.

**Endpoint:**
```
POST /bapenda/payment/confirm
```

**Request Body:**
```json
{
  "plat": "BM 1234 XYZ",
  "nomor_transaksi": "TRX9405081022",
  "total": 385000,
  "tanggal_bayar": "2026-09-15T00:46:00Z",
  "metode": "qris",
  "status": "lunas"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Payment status updated",
  "data": {
    "nomor_transaksi": "TRX9405081022",
    "status": "lunas",
    "tanggal_update": "2026-09-15T00:46:05Z"
  }
}
```

---

## 3. DUKCAPIL API (Identitas)

### 3.1 Verify NIK

Verifikasi NIK dan face matching.

**Endpoint:**
```http
POST /dukcapil/verify
```

**Request Body:**
```json
{
  "nik": "1471xxxxxxxxxxxx",
  "nama": "Budi Santoso",
  "selfie_image": "base64_encoded_image"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "nik_valid": true,
    "face_match_score": 0.95,
    "nama": "Budi Santoso",
    "alamat": "Jl. Sudirman No. 10, Pekanbaru"
  }
}
```

---

## 4. PAYMENT GATEWAY API

### 4.1 Create Transaction

Buat transaksi pembayaran.

**Endpoint:**
```http
POST /payment/create
```

**Request Body:**
```json
{
  "order_id": "TRX9405081022",
  "amount": 385000,
  "method": "qris",
  "customer": {
    "nama": "Budi Santoso",
    "email": "budi@example.com"
  },
  "items": [
    {
      "name": "Pajak Kendaraan Bermotor",
      "price": 385000,
      "quantity": 1
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "order_id": "TRX9405081022",
    "payment_url": "https://payment.gateway.com/pay/xxx",
    "qr_string": "00020101021226...",
    "va_number": "88089407874375",
    "expires_at": "2026-09-15T01:01:00Z"
  }
}
```

### 4.2 Webhook Callback

Payment gateway mengirim callback setelah pembayaran berhasil.

**Endpoint (dari gateway ke VTPS):**
```http
POST /webhook/payment
```

**Request Body:**
```json
{
  "order_id": "TRX9405081022",
  "transaction_status": "settlement",
  "payment_type": "qris",
  "gross_amount": "385000.00",
  "transaction_time": "2026-09-15T00:46:00Z",
  "signature_key": "xxx"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Webhook received"
}
```

---

## 5. Error Handling

Semua endpoint menggunakan format error standar:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "timestamp": "2026-09-15T00:46:00Z"
  }
}
```

### HTTP Status Codes

| Code | Meaning | Contoh |
|---|---|---|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Input tidak valid |
| 401 | Unauthorized | API key tidak valid |
| 403 | Forbidden | Tidak punya akses |
| 404 | Not Found | Resource tidak ditemukan |
| 409 | Conflict | Data sudah ada (contoh: sudah bayar) |
| 500 | Internal Server Error | Error server |

---

## 6. Rate Limiting

| Endpoint | Limit |
|---|---|
| Polri API | 100 req/menit |
| Bapenda API | 100 req/menit |
| Dukcapil API | 50 req/menit |
| Payment API | 200 req/menit |

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1694764800
```

---

## 7. Kepatuhan

API ini dirancang sesuai dengan:

- **UU PDP No. 27/2022** — Perlindungan Data Pribadi
  - Data biometrik (face matching) memerlukan consent eksplisit
  - Data pribadi tidak boleh disimpan > 24 jam
  - Audit trail wajib
- **Perpres 95/2018 (SPBE)** — Standar interoperabilitas
- **Standar QRIS EMVCo** — Format QR code

---

## 8. Contoh Integrasi End-to-End

```
1. User input plat → GET /polri/vehicle/BM1234XYZ
2. Sistem dapat data kendaraan
3. User verifikasi NIK → POST /dukcapil/verify
4. Sistem cek pajak → GET /bapenda/tax/BM1234XYZ
5. Sistem tampilkan tagihan
6. User pilih QRIS → POST /payment/create
7. User bayar via QRIS
8. Gateway callback → POST /webhook/payment
9. Sistem write-back → POST /bapenda/payment/confirm
10. User terima e-TBPKP
```

---

## 9. Kontak

| Keperluan | Kontak |
|---|---|
| API Support | api-support@vtps.go.id |
| Security | security@vtps.go.id |
| Business | business@vtps.go.id |
