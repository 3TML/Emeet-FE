import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MessageSquare,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  // This would be fetched from an API in a real application
  const upcomingAppointments = [
    {
      id: 1,
      expertName: "Dr. Emily Chen",
      specialty: "Business Strategy",
      date: "May 15, 2025",
      time: "10:00 AM",
      status: "Confirmed",
      fee: "$150",
    },
    {
      id: 2,
      expertName: "Prof. Michael Johnson",
      specialty: "Marketing Consultant",
      date: "May 18, 2025",
      time: "2:30 PM",
      status: "Pending",
      fee: "$120",
    },
  ];

  const recommendedExperts = [
    {
      id: 1,
      name: "Dr. Sarah Williams",
      specialty: "Finance",
      rating: 4.8,
      fee: "$140/hour",
      availability: "Available next week",
    },
    {
      id: 2,
      name: "John Smith, MBA",
      specialty: "Product Management",
      rating: 4.7,
      fee: "$125/hour",
      availability: "Available tomorrow",
    },
    {
      id: 3,
      name: "Dr. Robert Lee",
      specialty: "Data Science",
      rating: 4.9,
      fee: "$160/hour",
      availability: "Available today",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Meetings</p>
              <h3 className="text-2xl font-bold">2</h3>
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
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h3 className="text-2xl font-bold">$390</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experts Consulted</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
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
                    <h4 className="font-medium">{appointment.expertName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.specialty}
                    </p>
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
                  <p className="text-sm font-medium mt-1">{appointment.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended experts */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Experts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {recommendedExperts.map((expert) => (
              <div key={expert.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{expert.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {expert.specialty}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rating</span>
                    <span className="font-medium">{expert.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fee</span>
                    <span className="font-medium">{expert.fee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Availability</span>
                    <span className="text-xs text-green-600">
                      {expert.availability}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:bg-primary/90">
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
