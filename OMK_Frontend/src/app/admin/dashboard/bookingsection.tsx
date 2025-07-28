"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Search,
  Filter,
  Clock,
  MapPin,
  User,
  Camera,
  Video,
  MessageSquare,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Phone,
  Mail,
  CalendarDays,
  TrendingUp,
  DollarSign,
  X,
  Download,
  Trash2,
  Archive,
} from "lucide-react";
import BookingDetailsModal from "./detailsBooking";
import { Booking } from "@/types/types";
import axios from "@/utils/axios";
import { toast } from "sonner";

const BookingsSection: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/bookings")
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        toast.error("Failed to fetch bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Updated to work with confirmed/cancelled status
  const handleBookingAction = async (
    bookingId: string,
    action: "confirm" | "cancel" | "delete"
  ) => {
    try {
      if (action === "delete") {
        await axios.delete(`/bookings/${bookingId}`);
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
        toast.success("Booking deleted successfully");
      } else {
        const response = await axios.patch(`/bookings/${bookingId}`, {
          status: action === "confirm" ? "confirmed" : "cancelled",
        });

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: response.data.status }
              : booking
          )
        );

        toast.success(`Booking ${action}ed successfully`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Something went wrong while ${action}ing the booking.`);
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-rose-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "photography":
        return <Camera className="w-5 h-5 text-indigo-600" />;
      case "videography":
        return <Video className="w-5 h-5 text-purple-600" />;
      case "both":
        return (
          <div className="flex space-x-1">
            <Camera className="w-4 h-4 text-indigo-600" />
            <Video className="w-4 h-4 text-purple-600" />
          </div>
        );
      default:
        return <Camera className="w-5 h-5 text-indigo-600" />;
    }
  };

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: bookings.length,
      pending: bookings.filter(b => b.status === "pending").length,
      confirmed: bookings.filter(b => b.status === "confirmed").length,
      cancelled: bookings.filter(b => b.status === "cancelled").length,
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-6">
      {/* Retro Header with Classic Typography */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-red-600 to-read-600 bg-clip-text text-transparent mb-4">
            Booking Management
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-black to-black mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-6 text-lg font-medium tracking-wide">
            Professional Photography & Videography Services
          </p>
        </motion.div>
      </div>

      {/* Status Filter Pills - Retro Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-3">
            {[
              { key: "all", label: "All Bookings", count: statusCounts.all },
              { key: "pending", label: "Pending", count: statusCounts.pending },
              { key: "confirmed", label: "Confirmed", count: statusCounts.confirmed },
              { key: "cancelled", label: "Cancelled", count: statusCounts.cancelled },
            ].map((filter) => (
              <motion.button
                key={filter.key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus(filter.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                  filterStatus === filter.key
                    ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filter.label} ({filter.count})
              </motion.button>
            ))}
          </div>

          {/* Search Bar - Retro Style */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-50 border text-gray-700 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 w-64"
            />
          </div>
        </div>
      </motion.div>

      {/* Bookings Grid - Enhanced Retro Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ delay: index * 0.1, type: "spring", damping: 15 }}
              className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={() => handleViewBooking(booking)}
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-black via-black to-black p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{booking.name}</h3>
                      <p className="text-white/80 text-sm font-medium">
                        {booking.serviceType === "both" ? "Photo + Video" : 
                         booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${getStatusColor(booking.status)}`}
                  >
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(booking.status)}
                      <span className="uppercase tracking-wide">{booking.status}</span>
                    </div>
                  </span>
                </div>

                {/* Service Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white/90 space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                    {getServiceIcon(booking.serviceType)}
                    <span className="text-sm font-semibold">
                      {booking.serviceType === "both" ? "Full Service" : 
                       booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <CalendarDays className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{new Date(booking.date).toLocaleDateString()}</p>
                      <p className="text-sm text-slate-600">Event Date</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{booking.timeSlot}</p>
                      <p className="text-sm text-slate-600">Time Slot</p>
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-700">Message</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {booking.message}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                      <Mail className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{booking.email}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                {booking.status === "pending" ? (
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookingAction(booking._id, "confirm");
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-1 shadow-lg transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookingAction(booking._id, "cancel");
                      }}
                      className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-1 shadow-lg transition-all duration-300"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Decline</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this booking?")) {
                          handleBookingAction(booking._id, "delete");
                        }
                      }}
                      className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-1 shadow-lg transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewBooking(booking);
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 shadow-lg transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this booking?")) {
                          handleBookingAction(booking._id, "delete");
                        }
                      }}
                      className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center shadow-lg transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200"
        >
          <Archive className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No bookings found</h3>
          <p className="text-slate-500">
            {searchTerm ? "Try adjusting your search terms" : "No bookings match the current filter"}
          </p>
        </motion.div>
      )}

      {/* Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={(bookingId: string) => handleBookingAction(bookingId, "confirm")}
        onReject={(bookingId: string) => handleBookingAction(bookingId, "cancel")}
        onDelete={(bookingId: string) => handleBookingAction(bookingId, "delete")}
      />
    </div>
  );
};

export default BookingsSection;