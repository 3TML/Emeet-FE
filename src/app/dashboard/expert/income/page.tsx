"use client"
import React, { useState } from "react";
import { 
  MdSearch, 
  MdFilterList, 
  MdAdd, 
  MdMoreVert, 
  MdTrendingUp, 
  MdTrendingDown,
  MdArrowUpward,
  MdArrowDownward,
  MdAccountBalance,
  MdAttachMoney,
  MdCalendarToday,
  MdPieChart,
  MdPerson,
  MdReceipt,
  MdNotifications,
  MdCheckCircle,
  MdAccessTime
} from "react-icons/md";

const barChartData = [
  { month: "Sep 2023", income: 500, expense: 200, net: 300 },
  { month: "Oct 2023", income: 2000, expense: 800, net: 1200 },
  { month: "Nov 2023", income: 3500, expense: 1200, net: 2300 },
  { month: "Dec 2023", income: 4000, expense: 1800, net: 2200 },
  { month: "Jan 2024", income: 1200, expense: 2200, net: -1000 },
  { month: "Feb 2024", income: 3000, expense: 900, net: 2100 },
];
const transactionActivities = [
  { account: "REITS", date: "5 Mar 24", status: "-", payee: "Opening Balance", category: "Balance Account", tags: "Birthday", amount: "1,000,000" },
  { account: "WISE", date: "10 Mar 24", status: "-", payee: "Opening Balance", category: "Balance Account", tags: "Birthday", amount: "1,000,000" },
];

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, trend, trendValue, icon, color }: StatCardProps) => {
  const isPositive = trendValue >= 0;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <div className={`flex items-center mt-2 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <MdArrowUpward className="mr-1" /> : <MdArrowDownward className="mr-1" />}
            <span className="text-sm font-medium">{Math.abs(trendValue)}% {trend}</span>
          </div>
        </div>
        <div className={`${color} bg-opacity-20 p-3 rounded-xl h-fit`}>
          {icon}
        </div>
      </div>
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${color} bg-opacity-10`}></div>
    </div>
  );
};

const BarLineChart = () => {
  const width = 800;
  const height = 280;
  const padding = 40;
  const barWidth = 24;
  const barGap = 6;
  const maxY = 5000;
  const xStep = (width - 2 * padding) / (barChartData.length);
  const y = (val: number) => height - padding - (val / maxY) * (height - 2 * padding);
  const bars = barChartData.map((d, i) => ({
    x: padding + i * xStep,
    incomeY: y(d.income),
    expenseY: y(d.expense),
    netY: y(d.net),
    month: d.month,
    income: d.income,
    expense: d.expense,
    net: d.net,
  }));
  const netLine = bars.map((b, i) => `${i === 0 ? 'M' : 'L'}${b.x + barWidth + barGap/2},${b.netY}`).join(' ');
  
  return (
    <div className="w-full overflow-x-auto pt-4">
      <svg width={width} height={height} className="w-full h-full">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line
            key={i}
            x1={padding}
            x2={width - padding}
            y1={y(i * 1000)}
            y2={y(i * 1000)}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}
        {bars.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.incomeY}
              width={barWidth}
              height={y(0) - b.incomeY}
              rx={5}
              fill="#8b5cf6"
              opacity={0.85}
            />
            <rect
              x={b.x + barWidth + barGap}
              y={b.expenseY}
              width={barWidth}
              height={y(0) - b.expenseY}
              rx={5}
              fill="#22d3ee"
              opacity={0.85}
            />
            <circle
              cx={b.x + barWidth + barGap/2}
              cy={b.netY}
              r={5}
              fill="#f59e0b"
              stroke="white"
              strokeWidth={2}
            />
          </g>
        ))}
        <path d={netLine} stroke="#f59e0b" strokeWidth={2} fill="none" />
        {[0, 1000, 2000, 3000, 4000, 5000].map((val, i) => (
          <text
            key={i}
            x={padding - 8}
            y={y(val) + 4}
            fontSize="12"
            fill="#9ca3af"
            textAnchor="end"
            fontFamily="system-ui"
          >
            ${val === 0 ? '0' : i + 'k'}
          </text>
        ))}
        {bars.map((b, i) => (
          <text
            key={b.month}
            x={b.x + barWidth + barGap/2}
            y={height - 10}
            fontSize="12"
            fill="#6b7280"
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="500"
          >
            {b.month.split(' ')[0]}
          </text>
        ))}
      </svg>
    </div>
  );
};

const IncomePage = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("This Month");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Income sources data for pie chart
  const incomeSources = [
    { source: "Consulting", amount: 5200, color: "bg-violet-500" },
    { source: "Freelance", amount: 3800, color: "bg-indigo-500" },
    { source: "Investments", amount: 2600, color: "bg-blue-500" },
    { source: "Passive Income", amount: 1800, color: "bg-cyan-500" },
    { source: "Other", amount: 800, color: "bg-emerald-500" },
  ];

  // Scheduled payments
  const scheduledPayments = [
    { 
      title: "Office Rent", 
      amount: 1200, 
      date: "March 30, 2024", 
      recipient: "Workspace Co.",
      status: "Upcoming",
      icon: <MdAccountBalance className="text-blue-500" /> 
    },
    { 
      title: "Software Subscription", 
      amount: 49.99, 
      date: "April 5, 2024", 
      recipient: "Adobe Inc.",
      status: "Upcoming",
      icon: <MdReceipt className="text-indigo-500" /> 
    },
    { 
      title: "Team Payroll", 
      amount: 3200, 
      date: "April 1, 2024", 
      recipient: "Multiple Recipients",
      status: "Upcoming",
      icon: <MdPerson className="text-violet-500" /> 
    },
  ];
  
  return (
    <main className="min-h-screen bg-gray-50 p-5 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Income Overview</h1>
            <p className="text-gray-500 mt-1">Giao dịch đã nhận, chưa nhận, tổng thu nhập.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition">
              <MdFilterList className="text-lg" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 transition">
              <MdAdd className="text-lg" /> Add Transaction
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard 
            title="Total Income"
            value="$14,200"
            trend="since last month"
            trendValue={8.2}
            icon={<MdTrendingUp className="text-2xl text-emerald-600" />}
            color="bg-emerald-600"
          />
          <StatCard 
            title="Total Expenses"
            value="$7,100"
            trend="since last month"
            trendValue={-5.1}
            icon={<MdTrendingDown className="text-2xl text-rose-600" />}
            color="bg-rose-600"
          />
          <StatCard 
            title="Net Income"
            value="$7,100"
            trend="since last month"
            trendValue={12.5}
            icon={<MdAttachMoney className="text-2xl text-amber-600" />}
            color="bg-amber-600"
          />
          <StatCard 
            title="Balance"
            value="$2,000,000"
            trend="total assets"
            trendValue={2.4}
            icon={<MdAccountBalance className="text-2xl text-indigo-600" />}
            color="bg-indigo-600"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-bold text-gray-900">Revenue Analysis</h2>
                <p className="text-sm text-gray-500 mt-1">Income vs Expenses, February 2024</p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-500"></span> Income</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-500"></span> Expenses</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Net Income</div>
                <div className="md:ml-6">
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-right">
                    <div className="text-xs text-gray-500">Total Revenue</div>
                    <div className="text-lg font-bold text-gray-900">$14,200</div>
                  </div>
                </div>
              </div>
            </div>
            <BarLineChart />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Income Sources</h2>
                <p className="text-sm text-gray-500 mt-1">Breakdown by category</p>
              </div>
              <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <MdMoreVert />
              </button>
            </div>
            <div className="space-y-4">
              {incomeSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="text-gray-700">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${source.amount.toLocaleString()}</span>
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${source.color}`} 
                        style={{ width: `${(source.amount / 14200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Income</span>
                <span className="font-bold text-gray-900">$14,200</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Scheduled Payments</h2>
                <p className="text-sm text-gray-500 mt-1">Upcoming transactions</p>
              </div>
              <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                <MdCalendarToday />
              </button>
            </div>
            <div className="space-y-4">
              {scheduledPayments.map((payment, index) => (
                <div key={index} className="flex items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                  <div className="p-3 rounded-xl bg-gray-50 mr-4">
                    {payment.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{payment.title}</h3>
                    <p className="text-sm text-gray-500">{payment.recipient}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${payment.amount.toLocaleString()}</p>
                    <div className="flex items-center text-xs mt-1">
                      <MdAccessTime className="text-gray-400 mr-1" />
                      <span className="text-gray-500">{payment.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 text-center text-indigo-600 font-medium rounded-xl border border-indigo-100 hover:bg-indigo-50 transition">
              View All Payments
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold">Monthly Goal</h2>
                    <p className="text-indigo-100 text-sm mt-1">February 2024</p>
                  </div>
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <MdPieChart className="text-white text-xl" />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-indigo-100">Progress</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="mt-5 flex justify-between">
                  <div>
                    <p className="text-sm text-indigo-100">Current</p>
                    <p className="text-xl font-bold">$14,200</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-indigo-100">Target</p>
                    <p className="text-xl font-bold">$16,500</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-gray-900">Quick Insights</h2>
                  <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                    <MdMoreVert />
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center p-3 rounded-xl bg-emerald-50">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 mr-3">
                      <MdTrendingUp />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Highest earning month</p>
                      <p className="text-sm text-gray-500">December 2023: $4,000</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-xl bg-amber-50">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600 mr-3">
                      <MdPieChart />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Main income source</p>
                      <p className="text-sm text-gray-500">Consulting: 36% of income</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-xl bg-rose-50">
                    <div className="p-2 rounded-lg bg-rose-100 text-rose-600 mr-3">
                      <MdNotifications />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Overdue payment</p>
                      <p className="text-sm text-gray-500">Client XYZ: $1,200 (15 days)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-bold text-gray-900">Transaction Activities</h2>
              <p className="text-sm text-gray-500 mt-1">All transactions for the selected period</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={handleSearch}
                  aria-label="Search transactions"
                />
              </div>
              <div className="flex gap-3">
                <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition" aria-label="Filter">
                  <MdFilterList className="text-lg" />
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition" aria-label="More options">
                  <MdMoreVert className="text-lg" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="py-3 px-4 text-left font-medium">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                      aria-label="Select all" 
                    />
                  </th>
                  <th className="py-3 px-4 text-left font-medium">Account</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Payee</th>
                  <th className="py-3 px-4 text-left font-medium">Category</th>
                  <th className="py-3 px-4 text-left font-medium">Tags</th>
                  <th className="py-3 px-4 text-right font-medium">Amount</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactionActivities
                  .filter(row => row.account.toLowerCase().includes(search.toLowerCase()))
                  .map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                          aria-label={`Select ${row.account}`} 
                        />
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">{row.account}</td>
                      <td className="py-4 px-4 text-gray-600">{row.date}</td>
                      <td className="py-4 px-4 text-gray-600">{row.status}</td>
                      <td className="py-4 px-4 text-gray-700">{row.payee}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          {row.tags}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">${row.amount}</td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition" aria-label="More options">
                          <MdMoreVert className="text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <div>Showing 2 of 2 transactions</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IncomePage; 