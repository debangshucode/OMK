import { Camera, Video, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  work: {
    _id: string;
    type: "photo" | "video" | "album" | "MediaItem";
    title: string;
    image: string;
    category: string;
    link: string;
  };
    onClick?: () => void; 
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "photo":
      return Camera;
    case "video":
      return Video;
    case "album":
      return FolderOpen;
    default:
      return Camera;
  }
};

const RecentWorkCard = ({ work }: Props) => {
  const TypeIcon = getTypeIcon(work.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-[170px] min-w-[170px] h-[260px] rounded-lg overflow-hidden bg-black shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
    >
      <img
        src={work.image || "/images/fallback.jpg"}
        alt={work.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-4 text-white">
        <div className="flex justify-end">
          <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
            <TypeIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center text-center space-y-1">
          <p className="text-sm font-medium">{work.category}</p>
          <h3 className="text-md font-semibold leading-tight">{work.title}</h3>
        </div>
        <div className="text-center">
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-md transition-all duration-300"
          >
            View Film
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentWorkCard;
