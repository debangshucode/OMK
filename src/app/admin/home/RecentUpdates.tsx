"use client";

import React from "react";

const updates = [
  {
    name: "Babar",
    message: "Received his order of USB",
    image: "/images/avatar.jpg", // Replace with your local or hosted image path
  },
  {
    name: "Ali",
    message: "Received his order of USB",
    image: "/images/avatar.jpg",
  },
  {
    name: "Ramzan",
    message: "Received his order of USB",
    image: "/images/avatar.jpg",
  },
];

export default function RecentUpdates() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Update</h2>

      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={update.image}
              alt={update.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{update.name}</span> {update.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
