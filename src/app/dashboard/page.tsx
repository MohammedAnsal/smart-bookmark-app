"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

import { getCurrentUser } from "@/lib/services/authService";
import {
  getBookmarks,
  addBookmark,
  subscribeToBookmarks,
  type Bookmark,
} from "@/lib/services/bookmarkService";

import LoadingSpinner   from "@/components/ui/LoadingSpinner";
import DashboardHeader  from "@/components/dashboard/DashboardHeader";
import BookmarkList     from "@/components/dashboard/BookmarkList";
import AddBookmarkModal from "@/components/dashboard/AddBookmarkModal";

import WelcomeStrip    from "./components/WelcomeStrip";
import StatsGrid       from "./components/StatsGrid";
import BookmarkHeader  from "./components/BookmarkHeader";
import Pagination      from "./components/Pagination";

type FavoriteFilter = "all" | "favorites";

const ITEMS_PER_PAGE = 4;

/* ─────────────────────────────────────────────────────────
   Dashboard — state-only orchestrator.
   All rendering is delegated to extracted components.
───────────────────────────────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();

  /* ── State ── */
  const [user,           setUser]           = useState<User | null>(null);
  const [bookmarks,      setBookmarks]      = useState<Bookmark[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>("all");
  const [visibleCount,   setVisibleCount]   = useState(ITEMS_PER_PAGE);

  /* ── Auth + initial load ── */
  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) { router.replace("/"); return; }
      setUser(u);
      setBookmarks(await getBookmarks());
      setLoading(false);
    })();
  }, [router]);

  /* ── Realtime ── */
  useEffect(() => {
    if (!user) return;
    const ch = subscribeToBookmarks(user.id, {
      onInsert: (row) => setBookmarks((p) => [row, ...p]),
      onUpdate: (row) => setBookmarks((p) => p.map((b) => (b.id === row.id ? row : b))),
      onDelete: (row) => setBookmarks((p) => p.filter((b) => b.id !== row.id)),
    });
    return () => { ch.unsubscribe(); };
  }, [user]);

  /* ── Reset pagination on filter / search change ── */
  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [searchQuery, favoriteFilter]);

  /* ── Handlers ── */
  const handleAdd = useCallback(async (title: string, url: string) => {
    const res = await addBookmark({ title, url });
    if (res) { toast.success("Bookmark added!"); setModalOpen(false); }
    else        toast.error("Failed to add bookmark");
  }, []);

  const handleUpdate = useCallback(
    (updated: Bookmark) =>
      setBookmarks((p) => p.map((b) => (b.id === updated.id ? updated : b))),
    []
  );

  const handleDelete = useCallback(
    (id: string) => setBookmarks((p) => p.filter((b) => b.id !== id)),
    []
  );

  const handleToggleFavorite = useCallback(
    (id: string, value: boolean) =>
      setBookmarks((p) => p.map((b) => (b.id === id ? { ...b, is_favorite: value } : b))),
    []
  );

  /* ── Derived data (memoised) ── */
  const filtered = useMemo(() => {
    const base =
      favoriteFilter === "favorites"
        ? bookmarks.filter((b) => b.is_favorite)
        : bookmarks;
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.url.toLowerCase().includes(q) ||
        (b.tag && b.tag.toLowerCase().includes(q))
    );
  }, [bookmarks, favoriteFilter, searchQuery]);

  const paginated = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const stats = useMemo(() => {
    const favoriteCount = bookmarks.filter((b) => b.is_favorite).length;
    const thisWeek = bookmarks.filter(
      (b) => Date.now() - new Date(b.created_at).getTime() < 7 * 86400_000
    ).length;
    const domains = new Set(
      bookmarks.map((b) => {
        try { return new URL(b.url.startsWith("http") ? b.url : `https://${b.url}`).hostname; }
        catch { return b.url; }
      })
    ).size;
    return { favoriteCount, thisWeek, domains };
  }, [bookmarks]);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  /* ── Loading / auth guard ── */
  if (loading || !user) return <LoadingSpinner message="Loading your bookmarks…" />;

  /* ── Render ── */
  return (
    <motion.div
      style={{ minHeight: "100vh", background: "#f8fdf9" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <DashboardHeader
        user={user}
        bookmarkCount={bookmarks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 80px" }}>

        <WelcomeStrip
          displayName={displayName}
          totalBookmarks={bookmarks.length}
        />

        <StatsGrid
          total={bookmarks.length}
          thisWeek={stats.thisWeek}
          favorites={stats.favoriteCount}
          domains={stats.domains}
        />

        <BookmarkHeader
          searchQuery={searchQuery}
          favoriteFilter={favoriteFilter}
          filteredCount={filtered.length}
          favoriteCount={stats.favoriteCount}
          onFilterChange={setFavoriteFilter}
          onNewBookmark={() => setModalOpen(true)}
        />

        <BookmarkList
          bookmarks={paginated}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />

        <Pagination
          totalItems={filtered.length}
          visibleCount={visibleCount}
          onLoadMore={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
        />

      </main>

      <AddBookmarkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
        mode="add"
        existingUrls={bookmarks.map((b) => b.url)}
      />
    </motion.div>
  );
}