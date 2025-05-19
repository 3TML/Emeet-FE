"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Search } from "lucide-react";

const categories = [
  { id: "it", name: "IT" },
  { id: "cooking", name: "Nấu ăn" },
  { id: "psychology", name: "Tâm lý" },
  { id: "finance", name: "Tài chính" },
  { id: "marketing", name: "Marketing" },
];

const experts = [
  {
    id: 1,
    name: "Nguyen Van IT",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "IT",
    description: "Chuyên gia lập trình, 10 năm kinh nghiệm phát triển phần mềm.",
    stars: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: "Le Thi Nau An",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Nấu ăn",
    description: "Đầu bếp chuyên nghiệp, từng đạt giải MasterChef Việt Nam.",
    stars: 4.6,
    reviews: 98,
  },
  {
    id: 3,
    name: "Tran Van Tam Ly",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    category: "Tâm lý",
    description: "Tiến sĩ tâm lý học, tư vấn tâm lý cá nhân và gia đình.",
    stars: 4.9,
    reviews: 210,
  },
  {
    id: 4,
    name: "Pham Thi Tai Chinh",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    category: "Tài chính",
    description: "Chuyên gia tài chính, cố vấn đầu tư cá nhân và doanh nghiệp.",
    stars: 4.7,
    reviews: 75,
  },
  {
    id: 5,
    name: "Nguyen Van Marketing",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    category: "Marketing",
    description: "Chuyên gia marketing số, từng làm việc tại các tập đoàn lớn.",
    stars: 4.5,
    reviews: 60,
  },
];

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minStars, setMinStars] = useState(0);
  const [searchName, setSearchName] = useState("");

  const filteredExperts = useMemo(() => {
    return experts.filter((e) => {
      const matchCategory = selectedCategory ? e.category === selectedCategory : true;
      const matchStars = minStars ? e.stars >= minStars : true;
      const matchName = searchName ? e.name.toLowerCase().includes(searchName.toLowerCase()) : true;
      return matchCategory && matchStars && matchName;
    });
  }, [selectedCategory, minStars, searchName]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh sách chuyên gia</h1>
      {/* Bộ lọc nâng cao */}
      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Lĩnh vực</label>
          <select
            className="w-48 h-11 rounded-lg border border-gray-300 px-3 text-sm bg-white dark:bg-gray-900"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Lọc theo lĩnh vực"
          >
            <option value="">Tất cả</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số sao tối thiểu</label>
          <select
            className="w-32 h-11 rounded-lg border border-gray-300 px-3 text-sm bg-white dark:bg-gray-900"
            value={minStars}
            onChange={(e) => setMinStars(Number(e.target.value))}
            aria-label="Lọc theo số sao"
          >
            <option value={0}>Tất cả</option>
            <option value={5}>5 sao</option>
            <option value={4.5}>4.5 sao</option>
            <option value={4}>4 sao</option>
            <option value={3}>3 sao</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Tìm kiếm tên</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Nhập tên chuyên gia..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10 h-11"
              aria-label="Tìm kiếm theo tên"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      {/* Grid chuyên gia */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredExperts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">Không tìm thấy chuyên gia phù hợp.</div>
        )}
        {filteredExperts.map((e) => (
          <Card key={e.id} className="flex flex-col items-center p-6">
            <img
              src={e.avatar}
              alt={e.name}
              className="w-20 h-20 rounded-full object-cover mb-3 border border-gray-200"
            />
            <CardHeader className="items-center text-center p-0 mb-2">
              <CardTitle className="text-lg font-semibold">{e.name}</CardTitle>
              <div className="text-xs text-gray-500 mb-1">{e.category}</div>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-0">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${e.stars >= i + 1 ? "text-yellow-400" : e.stars > i && e.stars < i + 1 ? "text-yellow-300" : "text-gray-300"}`}
                    fill={e.stars >= i + 1 ? "#facc15" : e.stars > i && e.stars < i + 1 ? "#fde68a" : "none"}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">{e.stars.toFixed(1)}</span>
                <span className="ml-2 text-xs text-gray-400">({e.reviews} đánh giá)</span>
              </div>
              <div className="text-sm text-gray-700 text-center mb-2 line-clamp-2">{e.description}</div>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                tabIndex={0}
                aria-label={`Xem chi tiết chuyên gia ${e.name}`}
              >
                Xem chi tiết
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
