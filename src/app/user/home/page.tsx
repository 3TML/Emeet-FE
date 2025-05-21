"use client";
import { useEffect, useState } from "react";
import UserHeader from "@/components/UserHeader";

type User = {
  fullName: string;
  avatar: string;
  email: string;
  role: string;
};

const UserHomePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex flex-col items-center gap-2">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-2"
              />
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2 drop-shadow">
              Xin chào, {user?.fullName || "bạn"}!
            </h1>
            {user?.email && <p className="text-gray-500">{user.email}</p>}
          </div>
          <p className="text-lg text-gray-600 mt-4 mb-6">
            Chào mừng bạn đến với Emeet. Hãy bắt đầu trải nghiệm các dịch vụ
            dành cho bạn.
          </p>
        </section>
        <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <a
            href="/find"
            className="group block bg-white rounded-2xl shadow-lg p-8 hover:bg-blue-50 focus:bg-blue-100 transition-colors text-center border border-blue-100 outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={0}
            aria-label="Tìm chuyên gia"
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
            <div className="text-xl font-bold text-blue-700 mb-2">
              Tìm chuyên gia
            </div>
            <div className="text-gray-600 text-sm">
              Khám phá và đặt lịch với chuyên gia phù hợp.
            </div>
          </a>
          <a
            href="/work"
            className="group block bg-white rounded-2xl shadow-lg p-8 hover:bg-green-50 focus:bg-green-100 transition-colors text-center border border-green-100 outline-none focus:ring-2 focus:ring-green-400"
            tabIndex={0}
            aria-label="Meeting"
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </div>
            <div className="text-xl font-bold text-green-700 mb-2">Meeting</div>
            <div className="text-gray-600 text-sm">
              Tham gia buổi tư vấn trực tuyến 1:1.
            </div>
          </a>
          <a
            href="/booking/history"
            className="group block bg-white rounded-2xl shadow-lg p-8 hover:bg-yellow-50 focus:bg-yellow-100 transition-colors text-center border border-yellow-100 outline-none focus:ring-2 focus:ring-yellow-400"
            tabIndex={0}
            aria-label="Lịch sử"
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-yellow-500 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-xl font-bold text-yellow-700 mb-2">
              Lịch sử
            </div>
            <div className="text-gray-600 text-sm">
              Xem lại các buổi đã đặt hoặc đã tham gia.
            </div>
          </a>
          <a
            href="/profile"
            className="group block bg-white rounded-2xl shadow-lg p-8 hover:bg-purple-50 focus:bg-purple-100 transition-colors text-center border border-purple-100 outline-none focus:ring-2 focus:ring-purple-400"
            tabIndex={0}
            aria-label="Hồ sơ cá nhân"
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-purple-600 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
            <div className="text-xl font-bold text-purple-700 mb-2">Hồ sơ</div>
            <div className="text-gray-600 text-sm">
              Cập nhật thông tin cá nhân, liên hệ.
            </div>
          </a>
        </section>
      </main>
    </>
  );
};

export default UserHomePage;
