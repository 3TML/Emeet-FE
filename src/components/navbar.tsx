"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary transition-colors"
          >
            <span className="text-primary">Expert</span>
            <span className="text-blue-500">Meet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/experts"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Find Experts
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </button>

            <Link
              href="/login"
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col h-full p-4">
              <Link
                href="/experts"
                className="py-4 px-2 text-lg border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Find Experts
              </Link>
              <Link
                href="/how-it-works"
                className="py-4 px-2 text-lg border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="py-4 px-2 text-lg border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="py-4 px-2 text-lg border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <div className="mt-auto flex flex-col space-y-4 pt-4">
                <Link
                  href="/login"
                  className="py-3 px-4 text-center border border-gray-300 dark:border-gray-700 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="py-3 px-4 text-center bg-primary text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
