const Blog = require("../models/blog.model");

// Create blog
exports.createBlog = async (req, res) => {
  const { title, content, category , status, tags } = req.body;
  const imageUrl = req.file?.path; // Cloudinary URL

  try {
    if (!title || !content || !imageUrl || !category || !status || !tags ) {
      return res.status(400).json({ message: "All fields including image are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      image: imageUrl,
      category,
      status

    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Blog creation failed", error: err.message });
  }
};


// Get all blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

// Get blog by slug (public)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

// Update blog (admin only)
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, image , category, status } = req.body;

  try {
    const updated = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags, image , category, status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error: error.message });
  }
};

// Delete blog (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};
