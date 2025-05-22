"use client";

import React, { useState } from "react";

type AppointmentStatus = "pending" | "accepted" | "declined";

type Appointment = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  time: string;
  location: string;
  client: string;
  status: AppointmentStatus;
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    title: "Meeting Client Japan - Tomo",
    description: "Discuss next steps in the UI design process.",
    date: "2024-07-01",
    time: "07:15 AM - 08:30 AM",
    location: "Google Meet",
    client: "Tomo",
    status: "pending",
  },
  {
    id: "2",
    title: "30 Minute Meeting",
    description: "Present UI design solutions for a specific project.",
    date: "2024-07-01",
    time: "14:00 PM - 14:30 PM",
    location: "Google Meet",
    client: "Edward Steve",
    status: "pending",
  },
  {
    id: "3",
    title: "Workshop UI/UX Meeting",
    description: "Build a shared understanding of user needs and pain points.",
    date: "2024-07-06",
    time: "09:00 AM - 11:30 AM",
    location: "Google Meet",
    client: "Team",
    status: "accepted",
  },
  {
    id: "4",
    title: "Meeting Client - Andrew",
    description: "Discuss the progress of the UI landing page project.",
    date: "2024-07-09",
    time: "11:00 AM - 12:00 AM",
    location: "Google Meet",
    client: "Andrew",
    status: "declined",
  },
];

const statusBadge = (status: AppointmentStatus) => {
  if (status === "accepted")
    return <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">Đã nhận</span>;
  if (status === "declined")
    return <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-medium">Đã từ chối</span>;
  return <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-medium">Chờ xử lý</span>;
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(appointments[0] || null);

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAccept = () => {
    if (!selectedAppointment) return;
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id ? { ...appt, status: "accepted" } : appt
      )
    );
    setSelectedAppointment({ ...selectedAppointment, status: "accepted" });
  };

  const handleDecline = () => {
    if (!selectedAppointment) return;
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id ? { ...appt, status: "declined" } : appt
      )
    );
    setSelectedAppointment({ ...selectedAppointment, status: "declined" });
  };

  return (
    <main className="min-h-screen bg-white flex items-start justify-center py-8 px-2">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* List of Appointments */}
        <section className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-900">Lịch hẹn của bạn</h1>
          <ul className="flex flex-col gap-4" aria-label="Danh sách lịch hẹn">
            {appointments.map((appt) => (
              <li key={appt.id}>
                <button
                  className={`w-full flex items-center justify-between bg-white border rounded-xl shadow-sm px-5 py-4 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400 hover:shadow-md text-left gap-4 ${
                    selectedAppointment?.id === appt.id ? "border-violet-500 ring-2 ring-violet-200" : "border-zinc-200"
                  }`}
                  aria-label={`Xem chi tiết lịch hẹn: ${appt.title}`}
                  tabIndex={0}
                  onClick={() => handleSelectAppointment(appt)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleSelectAppointment(appt);
                  }}
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="font-semibold text-zinc-900 text-base truncate">{appt.title}</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">{appt.date}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">{appt.time}</span>
                    </div>
                  </div>
                  {statusBadge(appt.status)}
                </button>
              </li>
            ))}
          </ul>
        </section>
        {/* Detail Panel */}
        <aside
          className="w-full bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col justify-center min-h-[320px]"
          aria-label="Chi tiết lịch hẹn"
        >
          {selectedAppointment ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-zinc-900 mb-1">{selectedAppointment.title}</h2>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">{selectedAppointment.date}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">{selectedAppointment.time}</span>
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">Khách hàng:</span> {selectedAppointment.client}
              </div>
              <div className="text-sm text-zinc-700">
                <span className="font-medium">Địa điểm:</span> {selectedAppointment.location}
              </div>
              <div className="text-sm text-zinc-500 mb-2">{selectedAppointment.description}</div>
              {selectedAppointment.status === "pending" && (
                <div className="flex gap-4 mt-2">
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                    aria-label="Chấp nhận lịch hẹn"
                    tabIndex={0}
                    onClick={handleAccept}
                  >
                    Chấp nhận
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
                    aria-label="Từ chối lịch hẹn"
                    tabIndex={0}
                    onClick={handleDecline}
                  >
                    Từ chối
                  </button>
                </div>
              )}
              {selectedAppointment.status === "accepted" && (
                <div className="text-green-600 font-semibold mt-2">Bạn đã nhận lịch hẹn này.</div>
              )}
              {selectedAppointment.status === "declined" && (
                <div className="text-red-600 font-semibold mt-2">Bạn đã từ chối lịch hẹn này.</div>
              )}
            </div>
          ) : (
            <div className="text-zinc-400 text-center">Chọn một lịch hẹn để xem chi tiết.</div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default AppointmentsPage; 