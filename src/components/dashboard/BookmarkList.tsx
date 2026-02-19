"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteBookmark,
  updateBookmark,
  toggleFavorite,
  type Bookmark,
} from "@/lib/services/bookmarkService";
import BookmarkCard from "@/components/dashboard/BookmarkCard";
import AddBookmarkModal from "@/components/dashboard/AddBookmarkModal";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onUpdate: (updated: Bookmark) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, value: boolean) => void;
}

export default function BookmarkList({
  bookmarks,
  onUpdate,
  onDelete,
  onToggleFavorite,
}: BookmarkListProps) {
  const [editTarget, setEditTarget] = useState<Bookmark | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const ok = await deleteBookmark(id);
    setDeletingId(null);
    if (ok) {
      onDelete(id);
      toast.success("Bookmark deleted");
    } else {
      toast.error("Failed to delete bookmark");
    }
  };

  const handleEditSave = async (title: string, url: string) => {
    if (!editTarget) return;
    const updated = await updateBookmark(editTarget.id, { title, url });
    if (updated) {
      onUpdate(updated);
      toast.success("Bookmark updated");
      setEditTarget(null);
    } else {
      toast.error("Failed to update bookmark");
    }
  };

  const handleToggleFavorite = async (bm: Bookmark) => {
    const next = !bm.is_favorite;
    // Optimistic update
    onToggleFavorite(bm.id, next);
    const res = await toggleFavorite(bm.id, next);
    if (!res) {
      // Revert on failure
      onToggleFavorite(bm.id, !next);
      toast.error("Failed to update favourite");
    } else {
      toast.success(next ? "Added to favourites ♥" : "Removed from favourites");
    }
  };

  /* ── Empty state ── */
  if (bookmarks.length === 0) {
    return (
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          style={{
            width: 80,
            height: 80,
            borderRadius: 22,
            marginBottom: 22,
            background: "linear-gradient(145deg,#f0fdf4,#dcfce7)",
            border: "1.5px solid rgba(34,197,94,0.20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.05, rotate: -4 }}
        >
          {/* shimmer */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg,rgba(255,255,255,0.7),transparent)",
              borderRadius: 22,
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(34,197,94,0.10)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        <motion.h3
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "#0a0f0d",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.3 }}
        >
          No bookmarks yet
        </motion.h3>
        <motion.p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: "#4b5e52",
            margin: 0,
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.3 }}
        >
          Click <strong style={{ color: "#22c55e" }}>Add Bookmark</strong> above
          to save your first link.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
        layout
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        <AnimatePresence mode="popLayout">
          {bookmarks.map((bm) => (
            <BookmarkCard
              key={bm.id}
              bookmark={bm}
              isDeleting={deletingId === bm.id}
              onEdit={() => setEditTarget(bm)}
              onDelete={() => handleDelete(bm.id)}
              onToggleFavorite={() => handleToggleFavorite(bm)}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      <AddBookmarkModal
        open={!!editTarget}
        initialTitle={editTarget?.title}
        initialUrl={editTarget?.url}
        onClose={() => setEditTarget(null)}
        onSave={handleEditSave}
        mode="edit"
      />
    </>
  );
}