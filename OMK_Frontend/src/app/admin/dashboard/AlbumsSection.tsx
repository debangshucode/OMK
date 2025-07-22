import { useState } from 'react';
import axios from '@/utils/axios';
import { toast } from 'sonner';
import { useAlbums } from '@/hooks/useAlbums';
import { albumService } from '@/services/albumService';
import Link from 'next/link';
import {  PlusIcon } from 'lucide-react';

const AlbumsSection = () => {
  const { albums, loading } = useAlbums();
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [description, setDescription] = useState('');
  const [parentAlbumId, setParentAlbumId] = useState('');

  const handleCreateAlbum = async () => {
    try {
      const res = await axios.post('/albums', {
        title,
        category,
        description,
        parentAlbumId: parentAlbumId || null,
      });
      toast.success(res.data?.message || 'Album created');
      setTitle('');
      setDescription('');
      setParentAlbumId('');
      setModalOpen(false);
    } catch (err: any) {
      console.error('Create album error:', err);
      alert(err.response?.data?.message || 'Error creating album');
    }
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-stone-200 max-w-md w-full">
        <div className="p-8">
          <h2 className="text-2xl font-light text-stone-800 mb-8 tracking-wide">
            Create New Album
          </h2>
          <div className="space-y-6">
            <div>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Album title" 
                className="w-full border-b border-stone-300 pb-2 text-stone-700 placeholder-stone-400 bg-transparent focus:border-stone-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="w-full border-b border-stone-300 pb-2 text-stone-700 bg-transparent focus:border-stone-500 focus:outline-none transition-colors"
              >
                <option value="personal">Personal</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="portfolio">Portfolio</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            <div>
              <input 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Description (optional)" 
                className="w-full border-b border-stone-300 pb-2 text-stone-700 placeholder-stone-400 bg-transparent focus:border-stone-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input 
                value={parentAlbumId} 
                onChange={e => setParentAlbumId(e.target.value)} 
                placeholder="Parent album ID (optional)" 
                className="w-full border-b border-stone-300 pb-2 text-stone-700 placeholder-stone-400 bg-transparent focus:border-stone-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setModalOpen(false)}
                className="flex-1 border border-stone-300 text-stone-600 py-3 font-light tracking-wide hover:bg-stone-50 transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={handleCreateAlbum} 
                className="flex-1 bg-stone-800 text-white py-3 font-light tracking-wide hover:bg-stone-700 transition-colors"
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!loading && albums.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 p-8">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light text-stone-800 tracking-wide">Albums</h1>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-stone-800 text-white px-6 py-2 font-light tracking-wide hover:bg-stone-700 transition-colors"
            >
             <PlusIcon className='text-white'/> NEW ALBUM
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto text-center">
          <div className="bg-white border border-stone-200 p-12">
            <div className="text-6xl text-stone-300 mb-6">📷</div>
            <h3 className="text-xl font-light text-stone-600 mb-4 tracking-wide">No Albums</h3>
            <p className="text-stone-500 text-sm mb-6">Create your first album to get started</p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-stone-800 text-white px-8 py-2 font-light tracking-wide hover:bg-stone-700 transition-colors"
            >
              CREATE ALBUM
            </button>
          </div>
        </div>

        {modalOpen && <Modal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide">Albums</h1>
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-stone-800 text-white px-4 py-2 font-light tracking-wide hover:bg-stone-700 transition-colors flex items-center gap-2"
          >
          <PlusIcon className='text-white'/> NEW ALBUM
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {albums.map((album: any) => (
            <Link key={album._id} href={`/admin/dashboard/albums/${album._id}`}>
              <div className="group cursor-pointer">
                <div className="bg-white border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center border-b border-stone-200">
                    <div className="text-center">
                      <div className="text-2xl text-stone-400 mb-1">📷</div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">
                        {album.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-light text-sm text-stone-800 mb-1 tracking-wide truncate">
                      {album.title}
                    </h3>
                    {album.description && (
                      <p className="text-xs text-stone-600 mb-2 line-clamp-1">
                        {album.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <span>{new Date(album.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>0 photos</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {modalOpen && <Modal />}
    </div>
  );
};

export default AlbumsSection;