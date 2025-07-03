"use client";

import { FaShoppingCart } from "react-icons/fa";

const analyticsData = [
  {
    title: "Onlion Orders",
    time: "Last seen 2 Hours",
    change: "-17%",
    total: 3849,
    color: "bg-orange-500",
    textColor: "text-red-600",
    icon: <FaShoppingCart />,
  },
  {
    title: "Onlion Orders",
    time: "Last seen 2 Hours",
    change: "+23%",
    total: 4672,
    color: "bg-green-500",
    textColor: "text-green-600",
    icon: <FaShoppingCart />,
  },
  {
    title: "Onlion Orders",
    time: "Last seen 2 Hours",
    change: "+12%",
    total: 3294,
    color: "bg-blue-500",
    textColor: "text-green-600",
    icon: <FaShoppingCart />,
  },
];

export default function SalesAnalytics() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
      <div className="grid grid-cols-1 gap-4">
        {analyticsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl shadow-md bg-white"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.time}</p>
              <p className={`text-sm ${item.textColor}`}>{item.change}</p>
              <p className="text-md font-semibold">{item.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
