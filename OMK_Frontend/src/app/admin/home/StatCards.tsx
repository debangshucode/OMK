// components/StatCards.tsx
"use client";

import { Calendar } from "lucide-react";

export default function StatCards() {
  const stats = [
    {
      icon: "📈",
      label: "Total Sales",
      value: "$25,024",
      percentage: 80,
      color: "border-orange-500 text-orange-500",
    },
    {
      icon: "🛍️",
      label: "Total Sales",
      value: "$25,024",
      percentage: 80,
      color: "border-pink-500 text-pink-500",
    },
    {
      icon: "📊",
      label: "Total Sales",
      value: "$25,024",
      percentage: 80,
      color: "border-green-500 text-green-500",
    },
  ];

  return (
    <div className="w-full px-4 pt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        
          </div>
          <div className="flex items-center gap-2 bg-white border rounded px-3 py-1 shadow-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <input
            type="date"
            className="bg-transparent outline-none text-sm"
          />
        </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-4"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-xs text-gray-400">Last 24 Hours</div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${stat.color} bg-current`}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
