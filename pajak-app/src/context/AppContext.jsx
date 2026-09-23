import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [kendaraan, setKendaraan] = useState(null);
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [riwayatTransaksi, setRiwayatTransaksi] = useState(() => {
    // Load dari localStorage saat pertama kali
    const saved = localStorage.getItem("riwayatTransaksi");
    return saved ? JSON.parse(saved) : [];
  });

  const tambahTransaksi = (transaksi) => {
    const updated = [transaksi, ...riwayatTransaksi];
    setRiwayatTransaksi(updated);
    localStorage.setItem("riwayatTransaksi", JSON.stringify(updated));
  };

  const hapusRiwayat = () => {
    setRiwayatTransaksi([]);
    localStorage.removeItem("riwayatTransaksi");
  };

  return (
    <AppContext.Provider
      value={{
        kendaraan,
        setKendaraan,
        metodePembayaran,
        setMetodePembayaran,
        riwayatTransaksi,
        tambahTransaksi,
        hapusRiwayat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp harus dipakai di dalam AppProvider");
  }
  return context;
}