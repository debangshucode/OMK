"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  UserPlus,
  Grid,
  List,
} from "lucide-react";
import { toast } from "sonner";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  status?: "active" | "inactive" | "pending";
  createdAt?: string;
}

const ClientsSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("/auth/all-user");
      setClients(res.data.users || []);
    } catch (err) {
      toast.error("Failed to fetch clients");
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string = "active") => {
    const statusMap = {
      active: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
        iconColor: "text-emerald-600",
      },
      inactive: {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        icon: Clock,
        iconColor: "text-gray-600",
      },
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: AlertCircle,
        iconColor: "text-amber-600",
      },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRegister = async () => {
    try {
      const res = await axios.post("/auth/register", formData);
      setUserId(res.data.userId); // depends on your API response
      setOtpStage(true);
      toast.success("OTP sent to user");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 5) {
      toast.error("Please enter valid 5-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/auth/otp-verification",
        { email: formData.email, otp },
        {
          
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);

      setShowModal(false);
      setFormData({ name: "", email: "", phone: "", password: "" });
      setOtp("");
      setOtpStage(false);
    } catch (error) {
      toast.error("OTP verification failed");
      setUserId("");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Clients",
      value: clients.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active",
      value: clients.filter((c) => c.status === "active").length,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending",
      value: clients.filter((c) => c.status === "pending").length,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Clients
        </h1>
        <p className="text-gray-600">Manage your client relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* View Mode */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Add Client */}
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium transition-colors shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Client</span>
          </motion.button>
        </div>
      </div>

      {/* Clients Display */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No clients found</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => {
              const statusInfo = getStatusInfo(client.status);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-sm transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {client.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg border flex items-center space-x-1 ${statusInfo.color}`}
                    >
                      <StatusIcon
                        className={`w-4 h-4 ${statusInfo.iconColor}`}
                      />
                      <span className="text-sm font-medium capitalize">
                        {client.status || "active"}
                      </span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {client.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm truncate">{client.email}</span>
                      </div>
                      {client.phone && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                      )}
                      {client.location && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{client.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredClients.map((client, index) => {
              const statusInfo = getStatusInfo(client.status);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">
                        {client.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {client.name}
                        </h3>
                        <div
                          className={`px-2 py-1 rounded-md border flex items-center space-x-1 ${statusInfo.color}`}
                        >
                          <StatusIcon
                            className={`w-3 h-3 ${statusInfo.iconColor}`}
                          />
                          <span className="text-xs font-medium capitalize">
                            {client.status || "active"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{client.email}</span>
                        </span>
                        {client.phone && (
                          <span className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{client.phone}</span>
                          </span>
                        )}
                        {client.location && (
                          <span className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{client.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50   backdrop-blur-lg flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6  bg-white backdrop-blur-lg"
            >
              <h2 className="text-xl text-blue-600 font-semibold mb-4">
                Add New Client
              </h2>

              {!otpStage ? (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full mb-3 p-3  text-gray-700 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full mb-3 p-3 text-gray-700 border rounded-lg"
                  />

                  <input
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full mb-4 p-3 text-gray-700 border rounded-lg"
                  />
                  <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full mb-4 text-gray-700 p-3 border rounded-lg"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                  >
                    Verify & Create
                  </button>
                </>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 text-gray-500 hover:text-red-500 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientsSection;
