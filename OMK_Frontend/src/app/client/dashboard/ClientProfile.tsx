"use client";
import React, { useEffect, useState } from "react";
import {
  User, Mail, Phone, MapPin, Heart, Edit, Save, X, AlertCircle
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    partnerName: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState<ProfileData>(profile);

  // Fetch profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4000/api/settings/get-user", {
        withCredentials: true
      });
      
      const profileData: ProfileData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        partnerName: data.partnerName || "",
        profileImage: data.profileImage || "",
      };
      
      setProfile(profileData);
      setFormData(profileData);
    } catch (error) {
      showMessage("Failed to load profile", true);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      showMessage("Please select an image file", true);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showMessage("File size must be less than 5MB", true);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profile);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
    setSelectedFile(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      data.append('phone', formData.phone.trim());
      data.append('address', formData.address.trim());
      data.append('partnerName', formData.partnerName.trim());
      
      if (selectedFile) {
        data.append('profileImage', selectedFile);
      }

      const response = await axios.put(
        "http://localhost:4000/api/settings/clientsettings",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        await fetchProfile(); // Refresh data
        setIsEditing(false);
        setSelectedFile(null);
        showMessage("Profile updated successfully!");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to update profile";
      showMessage(errorMsg, true);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = () => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    if (profile.profileImage) {
      return profile.profileImage.startsWith('http') 
        ? profile.profileImage 
        : `http://localhost:4000/uploads/${profile.profileImage}`;
    }
    return null;
  };

  const fields = [
    { key: 'name', label: 'Name', icon: User, type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'text' },
    { key: 'address', label: 'Address', icon: MapPin, type: 'text' },
    { key: 'partnerName', label: 'Partner Name', icon: Heart, type: 'text' },
  ];

  if (loading && !profile.name) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        
        {isEditing ? (
          <div className="flex gap-2">
            <button 
              onClick={handleSave} 
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save"}
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {isError && <AlertCircle size={20} />}
          {message}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {getImageUrl() ? (
                  <img src={getImageUrl()!} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              
              {isEditing && (
                <>
                  <input 
                    id="photo" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  <label 
                    htmlFor="photo"
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
                  >
                    <Edit size={12} />
                  </label>
                </>
              )}
            </div>
            
            <h3 className="mt-3 font-semibold text-lg">{profile.name || "User"}</h3>
            <p className="text-sm text-blue-500">Premium Client</p>
            {selectedFile && <p className="text-xs text-gray-500 mt-1">New photo selected</p>}
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid md:grid-cols-2 gap-4">
            {fields.map(({ key, label, icon: Icon, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                
                {isEditing ? (
                  <input
                    type={type}
                    value={formData[key as keyof ProfileData]}
                    onChange={(e) => handleInputChange(key as keyof ProfileData, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                    <Icon size={16} className="text-gray-400" />
                    <span className="text-gray-700">
                      {profile[key as keyof ProfileData] || `No ${label.toLowerCase()}`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;