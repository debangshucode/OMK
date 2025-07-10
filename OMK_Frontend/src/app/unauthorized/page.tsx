"use client";
import { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Home, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 max-w-md w-full transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-red-200 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-full p-4">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Access Denied
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-6 text-lg">
            You don't have permission to view this page
          </p>

          {/* Description */}
          <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-medium">Restricted Access</span>
            </div>
            <p className="text-gray-700 text-sm">
              This page requires special permissions that your account doesn't currently have. 
              Please contact your administrator for access.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>

          {/* Error code */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <span className="text-gray-500 text-sm">Error Code: 403</span>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute -top-2 -right-6 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-60 animation-delay-1000"></div>
        <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-red-300 rounded-full animate-ping opacity-60 animation-delay-2000"></div>
        <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-60 animation-delay-3000"></div>
      </div>

      {/* Custom CSS for animation delays */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}