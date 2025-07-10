import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Video, 
  FolderOpen, 
  Play, 
  Eye, 
  Heart, 
  ArrowRight,
  MapPin,
  Calendar,
  Tag,
  Star
} from 'lucide-react';
import { PortfolioItem } from './types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  viewMode: 'grid' | 'list';
  onItemClick: (item: PortfolioItem) => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, viewMode, onItemClick }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'album': return FolderOpen;
      default: return Camera;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  if (viewMode === 'grid') {
    return (
      <motion.div
       key={items.length + viewMode} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        {items.map((item, index) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                  <TypeIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play Button for Videos */}
                {item.type === 'video' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </motion.div>
                )}

                {/* Duration for Videos */}
                {item.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
                    {item.duration}
                  </div>
                )}

                {/* Photo Count for Albums */}
                {item.photoCount && (
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>{item.photoCount}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs text-slate-400">+{item.tags.length - 2}</span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-4 lg:space-y-6"
    >
      {items.map((item, index) => {
        const TypeIcon = getTypeIcon(item.type);
        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ x: 10 }}
            className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-4 lg:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            {/* Image */}
            <div className="relative w-full sm:w-48 lg:w-64 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full">
                  <TypeIcon className="w-4 h-4" />
                </div>
              </div>
              {item.featured && (
                <div className="absolute top-2 left-2">
                  <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2 hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </span>
                </div>
              </div>

              {/* Meta and Tags */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </span>
                {item.duration && (
                  <span className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </span>
                )}
                {item.photoCount && (
                  <span className="flex items-center space-x-1">
                    <Camera className="w-4 h-4" />
                    <span>{item.photoCount} photos</span>
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-600"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PortfolioGrid;