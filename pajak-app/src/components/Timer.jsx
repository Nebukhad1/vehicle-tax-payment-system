import { useEffect, useState } from "react";

export default function Timer({ durasiDetik = 900, onExpired }) {
  const [sisa, setSisa] = useState(durasiDetik);

  useEffect(() => {
    if (sisa <= 0) {
      if (onExpired) onExpired();
      return;
    }

    const interval = setInterval(() => {
      setSisa((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sisa, onExpired]);

  const menit = Math.floor(sisa / 60);
  const detik = sisa % 60;

  const isUrgent = sisa < 300; // < 5 menit

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-semibold ${
        isUrgent
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      <span>⏱</span>
      <span>
        {String(menit).padStart(2, "0")}:{String(detik).padStart(2, "0")}
      </span>
    </div>
  );
}