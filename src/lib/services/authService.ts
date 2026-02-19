import { supabase } from "@/lib/supabaseClient";


export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}


export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;
  return data.session;
}


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


export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
