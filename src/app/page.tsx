"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Star, Calendar, Search, Filter } from "lucide-react";
import LazyImage from "@/components/ui/lazy-image";
import LazySection from "@/components/ui/lazy-section";

// Define route types
type ExpertsRoute = Route<"/experts">;
type ExpertDetailRoute = Route<"/experts/[id]">;
type BookingRoute = Route<"/booking/[id]">;
type SignUpRoute = Route<"/signup">;
type CategoryRoute = Route<"/category/[slug]">;

type AppRoute =
  | ExpertsRoute
  | ExpertDetailRoute
  | BookingRoute
  | SignUpRoute
  | CategoryRoute;

export default function HomePage() {
  // In a real application, this would be fetched from an API
  const experts = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Business Strategy",
      bio: "Over 15 years of experience helping businesses optimize their strategies for growth and sustainability.",
      rating: 4.9,
      ratingCount: 127,
      price: "$150/hour",
      availability: "Available next week",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Prof. Michael Johnson",
      specialty: "Marketing Consultant",
      bio: "Former CMO at Fortune 500 companies with expertise in digital marketing transformation and brand strategy.",
      rating: 4.8,
      ratingCount: 94,
      price: "$175/hour",
      availability: "Available today",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      specialty: "Financial Advisor",
      bio: "Specialized in personal and business finance optimization, investment strategy, and financial planning.",
      rating: 4.9,
      ratingCount: 156,
      price: "$185/hour",
      availability: "Available tomorrow",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      name: "James Rodriguez, MBA",
      specialty: "Startup Consultant",
      bio: "Helped over 40 startups secure funding and scale operations. Expert in lean startup methodology.",
      rating: 4.7,
      ratingCount: 72,
      price: "$140/hour",
      availability: "Limited availability",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Leadership Coach",
      bio: "Executive coach with experience working with C-suite executives at leading tech and finance companies.",
      rating: 4.8,
      ratingCount: 115,
      price: "$200/hour",
      availability: "Available next week",
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: 6,
      name: "Robert Chang, PhD",
      specialty: "Data Science",
      bio: "Expert in machine learning, predictive analytics, and data-driven business strategy.",
      rating: 4.9,
      ratingCount: 89,
      price: "$165/hour",
      availability: "Available today",
      image: "https://i.pravatar.cc/150?img=12",
    },
  ];

  const categories = [
    {
      name: "Business Strategy",
      slug: "business-strategy",
    },
    {
      name: "Marketing",
      slug: "marketing",
    },
    {
      name: "Finance",
      slug: "finance",
    },
    {
      name: "Leadership",
      slug: "leadership",
    },
    {
      name: "Data Science",
      slug: "data-science",
    },
    {
      name: "Product Management",
      slug: "product-management",
    },
    {
      name: "Software Development",
      slug: "software-development",
    },
    {
      name: "HR & Recruitment",
      slug: "hr-recruitment",
    },
  ];

  const benefits = [
    {
      title: "Verified Experts",
      description:
        "All experts on our platform undergo a strict verification process to ensure quality.",
      icon: "👨‍🎓",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Book appointments that fit your schedule, with options for different time zones.",
      icon: "🗓️",
    },
    {
      title: "Secure Payments",
      description:
        "Our platform uses industry-standard security to protect all transactions.",
      icon: "🔒",
    },
    {
      title: "Money-Back Guarantee",
      description:
        "Not satisfied with your consultation? We offer a money-back guarantee.",
      icon: "💰",
    },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-primary/90 to-blue-600 text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-[30%] -right-[10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
        </div>

        {/* Hero content */}
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 tracking-tight sm:text-5xl md:text-6xl">
              Connect with Industry Experts
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
              Get personalized guidance and solutions from top professionals
              across various fields. Elevate your knowledge and skills today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={"/signup" as SignUpRoute}
                className="inline-flex items-center justify-center h-12 px-6 font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Create an Account
              </Link>
              <Link
                href={"/experts" as ExpertsRoute}
                className="inline-flex items-center justify-center h-12 px-6 font-medium rounded-lg bg-primary-foreground/20 border border-white/30 backdrop-blur-sm text-white hover:bg-primary-foreground/30 transition-colors"
              >
                Browse All Experts
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 text-gray-50 dark:text-gray-900"
            fill="currentColor"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V92.83C0,92.83,165.21,112.07,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Search section */}
      <LazySection className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transform -translate-y-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Find the right expert for you
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    placeholder="Search by name, specialty, or keyword"
                    className="w-full pl-10 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <select className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="h-12 px-5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Benefits section */}
      <LazySection
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
        delay={0.1}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose ExpertMeet?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our platform connects you with verified professionals, giving you
              access to the expertise you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Expert listings */}
      <LazySection
        className="py-16 md:py-24 bg-white dark:bg-gray-800"
        delay={0.2}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Experts
            </h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="aspect-[4/3] relative">
                  <LazyImage
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {expert.name}
                  </h3>
                  <p className="text-primary dark:text-blue-400 font-medium mb-2">
                    {expert.specialty}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {expert.bio}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">
                        {expert.rating}
                      </span>
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                        ({expert.ratingCount})
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {expert.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-500">
                      {expert.availability}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/experts/${expert.id}` as ExpertDetailRoute}
                      className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/booking/${expert.id}` as BookingRoute}
                      className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={"/experts" as ExpertsRoute}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              View All Experts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </LazySection>

      {/* Categories section */}
      <LazySection
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
        delay={0.3}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find the expertise you need by exploring our categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}` as CategoryRoute}
                key={category.slug}
                className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </LazySection>

      {/* Testimonials Section */}
      <LazySection
        className="py-16 md:py-24 bg-white dark:bg-gray-800"
        delay={0.4}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Don&apos;t just take our word for it - hear from some of our
              satisfied users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                &quot;The expert I consulted provided invaluable insights that
                helped me navigate a complex business decision. Well worth the
                investment!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden mr-3">
                  <LazyImage
                    src="https://i.pravatar.cc/150?img=32"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Michael D.
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Startup Founder
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                &quot;I&apos;ve booked multiple sessions with different experts,
                and each one has been incredibly helpful. The platform is easy
                to use and the experts are top-notch.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden mr-3">
                  <LazyImage
                    src="https://i.pravatar.cc/150?img=29"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Sarah T.
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Marketing Director
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                &quot;As someone just starting out in my field, the guidance I
                received was incredible. My expert was patient, knowledgeable,
                and genuinely invested in my success.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden mr-3">
                  <LazyImage
                    src="https://i.pravatar.cc/150?img=15"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    James L.
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Graduate Student
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* CTA section */}
      <LazySection className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to share your expertise?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join our platform as an expert and connect with clients who need
              your specialized knowledge. Set your own rates and availability.
            </p>
            <Link
              href="/register?expert=true"
              className="inline-flex items-center justify-center h-12 px-8 font-medium rounded-lg bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Register as an Expert
            </Link>
          </div>
        </div>
      </LazySection>
    </>
  );
}
