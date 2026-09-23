import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CekTagihanPage from "./pages/CekTagihanPage";
import PembayaranPage from "./pages/PembayaranPage";
import SuksesPage from "./pages/SuksesPage";
import RiwayatPage from "./pages/RiwayatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cek-tagihan" element={<CekTagihanPage />} />
      <Route path="/pembayaran" element={<PembayaranPage />} />
      <Route path="/sukses" element={<SuksesPage />} />
      <Route path="/riwayat" element={<RiwayatPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;