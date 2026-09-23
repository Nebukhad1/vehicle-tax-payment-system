import { formatRupiah } from "../data/dummyKendaraan";

export default function KartuTagihan({ kendaraan }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Kartu */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <h3 className="text-lg font-bold">Rincian Tagihan Pajak</h3>
        <p className="text-sm text-blue-100">
          Tahun pajak {new Date().getFullYear()}
        </p>
      </div>

      {/* Body Kartu */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Pajak Pokok (PKB)</span>
          <span className="font-semibold text-gray-800">
            {formatRupiah(kendaraan.pajakPokok)}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">SWDKLLJ</span>
          <span className="font-semibold text-gray-800">
            {formatRupiah(kendaraan.swdkllj)}
          </span>
        </div>

        {kendaraan.denda > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Denda Keterlambatan</span>
            <span className="font-semibold text-red-600">
              {formatRupiah(kendaraan.denda)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-200">
          <span className="text-lg font-bold text-gray-800">Total Bayar</span>
          <span className="text-2xl font-bold text-blue-700">
            {formatRupiah(kendaraan.total)}
          </span>
        </div>

        {/* Jatuh Tempo */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-xs text-yellow-800">
            <span className="font-semibold">Jatuh Tempo:</span>{" "}
            {new Date(kendaraan.jatuhTempo).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}