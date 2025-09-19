import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client initialization.
 * Uses CRA-style environment variables:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_KEY
 *
 * Do NOT hardcode secrets. Ask the orchestrator to set these in the .env file.
 */

// PUBLIC_INTERFACE
export function getSupabaseClient() {
  /** This is a public function returning a singleton Supabase client instance. */
  const url = process.env.REACT_APP_SUPABASE_URL;
  const key = process.env.REACT_APP_SUPABASE_KEY;

  if (!url || !key) {
    // Provide a helpful message during development/test without crashing the app render.
    // We still initialize a dummy client to avoid undefined errors in code paths not using network.
    // For real connectivity, ensure environment variables are set.
    if (typeof window !== "undefined" && !window.__SUPABASE_ENV_WARNED__) {
      // eslint-disable-next-line no-console
      console.warn(
        "Supabase env vars missing. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment."
      );
      window.__SUPABASE_ENV_WARNED__ = true;
    }
  }

  // Singleton pattern on window during development to avoid duplicate clients on HMR
  if (typeof window !== "undefined") {
    if (!window.__supabaseClient) {
      window.__supabaseClient = createClient(url || "http://localhost", key || "public-anon-key", {
        auth: { persistSession: false },
      });
    }
    return window.__supabaseClient;
  }

  // SSR/other: create a new client; CRA typically doesn't SSR though
  return createClient(url || "http://localhost", key || "public-anon-key", {
    auth: { persistSession: false },
  });
}
