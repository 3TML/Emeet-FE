"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  AlertTriangle,
  BarChart3,
  PieChart,
} from "lucide-react";

// Types
type ActivityStatus = "completed" | "verified" | "registered" | "reported";

type Activity = {
  id: string;
  type: "session" | "expert" | "user" | "system";
  status: ActivityStatus;
  user?: string;
  expert?: string;
  time: string;
  message?: string;
};

// Mock data - Replace with actual API calls
const stats = {
  totalUsers: 2543,
  activeUsers: 1850,
  totalExperts: 312,
  verifiedExperts: 285,
  totalSessions: 1234,
  completedSessions: 1150,
  totalRevenue: 125000,
  monthlyRevenue: 25000,
  averageRating: 4.8,
  responseTime: "15min",
};

const statusColors: Record<ActivityStatus, string> = {
  completed: "bg-green-500/10 text-green-500",
  verified: "bg-blue-500/10 text-blue-500",
  registered: "bg-purple-500/10 text-purple-500",
  reported: "bg-red-500/10 text-red-500",
};

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "session",
    status: "completed",
    user: "John Doe",
    expert: "Dr. Sarah Johnson",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "expert",
    status: "verified",
    expert: "Dr. Michael Chen",
    time: "3 hours ago",
  },
  {
    id: "3",
    type: "user",
    status: "registered",
    user: "Jane Smith",
    time: "5 hours ago",
  },
  {
    id: "4",
    type: "system",
    status: "reported",
    message: "System maintenance scheduled for Sunday",
    time: "5 hours ago",
  },
];

const systemReports = [
  { title: "System Health", status: "Good", color: "text-green-600" },
  { title: "Pending Verifications", status: "5", color: "text-yellow-600" },
  { title: "Reported Issues", status: "2", color: "text-red-600" },
];

// Define route types
type AdminDashboardRoute = Route<"/dashboard/admin">;
type AdminUsersRoute = Route<"/dashboard/admin/users">;
type AdminExpertsRoute = Route<"/dashboard/admin/experts">;
type AdminCategoriesRoute = Route<"/dashboard/admin/categories">;
type AdminTransactionsRoute = Route<"/dashboard/admin/transactions">;
type AdminSchedulesRoute = Route<"/dashboard/admin/schedules">;
type AdminReportsRoute = Route<"/dashboard/admin/reports">;

type AdminRoute =
  | AdminDashboardRoute
  | AdminUsersRoute
  | AdminExpertsRoute
  | AdminCategoriesRoute
  | AdminTransactionsRoute
  | AdminSchedulesRoute
  | AdminReportsRoute;

export default function AdminDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = (user.role || "").toLowerCase();
    if (role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  const handleQuickAction = (path: AdminRoute) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers.toLocaleString()} active users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Experts</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalExperts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.verifiedExperts.toLocaleString()} verified experts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalSessions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.completedSessions.toLocaleString()} completed sessions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ${stats.monthlyRevenue.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics and System Reports */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Average Rating</span>
                </div>
                <span className="text-sm font-medium">
                  {stats.averageRating}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Average Response Time</span>
                </div>
                <span className="text-sm font-medium">
                  {stats.responseTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              System Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                >
                  <AlertTriangle className={`h-5 w-5 ${report.color}`} />
                  <div>
                    <div className="font-medium">{report.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {report.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {activity.type === "session" && (
                      <Calendar className="h-4 w-4 text-blue-400" />
                    )}
                    {activity.type === "expert" && (
                      <UserCheck className="h-4 w-4 text-green-400" />
                    )}
                    {activity.type === "user" && (
                      <Users className="h-4 w-4 text-purple-400" />
                    )}
                    {activity.type === "system" && (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {activity.type === "session"
                          ? `${activity.user} with ${activity.expert}`
                          : activity.type === "expert"
                          ? activity.expert
                          : activity.type === "system"
                          ? activity.message
                          : activity.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={statusColors[activity.status]}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction(
                  "/dashboard/admin/experts" as AdminExpertsRoute
                )
              }
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Verify Expert
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction(
                  "/dashboard/admin/schedules" as AdminSchedulesRoute
                )
              }
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction(
                  "/dashboard/admin/transactions" as AdminTransactionsRoute
                )
              }
            >
              <DollarSign className="mr-2 h-4 w-4" />
              View Transactions
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction("/dashboard/admin/users" as AdminUsersRoute)
              }
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction(
                  "/dashboard/admin/reports" as AdminReportsRoute
                )
              }
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickAction(
                  "/dashboard/admin/reports" as AdminReportsRoute
                )
              }
            >
              <PieChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
