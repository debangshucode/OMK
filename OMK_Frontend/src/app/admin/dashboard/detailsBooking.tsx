import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, MapPin, User, Mail, Phone, Camera, Video, 
  DollarSign, MessageSquare, Star, CheckCircle, XCircle, Edit,
  Download, Send, Heart, AlertTriangle, Users, CalendarDays, Trash2
} from 'lucide-react';

import { Booking } from "@/types/types";

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
  onDelete?: (bookingId: string) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onDelete
}) => {
  if (!booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-rose-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-amber-600" />;
      default: return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'photography': return <Camera className="w-6 h-6 text-indigo-600" />;
      case 'videography': return <Video className="w-6 h-6 text-purple-600" />;
      case 'both': return (
        <div className="flex space-x-2">
          <Camera className="w-6 h-6 text-indigo-600" />
          <Video className="w-6 h-6 text-purple-600" />
        </div>
      );
      default: return <Camera className="w-6 h-6 text-indigo-600" />;
    }
  };

  const handleDelete = () => {
    if (onDelete && confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      onDelete(booking._id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{booking.name}</h2>
                      <p className="text-xl text-white/90 mb-3">
                        {booking.serviceType === 'both' ? 'Photography + Videography' : 
                         booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(booking.status)}`}>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(booking.status)}
                            <span className="uppercase tracking-wide">{booking.status}</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto hide-scrollbar bg-gradient-to-br from-slate-50 to-blue-50"> 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Service Details */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            {getServiceIcon(booking.serviceType)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {booking.serviceType === 'both' ? 'Full Service Package' : 
                               booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
                            </h3>
                            <p className="text-slate-600">Professional service</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Event Details */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <CalendarDays className="w-5 h-5 text-white" />
                        </div>
                        <span>Event Details</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-lg">{booking.date}</p>
                            <p className="text-slate-600">Event Date</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl border border-slate-200">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-lg">{booking.timeSlot}</p>
                            <p className="text-slate-600">Time & Duration</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span>Contact Information</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl border border-slate-200">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{booking.email}</p>
                            <p className="text-slate-600">Email Address</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{booking.phone}</p>
                            <p className="text-slate-600">Phone Number</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Client Message */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span>Client Message</span>
                      </h3>
                      <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-6 border border-slate-200">
                        <p className="text-slate-700 leading-relaxed text-lg italic">
                          "{booking.message}"
                        </p>
                      </div>
                    </motion.div>

                    {/* Request Timeline */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <span>Timeline</span>
                      </h3>
                      <div className="bg-gradient-to-r from-slate-50 to-amber-50 rounded-xl p-4 border border-slate-200">
                        <p className="text-slate-600 font-medium">
                          Requested on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-white border-t border-slate-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  {booking.status === 'pending' && (
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onReject(booking._id);
                          onClose();
                        }}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Decline Booking</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onAccept(booking._id);
                          onClose();
                        }}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Accept Booking</span>
                      </motion.button>
                    </div>
                  )}

                  {booking.status !== 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-bold shadow-lg transition-all duration-300"
                    >
                      Close Details
                    </motion.button>
                  )}

                  {/* Delete Button - Always Available */}
                  {onDelete && (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDelete}
                      className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold shadow-lg transition-all duration-300 ml-4"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Delete</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingDetailsModal;