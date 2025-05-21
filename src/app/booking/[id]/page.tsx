"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UserHeader from "@/components/UserHeader";

// Change getExpertById to a synchronous function
const getExpertById = (id: string) => {
  return {
    id: parseInt(id),
    name: "Dr. Emily Chen",
    specialty: "Business Strategy",
    bio: `Over 15 years of experience helping businesses optimize their strategies for growth and sustainability. Dr. Chen has worked with Fortune 500 companies and startups alike, providing guidance on strategic planning, market analysis, and business development.`,
    rating: 4.9,
    ratingCount: 127,
    image: "https://i.pravatar.cc/150?img=1",
    services: [
      {
        id: 1,
        name: "Initial Consultation",
        duration: "30 minutes",
        price: 75,
        description:
          "Brief overview of your business situation and initial guidance",
      },
      {
        id: 2,
        name: "Strategy Session",
        duration: "60 minutes",
        price: 150,
        description:
          "In-depth analysis and strategic planning for your business",
      },
      {
        id: 3,
        name: "Extended Consultation",
        duration: "90 minutes",
        price: 200,
        description:
          "Comprehensive strategy development and implementation planning",
      },
    ],
    availability: [
      { date: "2025-05-15", slots: ["09:00", "11:00", "13:00", "15:00"] },
      { date: "2025-05-16", slots: ["10:00", "13:00", "16:00"] },
      { date: "2025-05-17", slots: ["09:00", "14:00"] },
    ],
  };
};

const BookingDetailPage = ({ params }: { params: { id: string } }) => {
  const expert = getExpertById(params.id);
  const [selectedService, setSelectedService] = useState(expert.services[0]);
  const [selectedDate, setSelectedDate] = useState(expert.availability[0]);
  const [selectedSlot, setSelectedSlot] = useState(
    expert.availability[0].slots[0]
  );
  const [email, setEmail] = useState("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = expert.services.find((s) => s.name === e.target.value);
    if (service) setSelectedService(service);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const date = expert.availability.find((d) => d.date === e.target.value);
    if (date) {
      setSelectedDate(date);
      setSelectedSlot(date.slots[0]);
    }
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlot(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmBooking = () => {
    // TODO: Xử lý xác nhận đặt lịch
  };

  const isBookingDisabled =
    !selectedService || !selectedDate || !selectedSlot || !email;

  return (
    <>
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Expert info column */}
            <aside className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
                />
                <h2 className="text-xl font-bold mb-1 text-blue-700">
                  {expert.name}
                </h2>
                <p className="text-primary font-medium mb-2">
                  {expert.specialty}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">
                    {expert.rating}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">
                    ({expert.ratingCount} đánh giá)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{expert.bio}</p>
                <div className="w-full border-t pt-4">
                  <Link
                    href={{ pathname: `/experts/${expert.id}` }}
                    className="text-blue-600 text-sm hover:underline"
                    tabIndex={0}
                    aria-label="Xem hồ sơ chuyên gia"
                  >
                    Xem hồ sơ đầy đủ
                  </Link>
                </div>
              </div>
            </aside>
            {/* Booking form column */}
            <section className="md:w-2/3">
              <form
                className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isBookingDisabled) handleConfirmBooking();
                }}
              >
                <h1 className="text-2xl font-bold text-blue-700 mb-2">
                  Đặt lịch hẹn
                </h1>
                <p className="text-gray-600 mb-6">
                  Chọn dịch vụ, ngày, giờ và nhập email để đặt lịch với chuyên
                  gia.
                </p>
                {/* Select Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block mb-2 text-base font-semibold text-blue-700"
                  >
                    Dịch vụ
                  </label>
                  <select
                    id="service"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={selectedService.name}
                    onChange={handleServiceChange}
                    tabIndex={0}
                    aria-label="Chọn dịch vụ"
                  >
                    {expert.services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name} - {service.duration} - ${service.price}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedService.description}
                  </p>
                </div>
                {/* Select Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-base font-semibold text-blue-700"
                  >
                    Ngày
                  </label>
                  <select
                    id="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={selectedDate.date}
                    onChange={handleDateChange}
                    tabIndex={0}
                    aria-label="Chọn ngày"
                  >
                    {expert.availability.map((day, index) => (
                      <option key={index} value={day.date}>
                        {day.date}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Select Time Slot */}
                <div>
                  <label
                    htmlFor="slot"
                    className="block mb-2 text-base font-semibold text-blue-700"
                  >
                    Giờ
                  </label>
                  <select
                    id="slot"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={selectedSlot}
                    onChange={handleSlotChange}
                    tabIndex={0}
                    aria-label="Chọn giờ"
                  >
                    {selectedDate.slots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {/* User Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-semibold text-blue-700"
                  >
                    Email của bạn
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    tabIndex={0}
                    aria-label="Nhập email của bạn"
                    required
                  />
                </div>
                {/* Summary */}
                <div className="border rounded-lg p-4 text-base text-gray-700 bg-blue-50">
                  <p>
                    Bạn sẽ đặt lịch với <strong>{expert.name}</strong> cho dịch
                    vụ <strong>{selectedService.name}</strong> vào ngày{" "}
                    <strong>{selectedDate.date}</strong> lúc{" "}
                    <strong>{selectedSlot}</strong>.
                  </p>
                  <p className="mt-2">
                    Tổng chi phí: <strong>${selectedService.price}</strong>
                  </p>
                </div>
                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex={0}
                  aria-label="Xác nhận đặt lịch"
                  disabled={isBookingDisabled}
                >
                  Xác nhận đặt lịch
                </button>
                {/* Secure Info */}
                <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                  <Lock className="w-4 h-4 mr-1" />
                  Thông tin của bạn được mã hóa an toàn
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

// Lock icon
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        width="18"
        height="10"
        x="3"
        y="11"
        stroke="currentColor"
        strokeWidth="2"
        rx="2"
      />
      <path
        d="M7 11V7a5 5 0 1 1 10 0v4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default BookingDetailPage;
