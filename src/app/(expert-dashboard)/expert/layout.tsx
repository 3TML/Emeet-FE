import React from "react";
import Link from "next/link";
import {
  UserCircle,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

export default function ExpertDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md z-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">ExpertMeet</h1>
          </div>

          <nav className="mt-6">
            <div className="px-6 mb-6">
              <div className="flex items-center space-x-3">
                <UserCircle className="w-8 h-8 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Dr. Emily Chen</span>
                  <span className="text-xs text-gray-500">Expert</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 px-3">
              <Link
                href="/expert"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              <Link
                href="/expert/appointments"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Appointments
              </Link>
              <Link
                href="/expert/clients"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Users className="w-5 h-5 mr-3" />
                Clients
              </Link>
              <Link
                href="/expert/availability"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText className="w-5 h-5 mr-3" />
                Availability
              </Link>
              <Link
                href="/expert/messages"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </Link>
              <Link
                href="/expert/earnings"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Earnings
              </Link>
              <Link
                href="/expert/settings"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </div>

            <div className="absolute bottom-0 w-64 border-t border-gray-200">
              <Link
                href="/logout"
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
