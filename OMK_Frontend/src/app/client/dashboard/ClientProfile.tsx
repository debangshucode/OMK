"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  Bell,
  Shield,
  Download,
  Heart,
  Star,
} from "lucide-react";

const ClientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    weddingDate: "2024-01-15",
    partnerName: "Michael Johnson",
    photographer: "Alex Thompson",
    package: "Premium Wedding Package",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [tempData, setTempData] = useState(profileData);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setTempData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));
  };

  const stats = [
    {
      label: "Total Photos",
      value: "245",
      icon: Camera,
      color: "text-blue-600",
    },
    {
      label: "Downloads",
      value: "12",
      icon: Download,
      color: "text-green-600",
    },
    { label: "Favorites", value: "34", icon: Heart, color: "text-red-600" },
    {
      label: "Rating Given",
      value: "5.0",
      icon: Star,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
          >
            <Edit className="w-5 h-5" />
            <span>Edit Profile</span>
          </motion.button>
        ) : (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar Section */}
          
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                )}
              </div>
              {isEditing && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
                    onClick={() =>
                      document.getElementById("photoUpload")?.click()
                    }
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-4 text-center lg:text-left">
              {isEditing ? tempData.name : profileData.name}
            </h3>
            <p className="text-blue-600 font-medium text-center lg:text-left">
              Premium Client
            </p>
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full border text-gray-700 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{profileData.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.partnerName}
                    onChange={(e) =>
                      handleInputChange("partnerName", e.target.value)
                    }
                    className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>{profileData.partnerName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center space-x-2 text-gray-900">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{profileData.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Service Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wedding Date
            </label>
            <div className="flex items-center space-x-2 text-gray-900">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{profileData.weddingDate}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photographer
            </label>
            <div className="flex items-center space-x-2 text-gray-900">
              <Camera className="w-4 h-4 text-gray-400" />
              <span>{profileData.photographer}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package
            </label>
            <div className="flex items-center space-x-2 text-gray-900">
              <Star className="w-4 h-4 text-gray-400" />
              <span>{profileData.package}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Statistics
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Notification Preferences
          </h3>
        </div>
        <div className="space-y-4">
          {Object.entries(tempData.notifications).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {type} Notifications
                </h4>
                <p className="text-sm text-gray-600">
                  Receive updates via {type === "sms" ? "SMS" : type}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNotificationChange(type, !enabled)}
                disabled={!isEditing}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  enabled ? "bg-blue-600" : "bg-gray-300"
                } ${
                  !isEditing
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ClientProfile;
