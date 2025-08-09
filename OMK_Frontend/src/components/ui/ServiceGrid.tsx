"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  Camera,
  Video,
  Edit3,
  Users,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

export function BentoGridThirdDemo() {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-600 bg-clip-text text-transparent  mb-4">
            Services & Stories
          </h1>
          <p className="text-lg text-slate-600  max-w-2xl mx-auto">
            Showcasing our expertise and the experiences that speak for themselves.
          </p>
        </div>
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

const WeddingPortfolioPreview = () => {
  const variants = {
    initial: { y: 0 },
    animate: {
      y: -10,
      transition: { duration: 0.3, yoyo: Infinity }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-rose-50 to-pink-50  rounded-lg overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg')] bg-cover bg-center opacity-20"></div>
      <motion.div
        variants={variants}
        className="flex flex-col justify-center items-center w-full h-full relative z-10"
      >
        <Camera className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-600 mb-2">Wedding Collection</h3>
        <p className="text-sm text-rose-600  text-center px-4">
          Elegant moments captured forever
        </p>
      </motion.div>
    </motion.div>
  );
};

const VideoEditingShowcase = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.8 }
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2, repeat: Infinity }
    },
  };

  const progressBars = [
    { label: "Color Grading", progress: 95 },
    { label: "Audio Sync", progress: 88 },
    { label: "Transitions", progress: 92 },
    { label: "Effects", progress: 85 },
    { label: "Final Render", progress: 98 }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4"
    >
      <div className="flex flex-col space-y-3 w-full">
        
        {progressBars.map((bar, i) => (
          <div key={i} className="">
            <div className="flex justify-between text-xs text-blue-600 ">
              <span>{bar.label}</span>
              <span>{bar.progress}%</span>
            </div>
            <div className="w-full bg-blue-100  rounded-full h-2">
              <motion.div
                variants={variants}
                style={{ width: `${bar.progress}%` }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const CreativePortfolio = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2 relative overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="absolute h-full inset-0 bg-black/20"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <Edit3 className="w-10 h-10 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Creative Vision</h3>
          <p className="text-sm opacity-90">Bringing stories to life</p>
        </div>
      </div>
    </motion.div>
  );
};

const ClientFeedback = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex-row space-x-2 p-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4  border border-green-200  flex flex-col items-center justify-center"
      >
        <img
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
          alt="client"
          height="40"
          width="40"
          className="rounded-full h-10 w-10 object-cover"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-600  mt-2">
          "Absolutely stunning work!"
        </p>
        <p className="border border-green-500 bg-green-100  text-green-600 text-xs rounded-full px-2 py-0.5 mt-2">
          ⭐⭐⭐⭐⭐
        </p>
      </motion.div>
      
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4  border border-blue-200  flex flex-col items-center justify-center">
        <img
          src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
          alt="photographer"
          height="40"
          width="40"
          className="rounded-full h-10 w-10 object-cover"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-600  mt-2">
          "Thank you! It was our pleasure"
        </p>
        <p className="border border-blue-500 bg-blue-100  text-blue-600 text-xs rounded-full px-2 py-0.5 mt-2">
          Studio
        </p>
      </motion.div>
      
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4  border border-purple-200  flex flex-col items-center justify-center"
      >
        <img
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
          alt="client"
          height="40"
          width="40"
          className="rounded-full h-10 w-10 object-cover"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-600  mt-2">
          "Best investment we made!"
        </p>
        <p className="border border-purple-500 bg-purple-100  text-purple-600 text-xs rounded-full px-2 py-0.5 mt-2">
          Verified
        </p>
      </motion.div>
    </motion.div>
  );
};

const ClientConversation = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 2,
      transition: { duration: 0.2 }
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -2,
      transition: { duration: 0.2 }
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex-col space-y-3 p-3"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-amber-200  p-3 items-start space-x-3 bg-white "
      >
        <img
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=60"
          alt="client"
          height="32"
          width="32"
          className="rounded-full h-8 w-8 object-cover"
        />
        <div className="flex-1">
          <p className="text-xs text-neutral-600 leading-relaxed">
            "Hi! We're looking for a photographer for our engagement shoot. When are you available?"
          </p>
          <span className="text-xs text-amber-600  font-medium">Sarah M.</span>
        </div>
      </motion.div>
      
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-2xl border border-green-200  p-3 items-start space-x-3 w-4/5 ml-auto bg-white"
      >
        <div className="flex-1 text-right">
          <p className="text-xs text-neutral-600  leading-relaxed">
            "Hello Sarah! I'd love to help capture your special moments."
          </p>
          <span className="text-xs text-green-600  font-medium">OMK</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shrink-0 flex items-center justify-center">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Wedding Photography",
    description: (
      <span className="text-sm">
        Capture your special day with timeless elegance and artistic vision.
      </span>
    ),
    header: <WeddingPortfolioPreview />,
    className: "md:col-span-1",
    icon: <Camera className="h-4 w-4 text-rose-500" />,
  },
  {
    title: "Video Production",
    description: (
      <span className="text-sm">
        Professional video editing and post-production services.
      </span>
    ),
    header: <VideoEditingShowcase />,
    className: "md:col-span-1",
    icon: <Video className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Creative Direction",
    description: (
      <span className="text-sm">
        Bringing your vision to life with artistic storytelling.
      </span>
    ),
    header: <CreativePortfolio />,
    className: "md:col-span-1",
    icon: <Edit3 className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Client Testimonials",
    description: (
      <span className="text-sm">
        See what our happy clients say about their experience with us.
      </span>
    ),
    header: <ClientFeedback />,
    className: "md:col-span-2",
    icon: <Users className="h-4 w-4 text-green-500" />,
  },
  {
    title: "Personal Consultation",
    description: (
      <span className="text-sm">
        Direct communication to plan your perfect photography session.
      </span>
    ),
    header: <ClientConversation />,
    className: "md:col-span-1",
    icon: <Heart className="h-4 w-4 text-amber-500" />,
  },
];