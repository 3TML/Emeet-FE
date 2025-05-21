"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

// Types
type AppRoute =
  | "/"
  | "/find"
  | "/work"
  | "/pricing"
  | "/about"
  | "/login"
  | "/register";

interface NavLinkProps {
  href: { pathname: AppRoute };
  label: string;
  className: string;
  onClick?: () => void;
}

// Constants
const ANIMATION_CONFIG = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
} as const;

const navLinks = [
  { href: { pathname: "/find" }, label: "Find Experts" },
  { href: { pathname: "/work" }, label: "Work" },
  { href: { pathname: "/pricing" }, label: "Pricing" },
  { href: { pathname: "/about" }, label: "About Us" },
] as const;

const authLinks = [
  {
    href: { pathname: "/login" },
    label: "Sign In",
    className:
      "px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors",
  },
  {
    href: { pathname: "/register" },
    label: "Join Now",
    className:
      "px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",
  },
] as const;

// Components
const NavLink = ({ href, label, className, onClick }: NavLinkProps) => (
  <Link href={href} className={className} onClick={onClick}>
    {label}
  </Link>
);

const ThemeToggle = ({
  mounted,
  theme,
  onClick,
}: {
  mounted: boolean;
  theme: string | undefined;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label="Toggle theme"
  >
    {mounted && theme === "dark" ? (
      <Sun className="h-5 w-5 text-yellow-400" />
    ) : (
      <Moon className="h-5 w-5 text-blue-600" />
    )}
  </button>
);

const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
);

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 md:hidden"
        initial="closed"
        animate="open"
        exit="closed"
        variants={{
          closed: { opacity: 0, x: "100%", transition: ANIMATION_CONFIG },
          open: { opacity: 1, x: 0, transition: ANIMATION_CONFIG },
        }}
      >
        <nav className="flex flex-col h-full p-4">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href.pathname}
              href={href}
              label={label}
              className="py-4 px-2 text-lg border-b border-gray-100 dark:border-gray-800"
              onClick={onClose}
            />
          ))}
          <div className="mt-auto flex flex-col space-y-4 pt-4">
            {authLinks.map(({ href, label, className }) => (
              <NavLink
                key={href.pathname}
                href={href}
                label={label}
                className={className ?? ""}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đồng bộ trạng thái user
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("userChanged", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userChanged", syncUser);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    router.push("/login");
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
      variants={{
        hidden: { opacity: 0, y: -20, transition: ANIMATION_CONFIG },
        visible: { opacity: 1, y: 0, transition: ANIMATION_CONFIG },
      }}
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

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href.pathname}
                href={href}
                label={label}
                className="text-sm text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle
              mounted={mounted}
              theme={theme}
              onClick={() =>
                mounted && setTheme(theme === "dark" ? "light" : "dark")
              }
            />
            {user ? (
              <>
                <Link href="/profile" aria-label="Hồ sơ cá nhân" tabIndex={0}>
                  <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 font-semibold hover:bg-blue-200">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover border border-blue-200"
                      />
                    ) : null}
                    {user.fullName || "Hồ sơ"}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  tabIndex={0}
                  aria-label="Đăng xuất"
                  type="button"
                >
                  Sign Out
                </button>
              </>
            ) : (
              authLinks.map(({ href, label, className }) => (
                <NavLink
                  key={href.pathname}
                  href={href}
                  label={label}
                  className={className ?? ""}
                />
              ))
            )}
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle
              mounted={mounted}
              theme={theme}
              onClick={() =>
                mounted && setTheme(theme === "dark" ? "light" : "dark")
              }
            />
            <MobileMenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.header>
  );
};

export default Navbar;
