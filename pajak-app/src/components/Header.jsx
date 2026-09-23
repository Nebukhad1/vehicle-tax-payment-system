export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white text-blue-700 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-xl">
            🚗
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              Sistem Pembayaran Pajak Kendaraan
            </h1>
            <p className="text-xs text-blue-200">
              Terintegrasi dengan SAMSAT & Korlantas Polri
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-blue-200">Layanan Resmi</p>
          <p className="text-sm font-semibold">24/7 Online</p>
        </div>
      </div>
    </header>
  );
}