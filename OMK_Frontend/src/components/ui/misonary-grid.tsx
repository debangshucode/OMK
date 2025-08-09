import React from 'react'
import Image from 'next/image'
import { photos } from '../../data/index'

const MasonryGrid: React.FC = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="break-inside-avoid cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MasonryGrid
