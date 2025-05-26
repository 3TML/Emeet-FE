import React from "react";

export const Avatar = ({ src, alt, className }: { src?: string; alt?: string; className?: string }) => (
  <img
    src={src || "/avatar-default.png"}
    alt={alt || "Avatar"}
    className={`object-cover rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ${className || "w-10 h-10"}`}
    width={96}
    height={96}
    loading="lazy"
  />
);

export default Avatar; 