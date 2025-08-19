import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-red-600 border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

interface LoadingCardProps {
  count?: number;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ 
  count = 8, 
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
          <div className="aspect-[3/4] bg-gray-200" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface LoadingSectionProps {
  title: string;
  count?: number;
  className?: string;
}

export const LoadingSection: React.FC<LoadingSectionProps> = ({ 
  title, 
  count = 8, 
  className = '' 
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-gray-200 animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded" />
          </div>
          <h1 className="text-6xl font-bold text-transparent [-webkit-text-stroke:2px_#e5e7eb] animate-pulse">
            {title}
          </h1>
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Loading Cards */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <LoadingCard count={count} />
      </div>
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message, 
  onRetry, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {action && action}
    </div>
  );
};

// Full page loading component
export const FullPageLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 text-lg">Loading portfolio...</p>
      </div>
    </div>
  );
};

// Masonry loading skeleton
export const MasonryLoading: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div 
          key={i} 
          className={`break-inside-avoid bg-gray-200 rounded-xl animate-pulse`}
          style={{ 
            height: `${200 + Math.random() * 200}px` // Random height for masonry effect
          }}
        />
      ))}
    </div>
  );
};
