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
import { MoreHorizontal, Search, Download } from "lucide-react";
import { format } from "date-fns";

// Types
type Transaction = {
  id: string;
  userId: string;
  userName: string;
  expertId: string;
  expertName: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "session" | "subscription";
  createdAt: Date;
};

// Mock data - Replace with actual API call
const mockTransactions: Transaction[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    expertId: "expert1",
    expertName: "Dr. Sarah Johnson",
    amount: 150.0,
    status: "completed",
    type: "session",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    expertId: "expert2",
    expertName: "Dr. Michael Chen",
    amount: 299.99,
    status: "pending",
    type: "subscription",
    createdAt: new Date("2024-03-14"),
  },
  // Add more mock data as needed
];

const statusColors = {
  completed: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  failed: "bg-red-500/10 text-red-500",
  refunded: "bg-blue-500/10 text-blue-500",
};

const typeColors = {
  session: "bg-purple-500/10 text-purple-500",
  subscription: "bg-indigo-500/10 text-indigo-500",
};

export default function TransactionsPage() {
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

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
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

  const handleExportTransactions = () => {
    // Implement export functionality
    console.log("Exporting transactions...");
  };

  const handleViewTransaction = (transactionId: string) => {
    // Implement view transaction details
    console.log("View transaction:", transactionId);
  };

  const handleRefundTransaction = (transactionId: string) => {
    // Implement refund transaction
    console.log("Refund transaction:", transactionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Transactions Management
        </h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleExportTransactions}
        >
          <Download className="h-4 w-4" />
          Export Transactions
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <select
                className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={typeFilter}
                onChange={handleTypeFilter}
              >
                <option value="all">All Types</option>
                <option value="session">Session</option>
                <option value="subscription">Subscription</option>
              </select>
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Expert</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.userName}</TableCell>
                    <TableCell>{transaction.expertName}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={typeColors[transaction.type]}
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[transaction.status]}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(transaction.createdAt, "MMM d, yyyy")}
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
                            onClick={() =>
                              handleViewTransaction(transaction.id)
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          {transaction.status === "completed" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleRefundTransaction(transaction.id)
                              }
                              className="text-red-600"
                            >
                              Refund Transaction
                            </DropdownMenuItem>
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
