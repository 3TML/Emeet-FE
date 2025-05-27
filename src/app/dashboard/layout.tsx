"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Route } from "next";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FolderKanban,
  CreditCard,
  CalendarCheck2,
  BarChart3,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define route types
type DashboardRoute = Route<"/dashboard">;
type AdminDashboardRoute = Route<"/dashboard/admin">;
type AdminUsersRoute = Route<"/dashboard/admin/users">;
type AdminExpertsRoute = Route<"/dashboard/admin/experts">;
type AdminCategoriesRoute = Route<"/dashboard/admin/categories">;
type AdminTransactionsRoute = Route<"/dashboard/admin/transactions">;
type AdminSchedulesRoute = Route<"/dashboard/admin/schedules">;
type AdminReportsRoute = Route<"/dashboard/admin/reports">;
type UsersRoute = Route<"/dashboard/users">;
type ExpertProfileRoute = Route<"/dashboard/expert/profile">;
type SettingsRoute = Route<"/dashboard/settings">;
type ProfileRoute = Route<"/dashboard/profile">;
type LoginRoute = Route<"/login">;

type AppRoute =
  | DashboardRoute
  | AdminDashboardRoute
  | AdminUsersRoute
  | AdminExpertsRoute
  | AdminCategoriesRoute
  | AdminTransactionsRoute
  | AdminSchedulesRoute
  | AdminReportsRoute
  | UsersRoute
  | ExpertProfileRoute
  | SettingsRoute
  | ProfileRoute
  | LoginRoute;

// Navigation items with proper typing
const baseNavItems = [
  {
    title: "Trang chủ",
    href: "/dashboard" as DashboardRoute,
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/user/home" as AdminUsersRoute,
    icon: Users,
  },

  {
    title: "Settings",
    title: "Cài đặt",
    href: "/dashboard/settings" as SettingsRoute,
    icon: Settings,
  },
] as const;

const userOnlyNavItems = [
  {
    title: "Người dùng",
    href: "/dashboard/users" as UsersRoute,
    icon: Users,
  },
] as const;

const expertOnlyNavItems = [
  {
    title: "Hồ sơ",
    href: "/dashboard/expert/profile" as ExpertProfileRoute,
    icon: Users,
  },
] as const;

const expertMenu = [
  { title: "Lịch làm việc", href: "/dashboard/expert/schedule", icon: "🗓️" },
  { title: "Thiết lập giá", href: "/dashboard/expert/pricing", icon: "🪙" },
  { title: "Đơn hẹn", href: "/dashboard/expert/appointments", icon: "📅" },
  { title: "Link cuộc gọi", href: "/dashboard/expert/call-link", icon: "📞" },
  {
    title: "Đánh giá & phản hồi",
    href: "/dashboard/expert/reviews",
    icon: "⭐",
  },
  { title: "Thu nhập", href: "/dashboard/expert/income", icon: "🪴" },
  { title: "Hồ sơ", href: "/dashboard/expert/profile", icon: "🪴" },
];

const adminMenu = [
  {
    title: "Dashboard",
    href: "/dashboard/admin" as AdminDashboardRoute,
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/dashboard/admin/users" as AdminUsersRoute,
    icon: Users,
  },
  {
    title: "Expert Management",
    href: "/dashboard/admin/experts" as AdminExpertsRoute,
    icon: UserCheck,
  },
  {
    title: "Skill Category Management",
    href: "/dashboard/admin/categories" as AdminCategoriesRoute,
    icon: FolderKanban,
  },
  {
    title: "Transaction Management",
    href: "/dashboard/admin/transactions" as AdminTransactionsRoute,
    icon: CreditCard,
  },
  {
    title: "Schedule Tracking",
    href: "/dashboard/admin/schedules" as AdminSchedulesRoute,
    icon: CalendarCheck2,
  },
  {
    title: "Reports & Analytics",
    href: "/dashboard/admin/reports" as AdminReportsRoute,
    icon: BarChart3,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      toast.error("Vui lòng đăng nhập để tiếp tục");
    } else {
      try {
        setRole(JSON.parse(user).role?.toLowerCase() || null);
      } catch {
        setRole(null);
      }
    }
  }, [router]);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login" as LoginRoute);
    toast.success("Đăng xuất thành công");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? (isMobile ? "100%" : "280px") : "0px",
        }}
        className={cn(
          "fixed top-0 left-0 h-[calc(100%-5px)] bg-white dark:bg-gray-800 shadow-lg z-40 transition-all duration-300",
          isMobile && !isSidebarOpen && "hidden"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              EMeet
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {/* Hiển thị admin menu nếu role là admin */}
            {role === "admin" && (
              <>
                <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
                  Admin Features
                </div>
                {adminMenu.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700 text-primary"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                      onClick={() => router.push(item.href as AppRoute)}
                    >
                      <item.icon size={20} />
                      {item.title}
                    </Button>
                  );
                })}
              </>
            )}
            {/* Base navigation items - always shown */}
            {baseNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 text-primary"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => router.push(item.href as AppRoute)}
                >
                  <item.icon size={20} />
                  {item.title}
                </Button>
              );
            })}

            {/* User-only navigation items */}
            {role === "user" &&
              userOnlyNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => router.push(item.href as AppRoute)}
                  >
                    <item.icon size={20} />
                    {item.title}
                  </Button>
                );
              })}

            {/* Expert-only navigation items */}
            {role === "expert" &&
              expertOnlyNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => router.push(item.href as AppRoute)}
                  >
                    <item.icon size={20} />
                    {item.title}
                  </Button>
                );
              })}

            {/* Hiển thị expert menu nếu role là expert */}
            {role === "expert" && (
              <>
                <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
                  Expert Features
                </div>
                {expertMenu.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700 text-primary"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                      onClick={() => router.push(item.href as AppRoute)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.title}
                    </Button>
                  );
                })}
              </>
            )}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Đăng xuất
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{
          marginLeft: isSidebarOpen ? (isMobile ? "0" : "280px") : "0",
        }}
        className="min-h-screen transition-all duration-300"
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {[
                ...baseNavItems,
                ...(role === "user" ? userOnlyNavItems : []),
                ...(role === "expert" ? expertOnlyNavItems : []),
              ].find((item) => item.href === pathname)?.title || "Trang chủ"}
            </h2>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Thông báo"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Hồ sơ"
                onClick={() =>
                  router.push("/dashboard/profile" as ProfileRoute)
                }
              >
                <User size={20} />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </motion.main>
    </div>
  );
}
