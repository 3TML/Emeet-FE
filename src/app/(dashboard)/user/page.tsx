"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Appointments",
    value: "5",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Experts Connected",
    value: "12",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Messages",
    value: "34",
    icon: MessageSquare,
    color: "text-purple-500",
  },
];

const appointments = [
  { expert: "Dr. Emily Chen", time: "Today, 10:00 AM", status: "Confirmed" },
  {
    expert: "Prof. Michael Johnson",
    time: "Tomorrow, 2:30 PM",
    status: "Pending",
  },
];

const experts = [
  { name: "Dr. Sarah Williams", specialty: "Finance" },
  { name: "John Smith, MBA", specialty: "Product Management" },
  { name: "Dr. Robert Lee", specialty: "Data Science" },
];

const notifications = [
  {
    message: "Your appointment with Dr. Emily Chen is confirmed.",
    time: "1 hour ago",
  },
  { message: "New expert available: Dr. Robert Lee.", time: "3 hours ago" },
];

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData || userData.role?.toLowerCase() !== "user") {
      router.push("/login" as any);
    } else {
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login" as any);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-8 px-4">
        {user && (
          <div className="flex flex-col items-center gap-3 w-full">
            <img
              src={user.avatar || "/default_avatar.jpg"}
              alt={user.fullName || "User Avatar"}
              className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
            <span className="font-semibold text-lg text-gray-900 dark:text-white truncate w-full text-center">
              {user.fullName || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all w-full justify-center"
              aria-label="Logout"
              tabIndex={0}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Appointments */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.map((a, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <span className="font-medium">{a.expert}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {a.time}
                    </span>
                    <span
                      className={`text-xs mt-1 ${
                        a.status === "Confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Expert Suggestions */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Suggested Experts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {experts.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <User className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {e.specialty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Notifications */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <span className="text-sm">{n.message}</span>
                    <span className="text-xs text-gray-400 mt-1">{n.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
