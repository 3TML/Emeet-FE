"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Total Experts",
    value: "312",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "Revenue",
    value: "$12,500",
    icon: DollarSign,
    color: "text-orange-500",
  },
  {
    title: "Appointments",
    value: "1,234",
    icon: Calendar,
    color: "text-purple-500",
  },
];

const newUsers = [
  { name: "Anna Nguyen", role: "user", joined: "2 hours ago" },
  { name: "David Tran", role: "expert", joined: "1 day ago" },
  { name: "Linh Le", role: "user", joined: "3 days ago" },
];

const reports = [
  { title: "System Health", status: "Good", color: "text-green-600" },
  { title: "Pending Verifications", status: "5", color: "text-yellow-600" },
  { title: "Reported Issues", status: "2", color: "text-red-600" },
];

const notifications = [
  { message: "New expert registration: David Tran.", time: "1 hour ago" },
  { message: "System maintenance scheduled for Sunday.", time: "5 hours ago" },
];

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "admin") {
      router.push("/login" as any);
    }
  }, [router]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        {/* New Users/Experts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>New Users & Experts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {newUsers.map((u, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <UserCheck
                    className={`w-6 h-6 ${
                      u.role === "expert" ? "text-green-500" : "text-blue-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {u.role} • Joined {u.joined}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Reports */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <AlertTriangle className={`w-6 h-6 ${r.color}`} />
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {r.status}
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
