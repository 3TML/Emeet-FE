"use client";
import { useState, useEffect } from "react";
import { Pencil, X, Check, History as HistoryIcon } from "lucide-react";
import UserHeader from "@/components/UserHeader";

const sidebarMenu = [
  { label: "Hồ sơ", key: "profile" },
  { label: "Lịch sử", key: "history" },
  { label: "Bảo mật", key: "security" },
  { label: "Thông báo", key: "notifications" },
  { label: "Thanh toán", key: "billing" },
  { label: "Xóa tài khoản", key: "delete", danger: true },
];

const mockHistory = [
  {
    id: 1,
    expertName: "Nguyen Van IT",
    expertAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    field: "IT",
    date: "2024-06-01",
    status: "Completed",
  },
  {
    id: 2,
    expertName: "Le Thi Nau An",
    expertAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    field: "Nấu ăn",
    date: "2024-05-20",
    status: "Completed",
  },
  {
    id: 3,
    expertName: "Tran Van Tam Ly",
    expertAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    field: "Tâm lý",
    date: "2024-05-10",
    status: "Cancelled",
  },
];

type User = {
  fullName: string;
  avatar: string;
  email: string;
  role: string;
  gender?: string;
  bio?: string;
  dateCreate?: string;
  status?: string;
  location?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState<Partial<User>>({});

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setProfileDraft({
          fullName: parsed.fullName,
          avatar: parsed.avatar,
          gender: parsed.gender,
          bio: parsed.bio,
          location: parsed.location,
        });
      } catch {}
    }
  }, []);

  // Avatar upload (optional, chỉ cho phép nhập link)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileDraft((prev) => ({ ...prev, avatar: e.target.value }));
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updated = { ...user, ...profileDraft };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    setIsEditingProfile(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-8">
        <div className="max-w-5xl mx-auto flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
              {sidebarMenu.map((item) => (
                <button
                  key={item.key}
                  className={`text-left px-4 py-2 rounded-lg font-medium transition-all text-base flex items-center gap-2
                    ${
                      activeTab === item.key
                        ? "bg-blue-50 text-blue-700"
                        : item.danger
                        ? "text-red-500 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  tabIndex={0}
                  aria-label={item.label}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                  {item.key === "history" && (
                    <HistoryIcon className="w-4 h-4 ml-1" />
                  )}
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {activeTab === "profile" && user && (
              <>
                <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
                  Hồ sơ cá nhân
                </h1>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
                  <div className="relative flex flex-col items-center">
                    <img
                      src={isEditingProfile ? profileDraft.avatar : user.avatar}
                      alt={user.fullName}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow mb-2"
                    />
                    {isEditingProfile && (
                      <>
                        <label className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors text-sm font-medium">
                          Chọn ảnh đại diện
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setProfileDraft((prev) => ({
                                    ...prev,
                                    avatar: ev.target?.result as string,
                                  }));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <div className="text-xs text-gray-400 mt-1">
                          Chỉ nhận file ảnh PNG, JPG, JPEG.
                        </div>
                      </>
                    )}
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-bold text-blue-700">
                        {isEditingProfile ? (
                          <input
                            type="text"
                            className="border-b border-blue-300 px-2 py-1 text-xl font-semibold text-center focus:outline-none focus:border-blue-500 bg-blue-50"
                            value={profileDraft.fullName || ""}
                            onChange={(e) =>
                              setProfileDraft((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                              }))
                            }
                            placeholder="Họ và tên"
                          />
                        ) : (
                          user.fullName
                        )}
                      </div>
                      <div className="text-gray-500 text-base mt-1">
                        {user.email}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          {user.role === "USER" ? "Người dùng" : user.role}
                        </span>
                        {user.status && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {user.status === "Active"
                              ? "Đang hoạt động"
                              : user.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Giới tính
                      </label>
                      {isEditingProfile ? (
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                          value={profileDraft.gender || ""}
                          onChange={(e) =>
                            setProfileDraft((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="MALE">Nam</option>
                          <option value="FEMALE">Nữ</option>
                        </select>
                      ) : (
                        <div className="text-gray-800">
                          {user.gender === "MALE"
                            ? "Nam"
                            : user.gender === "FEMALE"
                            ? "Nữ"
                            : "Chưa cập nhật"}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Địa chỉ
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                          value={profileDraft.location || ""}
                          onChange={(e) =>
                            setProfileDraft((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          placeholder="Địa chỉ (tuỳ chọn)"
                        />
                      ) : (
                        <div className="text-gray-800">
                          {user.location || "Chưa cập nhật"}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-600 font-medium mb-1">
                        Giới thiệu
                      </label>
                      {isEditingProfile ? (
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                          rows={3}
                          value={profileDraft.bio || ""}
                          onChange={(e) =>
                            setProfileDraft((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          placeholder="Giới thiệu bản thân"
                        />
                      ) : (
                        <div className="text-gray-800">
                          {user.bio || "Chưa có mô tả cá nhân."}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Ngày tạo tài khoản
                      </label>
                      <div className="text-gray-800">
                        {user.dateCreate
                          ? new Date(user.dateCreate).toLocaleDateString()
                          : "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-8">
                    {isEditingProfile ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          aria-label="Lưu hồ sơ"
                          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors mr-2"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          aria-label="Huỷ chỉnh sửa"
                          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                        >
                          Huỷ
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
                        tabIndex={0}
                        aria-label="Chỉnh sửa hồ sơ"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        Chỉnh sửa hồ sơ
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
            {activeTab === "history" && (
              <>
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <HistoryIcon className="w-6 h-6" /> Lịch sử đặt lịch
                </h1>
                <div className="p-0 overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chuyên gia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lĩnh vực
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockHistory.map((h) => (
                        <tr key={h.id}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                            <img
                              src={h.expertAvatar}
                              alt={h.expertName}
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                            <span className="font-medium">{h.expertName}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {h.field}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {h.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                h.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {h.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {/* Các tab khác có thể để placeholder hoặc mở rộng sau */}
            {activeTab !== "profile" && activeTab !== "history" && (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                Tính năng đang phát triển...
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
