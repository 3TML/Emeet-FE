"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthForm } from "@/components/valid/authentical";
import { getCategoryApi, getTestApi } from "@/lib/api/user";
import { Category } from "@/types/user";

// Slide data for registration
const SLIDES = [
  {
    image: "https://i.imgur.com/0y8Ftya.jpg",
    title: "Connect",
    subtitle: "with experts",
    description:
      "Join our platform to connect with industry-leading professionals and accelerate your career growth.",
  },
  {
    image: "https://i.imgur.com/XQHXgKC.jpg",
    title: "Learn",
    subtitle: "new skills",
    description:
      "Access personalized mentorship and guidance from experts in your field of interest.",
  },
  {
    image: "https://i.imgur.com/X2hMkKS.jpg",
    title: "Grow",
    subtitle: "professionally",
    description:
      "Build your professional network and discover new opportunities in your industry.",
  },
];

const RegisterPage = () => {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form specific state
  const [isExpert, setIsExpert] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Use authentication form hook for email/password validation
  const { formData, formErrors, isFormValid, handleInputChange } =
    useAuthForm();

  // Check if all form fields are valid
  const isRegisterFormValid = () => {
    return (
      isFormValid &&
      firstName &&
      lastName &&
      !confirmPasswordError &&
      termsAccepted &&
      (!isExpert || expertise)
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryError(null);
      try {
        const categoriesData = await getCategoryApi();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error("Invalid categories data format:", categoriesData);
          setCategoryError(
            "Failed to load categories. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Validate confirm password
  useEffect(() => {
    if (confirmPassword && formData.password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword, formData.password]);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Slideshow handlers
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterFormValid()) {
      // Process registration
      console.log("Registration data:", {
        ...formData,
        firstName,
        lastName,
        isExpert,
        expertise: isExpert ? expertise : null,
        termsAccepted,
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 md:p-6 lg:p-8">
      {/* Card Container */}
      <motion.div
        className="w-full max-w-6xl min-h-[85vh] flex rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Registration Form */}
        <div className="w-1/2 bg-white dark:bg-gray-900 relative overflow-y-auto">
          {/* Form Wrapper for smaller form */}
          <div className="max-w-md w-full mx-auto h-full flex flex-col justify-center px-8 py-10">
            <h1
              className="text-2xl font-serif font-semibold text-black dark:text-white mb-2"
              tabIndex={0}
            >
              Create your account ✦
            </h1>
            <p
              className="text-gray-500 dark:text-gray-400 mb-8 text-sm"
              tabIndex={0}
            >
              Join ExpertMeet to connect with industry professionals
            </p>
            <form
              className="space-y-5"
              aria-label="Registration form"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full h-11 rounded-lg border-gray-300"
                    required
                    aria-label="First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full h-11 rounded-lg border-gray-300"
                    required
                    aria-label="Last Name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="youremail@gmail.com"
                  className={`w-full h-11 rounded-lg ${
                    formErrors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  required
                  aria-label="Email"
                  aria-invalid={!!formErrors.email}
                />
                {formErrors.email && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full h-11 rounded-lg ${
                    formErrors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  required
                  aria-label="Password"
                  aria-invalid={!!formErrors.password}
                />
                {formErrors.password && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 rounded-lg ${
                    confirmPasswordError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  required
                  aria-label="Confirm Password"
                  aria-invalid={!!confirmPasswordError}
                />
                {confirmPasswordError && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              {/* Expert Registration */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setIsExpert(!isExpert)}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center ${
                      isExpert
                        ? "bg-black dark:bg-white"
                        : "border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {isExpert && (
                      <Check className="h-3.5 w-3.5 text-white dark:text-black" />
                    )}
                  </div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    Register as an Expert
                  </label>
                </div>

                {isExpert && (
                  <motion.div
                    className="mt-3 space-y-3 pl-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-gray-500">
                      As an expert, you'll be able to offer your expertise to
                      others and set your own rates.
                    </p>
                    <div className="space-y-2">
                      <label
                        htmlFor="expertise"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Area of Expertise
                      </label>
                      <select
                        id="expertise"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm"
                        required={isExpert}
                        disabled={isLoadingCategories}
                      >
                        <option value="">Select your area of expertise</option>
                        {isLoadingCategories ? (
                          <option value="" disabled>
                            Loading categories...
                          </option>
                        ) : categoryError ? (
                          <option value="" disabled>
                            {categoryError}
                          </option>
                        ) : (
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                    termsAccepted
                      ? "bg-black dark:bg-white"
                      : "border border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {termsAccepted && (
                    <Check className="h-3.5 w-3.5 text-white dark:text-black" />
                  )}
                </div>
                <label
                  className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => setTermsAccepted(!termsAccepted)}
                >
                  I agree to the{" "}
                  <Link
                    href={{ pathname: "/terms" }}
                    className="font-medium underline text-black dark:text-white hover:text-blue-600"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={{ pathname: "/privacy" }}
                    className="font-medium underline text-black dark:text-white hover:text-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isRegisterFormValid()}
                className={`w-full h-11 rounded-lg font-medium text-base flex items-center justify-center gap-2 mt-4 ${
                  isRegisterFormValid()
                    ? "bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                aria-label="Create Account"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href={{ pathname: "/login" }}
                  className="font-medium underline text-black dark:text-white hover:text-blue-600"
                  aria-label="Sign in"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Image Slideshow */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          {/* Slideshow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                className="object-cover w-full h-full"
              />

              {/* Overlayed Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none">
                <div>
                  <span
                    className="font-serif text-3xl text-white drop-shadow-lg"
                    tabIndex={0}
                  >
                    {SLIDES[currentSlide].title}{" "}
                    <span className="ml-2 text-lg align-middle">
                      {SLIDES[currentSlide].subtitle}
                    </span>
                  </span>
                  <p
                    className="mt-2 text-xs text-white/80 max-w-xs"
                    tabIndex={0}
                  >
                    {SLIDES[currentSlide].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute left-0 right-0 bottom-6 flex justify-center space-x-2 z-10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
