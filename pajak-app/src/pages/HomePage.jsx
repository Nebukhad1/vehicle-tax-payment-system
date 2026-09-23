import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { cariKendaraan } from "../data/dummyKendaraan";
import { useApp } from "../context/AppContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { setKendaraan } = useApp();

  const [plat, setPlat] = useState("");
  const [nomorStnk, setNomorStnk] = useState("");
  const [nomorRangka, setNomorRangka] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!plat.trim() || !nomorStnk.trim() || !nomorRangka.trim()) {
      setError("Semua field harus diisi.");
      return;
    }

    if (nomorStnk.length !== 5 || nomorRangka.length !== 5) {
      setError("Nomor STNK dan Nomor Rangka harus 5 digit.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const kendaraan = cariKendaraan(plat, nomorStnk, nomorRangka);
      setLoading(false);

      if (!kendaraan) {
        setError("Data kendaraan tidak ditemukan. Periksa kembali input Anda.");
        return;
      }

      setKendaraan(kendaraan);
      navigate("/cek-tagihan");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Cek Tagihan Pajak Kendaraan
          </h2>
          <p className="text-gray-600">
            Masukkan data kendaraan Anda untuk melihat jumlah tagihan pajak
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Plat Kendaraan
            </label>
            <input
              type="text"
              value={plat}
              onChange={(e) => setPlat(e.target.value.toUpperCase())}
              placeholder="Contoh: BM 1234 XYZ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              5 Digit Terakhir Nomor STNK
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={nomorStnk}
              onChange={(e) => setNomorStnk(e.target.value.replace(/\D/g, ""))}
              placeholder="Contoh: 12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              5 Digit Terakhir Nomor Rangka Mesin
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={nomorRangka}
              onChange={(e) => setNomorRangka(e.target.value.replace(/\D/g, ""))}
              placeholder="Contoh: 67890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Mencari data..." : "Cek Tagihan"}
          </button>
        </form>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">💡 Data Uji Coba:</p>
          <p>
            Plat: <span className="font-mono">BM 1234 XYZ</span> | STNK:{" "}
            <span className="font-mono">12345</span> | Rangka:{" "}
            <span className="font-mono">67890</span>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/riwayat")}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            📋 Lihat Riwayat Transaksi →
          </button>
        </div>
      </main>
    </div>
  );
}