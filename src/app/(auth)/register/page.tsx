"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [isExpert, setIsExpert] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="absolute top-8 left-8">
        <Link
          href={{
            pathname: "/",
          }}
          className="text-xl font-bold text-primary transition-colors flex items-center gap-1"
        >
          <span className="text-primary">Expert</span>
          <span className="text-blue-500">Meet</span>
        </Link>
      </div>

      <motion.div
        className="w-full max-w-xl px-8 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create your account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join ExpertMeet to connect with industry professionals
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="outline"
                  className="w-full font-normal justify-start px-4"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-normal justify-start px-4"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </div>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-400">
                  or continue with email
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="w-full h-11 rounded-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="w-full h-11 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full h-11 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 rounded-lg"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 rounded-lg"
                    required
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setIsExpert(!isExpert)}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center ${
                        isExpert
                          ? "bg-primary"
                          : "border border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isExpert && <Check className="h-3.5 w-3.5 text-white" />}
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
                          className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm"
                          required={isExpert}
                        >
                          <option value="">
                            Select your area of expertise
                          </option>
                          <option value="business">Business Strategy</option>
                          <option value="marketing">Marketing</option>
                          <option value="finance">Finance</option>
                          <option value="leadership">Leadership</option>
                          <option value="data">Data Science</option>
                          <option value="product">Product Management</option>
                          <option value="software">Software Development</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center border border-gray-300 dark:border-gray-600">
                    {/* Empty checkbox for styling */}
                  </div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <Link
                      href={{ pathname: "/terms" }}
                      className="text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={{ pathname: "/privacy" }}
                      className="text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button className="w-full h-11 text-base font-medium rounded-lg">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Already have an account?{" "}
                <Link
                  href={{
                    pathname: "/login",
                  }}
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
