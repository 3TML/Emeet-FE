"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-primary">Expert</span>
              <span className="text-blue-500">Meet</span>
            </h3>
            <p className="text-sm mb-6 text-gray-400 max-w-xs">
              Connect with industry experts for personalized guidance and
              solutions. Our platform brings professionals and clients together.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </motion.div>

          {/* Links Section 1 */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              For Clients
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/experts"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Find an Expert
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Links Section 2 */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              For Experts
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/register?expert=true"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Join as an Expert
                </Link>
              </li>
              <li>
                <Link
                  href="/expert-resources"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/expert-faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Expert FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Links Section 3 */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          className="border-t border-gray-800 pt-8 pb-8"
          variants={itemVariants}
        >
          <div className="max-w-md mx-auto text-center mb-8">
            <h4 className="text-lg font-medium text-white mb-2">
              Subscribe to our newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest news and updates about our platform and experts
              directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p>&copy; {currentYear} ExpertMeet. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-400 transition-colors mr-4"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-400 transition-colors mr-4"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-gray-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
