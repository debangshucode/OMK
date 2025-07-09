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
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PortfolioItem } from './types';

interface PortfolioModalProps {
  selectedItem: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ selectedItem, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  if (!selectedItem) return null;

  // For photos and videos, show minimal modal with just the media
  if (selectedItem.type === 'photo' || selectedItem.type === 'video') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Media Content */}
            {selectedItem.type === 'photo' ? (
              <div className="relative">
                <img 
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Photo Info Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                  <h3 className="font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-gray-300">{selectedItem.category}</p>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-300 cursor-pointer"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-300 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Video Player Placeholder */}
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10" />
                      ) : (
                        <Play className="w-10 h-10 ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="font-semibold">{selectedItem.title}</h3>
                          <p className="text-sm text-gray-300">{selectedItem.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{selectedItem.duration}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer"
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-2 w-full bg-white/20 rounded-full h-1">
                        <div className="bg-red-500 h-1 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-300 cursor-pointer"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-300 cursor-pointer"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // For albums, show the full detailed modal (existing code)
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
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                <span>View Full Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </motion.button>
            </div>
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      
    </AnimatePresence>
  );
};

export default PortfolioModal;