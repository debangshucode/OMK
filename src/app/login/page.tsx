"use client";

import AlbumBackground from "@/components/AlbumBackground";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const albumItems = [
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "video", src: "https://www.youtube.com/embed/mi9cpM3cQrg" },
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "video", src: "https://www.youtube.com/embed/ehFlaUGsedQ" },
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "image", src: "/images/weadingHome.jpg" },
  { type: "video", src: "https://www.youtube.com/embed/mi9cpM3cQrg" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current || !thumbRef.current) return;

    const slider = sliderRef.current;
    const thumb = thumbRef.current;
    let isDragging = false;

    const getOffsetX = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const sliderRect = slider.getBoundingClientRect();
      let offset = clientX - sliderRect.left;
      return Math.max(0, Math.min(offset, sliderRect.width - thumb.offsetWidth));
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const offset = getOffsetX(e);
      thumb.style.transform = `translateX(${offset}px)`;

      if (offset >= slider.offsetWidth - thumb.offsetWidth - 10) {
        isDragging = false;
        removeListeners();
        handleSubmit();
      }
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      thumb.style.transform = "translateX(0)";
      removeListeners();
    };

    const addListeners = () => {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onEnd);
    };

    const removeListeners = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    const onStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      addListeners();
    };

    thumb.addEventListener("mousedown", onStart);
    thumb.addEventListener("touchstart", onStart);

    return () => {
      thumb.removeEventListener("mousedown", onStart);
      thumb.removeEventListener("touchstart", onStart);
      removeListeners();
    };
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (email && password) {
      router.push("/admin/home");
    } else {
      if (thumbRef.current) {
        thumbRef.current.style.transition = "transform 0.3s ease";
        thumbRef.current.style.transform = "translateX(0)";
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AlbumBackground items={albumItems} />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-10 rounded-2xl max-w-md w-full text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Photographer Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Slide to Login with Camera Icon */}
            <div
              ref={sliderRef}
              className="relative w-full h-12 mt-6 bg-white/10 border border-white/20 rounded-full overflow-hidden backdrop-blur-md"
            >
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white opacity-60 select-none">
                Slide to Login →
              </div>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-0 opacity-70 text-white">
                <Camera size={18} />
              </div>

              <div
                ref={thumbRef}
                className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-lg cursor-pointer z-10 transition-transform duration-200 ease-out"
              ></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
