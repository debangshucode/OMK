"use client";
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (email && password && validateEmail(email)) {
      setLoading(true); // Start splash animation

      // Simulate login delay
      setTimeout(() => {
        setLoading(false);
        onSuccess(); // Redirect
      }, 1500); // splash time
    } else {
      // Reset slider if invalid
      if (thumbRef.current) {
        thumbRef.current.style.transition = "transform 0.3s ease";
        thumbRef.current.style.transform = "translateX(0)";
      }
      alert("Enter valid email & password.");
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const thumb = thumbRef.current;
    if (!slider || !thumb) return;

    let isDragging = false;

    const getOffsetX = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const sliderRect = slider.getBoundingClientRect();
      const offset = clientX - sliderRect.left;
      return Math.max(
        0,
        Math.min(offset, sliderRect.width - thumb.offsetWidth)
      );
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
  }, [email, password]);

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-10 rounded-2xl max-w-md w-[90%] xl:w-full text-center text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition hover:cursor-pointer"
          aria-label="Close Login Modal"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Photographer Login
        </h1>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Slide to login */}
          <div
            ref={sliderRef}
            className="relative w-full h-12 mt-6 bg-white/10 border border-white/20 rounded-full overflow-hidden"
          >
            {/* Slider Track Text */}
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white opacity-60">
              Slide to Login →
            </div>

            {/* Sliding Thumb */}
            <div
              ref={thumbRef}
              className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-lg cursor-pointer z-10 flex items-center justify-center transition-transform duration-300"
            >
              {!loading ? (
                <Camera className="w-5 h-5 text-white" />
              ) : (
                <div className="relative w-5 h-5">
                  <Camera className="w-5 h-5 text-white z-10 relative" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-40" />
                </div>
              )}
            </div>
          </div>

          {/* Hidden submit button for Enter key */}
          <button type="submit" className="hidden" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}
