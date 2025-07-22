import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, FolderOpen, Star, TrendingUp, Eye, Heart, Users } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Photos',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Videos',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Albums',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Reviews',
      value: '1,234',
      change: '+15%',
      changeType: 'positive',
      icon: Star,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    // {
    //   title: 'Monthly Views',
    //   value: '45.2K',
    //   change: '+23%',
    //   changeType: 'positive',
    //   icon: Eye,
    //   color: 'from-red-500 to-red-600',
    //   bgColor: 'bg-red-50',
    //   textColor: 'text-red-600'
    // },
    // {
    //   title: 'Likes',
    //   value: '12.8K',
    //   change: '+18%',
    //   changeType: 'positive',
    //   icon: Heart,
    //   color: 'from-pink-500 to-pink-600',
    //   bgColor: 'bg-pink-50',
    //   textColor: 'text-pink-600'
    // },
    {
      title: 'Active Clients',
      value: '567',
      change: '+7%',
      changeType: 'positive',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    // {
    //   title: 'Growth Rate',
    //   value: '24.5%',
    //   change: '+3.2%',
    //   changeType: 'positive',
    //   icon: TrendingUp,
    //   color: 'from-emerald-500 to-emerald-600',
    //   bgColor: 'bg-emerald-50',
    //   textColor: 'text-emerald-600'
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {/* <TrendingUp className="w-4 h-4" />
              <span>{stat.change}</span> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCards;