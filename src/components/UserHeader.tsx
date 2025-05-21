"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserHeader = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("userChanged", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userChanged", syncUser);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-bold text-blue-700"
        aria-label="Trang chủ"
      >
        Emeet
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/find"
          className="text-gray-700 hover:text-blue-600 font-medium"
          aria-label="Tìm chuyên gia"
          tabIndex={0}
        >
          Tìm chuyên gia
        </Link>
        <Link
          href="/work"
          className="text-gray-700 hover:text-blue-600 font-medium"
          aria-label="Meeting"
          tabIndex={0}
        >
          Meeting
        </Link>
        <Link
          href="/booking/history"
          className="text-gray-700 hover:text-blue-600 font-medium"
          aria-label="Lịch sử"
          tabIndex={0}
        >
          Lịch sử
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link href="/profile" aria-label="Hồ sơ cá nhân" tabIndex={0}>
              <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 font-semibold hover:bg-blue-200">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-7 h-7 rounded-full object-cover border border-blue-200"
                  />
                ) : null}
                {user.fullName || "Hồ sơ"}
              </span>
            </Link>
            <button
              onClick={handleSignOut}
              className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              tabIndex={0}
              aria-label="Đăng xuất"
              type="button"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-blue-600 font-medium mr-2"
              tabIndex={0}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700"
              tabIndex={0}
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
