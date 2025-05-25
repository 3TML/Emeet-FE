"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Search, UserPlus, Star } from "lucide-react";
import { format } from "date-fns";

// Types
type Expert = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  rating: number;
  status: "verified" | "pending" | "rejected";
  joinedAt: Date;
  totalSessions: number;
};

// Mock data - Replace with actual API call
const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    specialization: "Psychology",
    rating: 4.8,
    status: "verified",
    joinedAt: new Date("2024-01-01"),
    totalSessions: 156,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael@example.com",
    specialization: "Career Counseling",
    rating: 4.9,
    status: "pending",
    joinedAt: new Date("2024-02-15"),
    totalSessions: 89,
  },
  // Add more mock data as needed
];

const statusColors = {
  verified: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  rejected: "bg-red-500/10 text-red-500",
};

const specializations = [
  "Psychology",
  "Career Counseling",
  "Life Coaching",
  "Relationship Counseling",
  "Mental Health",
];

export default function ExpertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] =
    useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSpecializationFilter = (value: string) => {
    setSpecializationFilter(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleRatingFilter = (value: string) => {
    setRatingFilter(value);
  };

  const handleViewExpert = (expertId: string) => {
    // Implement view expert details
    console.log("View expert:", expertId);
  };

  const handleEditExpert = (expertId: string) => {
    // Implement edit expert
    console.log("Edit expert:", expertId);
  };

  const handleVerifyExpert = (expertId: string) => {
    // Implement verify expert
    console.log("Verify expert:", expertId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Experts Management
        </h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Expert
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experts List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search experts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Select
                value={specializationFilter}
                onValueChange={handleSpecializationFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec.toLowerCase()}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={handleRatingFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExperts.map((expert) => (
                  <TableRow key={expert.id}>
                    <TableCell className="font-medium">{expert.name}</TableCell>
                    <TableCell>{expert.email}</TableCell>
                    <TableCell>{expert.specialization}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{expert.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[expert.status]}
                      >
                        {expert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{expert.totalSessions}</TableCell>
                    <TableCell>
                      {format(expert.joinedAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            aria-label="Open menu"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleViewExpert(expert.id)}
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditExpert(expert.id)}
                          >
                            Edit Expert
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleVerifyExpert(expert.id)}
                            className={
                              expert.status === "verified"
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {expert.status === "verified"
                              ? "Revoke Verification"
                              : "Verify Expert"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add pagination component here */}
          <div className="mt-4 flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
