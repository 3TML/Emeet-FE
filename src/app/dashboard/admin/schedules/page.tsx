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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Search, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

// Types
type Schedule = {
  id: string;
  expertId: string;
  expertName: string;
  userId: string;
  userName: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "one-time" | "recurring";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  category: string;
};

// Mock data - Replace with actual API call
const mockSchedules: Schedule[] = [
  {
    id: "1",
    expertId: "expert1",
    expertName: "Dr. Sarah Johnson",
    userId: "user1",
    userName: "John Doe",
    date: new Date("2024-03-20"),
    startTime: "10:00",
    endTime: "11:00",
    type: "one-time",
    status: "scheduled",
    category: "Psychology",
  },
  {
    id: "2",
    expertId: "expert2",
    expertName: "Dr. Michael Chen",
    userId: "user2",
    userName: "Jane Smith",
    date: new Date("2024-03-21"),
    startTime: "14:00",
    endTime: "15:00",
    type: "recurring",
    status: "completed",
    category: "Career Counseling",
  },
  // Add more mock data as needed
];

const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-500",
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
  "no-show": "bg-yellow-500/10 text-yellow-500",
};

const typeColors = {
  "one-time": "bg-purple-500/10 text-purple-500",
  recurring: "bg-indigo-500/10 text-indigo-500",
};

export default function SchedulesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
  };

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "start" | "end"
  ) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleViewSchedule = (scheduleId: string) => {
    // Implement view schedule details
    console.log("View schedule:", scheduleId);
  };

  const handleCancelSchedule = (scheduleId: string) => {
    // Implement cancel schedule
    console.log("Cancel schedule:", scheduleId);
  };

  const handleReschedule = (scheduleId: string) => {
    // Implement reschedule
    console.log("Reschedule:", scheduleId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Schedules Management
        </h1>
        <Button className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          View Calendar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedules List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schedules..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => handleDateRangeChange(e, "start")}
                  className="w-[180px]"
                />
                <span>to</span>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => handleDateRangeChange(e, "end")}
                  className="w-[180px]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expert</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">
                      {schedule.expertName}
                    </TableCell>
                    <TableCell>{schedule.userName}</TableCell>
                    <TableCell>
                      {format(schedule.date, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{schedule.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={typeColors[schedule.type]}
                      >
                        {schedule.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[schedule.status]}
                      >
                        {schedule.status}
                      </Badge>
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
                            onClick={() => handleViewSchedule(schedule.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          {schedule.status === "scheduled" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleReschedule(schedule.id)}
                              >
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleCancelSchedule(schedule.id)
                                }
                                className="text-red-600"
                              >
                                Cancel Session
                              </DropdownMenuItem>
                            </>
                          )}
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
