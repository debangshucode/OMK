import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Video, 
  FolderOpen, 
  Star, 
  Download, 
  Eye,
  Heart,
  Calendar,
  User,
  Award,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface ClientDashboardProps {
  setActiveTab: (tab: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ setActiveTab }) => {
  const stats = [
    {
      title: 'Total Photos',
      value: '245',
      change: '+12 new',
      changeType: 'positive',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Videos',
      value: '8',
      change: '+2 new',
      changeType: 'positive',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Albums',
      value: '3',
      change: 'Complete',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Rating',
      value: '5.0',
      change: 'Excellent',
      changeType: 'positive',
      icon: Star,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Photos uploaded',
      item: 'Wedding ceremony photos (45 items)',
      time: '2 hours ago',
      type: 'upload',
      icon: Camera,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      action: 'Video processed',
      item: 'Wedding highlights video',
      time: '1 day ago',
      type: 'process',
      icon: Video,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      action: 'Album created',
      item: 'Reception moments album',
      time: '2 days ago',
      type: 'create',
      icon: FolderOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      action: 'Download completed',
      item: 'High-resolution photos',
      time: '3 days ago',
      type: 'download',
      icon: Download,
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  const quickActions = [
    {
      title: 'View Gallery',
      description: 'Browse all your photos and videos',
      icon: Eye,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => setActiveTab('gallery')
    },
    {
      title: 'Download All',
      description: 'Download your complete collection',
      icon: Download,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => setActiveTab('downloads')
    },
    {
      title: 'Face Search',
      description: 'Find photos using face recognition',
      icon: User,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => setActiveTab('face-search')
    },
    {
      title: 'Leave Review',
      description: 'Share your experience with us',
      icon: Star,
      color: 'bg-amber-600 hover:bg-amber-700',
      action: () => setActiveTab('reviews')
    }
  ];

  //fetching the user
  const [userData, setUserData] = useState<any>(null);
  const {user } = useAuth()

  useEffect(() => {
      const fetchUser = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/api/settings/get-user", {
      //   withCredentials: true,
      // });
      // const data = res.data;
      console.log(user);
      // setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  fetchUser();
}, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 lg:p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            {user ? (
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user.name}
            </h2>
          ) : (
            <p>Loading user info...</p>
          )}
            <p className="text-blue-100 mb-4 lg:mb-0">Your wedding memories are ready to view and download</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            {/* <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Wedding: Jan 15, 2024</span>
            </div> */}
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Premium Package</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
              </div>
              <div className={`flex items-center space-x-1 text-xs lg:text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-xs lg:text-sm text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg shadow-lg transition-all duration-200 text-left cursor-pointer`}
            >
              <action.icon className="w-6 h-6 mb-3" />
              <h4 className="font-semibold mb-1">{action.title}</h4>
              <p className="text-sm opacity-90">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;