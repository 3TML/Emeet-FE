import React from "react";
import { MdStar, MdThumbUp, MdThumbDown, MdBatteryFull, MdSpeed, MdDesignServices } from "react-icons/md";

const averageRating = 4.5;
const totalRatings = 437;
const ratingsBreakdown = [
  { stars: 5, count: 3100 },
  { stars: 4, count: 1400 },
  { stars: 3, count: 1000 },
  { stars: 2, count: 300 },
  { stars: 1, count: 300 },
];
const criteriaRatings = [
  { label: "Battery Life", value: 4.5, icon: <MdBatteryFull className="text-blue-500 text-2xl" /> },
  { label: "Performance", value: 4.4, icon: <MdSpeed className="text-blue-500 text-2xl" /> },
  { label: "Design", value: 4.1, icon: <MdDesignServices className="text-blue-500 text-2xl" /> },
];
const reviews = [
  {
    id: 1,
    name: "Darrell Steward",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "1 Feb, 2021",
    rating: 4.1,
    title: "Brilliant",
    content: "This is the best Macbook that Apple has ever made. It is also one of the best laptops in the world right now. Definitely go for it.",
    likes: 453,
    dislikes: 583,
  },
  {
    id: 2,
    name: "Albert Flores",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    date: "17 Oct, 2020",
    rating: 4.1,
    title: "Just WOW",
    content: "It's good to use MacBook Pro M1 for the development as it having very good performance, display quality and all other features. Don't know but in India all online shopping sites it's not available in 16 GB RAM variant, I've taken it for Mobile Application Development and satisfied with the build performance. Thanks a lot to Apple to build such a wonderful product and thanks to flipkart to deliver it on time.",
    likes: 798,
    dislikes: 738,
  },
  {
    id: 3,
    name: "Cameron Williamson",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    date: "24 Sep, 2020",
    rating: 4.1,
    title: "",
    content: "",
    likes: 816,
    dislikes: 196,
  },
];

const ReviewsPage = () => (
  <main className="max-w-6xl mx-auto py-10 px-2 md:px-4">
    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Xem đánh giá & phản hồi</h1>
    <p className="text-gray-500 mb-8">Sau buổi hẹn, đọc bình luận từ khách hàng.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Summary */}
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <div className="text-4xl font-bold text-blue-600 flex items-center gap-2 mb-1">
          {averageRating}
          <MdStar className="text-yellow-400 text-3xl" />
        </div>
        <div className="text-gray-500 text-sm mb-4">{totalRatings} Ratings & 47 Ratings</div>
        {/* Star breakdown */}
        <div className="w-full mb-6">
          {ratingsBreakdown.map((r, i) => (
            <div key={r.stars} className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600 w-4">{r.stars}</span>
              <MdStar className="text-yellow-400 text-base" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full ${r.stars >= 4 ? 'bg-green-400' : r.stars === 3 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${(r.count / 5000) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">{(r.count / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
        {/* Criteria */}
        <div className="flex justify-between w-full mb-6">
          {criteriaRatings.map((c, i) => (
            <div key={c.label} className="flex flex-col items-center flex-1">
              {c.icon}
              <span className="text-xs text-gray-500 mt-1 mb-1">{c.label}</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{c.value} <MdStar className="inline text-yellow-400 text-xs mb-0.5" /></span>
            </div>
          ))}
        </div>
        {/* Rate Product */}
        <div className="flex flex-col items-center w-full mt-4">
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-2">😐</button>
          <div className="text-sm text-gray-500 mb-2">Rate Product</div>
          <div className="text-xs text-gray-400 mb-2">Very Bad Product</div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <MdStar key={i} className="text-gray-300 text-lg" />)}
          </div>
        </div>
      </aside>
      {/* Right: Reviews */}
      <section className="md:col-span-2 flex flex-col gap-6">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-1">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{r.name}</div>
                <div className="text-xs text-gray-400">{r.date}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{r.rating} <MdStar className="inline text-yellow-400 text-xs mb-0.5" /></span>
              </div>
            </div>
            {r.title && <div className="font-semibold text-gray-800 mb-1">{r.title}</div>}
            {r.content && <div className="text-gray-600 text-sm mb-2">{r.content}</div>}
            <div className="flex gap-4 items-center mt-2">
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-xs font-semibold"><MdThumbUp /> {r.likes}</button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 text-xs font-semibold"><MdThumbDown /> {r.dislikes}</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  </main>
);

export default ReviewsPage; 