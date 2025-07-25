"use client"

import React, { useState } from "react"
import axios from "axios"
import {toast,Toaster } from "sonner"

const RecentPost = () => {
  const [formData, setFormData] = useState({
    type: "photo",
    title: "",
    category: "",
    link: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const submission = new FormData()
    submission.append("type", formData.type)
    submission.append("title", formData.title)
    submission.append("category", formData.category)
    submission.append("link", formData.link)
    if (imageFile) submission.append("image", imageFile)

    setIsSubmitting(true)
    toast.loading("Uploading...")

    try {
      await axios.post(
        "http://localhost:4000/api/recentwork/create-recent",
        submission,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )

      toast.dismiss()
      toast.success("Recent work uploaded")

      setFormData({
        type: "photo",
        title: "",
        category: "",
        link: "",
      })
      setImageFile(null)
      setImagePreview(null)
    } catch (error: any) {
      toast.dismiss()
      toast.error(
        error?.response?.data?.error || "Upload failed, try again"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Toaster />
      <div className="w-full max-w-xl bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add Recent Work
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-white mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-red-400 outline-none"
              required
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-red-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Image</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-5 py-2 bg-white/10 text-white border border-white/30 rounded-md hover:bg-white/20 transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imageFile && (
                <span className="text-sm text-white truncate max-w-[200px]">
                  {imageFile.name}
                </span>
              )}
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg border border-white/20 shadow"
              />
            )}
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-red-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Link (Optional)</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-3 rounded-lg font-semibold transition ${
              isSubmitting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RecentPost
