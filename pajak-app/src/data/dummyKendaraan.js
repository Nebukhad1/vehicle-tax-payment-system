// Data dummy kendaraan untuk simulasi
// Dalam implementasi nyata, data ini akan datang dari API Polri & Bapenda

export const dummyKendaraan = [
  {
    plat: "BM 1234 XYZ",
    nomorStnk: "12345",
    nomorRangka: "67890",
    merk: "Honda",
    model: "Beat 2020",
    tahun: 2020,
    warna: "Hitam",
    pemilik: "Budi Santoso",
    alamat: "Jl. Sudirman No. 10, Pekanbaru",
    pajakPokok: 350000,
    swdkllj: 35000,
    denda: 0,
    total: 385000,
    jatuhTempo: "2026-12-15",
    status: "Belum Lunas",
  },
  {
    plat: "BM 5678 ABC",
    nomorStnk: "54321",
    nomorRangka: "09876",
    merk: "Toyota",
    model: "Avanza 2019",
    tahun: 2019,
    warna: "Putih",
    pemilik: "Siti Aminah",
    alamat: "Jl. Diponegoro No. 25, Pekanbaru",
    pajakPokok: 1500000,
    swdkllj: 143000,
    denda: 75000,
    total: 1718000,
    jatuhTempo: "2026-10-20",
    status: "Belum Lunas",
  },
  {
    plat: "BM 9012 DEF",
    nomorStnk: "11111",
    nomorRangka: "22222",
    merk: "Yamaha",
    model: "NMAX 2021",
    tahun: 2021,
    warna: "Biru",
    pemilik: "Ahmad Wijaya",
    alamat: "Jl. Gatot Subroto No. 5, Pekanbaru",
    pajakPokok: 450000,
    swdkllj: 35000,
    denda: 0,
    total: 485000,
    jatuhTempo: "2027-03-10",
    status: "Lunas",
  },
];

// Fungsi untuk mencari kendaraan berdasarkan plat + STNK + rangka
export function cariKendaraan(plat, nomorStnk, nomorRangka) {
  return dummyKendaraan.find(
    (k) =>
      k.plat.toUpperCase().replace(/\s/g, "") ===
        plat.toUpperCase().replace(/\s/g, "") &&
      k.nomorStnk === nomorStnk &&
      k.nomorRangka === nomorRangka
  );
}

// Format angka ke Rupiah
export function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}