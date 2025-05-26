"use client";

import { useEffect, useState } from "react";
import { getCertificatesByExpertId } from "@/lib/api/expertApi";
import { useRouter } from "next/navigation";

const AchievementsPage = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
      return;
    }
    let expertId = "";
    try {
      const user = JSON.parse(userStr);
      expertId = user.expertInformation?.id;
      if (!expertId) throw new Error();
    } catch {
      setError("Không lấy được expertId.");
      setLoading(false);
      return;
    }
    getCertificatesByExpertId(expertId)
      .then((data) => {
        setCertificates(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Không lấy được dữ liệu thành tựu.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-gray-500 text-lg">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  if (!certificates.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-gray-500 text-lg">Chưa có thành tựu nào.</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <button
        onClick={() => router.back()}
        tabIndex={0}
        aria-label="Quay lại"
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") router.back(); }}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition w-fit"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Thành tựu của chuyên gia</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {certificates.map((item, idx) => (
          <a
            key={item.id || idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded hover:shadow-lg overflow-hidden group"
            aria-label={`Xem thành tựu ${idx + 1}`}
          >
            <img
              src={item.link}
              alt={item.description || `Certificate ${idx + 1}`}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="p-2 text-xs text-gray-600 dark:text-gray-300 truncate">
              {item.description || `Certificate ${idx + 1}`}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage; 