import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Change getExpertById to a synchronous function
const getExpertById = (id: string) => {
  return {
    id: parseInt(id),
    name: "Dr. Emily Chen",
    specialty: "Business Strategy",
    bio: `Over 15 years of experience helping businesses optimize their strategies for growth and sustainability. Dr. Chen has worked with Fortune 500 companies and startups alike, providing guidance on strategic planning, market analysis, and business development.`,
    rating: 4.9,
    ratingCount: 127,
    image: "https://i.pravatar.cc/150?img=1",
    services: [
      {
        id: 1,
        name: "Initial Consultation",
        duration: "30 minutes",
        price: 75,
        description:
          "Brief overview of your business situation and initial guidance",
      },
      {
        id: 2,
        name: "Strategy Session",
        duration: "60 minutes",
        price: 150,
        description:
          "In-depth analysis and strategic planning for your business",
      },
      {
        id: 3,
        name: "Extended Consultation",
        duration: "90 minutes",
        price: 200,
        description:
          "Comprehensive strategy development and implementation planning",
      },
    ],
    availability: [
      { date: "2025-05-15", slots: ["09:00", "11:00", "13:00", "15:00"] },
      { date: "2025-05-16", slots: ["10:00", "13:00", "16:00"] },
      { date: "2025-05-17", slots: ["09:00", "14:00"] },
    ],
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  const expert = getExpertById(params.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Expert info column */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold mb-1">{expert.name}</h2>
                  <p className="text-primary font-medium mb-2">
                    {expert.specialty}
                  </p>

                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">
                      {expert.rating}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({expert.ratingCount} reviews)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">{expert.bio}</p>

                  <div className="w-full border-t pt-4">
                    <Link
                      href={{
                        pathname: `/experts/${expert.id}`,
                      }}
                      className="text-primary text-sm hover:underline"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking column */}
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>
                  Choose a service, date, and time to schedule your meeting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Select Service */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Service
                    </label>
                    <select className="w-full border rounded px-3 py-2 text-sm">
                      {expert.services.map((service) => (
                        <option key={service.id}>
                          {service.name} - {service.duration} - ${service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Date */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Date
                    </label>
                    <select className="w-full border rounded px-3 py-2 text-sm">
                      {expert.availability.map((day, index) => (
                        <option key={index}>{day.date}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Time Slot */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Time
                    </label>
                    <select className="w-full border rounded px-3 py-2 text-sm">
                      {expert.availability[0].slots.map((slot, index) => (
                        <option key={index}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* User Info */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Your Email
                    </label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>

                  {/* Summary */}
                  <div className="border rounded p-4 text-sm text-gray-700 bg-gray-50">
                    <p>
                      You&apos;re booking <strong>{expert.name}</strong> for a{" "}
                      <strong>{expert.services[0].name}</strong> session on{" "}
                      <strong>{expert.availability[0].date}</strong> at{" "}
                      <strong>{expert.availability[0].slots[0]}</strong>.
                    </p>
                    <p className="mt-2">
                      Total: <strong>${expert.services[0].price}</strong>
                    </p>
                  </div>

                  {/* Confirm Button */}
                  <Button className="w-full">Confirm Booking</Button>

                  {/* Secure Info */}
                  <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                    <Lock className="w-4 h-4 mr-1" />
                    Your information is securely encrypted
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lock icon
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
