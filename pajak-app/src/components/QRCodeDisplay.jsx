import { QRCodeSVG } from "qrcode.react";
import { formatRupiah } from "../data/dummyKendaraan";

export default function QRCodeDisplay({ kendaraan, nomorTransaksi }) {
  // Data yang akan disimulasikan sebagai QRIS
  // Dalam implementasi nyata, ini adalah payload QRIS dari payment gateway
  const qrisPayload = JSON.stringify({
    versi: "1.0",
    merchant: "SAMSAT RI",
    nmid: "ID1234567890123",
    transaksi: nomorTransaksi,
    plat: kendaraan.plat,
    nominal: kendaraan.total,
    mata_uang: "IDR",
    keterangan: "Pajak Kendaraan Bermotor",
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Scan QR Code untuk Bayar
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Gunakan aplikasi mobile banking atau e-wallet apa pun
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center my-6">
        <div className="bg-white p-4 border-4 border-gray-900 rounded-lg">
          <QRCodeSVG
            value={qrisPayload}
            size={240}
            level="H"
            includeMargin={false}
          />
        </div>
      </div>

      {/* Logo QRIS */}
      <div className="text-center mb-6">
        <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
          QRIS
        </span>
        <span className="ml-2 text-xs text-gray-500">
          Satu QR untuk semua
        </span>
      </div>

      {/* Detail Transaksi */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Nomor Transaksi</span>
          <span className="font-mono font-semibold text-gray-800">
            {nomorTransaksi}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Plat Kendaraan</span>
          <span className="font-semibold text-gray-800">
            {kendaraan.plat}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Merchant</span>
          <span className="font-semibold text-gray-800">
            SAMSAT RI
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="font-bold text-gray-800">Total</span>
          <span className="font-bold text-blue-700">
            {formatRupiah(kendaraan.total)}
          </span>
        </div>
      </div>

      {/* Info tambahan */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          💡 <b>Simulasi:</b> Di aplikasi nyata, QR ini terhubung ke payment
          gateway (Midtrans/Xendit) dan akan otomatis mengirim callback ketika
          pembayaran berhasil.
        </p>
      </div>
    </div>
  );
}