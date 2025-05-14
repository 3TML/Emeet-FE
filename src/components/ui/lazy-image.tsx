"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // 200px before the image comes into view
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={style}
    >
      {(inView || priority) && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gray-200 animate-pulse"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={src}
              alt={alt}
              width={width || 500}
              height={height || 300}
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover ${
                isLoaded ? "" : "invisible"
              }`}
              priority={priority}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
