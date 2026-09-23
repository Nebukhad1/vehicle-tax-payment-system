import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import KartuTagihan from "../components/KartuTagihan";
import { useApp } from "../context/AppContext";

export default function CekTagihanPage() {
  const navigate = useNavigate();
  const { kendaraan } = useApp();

  // Redirect ke home jika tidak ada data kendaraan
  useEffect(() => {
    if (!kendaraan) {
      navigate("/");
    }
  }, [kendaraan, navigate]);

  if (!kendaraan) return null;

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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Detail Tagihan Kendaraan
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Data Kendaraan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Nomor Plat</p>
              <p className="font-semibold text-gray-800">{kendaraan.plat}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Merk & Model</p>
              <p className="font-semibold text-gray-800">
                {kendaraan.merk} {kendaraan.model}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Tahun</p>
              <p className="font-semibold text-gray-800">{kendaraan.tahun}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Warna</p>
              <p className="font-semibold text-gray-800">{kendaraan.warna}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-500 mb-1">Nama Pemilik</p>
              <p className="font-semibold text-gray-800">{kendaraan.pemilik}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-500 mb-1">Alamat</p>
              <p className="font-semibold text-gray-800">{kendaraan.alamat}</p>
            </div>
          </div>
        </div>

        <KartuTagihan kendaraan={kendaraan} />

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/pembayaran")}
            disabled={kendaraan.status === "Lunas"}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {kendaraan.status === "Lunas"
              ? "✓ Sudah Lunas"
              : "Bayar Sekarang"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Pembayaran dapat dilakukan melalui QRIS, Virtual Account, atau
            E-Wallet
          </p>
        </div>
      </main>
    </div>
  );
}