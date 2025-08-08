"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [clientId, setClientId] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCreateAlbum = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, clientId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Album created successfully!");
        onClose();
        onSuccess?.();

        setTitle("");
        setDescription("");
        setCategory("");
        setClientId("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl space-y-4"
          >
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent">
              Create Album
            </h2>

            {/* Inputs with red-yellow gradient text */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded bg-white bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded bg-white bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded bg-white bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Client ID"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded bg-white bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent placeholder-gray-400"
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlbum}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateAlbumModal;
