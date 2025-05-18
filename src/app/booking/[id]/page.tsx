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
import { Star, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function BookingPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[]>;
}) {
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
                  {/* Step 1: Select Service */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      1. Select a Service
                    </h3>
                    <div className="space-y-3">
                      {expert.services.map((service) => (
                        <div
                          key={service.id}
                          className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {service.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{service.duration}</span>
                              </div>
                              <p className="font-bold mt-1">${service.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Date */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      2. Select a Date
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.availability.map((day) => (
                        <button
                          key={day.date}
                          className="border rounded-md px-4 py-2 text-sm hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Select Time */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      3. Select a Time
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {expert.availability[0].slots.map((slot) => (
                        <button
                          key={slot}
                          className="border rounded-md px-4 py-2 text-sm hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Contact Info */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      4. Your Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium mb-1"
                        >
                          First Name
                        </label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-1"
                        >
                          Last Name
                        </label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-1"
                        >
                          Phone Number
                        </label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium mb-1"
                      >
                        Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Share any specific topics or questions you'd like to discuss"
                      ></textarea>
                    </div>
                  </div>

                  {/* Summary & Payment */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Booking Summary
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">Strategy Session</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">
                            May 15, 2025 at 09:00 AM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">60 minutes</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-lg">$150</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>Secure payment processing</span>
                      </div>
                      <Button size="lg" className="px-8">
                        Proceed to Payment
                      </Button>
                    </div>
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

// Lock icon component
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
