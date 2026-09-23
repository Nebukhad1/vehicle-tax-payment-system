import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MetodePembayaran from "../components/MetodePembayaran";
import Timer from "../components/Timer";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { formatRupiah } from "../data/dummyKendaraan";
import { useApp } from "../context/AppContext";
import VirtualAccountDisplay from "../components/VirtualAccountDisplay";

export default function PembayaranPage() {
  const navigate = useNavigate();
  const { kendaraan, setMetodePembayaran } = useApp();

  const [metode, setMetode] = useState("");
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);

  // Generate nomor transaksi sekali saja
  const [nomorTransaksi] = useState(
    () => `TRX${Date.now().toString().slice(-10)}`
  );

  useEffect(() => {
    if (!kendaraan) {
      navigate("/");
    }
  }, [kendaraan, navigate]);

  if (!kendaraan) return null;

  const handleBayar = () => {
    if (!metode) return;
    setLoading(true);
    setTimeout(() => {
      setMetodePembayaran(metode);
      setLoading(false);
      navigate("/sukses");
    }, 2000);
  };

  const handleExpired = () => {
    setExpired(true);
    // Auto-redirect setelah 3 detik
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/cek-tagihan")}
          className="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          ← Kembali
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pembayaran Pajak
        </h2>
        <p className="text-gray-600 mb-6">
          Pilih metode pembayaran yang Anda inginkan
        </p>

        {/* Ringkasan */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Nomor Plat</span>
            <span className="font-semibold text-gray-800">
              {kendaraan.plat}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Pemilik</span>
            <span className="font-semibold text-gray-800">
              {kendaraan.pemilik}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="font-bold text-gray-800">Total Bayar</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatRupiah(kendaraan.total)}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Selesaikan pembayaran sebelum:
          </p>
          <Timer durasiDetik={900} onExpired={handleExpired} />
        </div>

        {expired && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            ⚠ Waktu pembayaran habis. Anda akan diarahkan ke halaman awal...
          </div>
        )}

        {/* Pilihan Metode */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Metode Pembayaran
          </h3>
          <MetodePembayaran metode={metode} setMetode={setMetode} />
        </div>

        {/* Tampilan QR Code jika QRIS dipilih */}
{metode === "qris" && !expired && (
  <div className="mb-6">
    <QRCodeDisplay
      kendaraan={kendaraan}
      nomorTransaksi={nomorTransaksi}
    />

    <button
      onClick={handleBayar}
      disabled={loading}
      className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
    >
      {loading ? "Memverifikasi pembayaran..." : "✓ Saya Sudah Bayar"}
    </button>
  </div>
)}

{/* Tampilan Virtual Account jika VA dipilih */}
{(metode === "va-bca" ||
  metode === "va-mandiri" ||
  metode === "va-bni") &&
  !expired && (
    <div className="mb-6">
      <VirtualAccountDisplay
        kendaraan={kendaraan}
        nomorTransaksi={nomorTransaksi}
        bank={metode}
      />

      <button
        onClick={handleBayar}
        disabled={loading}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Memverifikasi transfer..." : "✓ Saya Sudah Transfer"}
      </button>
    </div>
  )}

{/* Tombol Bayar untuk E-Wallet */}
{metode &&
  metode.startsWith("ewallet") &&
  !expired && (
    <button
      onClick={handleBayar}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
    >
      {loading
        ? "Memproses pembayaran..."
        : `Bayar ${formatRupiah(kendaraan.total)}`}
    </button>
  )}

        <p className="text-center text-xs text-gray-500 mt-4">
          🔒 Transaksi Anda dilindungi enkripsi SSL 256-bit
        </p>
      </main>
    </div>
  );
}