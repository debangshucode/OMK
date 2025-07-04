"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  Download, 
  Users, 
  Calendar,
  Camera,
  Video,
  FolderOpen,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

const AnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeChart, setActiveChart] = useState('views');

  const stats = [
    {
      title: 'Total Views',
      value: '45.2K',
      change: '+23%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Engagement Rate',
      value: '8.4%',
      change: '+12%',
      changeType: 'positive',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Downloads',
      value: '2.1K',
      change: '+18%',
      changeType: 'positive',
      icon: Download,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'New Clients',
      value: '156',
      change: '+7%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const contentStats = [
    { type: 'Photos', count: 2847, icon: Camera, color: 'text-red-600', bg: 'bg-red-50' },
    { type: 'Videos', count: 156, icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
    { type: 'Albums', count: 89, icon: FolderOpen, color: 'text-green-600', bg: 'bg-green-50' },
    { type: 'Reviews', count: 1234, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const deviceStats = [
    { device: 'Desktop', percentage: 45, icon: Monitor, color: 'bg-blue-500' },
    { device: 'Mobile', percentage: 38, icon: Smartphone, color: 'bg-green-500' },
    { device: 'Tablet', percentage: 17, icon: Tablet, color: 'bg-purple-500' }
  ];

  const topContent = [
    {
      title: 'Sarah & Michael Wedding',
      type: 'Album',
      views: 12500,
      engagement: '9.2%',
      thumbnail: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      title: 'Corporate Headshots Collection',
      type: 'Photos',
      views: 8900,
      engagement: '7.8%',
      thumbnail: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      title: 'Pre-Wedding Highlights',
      type: 'Video',
      views: 6700,
      engagement: '12.4%',
      thumbnail: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      title: 'Family Portrait Session',
      type: 'Album',
      views: 5400,
      engagement: '8.9%',
      thumbnail: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const recentActivity = [
    { action: 'New album created', item: 'Emma & David Wedding', time: '2 hours ago', type: 'create' },
    { action: 'Photo uploaded', item: 'Corporate Event 2024', time: '4 hours ago', type: 'upload' },
    { action: 'Review received', item: '5-star rating from Sarah J.', time: '6 hours ago', type: 'review' },
    { action: 'Video processed', item: 'Pre-wedding highlights', time: '8 hours ago', type: 'process' },
    { action: 'Client inquiry', item: 'Wedding photography request', time: '1 day ago', type: 'inquiry' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Track your performance and engagement metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
              </div>
              <div className={`flex items-center space-x-1 text-xs lg:text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" />
                ) : (
                  <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                )}
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

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            <div className="flex space-x-2 ">
              {['views', 'engagement', 'downloads'].map((chart) => (
                <button
                  key={chart}
                  onClick={() => setActiveChart(chart)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeChart === chart
                      ? 'bg-blue-100 text-blue-600 hover:cursor-pointer'
                      : 'text-gray-600 hover:bg-gray-100 hover:cursor-pointer'
                  }`}
                >
                  {chart.charAt(0).toUpperCase() + chart.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simulated Chart Area */}
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive chart visualization</p>
              <p className="text-sm text-gray-500">Showing {activeChart} data for {timeRange}</p>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <device.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{device.device}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${device.color} transition-all duration-500`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Performance and Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Content */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Content</h3>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{content.title}</h4>
                  <p className="text-sm text-gray-500">{content.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{content.views.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{content.engagement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'create' ? 'bg-green-100' :
                  activity.type === 'upload' ? 'bg-blue-100' :
                  activity.type === 'review' ? 'bg-amber-100' :
                  activity.type === 'process' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  <Activity className={`w-4 h-4 ${
                    activity.type === 'create' ? 'text-green-600' :
                    activity.type === 'upload' ? 'text-blue-600' :
                    activity.type === 'review' ? 'text-amber-600' :
                    activity.type === 'process' ? 'text-purple-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {contentStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">{stat.count.toLocaleString()}</h4>
              <p className="text-sm text-gray-600">{stat.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;