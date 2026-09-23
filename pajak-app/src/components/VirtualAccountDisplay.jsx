import { formatRupiah } from "../data/dummyKendaraan";

export default function VirtualAccountDisplay({
  kendaraan,
  nomorTransaksi,
  bank,
}) {
  // Konfigurasi per bank
  const bankConfig = {
    "va-bca": {
      nama: "BCA",
      prefix: "8808",
      panjangDigit: 10,
      warna: "bg-blue-600",
      logo: "🏦",
      instruksi: [
        "Buka aplikasi myBCA atau m-BCA",
        "Pilih menu m-Transfer → BCA Virtual Account",
        "Masukkan nomor Virtual Account di atas",
        "Periksa nama merchant: SAMSAT RI",
        "Masukkan PIN m-BCA Anda",
        "Pembayaran selesai, simpan bukti transfer",
      ],
      alternatif: [
        "ATM BCA: Transaksi Lainnya → Transfer → ke Rekening BCA Virtual Account",
        "Internet Banking BCA: Transfer → ke BCA Virtual Account",
      ],
    },
    "va-mandiri": {
      nama: "Mandiri",
      prefix: "89508",
      panjangDigit: 9,
      warna: "bg-yellow-500",
      logo: "🏦",
      instruksi: [
        "Buka aplikasi Livin' by Mandiri",
        "Pilih menu Bayar → Multipayment",
        "Cari dan pilih SAMSAT RI",
        "Masukkan nomor Virtual Account di atas",
        "Periksa nominal: Rp 385.000",
        "Masukkan PIN Livin' Anda",
        "Pembayaran selesai",
      ],
      alternatif: [
        "ATM Mandiri: Bayar/Beli → Multipayment → SAMSAT RI",
        "Internet Banking Mandiri: Bayar → Multipayment",
      ],
    },
    "va-bni": {
      nama: "BNI",
      prefix: "9881",
      panjangDigit: 10,
      warna: "bg-orange-600",
      logo: "🏦",
      instruksi: [
        "Buka aplikasi BNI Mobile Banking",
        "Pilih menu Transfer → Virtual Account",
        "Masukkan nomor Virtual Account di atas",
        "Periksa nama: SAMSAT RI",
        "Masukkan password transaksi",
        "Pembayaran selesai",
      ],
      alternatif: [
        "ATM BNI: Menu Lain → Transfer → ke Rekening BNI Virtual Account",
        "Internet Banking BNI: Transfer → Virtual Account",
      ],
    },
  };

  const config = bankConfig[bank];
  if (!config) return null;

  // Generate nomor VA unik dari nomor transaksi
  const nomorVA = `${config.prefix}${nomorTransaksi
    .slice(-10)
    .padStart(config.panjangDigit, "0")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(nomorVA);
    alert("Nomor Virtual Account disalin!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Bank */}
      <div className={`${config.warna} text-white px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{config.logo}</div>
          <div>
            <h3 className="font-bold">Virtual Account {config.nama}</h3>
            <p className="text-sm opacity-90">
              Transfer dari aplikasi {config.nama} Anda
            </p>
          </div>
        </div>
      </div>

      {/* Nomor VA */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">
            Nomor Virtual Account
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
              {nomorVA}
            </p>
            <button
              onClick={handleCopy}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition whitespace-nowrap"
            >
              📋 Salin
            </button>
          </div>
        </div>

        {/* Detail */}
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Nama Merchant</span>
            <span className="font-semibold text-gray-800">SAMSAT RI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Nomor Plat</span>
            <span className="font-semibold text-gray-800">
              {kendaraan.plat}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">No. Transaksi</span>
            <span className="font-mono font-semibold text-gray-800">
              {nomorTransaksi}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t-2 border-gray-200">
            <span className="font-bold text-gray-800">Total Transfer</span>
            <span className="text-xl font-bold text-blue-700">
              {formatRupiah(kendaraan.total)}
            </span>
          </div>
        </div>

        {/* Instruksi */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-blue-800 mb-3">
            📱 Cara Bayar via {config.nama} Mobile:
          </p>
          <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
            {config.instruksi.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Alternatif */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-bold text-gray-700 mb-2">
            Alternatif:
          </p>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            {config.alternatif.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>

        {/* Info simulasi */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            💡 <b>Simulasi:</b> Di aplikasi nyata, sistem akan otomatis
            menerima callback dari bank ketika pembayaran berhasil, tanpa
            perlu konfirmasi manual.
          </p>
        </div>
      </div>
    </div>
  );
}