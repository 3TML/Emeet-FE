"use client";

import { useState } from "react";
import UserHeader from "@/components/UserHeader";

const categories = [
  "Tư vấn kinh doanh",
  "Công nghệ thông tin",
  "Tài chính & Đầu tư",
  "Marketing",
  "Sức khỏe & Đời sống",
  "Luật pháp",
];

const experts = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Tư vấn kinh doanh",
    experience: 8,
    bio: "Chuyên gia tư vấn chiến lược kinh doanh, phát triển doanh nghiệp vừa và nhỏ.",
  },
  {
    name: "Trần Thị B",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Công nghệ thông tin",
    experience: 5,
    bio: "Kỹ sư phần mềm, chuyên về giải pháp chuyển đổi số và AI.",
  },
  {
    name: "Lê Văn C",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    category: "Tài chính & Đầu tư",
    experience: 10,
    bio: "Chuyên gia đầu tư, quản lý tài sản cá nhân và doanh nghiệp.",
  },
  {
    name: "Phạm Thị D",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Marketing",
    experience: 3,
    bio: "Chuyên gia marketing số, xây dựng thương hiệu cá nhân và doanh nghiệp.",
  },
  {
    name: "Ngô Văn E",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    category: "Sức khỏe & Đời sống",
    experience: 12,
    bio: "Bác sĩ, chuyên gia tư vấn sức khỏe, dinh dưỡng và lối sống lành mạnh.",
  },
];

const FindExpertsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState(0);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinExperience(Number(e.target.value));
  };

  const handleViewExpertDetail = (expertName: string) => {
    // TODO: Điều hướng đến trang chi tiết chuyên gia hoặc mở modal
    // Hiện tại để trống
  };

  const filteredExperts = experts.filter(
    (expert) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(expert.category)) &&
      expert.experience >= minExperience
  );

  return (
    <>
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Tìm kiếm chuyên gia
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Lọc và tìm kiếm chuyên gia phù hợp với lĩnh vực và kinh nghiệm bạn
            mong muốn.
          </p>
        </section>
        <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <div className="bg-blue-50 rounded-2xl shadow-lg p-8 sticky top-24">
              <label className="block text-base font-semibold text-blue-700 mb-3">
                Lĩnh vực
              </label>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer text-gray-700 text-base font-medium bg-white rounded-lg px-4 py-2 shadow-sm hover:bg-blue-100 focus-within:bg-blue-100 transition-colors outline-none"
                    tabIndex={0}
                    aria-label={`Chọn lĩnh vực ${cat}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleCategoryToggle(cat);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
                      tabIndex={-1}
                      aria-checked={selectedCategories.includes(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
              <label
                htmlFor="experience"
                className="block text-base font-semibold text-blue-700 mb-3"
              >
                Số năm kinh nghiệm tối thiểu
              </label>
              <input
                id="experience"
                type="number"
                min={0}
                max={30}
                value={minExperience}
                onChange={handleExperienceChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                tabIndex={0}
                aria-label="Số năm kinh nghiệm tối thiểu"
              />
            </div>
          </aside>
          {/* Expert List */}
          <section className="w-full md:w-2/3 lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg">
                Không tìm thấy chuyên gia phù hợp.
              </div>
            ) : (
              filteredExperts.map((expert) => (
                <div
                  key={expert.name}
                  className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-xl focus-within:shadow-xl transition-shadow border border-gray-100 outline-none group"
                  tabIndex={0}
                  aria-label={`Chuyên gia ${expert.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleViewExpertDetail(expert.name);
                  }}
                >
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100 group-hover:scale-105 group-focus:scale-105 transition-transform"
                  />
                  <h2 className="text-lg font-semibold text-blue-700 mb-1">
                    {expert.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    {expert.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Kinh nghiệm: {expert.experience} năm
                  </p>
                  <p className="text-gray-600 text-center text-sm mb-4">
                    {expert.bio}
                  </p>
                  <button
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
                    tabIndex={0}
                    aria-label={`Xem chi tiết chuyên gia ${expert.name}`}
                    onClick={() => handleViewExpertDetail(expert.name)}
                    type="button"
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default FindExpertsPage;
