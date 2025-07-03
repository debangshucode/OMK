"use client";

import React from "react";

type AlbumItem = {
  type: "image" | "video";
  src: string;
};

interface AlbumBackgroundProps {
  items: AlbumItem[];
}

const AlbumBackground: React.FC<AlbumBackgroundProps> = ({ items }) => {
  const layout = [
    "col-span-1",          // Image
    "col-span-1",          // Image
    "col-span-1",          // Image
    "row-span-2 col-span-1", // Vertical video
    "col-span-1",
    "col-span-1",
  ];

  return (
    <div className="absolute inset-0 z-0 grid grid-cols-3 auto-rows-[150px] md:auto-rows-[180px] gap-2 p-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-xl ${layout[index % layout.length]}`}
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={`album-${index}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full aspect-[9/16]">
              <iframe
                src={`${item.src}?autoplay=1&mute=1&loop=1&playlist=${item.src.split("/").pop()}`}
                className="w-full h-full object-cover rounded-xl"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          )}
        </div>
      ))}
      {/* Overlay to dim */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
    </div>
  );
};

export default AlbumBackground;
