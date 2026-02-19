import { supabase } from "@/lib/supabaseClient";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { isValidUrl } from "@/lib/utils/urlValidation";

export interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url: string;
  tag?: string;
  emoji?: string;
  created_at: string;
  is_favorite?: boolean;
}

/** Fetches all bookmarks for the currently authenticated user. */
export async function getBookmarks(): Promise<Bookmark[]> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch bookmarks:", error.message);
    return [];
  }
  return data ?? [];
}

/** Adds a new bookmark for the current user. */
export async function addBookmark(
  bookmark: Pick<Bookmark, "title" | "url">,
): Promise<Bookmark | null> {
  // Server-side URL guard
  if (!isValidUrl(bookmark.url)) {
    console.error("Invalid URL rejected by service layer:", bookmark.url);
    return null;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error("User not authenticated");
    return null;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        user_id: userData.user.id,
        title: bookmark.title,
        url: bookmark.url,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to add bookmark:", error.message);
    return null;
  }

  return data;
}

/** Updates an existing bookmark by ID. */
export async function updateBookmark(
  id: string,
  updates: Pick<Bookmark, "title" | "url">
): Promise<Bookmark | null> {
  // Server-side URL guard
  if (!isValidUrl(updates.url)) {
    console.error("Invalid URL rejected by service layer:", updates.url);
    return null;
  }
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.error("User not authenticated");
    return null;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userData.user.id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Failed to update bookmark:", error.message);
    return null;
  }
  if (!data) {
    console.error("Update matched no rows — check RLS policies or bookmark ID");
    return null;
  }
  return data;
}

/** Toggles the is_favorite flag on a bookmark. */
export async function toggleFavorite(
  id: string,
  value: boolean,
): Promise<Bookmark | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.error("User not authenticated");
    return null;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .update({ is_favorite: value })
    .eq("id", id)
    .eq("user_id", userData.user.id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Failed to toggle favourite:", error.message);
    return null;
  }
  return data;
}

/** Deletes a bookmark by its ID. */
export async function deleteBookmark(id: string): Promise<boolean> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.error("User not authenticated");
    return false;
  }

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", userData.user.id);

  if (error) {
    console.error("Failed to delete bookmark:", error.message);
    return false;
  }
  return true;
}

/**
 * Subscribes to real-time bookmark changes for a specific user.
 * Returns the channel so the caller can unsubscribe on cleanup.
 */
export function subscribeToBookmarks(
  userId: string,
  callbacks: {
    onInsert: (row: Bookmark) => void;
    onUpdate: (row: Bookmark) => void;
    onDelete: (row: Bookmark) => void;
  }
): RealtimeChannel {
  const channel = supabase
    .channel(`bookmarks:user:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "bookmarks",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => callbacks.onInsert(payload.new as Bookmark)
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "bookmarks",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => callbacks.onUpdate(payload.new as Bookmark)
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "bookmarks",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => callbacks.onDelete(payload.old as Bookmark)
    )
    .subscribe();

  return channel;
}
