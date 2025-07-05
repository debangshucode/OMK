import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Eye, 
  Heart, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Camera, 
  Tag, 
  Star 
} from 'lucide-react';
import { PortfolioItem } from './types';

interface PortfolioModalProps {
  selectedItem: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 lg:h-80">
            <img 
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-red-200">{selectedItem.category}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              {selectedItem.featured && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">Project Details</h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-slate-700">{selectedItem.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span className="text-slate-700">{selectedItem.date}</span>
                  </div>
                  {selectedItem.duration && (
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <span className="text-slate-700">{selectedItem.duration}</span>
                    </div>
                  )}
                  {selectedItem.photoCount && (
                    <div className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-red-600" />
                      <span className="text-slate-700">{selectedItem.photoCount} photos</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedItem.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-slate-800 mb-4">Engagement</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <Eye className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">{selectedItem.views}</div>
                    <div className="text-sm text-slate-600">Views</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">{selectedItem.likes}</div>
                    <div className="text-sm text-slate-600">Likes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>View Full Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </motion.button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;