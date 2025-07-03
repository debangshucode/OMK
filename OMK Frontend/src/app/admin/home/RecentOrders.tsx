// components/RecentOrders.tsx
"use client";

const orders = [
  {
    productName: "Mini USB",
    productNumber: "4563",
    payment: "Due",
    status: "Pending",
  },
  {
    productName: "Mini USB",
    productNumber: "4563",
    payment: "Due",
    status: "Pending",
  },
  {
    productName: "Mini USB",
    productNumber: "4563",
    payment: "Due",
    status: "Pending",
  },
];

export default function RecentOrders() {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Product Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Product Number</th>
              <th className="px-6 py-3 font-medium text-gray-500">Payments</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-700">{order.productName}</td>
                <td className="px-6 py-4 text-gray-700">{order.productNumber}</td>
                <td className="px-6 py-4 text-gray-700">{order.payment}</td>
                <td className="px-6 py-4 text-pink-500 font-medium">{order.status}</td>
                <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                  Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
