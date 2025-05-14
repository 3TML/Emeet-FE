import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MessageSquare,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";

export default function ExpertDashboardPage() {
  // This would be fetched from an API in a real application
  const upcomingAppointments = [
    {
      id: 1,
      clientName: "John Doe",
      date: "May 15, 2025",
      time: "10:00 AM - 11:00 AM",
      status: "Confirmed",
      fee: "$150",
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      date: "May 16, 2025",
      time: "2:30 PM - 3:30 PM",
      status: "Confirmed",
      fee: "$150",
    },
    {
      id: 3,
      clientName: "Michael Smith",
      date: "May 18, 2025",
      time: "11:00 AM - 12:00 PM",
      status: "Pending",
      fee: "$150",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      from: "John Doe",
      message: "I have some questions about our upcoming session...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      from: "Sarah Johnson",
      message: "Thank you for the helpful session yesterday!",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expert Dashboard</h1>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Messages</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Earnings</p>
              <h3 className="text-2xl font-bold">$1,250</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <h3 className="text-2xl font-bold">16</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming appointments */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.clientName}</h4>
                      <div className="flex space-x-4 mt-1 text-sm">
                        <span>{appointment.date}</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                    <p className="text-sm font-medium mt-1">
                      {appointment.fee}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unread messages */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <h4 className="font-medium">{message.from}</h4>
                      {message.unread && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                  <button className="mt-2 text-sm text-primary">
                    View Message
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>My Fee Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Duration</th>
                  <th className="px-4 py-3 text-left font-medium">Fee</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Initial Consultation</td>
                  <td className="px-4 py-3">30 minutes</td>
                  <td className="px-4 py-3 font-medium">$75</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Standard Session</td>
                  <td className="px-4 py-3">60 minutes</td>
                  <td className="px-4 py-3 font-medium">$150</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Extended Session</td>
                  <td className="px-4 py-3">90 minutes</td>
                  <td className="px-4 py-3 font-medium">$200</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Group Session</td>
                  <td className="px-4 py-3">120 minutes</td>
                  <td className="px-4 py-3 font-medium">$300</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Paused
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-primary">Edit Fee Schedule</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
