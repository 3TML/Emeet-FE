import { redirect } from "next/navigation";

export type UserRole = "admin" | "expert" | "user";

export const ROLES = {
  ADMIN: "admin",
  EXPERT: "expert",
  USER: "user",
} as const;

// Define detailed route permissions for each role
export const ROLE_ROUTES = {
  [ROLES.ADMIN]: {
    // Admin dashboard and management routes
    dashboard: ["/dashboard/admin", "/admin/dashboard"],
    userManagement: ["/admin/users"],
    expertManagement: ["/admin/experts"],
    categoryManagement: ["/admin/categories"],
    transactionManagement: ["/admin/transactions"],
    scheduleManagement: ["/admin/schedules"],
    reports: ["/admin/reports"],
    settings: ["/dashboard/settings"],
  },
  [ROLES.EXPERT]: {
    // Expert dashboard and work routes
    dashboard: ["/dashboard/expert"],
    work: ["/work"],
    bookings: ["/booking"],
    profile: ["/profile"],
    settings: ["/dashboard/settings"],
  },
  [ROLES.USER]: {
    // User routes
    home: ["/user/home"],
    bookings: ["/booking"],
    profile: ["/profile"],
    find: ["/find"],
    pricing: ["/pricing"],
  },
} as const;

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/about",
  "/unauthorized",
];

// Helper to check if a route is public
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(
    (route: string) => path === route || path.startsWith(`${route}/`)
  );
}

// Helper to get all allowed routes for a role
export function getAllowedRoutes(role: UserRole): string[] {
  const roleConfig = ROLE_ROUTES[role];
  return Object.values(roleConfig).flat();
}

// Enhanced role access check with detailed permissions
export function checkRoleAccess(path: string, role: UserRole | null): boolean {
  if (!role || isPublicRoute(path)) return true;

  const roleConfig = ROLE_ROUTES[role];
  if (!roleConfig) return false;

  // Check if the path matches any of the allowed routes for the role
  return Object.values(roleConfig).some((routes: string[]) =>
    routes.some(
      (route: string) => path === route || path.startsWith(`${route}/`)
    )
  );
}

// Get the required role for a specific path
export function getRequiredRole(path: string): UserRole | null {
  for (const [role, routes] of Object.entries(ROLE_ROUTES)) {
    if (
      Object.values(routes).some((routeList: string[]) =>
        routeList.some(
          (route: string) => path === route || path.startsWith(`${route}/`)
        )
      )
    ) {
      return role as UserRole;
    }
  }
  return null;
}

// Client-side auth utilities
export const clientAuth = {
  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  // Get role from localStorage
  getRole: (): UserRole | null => {
    if (typeof window === "undefined") return null;
    const role = localStorage.getItem("userRole");
    return (role as UserRole) || null;
  },

  // Set auth data in localStorage
  setAuth: (token: string, role: UserRole): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("lastActivity", Date.now().toString());
  },

  // Clear auth data from localStorage
  clearAuth: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("lastActivity");
  },

  // Check if session has timed out (30 minutes)
  checkSessionTimeout: (): boolean => {
    if (typeof window === "undefined") return false;
    const lastActivity = localStorage.getItem("lastActivity");
    if (!lastActivity) return true;

    const lastActivityTime = parseInt(lastActivity, 10);
    const now = Date.now();
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

    if (now - lastActivityTime > SESSION_TIMEOUT) {
      clientAuth.clearAuth();
      return true;
    }

    // Update last activity
    localStorage.setItem("lastActivity", now.toString());
    return false;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!clientAuth.getToken() && !clientAuth.checkSessionTimeout();
  },

  // Check if user has required role
  hasRole: (requiredRole?: UserRole): boolean => {
    if (typeof window === "undefined") return false;
    const currentRole = clientAuth.getRole();
    if (!currentRole) return false;
    if (!requiredRole) return true;
    return currentRole === requiredRole;
  },
};

// Cache user data for 5 minutes
const userCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getUserData(userId: string, fetchFn: () => Promise<any>) {
  const cached = userCache.get(userId);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchFn();
  userCache.set(userId, { data, timestamp: now });
  return data;
}

// Rate limiting helper
export const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
};
