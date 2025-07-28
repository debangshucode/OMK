'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { albumService } from '@/services/albumService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/userService';
import Link from 'next/link';

export default function AlbumDetailPage() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [childAlbums, setChildAlbums] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (albumId) {
      albumService.getAlbums({ parentAlbumId: albumId }).then(setChildAlbums);
    }
  }, [albumId]);

  useEffect(() => {
    if (!albumId) return;
    const fetchAlbum = async () => {
      try {
        const data = await albumService.getAlbumById(albumId as string);
        setAlbum(data.data);
      } catch (error) {
        console.error('Error loading album:', error);
        toast.error('Failed to load album');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [albumId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
  };



  const handleFileSelect = (filename: string) => {
    if (!selectMode) return;
    
    setSelectedFiles(prev => 
      prev.includes(filename) 
        ? prev.filter(f => f !== filename)
        : [...prev, filename]
    );
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedFiles([]);
  };

  const selectAllFiles = () => {
    if (selectedFiles.length === album.mediaFiles?.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(album.mediaFiles?.map((file: any) => file.filename) || []);
    }
  };

  const handleBatchDownload = async () => {
    if (selectedFiles.length === 0) return;
    
    toast.success(`Starting download of ${selectedFiles.length} files...`);
    
    // Download files one by one with a small delay to prevent overwhelming the server
    for (let i = 0; i < selectedFiles.length; i++) {
      const filename = selectedFiles[i];
      
      try {
        const link = document.createElement('a');
        link.href = `http://localhost:4000/api/albums/${albumId}/download/${filename}`;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Add delay between downloads to prevent server overload
        if (i < selectedFiles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to download ${filename}:`, error);
        toast.error(`Failed to download ${filename}`);
      }
    }
    
    toast.success('All downloads initiated!');
  };




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAllUsers();
        setUsers(res.users || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-stone-400 mb-4">⏳</div>
          <p className="text-stone-600 font-light tracking-wide">Loading album...</p>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-red-400 mb-4">❌</div>
          <p className="text-red-600 font-light tracking-wide">Album not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto p-8">
          {/* Breadcrumb */}
          {album.parentAlbumId && (
            <div className="mb-6">
              <Link 
                href={`/admin/dashboard/albums/${album.parentAlbumId}`} 
                className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center"
              >
                ← Back to parent album
              </Link>
            </div>
          )}

          {/* Album Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-light text-stone-800 tracking-wide">{album.title}</h1>
                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs uppercase tracking-wider rounded-full">
                  {album.category}
                </span>
              </div>
              {album.description && (
                <p className="text-stone-600 text-lg font-light mb-4">{album.description}</p>
              )}
              <p className="text-sm text-stone-500">
                Created {new Date(album.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

        

          {/* Action Buttons */}
          
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Sub Albums */}
        {childAlbums.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-stone-800 mb-6 tracking-wide">Sub Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {childAlbums.map((childAlbum: any) => (
                <Link key={childAlbum._id} href={`/admin/dashboard/albums/${childAlbum._id}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-white border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center border-b border-stone-200">
                        <div className="text-center">
                          <div className="text-2xl text-stone-400 mb-1">📁</div>
                          <p className="text-xs text-stone-500 uppercase tracking-wider">
                            {childAlbum.category}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-light text-sm text-stone-800 mb-1 tracking-wide truncate">
                          {childAlbum.title}
                        </h3>
                        {childAlbum.description && (
                          <p className="text-xs text-stone-600 mb-2 line-clamp-1">
                            {childAlbum.description}
                          </p>
                        )}
                        <div className="text-xs text-stone-500">
                          {new Date(childAlbum.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Media Files */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-stone-800 tracking-wide">
              Media Files 
              <span className="text-lg text-stone-500 ml-3">
                ({album.mediaFiles?.length || 0} files)
              </span>
            </h2>
            
            {album.mediaFiles?.length > 0 && (
              <div className="flex items-center gap-3">
                {selectMode && (
                  <>
                    <button
                      onClick={selectAllFiles}
                      className="text-sm text-stone-600 hover:text-stone-800 transition-colors"
                    >
                      {selectedFiles.length === album.mediaFiles?.length ? 'Deselect All' : 'Select All'}
                    </button>
                    
                    {selectedFiles.length > 0 && (
                      <>
                        <span className="text-sm text-stone-500">
                          {selectedFiles.length} selected
                        </span>
                        <button
                          onClick={handleBatchDownload}
                          className="bg-blue-600 text-white px-4 py-2 text-sm font-light tracking-wide hover:bg-blue-700 transition-colors"
                        >
                          DOWNLOAD ({selectedFiles.length})
                        </button>
                        
                      </>
                    )}
                  </>
                )}
                
                <button
                  onClick={toggleSelectMode}
                  className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
                    selectMode 
                      ? 'bg-stone-200 text-stone-700 hover:bg-stone-300' 
                      : 'bg-stone-800 text-white hover:bg-stone-700'
                  }`}
                >
                  {selectMode ? 'CANCEL' : 'SELECT'}
                </button>
              </div>
            )}
          </div>
          
          {!album.mediaFiles || album.mediaFiles.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white border border-stone-200 p-12 inline-block">
                <div className="text-6xl text-stone-300 mb-6">📷</div>
                <h3 className="text-xl font-light text-stone-600 mb-4 tracking-wide">No Media Files</h3>
                <p className="text-stone-500 text-sm mb-6">Upload your first images or videos to get started</p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-stone-800 text-white px-8 py-3 font-light tracking-wide hover:bg-stone-700 transition-colors"
                >
                  UPLOAD FILES
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {album.mediaFiles.map((file: any, i: number) => (
                <div key={i} className="group">
                  <div className="bg-white border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-square overflow-hidden">
                      {file.fileType === 'image' ? (
                        <img
                          src={`http://localhost:4000${file.filePath}`}
                          alt={file.originalName || 'image'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <video
                          src={`http://localhost:4000${file.filePath}`}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-stone-700 truncate mb-2 font-light">
                        {file.originalName}
                      </p>
                      <a
                        href={`http://localhost:4000${file.filePath}`}
                        download
                        className="text-stone-500 text-xs uppercase tracking-wider hover:text-stone-700 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      
    </div>
  );
}