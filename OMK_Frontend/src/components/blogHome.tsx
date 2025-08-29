"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  TrendingUp
} from "lucide-react"
import axios from "axios"
import Head from "next/head"
interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  category: string
  tags: string[]
  createdAt: string
  readTime: string
  views: number
  likes: number
  comments: number
  featured: boolean
  hasVideo: boolean
}

const BlogHome: React.FC = () => {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
          withCredentials: true
        })
        const allBlogs = res.data.blogs || res.data
        const sorted = [...allBlogs].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setBlogs(sorted.slice(0, 3))
      } catch (err) {
        console.error("Failed to fetch blogs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 text-lg">Loading recent blogs...</p>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
      <Head>
        <title>Photography Blog | Tips, Stories & Inspiration | Kolkata</title>
        <meta
          name="description"
          content="Read the latest photography tips, behind-the-scenes stories, and creative inspiration from our professional photographers in Kolkata."
        />
        <meta
          name="keywords"
          content="photography blog Kolkata, wedding photography tips, professional photography stories, pre-wedding photoshoot ideas, cinematic photography"
        />
        <meta property="og:title" content="Photography Blog | Our Moments Kolkata" />
        <meta
          property="og:description"
          content="Explore our photography blog featuring tips, behind-the-scenes stories, and inspiration from professional wedding photographers in Kolkata."
        />
        <meta property="og:image" content="/images/weadingHome.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ourmomentskolkata.com/blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photography Blog | Our Moments Kolkata" />
        <meta
          name="twitter:description"
          content="Professional photography blog from Kolkata wedding photographers sharing tips, stories, and inspiration."
        />
        <meta name="twitter:image" content="/images/weadingHome.jpg" />
      </Head>
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-amber-500 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-amber-400 rounded-full"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent">
            Latest from Our
            <br />
            <span className="text-slate-800">Photography Blog</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover photography tips, behind-the-scenes stories, and creative
            inspiration from our team of professional photographers.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          variants={itemVariants}
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((post) => (
            <div
              key={post._id}
              className="bg-[#F8F1E9] rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                    src={Array.isArray(post.image) ? post.image[0] : post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-2">
                  {post.category} •{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-GB")}
                </div>

                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  {post.title}
                </h2>

                <p className="text-gray-700 mb-6 flex-grow">{post.excerpt}</p>

                <button
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  className="mt-auto bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={() => router.push("/blog")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer"
          >
            <span>View All Blog Posts</span>
            <TrendingUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default BlogHome
