// hooks/useAlbums.ts
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAlbums = async () => {
    try {
      const res = await axios.get('/albums');
      console.log('📦 Albums fetched:', res.data.data); // 👈 Add this
      setAlbums(res.data.data || []);
    } catch (err) {
      console.error('❌ Album fetch error', err); // 👈 Important!
    } finally {
      setLoading(false);
    }
  };

  fetchAlbums();
}, []);


  return { albums, loading };
};
