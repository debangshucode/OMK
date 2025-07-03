import { Home, Users, BarChart, MessageSquare, Box, Settings, LogOut, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen p-5 space-y-6">
      <h1 className="text-xl font-bold text-red-600">C <span className="text-black">BABAR</span></h1>

      <nav className="space-y-4">
        {[
          { icon: Home, label: "Dashboard" },
          { icon: Users, label: "Customers" },
          { icon: BarChart, label: "Analytics" },
          { icon: MessageSquare, label: "Messages", badge: 14 },
          { icon: Box, label: "Products" },
          { icon: Settings, label: "Settings" },
          { icon: Plus, label: "Add Product" },
        ].map(({ icon: Icon, label, badge }) => (
          <div key={label} className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </div>
            {badge && <span className="text-xs bg-red-500 text-white px-2 rounded-full">{badge}</span>}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-5 w-full">
        <div className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
