"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthForm } from "@/components/valid/authentical";
import { loginUserApi } from "@/lib/api/user";
import { LoginForm } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Slide data
const SLIDES = [
  {
    image: "https://i.imgur.com/0y8Ftya.jpg",
    title: "Karina",
    subtitle: "카리나",
    description: "aespa (에스파)는 대한민국의 SM 엔터테인먼트 소속 4인조 다국적 걸그룹이다. SMCU 프로젝트의 첫 주자로 나서게 되며"
  },
  {
    image: "https://i.imgur.com/XQHXgKC.jpg", // Replace with actual image URL
    title: "Winter",
    subtitle: "윈터",
    description: "aespa의 메인 보컬이자 리드 댄서로, 그룹의 두 번째 멤버로 공개되었다. 독특한 음색과 파워풀한 무대 장악력이 특징이다."
  },
  {
    image: "https://i.imgur.com/X2hMkKS.jpg", // Replace with actual image URL
    title: "Ningning",
    subtitle: "닝닝",
    description: "중국 출신의 멤버로 aespa의 메인 보컬을 맡고 있다. 풍부한 성량과 안정적인 고음으로 그룹의 보컬 라인을 이끌고 있다."
  }
];

const LoginPage = () => {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser, setLoginUser] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleLoginUser = async () => {
    try {
      const response = await loginUserApi(loginUser);
      console.log("User logged in successfully:", response);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };


  // Use authentication form hook
  const {
    formData,
    formErrors,
    isFormValid,
    handleInputChange,
    handleSubmit
  } = useAuthForm();
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Process login on successful form submission
  const processLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem("user", JSON.stringify(response));
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin tài khoản.");
    }
  };
  
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

  const isLoginFormValid = () => {
    return formData.username && formData.password;
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
        {/* Left: Login Form */}
        <div className="w-1/2 bg-white dark:bg-gray-900 relative">
          {/* Form Wrapper for smaller form */}
          <div className="max-w-md w-full mx-auto h-full flex flex-col justify-center px-12">
            <h1 className="text-2xl font-serif font-semibold text-black dark:text-white mb-2" tabIndex={0} aria-label="Welcome back">Welcome back ✦</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm" tabIndex={0}>The faster you fill up, the faster you get a ticket</p>
            <form className="space-y-5" aria-label="Login form" onSubmit={(e) => handleSubmit(e, processLogin)}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <Input 
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className={`w-full h-11 rounded-lg ${formErrors.username ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
                  required 
                  aria-label="username"
                  aria-invalid={!!formErrors.username}
                  tabIndex={0}
                />
                {formErrors.username && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.username}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full h-11 rounded-lg ${formErrors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
                  required
                  aria-label="Password"
                  aria-invalid={!!formErrors.password}
                  tabIndex={0}
                />
                {formErrors.password && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.password}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" aria-label="Remember me" tabIndex={0} />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</label>
                </div>
                <Link href={{ pathname: "/forgot-password" }} className="text-xs text-gray-500 hover:text-black dark:hover:text-white underline" tabIndex={0} aria-label="Forgot Password">Forgot Password</Link>
              </div>
              <Button 
                onClick={handleLoginUser}
                type="submit"
                disabled={!isLoginFormValid()}
                className={`w-full h-11 rounded-lg font-medium text-base flex items-center justify-center gap-2 ${
                  !isLoginFormValid()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                aria-label="Sign In"
                tabIndex={0}
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" className="w-full h-11 flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 rounded-lg" aria-label="Sign In with Google" tabIndex={0}>
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Sign In with Google
              </Button>
            </form>
            <div className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href={{ pathname: "/register" }} className="font-medium underline text-black dark:text-white hover:text-blue-600" tabIndex={0} aria-label="Sign up">Sign up</Link>
            </div>
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
                  <span className="font-serif text-3xl text-white drop-shadow-lg" tabIndex={0}>
                    {SLIDES[currentSlide].title} <span className="ml-2 text-lg align-middle">{SLIDES[currentSlide].subtitle}</span>
                  </span>
                  <p className="mt-2 text-xs text-white/80 max-w-xs" tabIndex={0}>
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

export default LoginPage;
