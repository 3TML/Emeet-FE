/**
 * API Fetcher Utility
 *
 * This utility provides a robust fetch wrapper with:
 * - Consistent error handling
 * - Automatic retries for network errors
 * - Timeout handling
 * - Response validation
 * - CORS handling
 */

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

export type FetchOptions = RequestInit & {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  credentials?: RequestCredentials;
};

/**
 * Enhanced fetch function with error handling, retries, and timeout
 */
export async function fetchWithRetry<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    retryDelay = RETRY_DELAY,
    credentials = "include", // Default to include credentials for CORS
    ...fetchOptions
  } = options;

  // Add default headers if not provided
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...fetchOptions.headers,
  };

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Setup fetch with abort signal
  const fetchWithTimeout = async (): Promise<Response> => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials, // Include credentials for CORS
        signal: controller.signal,
        mode: "cors", // Explicitly set CORS mode
      });

      // Handle different HTTP status codes
      if (!response.ok) {
        let errorMessage = `HTTP error ${response.status}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.message || errorText;
            } catch {
              errorMessage = errorText;
            }
          }
        } catch {
          // If we can't read the error text, use the status text
          errorMessage = response.statusText || errorMessage;
        }

        // Create a custom error with more details
        const error = new Error(errorMessage) as Error & {
          status?: number;
          statusText?: string;
          headers?: Headers;
        };
        error.status = response.status;
        error.statusText = response.statusText;
        error.headers = response.headers;
        throw error;
      }

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // Retry logic
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout();

      // Try to parse JSON, but handle empty responses gracefully
      const text = await response.text();
      if (!text) {
        return {} as T; // Return empty object for empty responses
      }

      try {
        return JSON.parse(text) as T;
      } catch (parseError) {
        console.warn("Failed to parse JSON response:", parseError);
        return text as unknown as T; // Return text if JSON parsing fails
      }
    } catch (error) {
      // Ensure we capture the full error information
      lastError = error instanceof Error ? error : new Error(String(error));

      // Enhanced error logging with more details
      const errorDetails = {
        url,
        errorMessage: lastError.message,
        errorName: lastError.name,
        errorStack: lastError.stack,
        status: (error as any)?.status || "unknown",
        statusText: (error as any)?.statusText || "unknown",
        headers: (error as any)?.headers
          ? Object.fromEntries((error as any).headers.entries())
          : "unknown",
        attempt: attempt + 1,
        timestamp: new Date().toISOString(),
      };

      console.error("API Request Failed:", {
        ...errorDetails,
        originalError: error,
      });

      // Network errors are retryable, other errors may not be
      const isNetworkError =
        error instanceof TypeError ||
        (error instanceof Error &&
          (error.message.includes("network") ||
            error.message.includes("timeout") ||
            error.message.includes("Failed to fetch")));

      // Don't retry if not a network error or if it's the last attempt
      if (!isNetworkError || attempt === retries) {
        console.error(
          `API request failed after ${attempt + 1} attempts:`,
          error
        );
        break;
      }

      // Wait before retrying
      console.warn(
        `Attempt ${attempt + 1} failed, retrying in ${retryDelay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw lastError || new Error("Request failed");
}

/**
 * GET request wrapper
 */
export function apiGet<T>(url: string, options: FetchOptions = {}): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "GET",
    credentials: "include", // Always include credentials for GET requests
    ...options,
  });
}

/**
 * POST request wrapper
 */
export function apiPost<T>(
  url: string,
  data: unknown,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "POST",
    credentials: "include", // Always include credentials for POST requests
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT request wrapper
 */
export function apiPut<T>(
  url: string,
  data: unknown,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "PUT",
    credentials: "include", // Always include credentials for PUT requests
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * DELETE request wrapper
 */
export function apiDelete<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "DELETE",
    credentials: "include", // Always include credentials for DELETE requests
    ...options,
  });
}
