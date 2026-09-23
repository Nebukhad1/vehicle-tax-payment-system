import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { formatRupiah } from "../data/dummyKendaraan";
import { useApp } from "../context/AppContext";

export default function SuksesPage() {
  const navigate = useNavigate();
  const { kendaraan, metodePembayaran, tambahTransaksi } = useApp();
  const sudahDisimpan = useRef(false);

  // Simpan transaksi ke riwayat (hanya sekali)
  useEffect(() => {
    if (!kendaraan) {
      navigate("/");
      return;
    }

    if (!sudahDisimpan.current) {
      const nomorTransaksi = `TRX${Date.now().toString().slice(-10)}`;
      const transaksi = {
        nomorTransaksi,
        tanggal: new Date().toISOString(),
        metode: metodePembayaran,
        plat: kendaraan.plat,
        pemilik: kendaraan.pemilik,
        jenisKendaraan: `${kendaraan.merk} ${kendaraan.model}`,
        total: kendaraan.total,
      };
      tambahTransaksi(transaksi);
      sudahDisimpan.current = true;
    }
  }, [kendaraan, metodePembayaran, tambahTransaksi, navigate]);

  if (!kendaraan) return null;

  const nomorTransaksi = `TRX${Date.now().toString().slice(-10)}`;
  const tanggal = new Date().toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const metodeLabel = {
    qris: "QRIS",
    "va-bca": "Virtual Account BCA",
    "va-mandiri": "Virtual Account Mandiri",
    "va-bni": "Virtual Account BNI",
    "ewallet-gopay": "GoPay",
    "ewallet-ovo": "OVO",
    "ewallet-dana": "DANA",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print">
  <Header />
</div>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
  <div className="no-print inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
    <span className="text-5xl">✓</span>
  </div>
  <h2 className="text-2xl font-bold text-gray-800">
    Pembayaran Berhasil!
  </h2>
  <p className="no-print text-gray-600 mt-2">
    Pajak kendaraan Anda telah berhasil dibayar
  </p>
</div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 print-clean">
  <div className="bg-green-600 text-white px-6 py-4">
    <h3 className="font-bold">Bukti Pembayaran Elektronik (e-TBPKP)</h3>
    <p className="text-sm text-green-100">Simpan sebagai bukti sah</p>
  </div>

          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Nomor Transaksi</span>
              <span className="font-mono font-semibold text-gray-800">
                {nomorTransaksi}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tanggal</span>
              <span className="font-semibold text-gray-800">{tanggal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Metode</span>
              <span className="font-semibold text-gray-800">
                {metodeLabel[metodePembayaran] || metodePembayaran}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3"></div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nomor Plat</span>
              <span className="font-semibold text-gray-800">
                {kendaraan.plat}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pemilik</span>
              <span className="font-semibold text-gray-800">
                {kendaraan.pemilik}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Jenis Kendaraan</span>
              <span className="font-semibold text-gray-800">
                {kendaraan.merk} {kendaraan.model}
              </span>
            </div>
            <div className="border-t-2 border-gray-200 pt-3 mt-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Dibayar</span>
              <span className="text-xl font-bold text-green-700">
                {formatRupiah(kendaraan.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="no-print bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
  <p className="text-sm text-blue-800 font-semibold mb-2">
    ℹ Status Sinkronisasi
  </p>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Data terkirim ke <b>SAMSAT</b></span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Data terkirim ke <b>Korlantas Polri</b></span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Status STNK diperbarui</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 no-print">
  <button
    onClick={() => window.print()}
  >
    🖨 Cetak Bukti Pembayaran
  </button>
          <button
            onClick={() => navigate("/riwayat")}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition"
          >
            📋 Lihat Riwayat Transaksi
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Selesai
          </button>
        </div>
      </main>
    </div>
  );
}