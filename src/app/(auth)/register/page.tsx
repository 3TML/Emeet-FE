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
import { getCategoryApi, registerUserApi } from "@/lib/api/user";
import { Category, RegisterForm } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmailOtpRegister from "@/components/EmailOtpRegister";
import Image from "next/image";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form specific state
  const [isExpert, setIsExpert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // OTP modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [shouldSubmitAfterOtp, setShouldSubmitAfterOtp] = useState(false);

  // Use authentication form hook for email/password validation
  const { formData, formErrors, isFormValid, setFormData } = useAuthForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
      ...(name === "username" ? { email: value } : {}),
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if all form fields are valid
  const isRegisterFormValid = () => {
    return (
      isFormValid &&
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called, otpVerified:", otpVerified);
    if (!isRegisterFormValid()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    if (!otpVerified) {
      setShowOtpModal(true);
      setShouldSubmitAfterOtp(true);
      console.log("OTP not verified, set shouldSubmitAfterOtp and open modal");
      return;
    }
    setIsLoading(true);
    try {
      const userData: RegisterForm = {
        username: formData.username, // This is actually the email
        password: formData.password,
        fullName: formData.fullName,
        role: isExpert ? "EXPERT" : "USER",
        gender: formData.gender,
        isExpert: isExpert,
        listCategoryId: isExpert && expertise ? [expertise] : [],
        experience: isExpert ? formData.experience : "",
        pricePerMinute: isExpert ? formData.pricePerMinute : 0,
      };
      console.log("Registering user with data:", userData);
      const response = await registerUserApi(userData);
      if (response) {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Khi xác thực OTP thành công, chỉ set flag
  const handleOtpSuccess = () => {
    setOtpVerified(true);
    setShowOtpModal(false);
    console.log("OTP verified, will trigger submit via effect");
  };

  // Effect: khi otpVerified và shouldSubmitAfterOtp, tự động submit lại
  useEffect(() => {
    if (otpVerified && shouldSubmitAfterOtp) {
      setShouldSubmitAfterOtp(false);
      // Tạo event giả để gọi lại handleSubmit
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpVerified, shouldSubmitAfterOtp]);

  const handleToggleExpert = () => {
    setIsExpert((prev) => {
      const next = !prev;
      setFormData((f) => ({
        ...f,
        isExpert: next,
      }));
      return next;
    });
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
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full h-11 rounded-lg ${
                    !formData.fullName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                  required
                  aria-label="Full Name"
                  aria-invalid={!formData.fullName}
                />
                {!formData.fullName && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    Please enter your full name
                  </div>
                )}
              </div>

              {/* Email (previously Username) */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  value={formData.username || ""}
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

              {/* Gender Selection */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  className={`w-full h-11 rounded-lg border ${
                    !formData.gender
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"
                  } bg-background px-3 text-sm`}
                  required
                  aria-invalid={!formData.gender}
                >
                  <option value="">Select your gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {!formData.gender && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    Please select your gender
                  </div>
                )}
              </div>

              {/* Expert Registration */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={handleToggleExpert}
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
                      As an expert, you&apos;ll be able to offer your expertise
                      to others and set your own rates.
                    </p>
                    <div className="space-y-4">
                      {/* Expertise Category */}
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
                          <option value="">
                            Select your area of expertise
                          </option>
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

                      {/* Experience */}
                      <div className="space-y-2">
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Years of Experience
                        </label>
                        <Input
                          id="experience"
                          name="experience"
                          type="text"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., 5 years in software development"
                          className={`w-full h-11 rounded-lg ${
                            isExpert && !formData.experience
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300"
                          }`}
                          required={isExpert}
                          aria-invalid={isExpert && !formData.experience}
                        />
                        {isExpert && !formData.experience && (
                          <div className="flex items-center mt-1 text-xs text-red-500">
                            <AlertCircle size={12} className="mr-1" />
                            Please enter your experience
                          </div>
                        )}
                      </div>

                      {/* Price per Minute */}
                      <div className="space-y-2">
                        <label
                          htmlFor="pricePerMinute"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Price per Minute (USD)
                        </label>
                        <Input
                          id="pricePerMinute"
                          name="pricePerMinute"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.pricePerMinute}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className={`w-full h-11 rounded-lg ${
                            isExpert && formData.pricePerMinute <= 0
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300"
                          }`}
                          required={isExpert}
                          aria-invalid={
                            isExpert && formData.pricePerMinute <= 0
                          }
                        />
                        {isExpert && formData.pricePerMinute <= 0 && (
                          <div className="flex items-center mt-1 text-xs text-red-500">
                            <AlertCircle size={12} className="mr-1" />
                            Please enter a valid price per minute
                          </div>
                        )}
                      </div>
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
                disabled={!isRegisterFormValid() || isLoading}
                className={`w-full h-11 rounded-lg font-medium text-base flex items-center justify-center gap-2 mt-4 ${
                  isRegisterFormValid() && !isLoading
                    ? "bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                aria-label="Create Account"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account <ArrowRight className="h-4 w-4" />
                  </>
                )}
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
            {/* OTP Modal */}
            {showOtpModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <EmailOtpRegister
                    email={formData.email}
                    fullName={formData.fullName}
                    onSuccess={handleOtpSuccess}
                  />
                  <button
                    className="mt-4 text-sm text-gray-500 hover:underline"
                    onClick={() => setShowOtpModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
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
              <Image
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
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
