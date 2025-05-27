"use client";

import { useEffect, useState } from "react";
import { getFeedbackByExpertId } from "@/lib/api/expertApi";
import { useRouter } from "next/navigation";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
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
    getFeedbackByExpertId(expertId)
      .then((data) => {
        setFeedbacks(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Không lấy được dữ liệu feedback.");
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

  if (!feedbacks.length) {
    return (
      <div className="max-w-3xl mx-auto py-10">
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
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Feedback về chuyên gia</h1>
        <div className="flex items-center justify-center min-h-[40vh]">
          <span className="text-gray-500 text-lg">Chưa có feedback nào.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
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
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Feedback về chuyên gia</h1>
      <div className="space-y-6">
        {feedbacks.map((item, idx) => (
          <div key={item.id || idx} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-primary">
                {item.userName ? item.userName[0].toUpperCase() : "?"}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{item.userName || "Ẩn danh"}</div>
                {item.createdAt && (
                  <div className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
                )}
              </div>
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-base">
              {item.content || "Không có nội dung."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
