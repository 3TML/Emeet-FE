"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import type { UrlObject } from "url";

type FooterLinkItem = {
  href: UrlObject;
  label: string;
};

type FooterLinks = {
  clients: readonly FooterLinkItem[];
  experts: readonly FooterLinkItem[];
  company: readonly FooterLinkItem[];
  bottom: readonly FooterLinkItem[];
};

// Define footer links data
const footerLinks: FooterLinks = {
  clients: [
    { href: { pathname: "/experts" }, label: "Find an Expert" },
    { href: { pathname: "/how-it-works" }, label: "How It Works" },
    { href: { pathname: "/pricing" }, label: "Pricing" },
    { href: { pathname: "/faq" }, label: "FAQ" },
  ],
  experts: [
    {
      href: { pathname: "/register", query: { expert: "true" } },
      label: "Join as an Expert",
    },
    { href: { pathname: "/expert-resources" }, label: "Resources" },
    { href: { pathname: "/success-stories" }, label: "Success Stories" },
    { href: { pathname: "/expert-faq" }, label: "Expert FAQ" },
  ],
  company: [
    { href: { pathname: "/about" }, label: "About Us" },
    { href: { pathname: "/careers" }, label: "Careers" },
    { href: { pathname: "/contact" }, label: "Contact" },
    { href: { pathname: "/privacy" }, label: "Privacy Policy" },
    { href: { pathname: "/terms" }, label: "Terms of Service" },
  ],
  bottom: [
    { href: { pathname: "/privacy" }, label: "Privacy" },
    { href: { pathname: "/terms" }, label: "Terms" },
    { href: { pathname: "/sitemap" }, label: "Sitemap" },
  ],
} as const;

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
] as const;

const FooterLink = ({
  href,
  label,
  className,
}: FooterLinkItem & { className: string }) => (
  <Link href={href} className={className}>
    {label}
  </Link>
);

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLinkItem[];
}) => (
  <div>
    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
      {title}
    </h4>
    <ul className="space-y-2">
      {links.map(({ href, label }) => (
        <li key={label}>
          <FooterLink
            href={href}
            label={label}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-primary">Expert</span>
              <span className="text-blue-500">Meet</span>
            </h3>
            <p className="text-sm mb-6 text-gray-400 max-w-xs">
              Connect with industry experts for personalized guidance and
              solutions.
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
          </div>

          {/* Links Sections */}
          <FooterSection title="For Clients" links={footerLinks.clients} />
          <FooterSection title="For Experts" links={footerLinks.experts} />
          <FooterSection title="Company" links={footerLinks.company} />
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-md mx-auto text-center mb-8">
            <h4 className="text-lg font-medium text-white mb-2">
              Subscribe to our newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest news and updates about our platform and experts.
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
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p>&copy; {currentYear} ExpertMeet. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              {footerLinks.bottom.map(({ href, label }, index) => (
                <React.Fragment key={label}>
                  <FooterLink
                    href={href}
                    label={label}
                    className="text-gray-500 hover:text-gray-400 transition-colors"
                  />
                  {index < footerLinks.bottom.length - 1 && (
                    <span className="mx-4">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
