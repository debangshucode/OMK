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
} from "lucide-react";
import BookingDetailsModal from "./detailsBooking";
import { Booking } from "@/types/types";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
const BookingsSection: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  // Updated to work with both direct calls and modal callbacks
  const handleBookingAction = async (
    bookingId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const response = await axios.patch(`/bookings/${bookingId}`, {
        status: action === "accept" ? "accepted" : "rejected",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: response.data.status }
            : booking
        )
      );

      toast.success(`Booking ${action}ed successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the booking status.");
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
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "photography":
        return <Camera className="w-5 h-5" />;
      case "videography":
        return <Video className="w-5 h-5" />;
      case "both":
        return (
          <div className="flex space-x-1">
            <Camera className="w-4 h-4" />
            <Video className="w-4 h-4" />
          </div>
        );
      default:
        return <Camera className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
          <p className="text-gray-600">
            Manage photography and videography booking requests
          </p>
        </div>
      </div>

      {/* Bookings Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              onClick={() => handleViewBooking(booking)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.serviceType}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    <span>{booking.status}</span>
                  </span>
                </div>
              </div>

              {/* Service & Budget */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-900 space-x-2">
                  {getServiceIcon(booking.serviceType)}
                  <span className="text-sm font-medium text-gray-900">
                    {booking.serviceType === "both"
                      ? "Photo + Video"
                      : booking.serviceType.charAt(0).toUpperCase() +
                        booking.serviceType.slice(1)}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{booking.timeSlot}</span>
                </div>
              </div>

              {/* Message Preview */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Message
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded">
                  {booking.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {booking.status === "pending" ? (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookingAction(booking._id, "accept")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookingAction(booking._id, "reject")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleViewBooking(booking)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Requested {new Date(booking.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={(bookingId: string) =>
          handleBookingAction(bookingId, "accept")
        }
        onReject={(bookingId: string) =>
          handleBookingAction(bookingId, "reject")
        }
      />
    </div>
  );
};

export default BookingsSection;
