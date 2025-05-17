"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, User } from "lucide-react";
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "user") {
      router.push("/login" as any);
    }
  }, [router]);

  return (
    <div className="space-y-8">
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
    </div>
  );
}
