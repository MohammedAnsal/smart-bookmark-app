import { supabase } from "@/lib/supabaseClient";

/**
 * Returns the currently authenticated user, or null if not logged in.
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/**
 * Returns the current session, or null if no active session.
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;
  return data.session;
}

/**
 * Initiates Google OAuth sign-in flow.
 * Redirects the browser to Google — returns an error string on failure.
 */
export async function signInWithGoogle(): Promise<string | null> {
  const origin =
    typeof window !== "undefined" ? window.location.origin : undefined;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) return error.message;
  return null;
}

/**
 * Signs the current user out.
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
