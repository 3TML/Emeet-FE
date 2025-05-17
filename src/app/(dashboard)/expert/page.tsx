"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Star, User } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Sessions",
    value: "18",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Revenue",
    value: "$1,250",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Rating",
    value: "4.8/5",
    icon: Star,
    color: "text-yellow-500",
  },
];

const appointments = [
  { client: "Anna Nguyen", time: "Today, 14:00", status: "Confirmed" },
  { client: "David Tran", time: "Tomorrow, 09:30", status: "Pending" },
];

const clients = [
  { name: "Anna Nguyen", lastSession: "2 days ago" },
  { name: "David Tran", lastSession: "1 week ago" },
  { name: "Linh Le", lastSession: "3 weeks ago" },
];

const notifications = [
  { message: "You have a new appointment request.", time: "30 minutes ago" },
  { message: "Anna Nguyen left a 5-star review!", time: "2 hours ago" },
];

export default function ExpertDashboard() {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "expert") {
      router.push("/login" as any);
    }
  }, [router]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expert Dashboard</h1>
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
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((a, i) => (
                <div
                  key={i}
                  className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span className="font-medium">{a.client}</span>
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
        {/* Recent Clients */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <User className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Last session: {c.lastSession}
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
