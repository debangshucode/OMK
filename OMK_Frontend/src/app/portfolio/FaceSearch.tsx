"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Scan,
  X,
  Eye,
  Download,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const FaceSearch: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [albumId, setAlbumId] = useState("");

  const mockResults = [
    {
      id: 1,
      image: "/images/weadingHome1.jpg",
      confidence: 95,
      event: "Wedding Ceremony",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
    {
      id: 2,
      image: "/images/weadingHome2.jpg",
      confidence: 89,
      event: "Reception Dance",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
    {
      id: 3,
      image: "/images/weadingHome3.jpg",
      confidence: 92,
      event: "Couple Portraits",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
    {
      id: 4,
      image: "/images/weadingHome4.jpg",
      confidence: 87,
      event: "Group Photos",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
    {
      id: 5,
      image: "/images/weadingHome5.jpg",
      confidence: 94,
      event: "First Dance",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
    {
      id: 6,
      image: "/images/weadingHome6.jpg",
      confidence: 88,
      event: "Cake Cutting",
      date: "2024-01-15",
      album: "WED-2024-001",
    },
  ];

  const handleImageUpload = (file: File) => {
    setUploadedFile(file); // ✅ keep original File

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

const handleSearch = async () => {
  if (!uploadedImage) return;

  setIsSearching(true);
  setSearchResults([]);

  try {
    const blob = await fetch(uploadedImage).then((r) => r.blob());
    const file = new File([blob], "uploaded.jpg", { type: blob.type });

    const formData = new FormData();
    formData.append("image", file);

    if (albumId.trim() !== "") {
      formData.append("albumId", albumId); // send albumId to backend
    }

    const res = await fetch("http://localhost:4000/api/match/find", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const matchedFiles = data.images || [];

    const baseUrl = "http://localhost:4000/uploads"; 

    const formattedResults = matchedFiles.map((filename : string, index : number) => ({
      id: index + 1,
      image: `${baseUrl}/${filename}`, // ✅ Full image URL
      confidence: Math.floor(85 + Math.random() * 10),
      event: "Unknown",
      date: new Date().toISOString().split("T")[0],
      album: albumId || "Auto-match",
    }));

    setSearchResults(formattedResults);
  } catch (err) {
    console.error("Face search failed:", err);
    alert("Face match failed. See console for details.");
  } finally {
    setIsSearching(false);
  }
};


  const clearUpload = () => {
    setUploadedImage(null);
    setSearchResults([]);
  };

  return (
    <div className="space-y-6 my-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Face Recognition Search
        </h2>
        <p className="text-gray-600">
          Upload a photo to find similar faces in your gallery
        </p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-col mb-6">
          <label
            htmlFor="album-id"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Album ID 
          </label>
          <input
            id="album-id"
            type="text"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            placeholder="Enter album unique ID"
            className="w-full px-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="face-upload"
            />
            <label htmlFor="face-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload a Photo
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
              >
                Choose File
              </motion.div>
            </label>
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: JPG, PNG, GIF (Max 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Uploaded Image
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearUpload}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>

              <div className="lg:w-2/3 flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-3 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Image uploaded successfully
                  </span>
                </div>

                <p className="text-gray-600">
                  Our AI will analyze the faces in this image and find similar
                  faces in your gallery.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 cursor-pointer"
                >
                  {isSearching ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5" />
                      <span>Start Face Search</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Found {searchResults.length} matching photos
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-square relative">
                  <img
                    src={result.image}
                    alt="Search result"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </motion.button>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        <a
                          href={result.image} // Ensure result.image is the correct image URL
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </a>
                      </motion.div>
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {result.confidence}%
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                    {result.event}
                  </h4>
                  <p className="text-xs text-gray-500 mb-1">{result.date}</p>
                  <p className="text-xs text-blue-600 font-medium">
                    {result.album}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download All Matches</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* No results message */}
      {!isSearching && uploadedImage && searchResults.length === 0 && (
        <div className="text-center text-gray-500 border border-gray-200 rounded-xl p-6 bg-white shadow">
          <p>No matching faces found. Try another photo.</p>
        </div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Tips for better results:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use clear, well-lit photos with visible faces</li>
              <li>• Front-facing photos work best</li>
              <li>• Avoid sunglasses or face coverings</li>
              <li>• Higher resolution images provide better accuracy</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FaceSearch;
