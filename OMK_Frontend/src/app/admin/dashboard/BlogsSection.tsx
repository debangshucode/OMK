"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  Youtube,
  Tag,
  Clock,
  BookOpen,
  FileText,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Blog {
  _id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  readTime: string;
  youtubeUrl?: string;
  images: string[];
}

const BlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    featuredImageFile: null as File | null,
    featuredImageUrl: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published" | "scheduled",
    publishDate: "",
    youtubeUrl: "",
    images: [] as string[],
  });
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
          {
            withCredentials: true,
          }
        );
        console.log("Response data:", res.data);
        setBlogs(res.data);
        console.log("Fetched blogs:", res.data.blogs);
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        setError(err.response?.data?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  if (loading) return <p className="text-gray-600">Loading blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const categories = [
    "all",
    "Wedding Photography",
    "Corporate Photography",
    "Pre-Wedding",
    "Portrait",
    "Event Photography",
  ];
  const status = ["all", "published", "draft", "scheduled"];

  const toggleBlogSelection = (blogId: number) => {
    setSelectedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleCreateBlog = () => {
    setBlogForm({
      title: "",
      content: "",
      featuredImageFile: null,
      featuredImageUrl: "",
      category: "",
      tags: "",
      status: "draft",
      publishDate: "",
      youtubeUrl: "",
      images: [],
    });
    setEditingBlog(null);
    setShowCreateModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      featuredImageFile: null,
      featuredImageUrl: blog.image,
      category: blog.category,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      status: blog.status,
      publishDate: blog.publishDate,
      youtubeUrl: blog.youtubeUrl || "",
      images: Array.isArray(blog.images) ? blog.images : [],
    });
    setEditingBlog(blog);
    setShowCreateModal(true);
  };

  const handleSaveBlog = async () => {
  const formData = new FormData()
  formData.append("title", blogForm.title)
  formData.append("content", blogForm.content)
  formData.append("category", blogForm.category)
  formData.append("status", blogForm.status)
  formData.append("tags", blogForm.tags)

  if (blogForm.featuredImageFile) {
    formData.append("image", blogForm.featuredImageFile)
  }

  try {
    if (editingBlog) {
      // UPDATE blog
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${editingBlog._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      toast.success("Blog updated successfully")
    } else {
      // CREATE blog
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      toast.success("Blog created successfully")
    }

    setShowCreateModal(false)
    setEditingBlog(null)
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Blog save failed")
  }
}


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload
      const imageUrl = URL.createObjectURL(file);
      setBlogForm((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    }
  };

  const handleFeaturedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBlogForm((prev) => ({
        ...prev,
        featuredImage: imageUrl,
        featuredImageFile: file, // 👈 store actual file for FormData
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Eye className="w-4 h-4" />;
      case "draft":
        return <FileText className="w-4 h-4" />;
      case "scheduled":
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">
            Create, edit, and manage your blog content
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateBlog}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Create Blog Post</span>
        </motion.button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 cursor-pointer ${
              showFilters
                ? "bg-green-50 border-green-200 text-green-600"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {selectedBlogs.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedBlogs.length} selected</span>
              <button className="text-green-600 hover:text-green-700 cursor-pointer">
                Publish
              </button>
              <button className="text-gray-600 hover:text-gray-700 cursor-pointer">
                Draft
              </button>
              <button className="text-red-600 hover:text-red-700 cursor-pointer">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg cursor-pointer ${
              viewMode === "grid"
                ? "bg-green-100 text-green-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg cursor-pointer ${
              viewMode === "list"
                ? "bg-green-100 text-green-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  {status.map((status) => (
                    <option key={status} value={status}>
                      {status === "all"
                        ? "All Status"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <input
                  type="date"
                  className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Posts Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/9]">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog._id)}
                    onChange={() => toggleBlogSelection(blog._id)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                      blog.status
                    )}`}
                  >
                    {getStatusIcon(blog.status)}
                    <span>{blog.status}</span>
                  </span>
                </div>
                {blog.youtubeUrl && (
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-red-600 text-white p-1 rounded">
                      <Youtube className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {blog.category}
                  </span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditBlog(blog)}
                      className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <span className="text-xs text-gray-500">
                    by {blog.author}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create/Edit Blog Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                      placeholder="Enter blog title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={blogForm.category}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFeaturedImageUpload}
                      className="hidden text-gray-900"
                      id="featured-image"
                    />
                    <label
                      htmlFor="featured-image"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </label>
                    {blogForm.featuredImageUrl &&
                      !blogForm.featuredImageFile && (
                        <img
                          src={blogForm.featuredImageUrl}
                          alt="Featured"
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                      )}

                    {blogForm.featuredImageFile && (
                      <img
                        src={URL.createObjectURL(blogForm.featuredImageFile)}
                        alt="Featured"
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>

                  {/* Toolbar */}
                  <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <Bold className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <Italic className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <Underline className="w-4 h-4" />
                    </motion.button>
                    <div className="w-px h-6 bg-gray-300 text-gray-900"></div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <AlignRight className="w-4 h-4" />
                    </motion.button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden text-gray-900"
                      id="content-image"
                    />
                    <label
                      htmlFor="content-image"
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </label>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-200 rounded cursor-pointer text-gray-900"
                    >
                      <Link className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Content Textarea */}
                  <textarea
                    rows={12}
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="w-full border-x border-b border-gray-300 rounded-b-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-900"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* YouTube Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube Video URL (Optional)
                  </label>
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <input
                      type="url"
                      value={blogForm.youtubeUrl}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          youtubeUrl: e.target.value,
                        }))
                      }
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                {/* Additional Images */}
                {blogForm.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Images
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {blogForm.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() =>
                              setBlogForm((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index
                                ),
                              }))
                            }
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags and Settings */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={blogForm.tags}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                      placeholder="tag1, tag2, tag3..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={blogForm.status}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          status: e.target.value as
                            | "draft"
                            | "published"
                            | "scheduled",
                        }))
                      }
                      className="w-full border text-gray-900 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Publish Date */}
                {blogForm.status === "scheduled" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      value={blogForm.publishDate}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          publishDate: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>Auto-save enabled</span>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setBlogForm((prev) => ({ ...prev, status: "draft" }))
                    }
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg cursor-pointer"
                  >
                    Save Draft
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveBlog}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingBlog ? "Update" : "Publish"}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsSection;
