import { useEffect, useState } from 'react'
import axios from '@/utils/axios'

export const useAlbums = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/albums')
      console.log('📦 Albums fetched:', res.data.data)
      setAlbums(res.data.data || [])
    } catch (err) {
      console.error('❌ Album fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  return { albums, loading, refetch: fetchAlbums } // 👈 Add `refetch`
}
