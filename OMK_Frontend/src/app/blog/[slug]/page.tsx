"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Tag, Clock, ArrowRight, Youtube } from "lucide-react";
import Image from "next/image";
import { customItems } from "@/data/index";
import Link from "next/link";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);

  const imageItems = customItems.filter((item) => item.image);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`
      );
      setBlogPost(res.data);
    };

    const fetchAllBlogs = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
      setAllBlogs(res.data);
    };

    if (slug) {
      fetchBlog();
      fetchAllBlogs();
    }
  }, [slug]);

  const relatedPosts = allBlogs
    .filter((p) => p.slug !== slug && p.category === blogPost?.category)
    .slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  if (!blogPost) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-15">
      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Blog Heading */}
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                {blogPost.title}
              </h1>
            </motion.div>
            {/* Featured Image */}
            <motion.div variants={itemVariants} className="mb-12">
              <img
                    src={Array.isArray(blogPost.image) ? blogPost.image[0] : blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                  />
            </motion.div>
            {/* Author Info */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Author Segment
              </h3>
              <p className="text-md text-gray-800 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                eos expedita non ratione consequatur optio, nobis, est,
                consequuntur eius repellendus reiciendis aut debitis. Quos
                aperiam adipisci at nesciunt, sequi sint.
              </p>
            </motion.div>

            {/* YouTube Video */}
            {blogPost.hasVideo && (
              <motion.div variants={itemVariants} className="mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Watch the Video Tutorial
                    </h3>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Video content would be embedded here
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200 mb-12"
            >
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-3">
                  {blogPost.tags.map((tag: string, index: number) => (
                    <span
                      key={`${tag}-${index}`}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Author Bio */}

            {/* Images related to blog */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="columns-3 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {imageItems.map((item, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm"
                  >
                    <Image
                      src={item.image!}
                      alt={item.label!}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <motion.div
                    key={post._id}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer shadow-xl p-2 border  rounded-lg"
                  >
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
                      <img
                        src={
                          Array.isArray(post.image) ? post.image[0] : post.image
                        }
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {post.content.slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-red-500 font-medium flex items-center gap-1 hover:underline"
                        >
                          {" "}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
