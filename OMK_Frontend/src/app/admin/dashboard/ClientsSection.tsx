"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star,
  Camera,
  Video,
  FolderOpen,
  X,
  UserPlus,
  Download,
  Upload,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import CreateModal from '@/components/CreateAlbumModal';

const ClientsSection: React.FC = () => {
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
   const [isModalOpen, setIsModalOpen] = useState(false);

  const clients = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2024-01-15',
      status: 'active',
      totalProjects: 3,
      totalSpent: 2850,
      lastProject: 'Wedding Photography',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Wedding Photography', 'Engagement Shoot'],
      notes: 'Preferred photographer for outdoor shoots. Very satisfied with previous work.',
      nextAppointment: '2024-02-20'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      joinDate: '2024-01-12',
      status: 'active',
      totalProjects: 2,
      totalSpent: 1200,
      lastProject: 'Pre-Wedding Shoot',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Pre-Wedding Shoot', 'Portrait Session'],
      notes: 'Loves natural lighting and candid shots. Planning wedding for next year.',
      nextAppointment: null
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.chen@techcorp.com',
      phone: '+1 (555) 345-6789',
      location: 'San Francisco, CA',
      joinDate: '2024-01-10',
      status: 'active',
      totalProjects: 5,
      totalSpent: 4500,
      lastProject: 'Corporate Photography',
      rating: 4,
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Corporate Photography', 'Event Photography'],
      notes: 'Regular corporate client. Prefers professional headshots and event coverage.',
      nextAppointment: '2024-02-15'
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      email: 'lisa.wilson@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      joinDate: '2024-01-08',
      status: 'inactive',
      totalProjects: 1,
      totalSpent: 800,
      lastProject: 'Family Photography',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Family Photography'],
      notes: 'Family of 4. Interested in annual family portraits.',
      nextAppointment: null
    },
    {
      id: 5,
      name: 'Maria Gonzalez',
      email: 'maria.gonzalez@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Miami, FL',
      joinDate: '2024-01-05',
      status: 'active',
      totalProjects: 2,
      totalSpent: 1500,
      lastProject: 'Event Photography',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Event Photography', 'Portrait Session'],
      notes: 'Event planner. Regular client for various celebrations.',
      nextAppointment: '2024-02-25'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 678-9012',
      location: 'Seattle, WA',
      joinDate: '2024-01-03',
      status: 'pending',
      totalProjects: 0,
      totalSpent: 0,
      lastProject: null,
      rating: 0,
      avatar: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      services: ['Portrait Session'],
      notes: 'New inquiry for professional headshots. Waiting for confirmation.',
      nextAppointment: '2024-02-10'
    }
  ];

  const statuses = ['all', 'active', 'inactive', 'pending'];
  const services = ['all', 'Wedding Photography', 'Pre-Wedding Shoot', 'Corporate Photography', 'Family Photography', 'Event Photography', 'Portrait Session'];

  const filteredClients = clients.filter(client => {
    const statusMatch = filterStatus === 'all' || client.status === filterStatus;
    const serviceMatch = filterService === 'all' || client.services.includes(filterService);
    return statusMatch && serviceMatch;
  });

  const toggleClientSelection = (clientId: number) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <Clock className="w-4 h-4 text-gray-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const clientStats = [
    { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Clients', value: clients.filter(c => c.status === 'active').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Inquiries', value: clients.filter(c => c.status === 'pending').length, icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Total Revenue', value: `$${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`, icon: Heart, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-gray-600">Manage your client relationships and projects</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Client</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            <span>Import</span>
          </motion.button>
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {clientStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-xs lg:text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              showFilters 
                ? 'bg-green-50 border-green-200 text-green-600' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedClients.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedClients.length} selected</span>
              <button className="text-blue-600 hover:text-blue-700">Email</button>
              <button className="text-green-600 hover:text-green-700">Export</button>
              <button className="text-red-600 hover:text-red-700">Delete</button>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-green-100 text-green-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-green-100 text-green-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service === 'all' ? 'All Services' : service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clients Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleClientSelection(client.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(client.status)}`}>
                    {getStatusIcon(client.status)}
                    <span>{client.status}</span>
                  </span>
                </div>

                {/* Client Info */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{client.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{client.location}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{client.totalProjects}</p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">${client.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Total Spent</p>
                  </div>
                </div>

                {/* Rating */}
                {client.rating > 0 && (
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < client.rating 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.button>
                  </div>
                  {client.nextAppointment && (
                    <div className="text-xs text-green-600 font-medium">
                      Next: {client.nextAppointment}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => toggleClientSelection(client.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />

                {/* Avatar */}
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{client.location}</p>
                    <p className="text-xs text-gray-500">{client.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.totalProjects} projects</p>
                    <p className="text-xs text-gray-500">${client.totalSpent.toLocaleString()} spent</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{client.lastProject || 'No projects'}</p>
                    <p className="text-xs text-gray-500">Last project</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                    <div className="flex space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsSection;