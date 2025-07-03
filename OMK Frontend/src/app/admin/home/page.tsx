"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatCards from "./StatCards";
import RecentOrders from "./RecentOrders";
import RecentUpdates from "./RecentUpdates";
import SalesAnalytics from "./SalesAnalytics";

export default function AdminHome() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 p-6">
        <Topbar />

        {/* Row: Stat Cards + Recent Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
          <div className="lg:col-span-3">
            <StatCards />
            <RecentOrders />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <RecentUpdates />
            <SalesAnalytics />
          </div>
        </div>

        {/* Row: Recent Orders */}
        {/* <div className="mt-6">
          <RecentOrders />
        </div> */}
      </div>
    </div>
  );
}
