"use client";
import { useState, useEffect, useRef } from "react";
import { Camera, User, Mail, Lock, ArrowRight, X, EyeOff,Eye } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
  // setIsAuthenticated: (auth: boolean) => void;
  // setUser: (user: any) => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const { setAuthState, user, isAuthenticated, setUser , authenticated} = useAuth(); // ⬅️ Add this
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOTP] = useState("");

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setOTP("");
    setShowOTP(false);
  };

  const resetSlider = () => {
    if (thumbRef.current) {
      thumbRef.current.style.transition = "transform 0.3s ease";
      thumbRef.current.style.transform = "translateX(0)";
    }
  };

  const handleLogin = async () => {
    if (!email || !password || !validateEmail(email)) {
      toast.error("Please enter valid email and password");
      resetSlider();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      // setIsAuthenticated(true);
      // setAuthState(response.data.user);
      setUser(response.data.user);
      onSuccess(response.data.user);
      if (response.data.user.role === "admin") {
        router.push("/admin/dashboard"); // Redirect to admin dashboard
      } else {
        router.push("/client/dashboard"); // Redirect to photographer dashboard
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      // setIsAuthenticated(false);
      setUser(null);
      resetSlider();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !validateEmail(email)) {
      toast.error("Please fill all fields with valid information");
      resetSlider();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setShowOTP(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      resetSlider();
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 5) {
      toast.error("Please enter valid 5-digit OTP");
      resetSlider();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/otp-verification",
        { email, otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      // setIsAuthenticated(true);
      setUser(response.data.user);
      onSuccess(response.data.user);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      // setIsAuthenticated(false);
      setUser(null);
      resetSlider();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (showOTP) {
      handleOTPVerification();
    } else if (isSignup) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
    resetSlider();
  };

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
  }, [email, password, name, otp, isSignup, showOTP]);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-10 rounded-2xl max-w-md w-[90%] xl:w-full text-center text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {showOTP
              ? "Verify OTP"
              : isSignup
              ? "Create Account"
              : "Photographer Login"}
          </h1>
          {showOTP && (
            <p className="text-sm text-white/70">
              Enter the 5-digit code sent to {email}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {showOTP ? (
            // OTP Input
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={otp}
                onChange={(e) =>
                  setOTP(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                disabled={loading}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>
          ) : (
            <>
              {/* Name field for signup */}
              {isSignup && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
              )}

              {/* Email field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
              </div>

              {/* Password field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 pl-12 pr-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <Lock className="absolute text-gray-700 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </>
          )}

          {/* Slide to submit */}
          <div
            ref={sliderRef}
            className={`relative w-full h-14 mt-6 bg-white/10 border border-white/20 rounded-full overflow-hidden select-none ${
              loading ? "opacity-50" : ""
            }`}
          >
            {/* Slider Track Text */}
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white opacity-60">
              {showOTP
                ? "Slide to Verify →"
                : isSignup
                ? "Slide to Sign Up →"
                : "Slide to Login →"}
            </div>

            {/* Sliding Thumb */}
            <div
              ref={thumbRef}
              className={`absolute left-0 top-0 w-14 h-14 bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-lg z-10 flex items-center justify-center transition-transform duration-300 select-none ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="relative w-6 h-6">
                  {showOTP ? (
                    <ArrowRight className="w-6 h-6 text-white z-10 relative" />
                  ) : (
                    <Camera className="w-6 h-6 text-white z-10 relative" />
                  )}
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              ) : showOTP ? (
                <ArrowRight className="w-6 h-6 text-white" />
              ) : (
                <Camera className="w-6 h-6 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Toggle between login/signup */}
        {!showOTP && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-sm text-white/70">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={toggleMode}
              className="mt-2 text-red-400 hover:text-red-300 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        )}

        {/* Back to signup button during OTP */}
        {showOTP && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <button
              onClick={() => setShowOTP(false)}
              className="text-red-400 hover:text-red-300 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              ← Back to Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
