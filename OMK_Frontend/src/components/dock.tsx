"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  id?: string;
  isMobile?: boolean;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isMobile?: boolean;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isMobile = false,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  // Enhanced hover effects with better colors
  const backgroundOpacity = useTransform(
    mouseDistance,
    [-distance / 2, 0, distance / 2],
    [0, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center rounded-2xl cursor-pointer
        transition-all duration-300 ease-out
        bg-gradient-to-br from-red-500 via-red-600 to-orange-600
        hover:from-red-600 hover:via-red-700 hover:to-orange-700
        active:from-red-700 active:via-red-800 active:to-orange-800
        shadow-lg hover:shadow-2xl
        border border-white/30 hover:border-white/40
        focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-white/50
        group overflow-hidden
        ${isMobile ? 'flex-col pb-1' : ''}
        ${className}
      `}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      whileHover={{ 
        scale: isMobile ? 1.02 : 1.08,
        boxShadow: "0 12px 35px rgba(239, 68, 68, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background glow with improved colors */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-red-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60" />
      
      {Children.map(children, (child) => {
        if (React.isValidElement(child) && typeof child.type !== "string") {
          return cloneElement(child as React.ReactElement<any>, {
            isHovered,
            isMobile,
          });
        }
        return child;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isMobile?: boolean;
};

function DockLabel({ children, className = "", isMobile = false, ...rest }: DockLabelProps) {
  const { isHovered } = rest as { isHovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true); // Always visible on mobile
      return;
    }
    
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered, isMobile]);

  // Mobile: Always visible, positioned below icon
  if (isMobile) {
    return (
      <div className={`
        ${className} 
        text-[9px] font-bold text-white/90 mt-1 text-center
        drop-shadow-sm leading-tight tracking-wide
      `}>
        {children}
      </div>
    );
  }

  // Desktop: Show on hover, positioned below the dock item
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5, scale: 0.8 }}
          animate={{ opacity: 1, y: 12, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.8 }}
          transition={{ 
            duration: 0.25, 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
          className={`
            ${className} 
            absolute top-full left-1/2 -translate-x-1/2 w-fit whitespace-nowrap 
            rounded-lg px-3 py-1.5 text-xs font-bold
            bg-gradient-to-r from-gray-900 via-red-900 to-orange-900
            text-white shadow-xl border border-red-400/30
            before:content-[''] before:absolute before:bottom-full before:left-1/2 
            before:-translate-x-1/2 before:border-4 before:border-transparent 
            before:border-b-gray-900 before:drop-shadow-sm
            backdrop-blur-sm z-50
          `}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = "", isMobile = false }: DockIconProps & { isMobile?: boolean }) {
  return (
    <div className={`
      flex items-center justify-center text-white 
      transition-all duration-300 group-hover:scale-110
      drop-shadow-lg
      ${isMobile ? 'mb-0.5' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 250, damping: 18 },
  magnification = 65,
  distance = 180,
  panelHeight = 65,
  dockHeight = 256,
  baseItemSize = 45,
  id,
  isMobile = false,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      id={id}
      style={{ height: isMobile ? panelHeight : height, scrollbarWidth: "none" }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={(e: React.MouseEvent) => {
          if (!isMobile) {
            isHovered.set(1);
            mouseX.set(e.pageX);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            isHovered.set(0);
            mouseX.set(Infinity);
          }
        }}
        className={`
          ${className} 
          fixed top-2 left-1/2 transform -translate-x-1/2 
          flex items-center justify-center w-fit 
          gap-2 sm:gap-3 rounded-2xl px-3 sm:px-4 py-2 z-50 
          hover:cursor-pointer
          transition-all duration-300 ease-out
          ${isMobile ? 'min-h-[60px]' : ''}
        `}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            isMobile={isMobile}
          > 
            <DockIcon isMobile={isMobile}>{item.icon}</DockIcon>
            <DockLabel isMobile={isMobile}>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}