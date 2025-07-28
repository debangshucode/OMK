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

  const handleUpload = async () => {
    if (!files.length || !albumId) return;
    setUploading(true);
    try {
      await albumService.uploadFiles(albumId as string, files);
      toast.success('Files uploaded successfully!');
      setFiles([]);
      setUploadModalOpen(false);
      // Refresh album
      const refreshed = await albumService.getAlbumById(albumId as string);
      setAlbum(refreshed.data);
    } catch (err: any) {
      console.error('Upload failed:', err);
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
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

  const handleDeleteFile = async (filename: string) => {
    const confirm = window.confirm('Are you sure you want to delete this file?');
    if (!confirm) return;

    setDeleting(filename);
    try {
      await albumService.deleteFile(albumId as string, filename);
      toast.success('File deleted successfully');
      // Refresh album
      const refreshed = await albumService.getAlbumById(albumId as string);
      setAlbum(refreshed.data);
      // Remove from selected files if it was selected
      setSelectedFiles(prev => prev.filter(f => f !== filename));
    } catch (err: any) {
      console.error('Delete failed:', err);
      toast.error(err.message || 'Failed to delete file');
    } finally {
      setDeleting(null);
    }
  };

  const handleBatchDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${selectedFiles.length} files? This action cannot be undone.`);
    if (!confirm) return;

    setDeleting('batch');
    try {
      // Delete files one by one
      for (const filename of selectedFiles) {
        await albumService.deleteFile(albumId as string, filename);
      }
      toast.success(`${selectedFiles.length} files deleted successfully`);
      // Refresh album
      const refreshed = await albumService.getAlbumById(albumId as string);
      setAlbum(refreshed.data);
      setSelectedFiles([]);
      setSelectMode(false);
    } catch (err: any) {
      console.error('Batch delete failed:', err);
      toast.error(err.message || 'Failed to delete files');
    } finally {
      setDeleting(null);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this album? This action cannot be undone.');
    if (!confirm) return;

    try {
      await albumService.deleteAlbum(albumId as string);
      toast.success('Album deleted successfully');
      router.push('/admin/dashboard?tab=albums');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to delete album');
    }
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

  const handleAssign = async () => {
    if (!selectedUserId) return toast.error('Please select a user first');
    try {
      if (!albumId) return toast.error('Album ID is missing');
      const res = await albumService.assignAlbumToUser(albumId as string, selectedUserId);
      toast.success(res.data?.message || 'Album assigned successfully');
      setAssignModalOpen(false);
      setSelectedUserId('');
      // Refresh album to show updated assignment
      const refreshed = await albumService.getAlbumById(albumId as string);
      setAlbum(refreshed.data);
    } catch (err: any) {
      toast.error(err.message || 'Assignment failed');
    }
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-blue-200 max-w-lg w-full">
        <div className="p-8">
          <h2 className="text-2xl font-light text-blue-800 mb-8 tracking-wide">
            Upload Files
          </h2>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-blue-300 p-8 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,video/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl text-blue-400 mb-4">📁</div>
                <p className="text-blue-600 mb-2">Click to select files</p>
                <p className="text-xs text-blue-500">Or drag and drop your images and videos here</p>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="text-sm font-medium text-blue-700 mb-3">Selected Files:</h3>
                <ul className="space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="text-xs text-blue-600 flex justify-between">
                      <span className="truncate">{file.name}</span>
                      <span className="text-blue-400">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setUploadModalOpen(false);
                  setFiles([]);
                }}
                className="flex-1 border border-blue-300 text-blue-600 py-3 font-light tracking-wide hover:bg-blue-50 transition-colors"
                disabled={uploading}
              >
                CANCEL
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !files.length}
                className="flex-1 bg-blue-800 text-white py-3 font-light tracking-wide hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {uploading ? 'UPLOADING...' : 'UPLOAD FILES'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AssignModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-blue-200 max-w-md w-full">
        <div className="p-8">
          <h2 className="text-2xl font-light text-blue-800 mb-8 tracking-wide">
            Assign Album
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-blue-600 mb-3">Select User:</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border-b border-blue-300 pb-2 text-blue-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">Choose a user...</option>
                {users.map((user: any) => (
                  <option key={user._id} value={user._id} className="text-blue-800">
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setAssignModalOpen(false);
                  setSelectedUserId('');
                }}
                className="flex-1 border border-blue-300 text-blue-600 py-3 font-light tracking-wide hover:bg-blue-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedUserId}
                className="flex-1 bg-blue-800 text-white py-3 font-light tracking-wide hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                ASSIGN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-blue-400 mb-4">⏳</div>
          <p className="text-blue-600 font-light tracking-wide">Loading album...</p>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-red-400 mb-4">❌</div>
          <p className="text-red-600 font-light tracking-wide">Album not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-200 to-blue-400">
      {/* Header Section */}
      <div className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto p-8">
          {/* Breadcrumb */}
          {album.parentAlbumId && (
            <div className="mb-6">
              <Link 
                href={`/admin/dashboard/albums/${album.parentAlbumId}`} 
                className="text-sm text-blue-500 hover:text-blue-700 transition-colors flex items-center"
              >
                ← Back to parent album
              </Link>
            </div>
          )}

          {/* Album Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-semibold text-blue-800 tracking-wide">{album.title}</h1>
                <span className="px-3 py-1 bg-stone-500 text-white text-xs uppercase tracking-wider rounded-full">
                  {album.category}
                </span>
              </div>
              {album.description && (
                <p className="text-blue-600 text-lg font-light mb-4">{album.description}</p>
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

          {/* Assignment Status */}
          <div className="bg-blue-50 border border-stone-800 p-6 mb-6">
            <h3 className="text-md font-semibold text-green-600 mb-3 uppercase tracking-wider">Assignment Status</h3>
            {album.assignedTo ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-800 font-semibold">{album.assignedTo.name}</p>
                  <p className="text-stone-600 text-sm">{album.assignedTo.email}</p>
                </div>
                <button
                  onClick={() => setAssignModalOpen(true)}
                  className="bg-blue-800 text-white rounded-3xl px-4 py-2 text-sm font-light tracking-wide hover:bg-blue-700 transition-colors"
                >
                  REASSIGN
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-blue-500">Not assigned to any user yet</p>
                <button
                  onClick={() => setAssignModalOpen(true)}
                  className="bg-blue-800 rounded-3xl text-white px-4 py-2 text-sm font-light tracking-wide hover:bg-blue-700 transition-colors"
                >
                  ASSIGN
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-blue-800 rounded-3xl text-white px-6 py-3 font-light tracking-wide hover:bg-blue-700 transition-colors"
            >
              UPLOAD FILES
            </button>
            <button
              onClick={handleDelete}
              className=" bg-red-700 rounded-3xl border border-red-300 text-white px-6 py-3 font-light tracking-wide hover:bg-red-500 transition-colors"
            >
              DELETE ALBUM
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Sub Albums */}
        {childAlbums.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-blue-800 mb-6 tracking-wide">Sub Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {childAlbums.map((childAlbum: any) => (
                <Link key={childAlbum._id} href={`/admin/dashboard/albums/${childAlbum._id}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-white border border-blue-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-[4/3] bg-blue-100 flex items-center justify-center border-b border-blue-200">
                        <div className="text-center">
                          <div className="text-2xl text-blue-400 mb-1">📁</div>
                          <p className="text-xs text-blue-500 uppercase tracking-wider">
                            {childAlbum.category}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-light text-sm text-blue-800 mb-1 tracking-wide truncate">
                          {childAlbum.title}
                        </h3>
                        {childAlbum.description && (
                          <p className="text-xs text-blue-600 mb-2 line-clamp-1">
                            {childAlbum.description}
                          </p>
                        )}
                        <div className="text-xs text-blue-500">
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
            <h2 className="text-2xl font-light text-blue-800 tracking-wide">
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
                      className="text-sm rounded-3xl text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {selectedFiles.length === album.mediaFiles?.length ? 'Deselect All' : 'Select All'}
                    </button>
                    
                    {selectedFiles.length > 0 && (
                      <>
                        <span className="text-sm text-blue-500">
                          {selectedFiles.length} selected
                        </span>
                        <button
                          onClick={handleBatchDownload}
                          className="bg-blue-600 rounded-3xl text-white px-4 py-2 text-sm font-light tracking-wide hover:bg-blue-700 transition-colors"
                        >
                          DOWNLOAD ({selectedFiles.length})
                        </button>
                        <button
                          onClick={handleBatchDelete}
                          disabled={deleting === 'batch'}
                          className="bg-red-600 rounded-3xl text-white px-4 py-2 text-sm font-light tracking-wide hover:bg-red-700 transition-colors disabled:bg-red-400"
                        >
                          {deleting === 'batch' ? 'DELETING...' : `DELETE (${selectedFiles.length})`}
                        </button>
                      </>
                    )}
                  </>
                )}
                
                <button
                  onClick={toggleSelectMode}
                  className={`px-4 py-2 text-sm font-light tracking-wide transition-colors rounded-3xl ${
                    selectMode 
                      ? 'bg-blue-200 text-blue-700 hover:bg-blue-300' 
                      : 'bg-blue-800 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectMode ? 'CANCEL' : 'SELECT'}
                </button>
              </div>
            )}
          </div>
          
          {!album.mediaFiles || album.mediaFiles.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white border border-blue-200 p-12 inline-block">
                <div className="text-6xl text-blue-300 mb-6">📷</div>
                <h3 className="text-xl font-light text-blue-600 mb-4 tracking-wide">No Media Files</h3>
                <p className="text-blue-500 text-sm mb-6">Upload your first images or videos to get started</p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-blue-800 rounded-3xl text-white px-8 py-3 font-light tracking-wide hover:bg-blue-700 transition-colors"
                >
                  UPLOAD FILES
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {album.mediaFiles.map((file: any, i: number) => (
                <div key={i} className="group">
                  <div className="bg-gradient-to-b from-blue-500 to-stone-800 border-5 border-stone-800 rounded-tr-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                      <p className="text-xs text-white font-semibold truncate mb-2 font-light">
                        {file.originalName}
                      </p>
                      <a
                        href={`http://localhost:4000${file.filePath}`}
                        download
                        className="text-white font-semibold text-xs uppercase tracking-wider hover:text-blue-700 transition-colors"
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
      {uploadModalOpen && <UploadModal />}
      {assignModalOpen && <AssignModal />}
    </div>
  );
}