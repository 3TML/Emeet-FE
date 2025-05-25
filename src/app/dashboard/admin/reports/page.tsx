"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
} from "lucide-react";

// Types
type ReportType = "financial" | "user" | "expert" | "session";

type Report = {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  lastGenerated: Date;
  status: "ready" | "generating" | "failed";
};

// Mock data - Replace with actual API calls
const mockReports: Report[] = [
  {
    id: "1",
    type: "financial",
    title: "Monthly Revenue Report",
    description: "Detailed breakdown of monthly revenue and transactions",
    lastGenerated: new Date("2024-03-15"),
    status: "ready",
  },
  {
    id: "2",
    type: "user",
    title: "User Growth Analysis",
    description: "User registration and activity trends",
    lastGenerated: new Date("2024-03-14"),
    status: "ready",
  },
  {
    id: "3",
    type: "expert",
    title: "Expert Performance Report",
    description: "Expert ratings, sessions, and earnings analysis",
    lastGenerated: new Date("2024-03-13"),
    status: "generating",
  },
  {
    id: "4",
    type: "session",
    title: "Session Analytics",
    description: "Session completion rates and feedback analysis",
    lastGenerated: new Date("2024-03-12"),
    status: "ready",
  },
];

const reportTypeIcons = {
  financial: BarChart3,
  user: FileText,
  expert: PieChart,
  session: Calendar,
};

const statusColors = {
  ready: "bg-green-500/10 text-green-500",
  generating: "bg-yellow-500/10 text-yellow-500",
  failed: "bg-red-500/10 text-red-500",
};

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType | "all">("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleTypeChange = (value: string) => {
    setSelectedType(value as ReportType | "all");
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

  const handleGenerateReport = (reportId: string) => {
    // Implement report generation
    console.log("Generate report:", reportId);
  };

  const handleDownloadReport = (reportId: string) => {
    // Implement report download
    console.log("Download report:", reportId);
  };

  const filteredReports = mockReports.filter((report) => {
    if (selectedType !== "all" && report.type !== selectedType) {
      return false;
    }
    if (
      searchQuery &&
      !report.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <Button className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="financial">Financial Reports</SelectItem>
                <SelectItem value="user">User Reports</SelectItem>
                <SelectItem value="expert">Expert Reports</SelectItem>
                <SelectItem value="session">Session Reports</SelectItem>
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
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Generated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const Icon = reportTypeIcons[report.type];
                  return (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{report.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {report.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{report.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.lastGenerated.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            statusColors[report.status]
                          }`}
                        >
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {report.status === "ready" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() => handleGenerateReport(report.id)}
                              disabled={report.status === "generating"}
                            >
                              <FileText className="h-4 w-4" />
                              Generate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
            >
              <BarChart3 className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Financial Summary</div>
                <div className="text-sm text-muted-foreground">
                  Revenue and transaction analysis
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
            >
              <FileText className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">User Analytics</div>
                <div className="text-sm text-muted-foreground">
                  User growth and engagement metrics
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
            >
              <PieChart className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Expert Performance</div>
                <div className="text-sm text-muted-foreground">
                  Expert ratings and session statistics
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
            >
              <Calendar className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Session Overview</div>
                <div className="text-sm text-muted-foreground">
                  Session completion and feedback analysis
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
