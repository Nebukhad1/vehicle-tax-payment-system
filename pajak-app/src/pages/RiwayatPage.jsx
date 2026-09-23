import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { formatRupiah } from "../data/dummyKendaraan";
import { useApp } from "../context/AppContext";

export default function RiwayatPage() {
  const navigate = useNavigate();
  const { riwayatTransaksi, hapusRiwayat } = useApp();

  const handleHapus = () => {
    if (confirm("Yakin ingin menghapus semua riwayat transaksi?")) {
      hapusRiwayat();
    }
  };

  const metodeLabel = {
    qris: "QRIS",
    "va-bca": "VA BCA",
    "va-mandiri": "VA Mandiri",
    "va-bni": "VA BNI",
    "ewallet-gopay": "GoPay",
    "ewallet-ovo": "OVO",
    "ewallet-dana": "DANA",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          ← Kembali
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Riwayat Transaksi
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {riwayatTransaksi.length} transaksi tersimpan
            </p>
          </div>
          {riwayatTransaksi.length > 0 && (
            <button
              onClick={handleHapus}
              className="text-red-600 hover:text-red-800 text-sm font-semibold"
            >
              🗑 Hapus Semua
            </button>
          )}
        </div>

        {riwayatTransaksi.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Belum Ada Transaksi
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Transaksi yang Anda lakukan akan muncul di sini
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Mulai Cek Tagihan
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {riwayatTransaksi.map((trx, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-mono text-xs text-gray-500">
                      {trx.nomorTransaksi}
                    </p>
                    <p className="font-bold text-gray-800 mt-1">{trx.plat}</p>
                    <p className="text-sm text-gray-600">{trx.pemilik}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    ✓ Berhasil
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Kendaraan</p>
                    <p className="text-gray-800">{trx.jenisKendaraan}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Metode</p>
                    <p className="text-gray-800">
                      {metodeLabel[trx.metode] || trx.metode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Tanggal</p>
                    <p className="text-gray-800">
                      {new Date(trx.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total</p>
                    <p className="font-bold text-blue-700">
                      {formatRupiah(trx.total)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}