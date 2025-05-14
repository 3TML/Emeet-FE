/**
 * API Fetcher Utility
 *
 * This utility provides a robust fetch wrapper with:
 * - Consistent error handling
 * - Automatic retries for network errors
 * - Timeout handling
 * - Response validation
 */

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

export type FetchOptions = RequestInit & {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
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
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
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
      const data = (await response.json()) as T;
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

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
    ...options,
  });
}

/**
 * POST request wrapper
 */
export function apiPost<T>(
  url: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT request wrapper
 */
export function apiPut<T>(
  url: string,
  data: any,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: "PUT",
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
    ...options,
  });
}
