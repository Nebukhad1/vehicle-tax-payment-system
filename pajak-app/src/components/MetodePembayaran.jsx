export default function MetodePembayaran({ metode, setMetode }) {
  const metodeList = [
    {
      id: "qris",
      nama: "QRIS",
      deskripsi: "Scan QR dengan aplikasi apapun",
      icon: "📱",
      badge: "Semua e-wallet & m-banking",
    },
    {
      id: "va-bca",
      nama: "Virtual Account BCA",
      deskripsi: "Transfer via m-BCA atau ATM",
      icon: "🏦",
      badge: "BCA",
    },
    {
      id: "va-mandiri",
      nama: "Virtual Account Mandiri",
      deskripsi: "Transfer via Livin' atau ATM",
      icon: "🏦",
      badge: "Mandiri",
    },
    {
      id: "va-bni",
      nama: "Virtual Account BNI",
      deskripsi: "Transfer via BNI Mobile atau ATM",
      icon: "🏦",
      badge: "BNI",
    },
    {
      id: "ewallet-gopay",
      nama: "GoPay",
      deskripsi: "Bayar dengan saldo GoPay",
      icon: "💚",
      badge: "E-Wallet",
    },
    {
      id: "ewallet-ovo",
      nama: "OVO",
      deskripsi: "Bayar dengan saldo OVO",
      icon: "💜",
      badge: "E-Wallet",
    },
    {
      id: "ewallet-dana",
      nama: "DANA",
      deskripsi: "Bayar dengan saldo DANA",
      icon: "💙",
      badge: "E-Wallet",
    },
  ];

  return (
    <div className="space-y-3">
      {metodeList.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => setMetode(m.id)}
          className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-4 ${
            metode === m.id
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <div className="text-3xl">{m.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800">{m.nama}</p>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {m.badge}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{m.deskripsi}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              metode === m.id
                ? "border-blue-600 bg-blue-600"
                : "border-gray-300"
            }`}
          >
            {metode === m.id && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}