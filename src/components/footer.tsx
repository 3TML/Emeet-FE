"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import type { UrlObject } from "url";

// Define route types
type Route =
  | "/experts"
  | "/how-it-works"
  | "/pricing"
  | "/faq"
  | "/register"
  | "/expert-resources"
  | "/success-stories"
  | "/expert-faq"
  | "/about"
  | "/careers"
  | "/contact"
  | "/privacy"
  | "/terms"
  | "/sitemap";

// Define footer links data with UrlObject type
const footerLinks = {
  clients: [
    { href: { pathname: "/experts" } as UrlObject, label: "Find an Expert" },
    { href: { pathname: "/how-it-works" } as UrlObject, label: "How It Works" },
    { href: { pathname: "/pricing" } as UrlObject, label: "Pricing" },
    { href: { pathname: "/faq" } as UrlObject, label: "FAQ" },
  ],
  experts: [
    {
      href: { pathname: "/register", query: { expert: "true" } } as UrlObject,
      label: "Join as an Expert",
    },
    {
      href: { pathname: "/expert-resources" } as UrlObject,
      label: "Resources",
    },
    {
      href: { pathname: "/success-stories" } as UrlObject,
      label: "Success Stories",
    },
    { href: { pathname: "/expert-faq" } as UrlObject, label: "Expert FAQ" },
  ],
  company: [
    { href: { pathname: "/about" } as UrlObject, label: "About Us" },
    { href: { pathname: "/careers" } as UrlObject, label: "Careers" },
    { href: { pathname: "/contact" } as UrlObject, label: "Contact" },
    { href: { pathname: "/privacy" } as UrlObject, label: "Privacy Policy" },
    { href: { pathname: "/terms" } as UrlObject, label: "Terms of Service" },
  ],
  bottom: [
    { href: { pathname: "/privacy" } as UrlObject, label: "Privacy" },
    { href: { pathname: "/terms" } as UrlObject, label: "Terms" },
    { href: { pathname: "/sitemap" } as UrlObject, label: "Sitemap" },
  ],
} as const;

// Social media links
const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
] as const;

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
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              For Clients
            </h4>
            <ul className="space-y-2">
              {footerLinks.clients.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              For Experts
            </h4>
            <ul className="space-y-2">
              {footerLinks.experts.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
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
              {footerLinks.bottom.map(({ href, label }, index) => (
                <React.Fragment key={label}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    {label}
                  </Link>
                  {index < footerLinks.bottom.length - 1 && (
                    <span className="mx-4">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
