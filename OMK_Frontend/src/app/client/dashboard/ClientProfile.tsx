"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Camera, Edit, Save, X,
  Download, Heart, Star
} from "lucide-react";
import axios from "axios";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  partnerName: string;
  profileImage: string;
}

const ClientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    partnerName: "",
    profileImage: "",
  });

  const [tempData, setTempData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    partnerName: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/settings/get-user", {
          withCredentials: true
        });

        const data = response.data;

        const cleanedData = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          partnerName: data.partnerName || "",
          profileImage: data.profileImage || "",
        };

        setProfileData(cleanedData);
        setTempData(cleanedData);
        setProfilePhoto(cleanedData.profileImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

const handleSave = async () => {
  try {
    let imageUrl = profileData.profileImage;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "omk_profiles");
      formData.append("cloud_name", "dtaga1wxt");

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dtaga1wxt/image/upload", {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      imageUrl = cloudData.secure_url;
    }

    const updatedData = { ...tempData, profileImage: imageUrl };

    const response = await axios.put(
      "http://localhost:4000/api/settings/clientsettings",
      updatedData,
      { withCredentials: true }
    );

    const updatedUser = response?.data?.user;
    if (!updatedUser || !updatedUser.name) {
      throw new Error("Invalid response from server");
    }

    setProfileData({
      name: updatedUser.name || "",
      email: updatedUser.email || "",
      phone: updatedUser.phone || "",
      address: updatedUser.address || "",
      partnerName: updatedUser.partnerName || "",
      profileImage: updatedUser.profileImage || "",
    });

    setIsEditing(false);
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};


  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
    setProfilePhoto(null);
    setSelectedFile(null);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const stats = [
    { label: "Total Photos", value: "245", icon: Camera, color: "text-blue-600" },
    { label: "Downloads", value: "12", icon: Download, color: "text-green-600" },
    { label: "Favorites", value: "34", icon: Heart, color: "text-red-600" },
    { label: "Rating Given", value: "5.0", icon: Star, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600">Manage your account information and preferences</p>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
                    onClick={() => document.getElementById("photoUpload")?.click()}
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

          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {["name", "email", "phone", "partnerName", "address"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field === "partnerName" ? "Partner Name" : field[0].toUpperCase() + field.slice(1)}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={tempData[field as keyof ProfileData]}
                      onChange={(e) => handleInputChange(field as keyof ProfileData, e.target.value)}
                      className="w-full border text-gray-700 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      {
                        {
                          name: <User className="w-4 h-4 text-gray-400" />,
                          email: <Mail className="w-4 h-4 text-gray-400" />,
                          phone: <Phone className="w-4 h-4 text-gray-400" />,
                          address: <MapPin className="w-4 h-4 text-gray-400" />,
                          partnerName: <Heart className="w-4 h-4 text-gray-400" />
                        }[field]
                      }
                      <span>{profileData[field as keyof ProfileData]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ClientProfile;
