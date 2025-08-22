const Blog = require("../models/blog.model");

// Create blog
exports.createBlog = async (req, res) => {
  const { title, content, category, status, tags, youTubeLink } = req.body;

  try {
    // Ensure at least one image is uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs

    if (!title || !content || !category || !status || !tags) {
      return res.status(400).json({ message: "All fields including images are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      image: imageUrls,
      category,
      status,
      youTubeLink
    });

    res.status(201).json(blog, {
      message: "Blog created successfully",
    }
    );
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
  let { title, content, tags, category, status, youTubeLink, keepExistingFeatured, keepExistingAdditional, imageType } = req.body;

  try {
    // Get existing blog to preserve images selectively
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingImages = existingBlog.image || [];
    const [existingFeatured = "", ...existingAdditional] = existingImages;
    
    console.log('Update blog request:');
    console.log('imageType:', imageType);
    console.log('keepExistingFeatured:', keepExistingFeatured);
    console.log('keepExistingAdditional:', keepExistingAdditional);
    console.log('existingImages:', existingImages);
    console.log('files uploaded:', req.files ? req.files.length : 0);
    
    let updatedImages = [];
    let finalFeaturedImage = "";
    let finalAdditionalImages = [];

    // Handle uploaded images based on type
    if (req.files && req.files.length > 0) {
      const uploadedImagePaths = req.files.map((file) => file.path);
      
      if (imageType === "featured") {
        // New featured image uploaded
        finalFeaturedImage = uploadedImagePaths[0]; // Take first uploaded image as featured
        // Keep existing additional images
        if (keepExistingAdditional === "true") {
          finalAdditionalImages = existingAdditional;
        }
      } else if (imageType === "additional") {
        // New additional images uploaded
        // Keep existing featured image
        if (keepExistingFeatured === "true" && existingFeatured) {
          finalFeaturedImage = existingFeatured;
        }
        // Handle additional images
        if (keepExistingAdditional === "true") {
          // Append new additional images to existing ones
          finalAdditionalImages = [...existingAdditional, ...uploadedImagePaths];
        } else {
          // Replace existing additional images with new ones
          finalAdditionalImages = uploadedImagePaths;
        }
      }
    } else {
      // No new images uploaded, preserve based on flags
      if (keepExistingFeatured === "true" && existingFeatured) {
        finalFeaturedImage = existingFeatured;
      }
      if (keepExistingAdditional === "true") {
        finalAdditionalImages = existingAdditional;
      }
    }

    // Build final image array
    if (finalFeaturedImage) {
      updatedImages = [finalFeaturedImage, ...finalAdditionalImages];
    } else {
      updatedImages = finalAdditionalImages;
    }

    console.log('Final image arrangement:');
    console.log('finalFeaturedImage:', finalFeaturedImage);
    console.log('finalAdditionalImages:', finalAdditionalImages);
    console.log('updatedImages:', updatedImages);

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags: tags ? tags.split(",") : [],
        image: updatedImages,
        category,
        status,
        youTubeLink
      },
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
