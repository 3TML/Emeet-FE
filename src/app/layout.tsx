"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserProvider } from "@/providers/UserProvider";
import AuthWrapper from "@/components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

// Get Google Client ID from environment variable
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable");
}

const metadata: Metadata = {
  title: "ExpertMeet - Connect with Industry Experts",
  description:
    "Book meetings with industry experts across various fields for personalized guidance and solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <UserProvider>
                <AuthWrapper>
                  <div className="flex min-h-screen flex-col">
                    {!isDashboard && <Navbar />}
                    <main className="flex-grow pt-1">{children}</main>
                    {/* <Footer /> */}
                  </div>
                  <Toaster position="top-center" richColors />
                </AuthWrapper>
              </UserProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
