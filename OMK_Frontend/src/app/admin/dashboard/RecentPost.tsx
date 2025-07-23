"use client";

import React, { useState } from "react";
import axios from "axios";

const RecentPost = () => {
  const [formData, setFormData] = useState({
    type: "photo",
    title: "",
    category: "",
    link: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submission = new FormData();
    submission.append("type", formData.type);
    submission.append("title", formData.title);
    submission.append("category", formData.category);
    submission.append("link", formData.link);
    if (imageFile) {
      submission.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/recentwork/create-recent",
        submission,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Recent work created:", response.data);
      setMessage("Recent work created successfully!");
      // Optional: Reset form
      setFormData({
        type: "photo",
        title: "",
        category: "",
        link: "",
      });
      setImageFile(null);
    } catch (error: any) {
      console.error("Error creating recent work:", error);
      setMessage(
        error?.response?.data?.error || "Failed to create recent work. Try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-black mb-6">
        Add Recent Work
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-black mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-black"
            required
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Image File</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-black bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Link (Optional)</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
        >
          Submit
        </button>

        {message && (
          <p className="text-sm mt-2 font-medium text-black">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RecentPost;
