"use client";
import React, {  useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FolderOpen, 
  Calendar, 
  MapPin, 
  Eye, 
  Download,
  AlertCircle,
  CheckCircle,
  Camera,
  Video,
  File,
  Album
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { albumService } from '@/services/albumService';
import Folder from '@/components/ui/folder';
import { useRouter } from 'next/navigation';

const AlbumSearch: React.FC = () => {
  const [albumId, setAlbumId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const {user} = useAuth();

  const [albums,setAlbums] = useState([]);
  const router = useRouter()
  
  useEffect(()=>{
    const fetchAlbums = async () => {
      try {
        console.log(user)
        const res = await albumService.getClientAlbums(user.id);
        console.log("album",res)
        setAlbums(res);
      } catch (err) {
        console.error('Error fetching client albums:', err);
      }
    };
    
     fetchAlbums();
  },[user])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Albums</h2>
        <p className="text-gray-600">Browse your assigned albums</p>
      </div>

      {/* Your Albums */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Albums</h3>
        
        {albums.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl p-12 inline-block">
              <div className="text-6xl mb-6">📁</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">No Albums Found</h3>
              <p className="text-slate-500 mb-6 max-w-md">You don't have any albums assigned yet. Check back later or contact your administrator.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {albums.map((album: any, index: number) => (
              <motion.div
                key={album._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                // whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/client/dashboard/albums/${album._id}`)}
                className="group cursor-pointer bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Folder Icon Section */}
                <div className="p-6 flex justify-center items-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <Album size={48} color="#5227FF" />
                  </div>
                </div>

                {/* Album Info Section */}
                <div className="px-4 pb-4 text-center">
                  <h3 className="font-semibold text-sm text-slate-800 mb-1 tracking-wide truncate group-hover:text-blue-600 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                    {album.category}
                  </p>
                  
                  {album.description && (
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2 min-h-[2rem]">
                      {album.description}
                    </p>
                  )}

                  {/* Media count */}
                  <div className="flex justify-center items-center space-x-3 text-xs text-slate-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Camera className="w-3 h-3" />
                      <span>{album.mediaFiles?.filter((f: any) => f.fileType === 'image').length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-3 h-3" />
                      <span>{album.mediaFiles?.filter((f: any) => f.fileType === 'video').length || 0}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>
                      {new Date(album.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AlbumSearch;