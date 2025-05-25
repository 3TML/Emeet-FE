"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            403
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Unauthorized Access
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sorry, you don't have permission to access this page. Please contact
            your administrator if you believe this is a mistake.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
