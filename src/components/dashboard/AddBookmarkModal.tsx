// // "use client";

// // import { useEffect, useRef, useState, useMemo } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { isValidUrl, normaliseUrl } from "@/lib/utils/urlValidation";

// // interface AddBookmarkModalProps {
// //   open: boolean;
// //   onClose: () => void;
// //   onSave: (title: string, url: string) => Promise<void>;
// //   initialTitle?: string;
// //   initialUrl?: string;
// //   mode?: "add" | "edit";
// //   existingUrls?: string[];
// // }

// // const ease = [0.25, 0.1, 0.25, 1] as const;

// // export default function AddBookmarkModal({
// //   open,
// //   onClose,
// //   onSave,
// //   initialTitle = "",
// //   initialUrl = "",
// //   mode = "add",
// //   existingUrls = [],
// // }: AddBookmarkModalProps) {
// //   const [title, setTitle] = useState(initialTitle);
// //   const [url, setUrl] = useState(initialUrl);
// //   const [saving, setSaving] = useState(false);
// //   const [urlError, setUrlError] = useState<string | null>(null);
// //   const [urlTouched, setUrlTouched] = useState(false);
// //   const titleRef = useRef<HTMLInputElement>(null);

// //   const normalisedExisting = useMemo(
// //     () => new Set(existingUrls.map(normaliseUrl)),
// //     [existingUrls]
// //   );

// //   useEffect(() => {
// //     if (open) {
// //       setTitle(initialTitle);
// //       setUrl(initialUrl);
// //       setUrlError(null);
// //       setUrlTouched(false);
// //       setTimeout(() => titleRef.current?.focus(), 100);
// //     }
// //   }, [open, initialTitle, initialUrl]);

// //   useEffect(() => {
// //     const handler = (e: KeyboardEvent) => {
// //       if (e.key === "Escape" && open) onClose();
// //     };
// //     window.addEventListener("keydown", handler);
// //     return () => window.removeEventListener("keydown", handler);
// //   }, [open, onClose]);

// //   useEffect(() => {
// //     if (open) {
// //       const prev = document.body.style.overflow;
// //       document.body.style.overflow = "hidden";
// //       return () => {
// //         document.body.style.overflow = prev;
// //       };
// //     }
// //   }, [open]);

// //   const handleUrlChange = (value: string) => {
// //     setUrl(value);
// //     if (urlError) setUrlError(null);
// //   };

// //   const handleUrlBlur = () => {
// //     setUrlTouched(true);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!title.trim() || !url.trim()) return;

// //     if (!isValidUrl(url)) {
// //       setUrlError("Enter a valid URL (e.g. https://google.com or github.com).");
// //       setUrlTouched(true);
// //       return;
// //     }

// //     if (mode === "add" && normalisedExisting.has(normaliseUrl(url))) {
// //       setUrlError("This link is already in your bookmarks.");
// //       return;
// //     }

// //     setSaving(true);
// //     await onSave(title.trim(), url.trim());
// //     setSaving(false);
// //     setTitle("");
// //     setUrl("");
// //     setUrlError(null);
// //     setUrlTouched(false);
// //   };

// //   const isDuplicate = mode === "add" && url.trim() !== "" && normalisedExisting.has(normaliseUrl(url));
// //   const isInvalidFormat = urlTouched && url.trim() !== "" && !isValidUrl(url);
// //   const hasUrlError = isDuplicate || isInvalidFormat || !!urlError;

// //   return (
// //     <AnimatePresence>
// //       {open && (
// //         <>
// //           <motion.div
// //             className="fixed inset-0 z-40"
// //             style={{
// //               background: "rgba(10,15,13,0.4)",
// //               backdropFilter: "blur(10px)",
// //               WebkitBackdropFilter: "blur(10px)",
// //             }}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.25, ease }}
// //             onClick={onClose}
// //             aria-hidden
// //           />

// //           <motion.div
// //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.2 }}
// //           >
// //             <motion.div
// //               role="dialog"
// //               aria-modal="true"
// //               aria-labelledby="modal-title"
// //               className="w-full max-w-[420px] rounded-2xl sm:rounded-3xl bg-white my-auto overflow-hidden"
// //               style={{
// //                 boxShadow: "0 32px 64px rgba(10,15,13,0.12), 0 0 0 1px rgba(34,197,94,0.06)",
// //               }}
// //               initial={{ scale: 0.96, opacity: 0, y: 12 }}
// //               animate={{ scale: 1, opacity: 1, y: 0 }}
// //               exit={{ scale: 0.96, opacity: 0, y: 8 }}
// //               transition={{ type: "spring", stiffness: 380, damping: 28 }}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               {/* Header */}
// //               <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-[rgba(34,197,94,0.08)]">
// //                 <div className="flex items-start justify-between gap-4">
// //                   <div>
// //                     <h2
// //                       id="modal-title"
// //                       className="text-xl font-bold tracking-tight"
// //                       style={{ fontFamily: "'Syne', sans-serif", color: "#0a0f0d", letterSpacing: "-0.02em" }}
// //                     >
// //                       {mode === "edit" ? "Edit Bookmark" : "Add Bookmark"}
// //                     </h2>
// //                     <p className="text-sm text-[#4b5e52] mt-1">
// //                       {mode === "edit" ? "Update title and URL below." : "Save a new link to your collection."}
// //                     </p>
// //                   </div>
// //                   <motion.button
// //                     type="button"
// //                     onClick={onClose}
// //                     whileHover={{ scale: 1.06 }}
// //                     whileTap={{ scale: 0.94 }}
// //                     className="flex items-center justify-center rounded-xl w-9 h-9 text-[#4b5e52] hover:bg-[#f0fdf4] hover:text-[#0a0f0d] transition-colors duration-200"
// //                     aria-label="Close"
// //                   >
// //                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
// //                       <path d="M18 6L6 18M6 6l12 12" />
// //                     </svg>
// //                   </motion.button>
// //                 </div>
// //               </div>

// //               <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-7">
// //                 <div className="space-y-5">
// //                   <div>
// //                     <label
// //                       htmlFor="bm-title"
// //                       className="block text-xs font-semibold uppercase tracking-wider text-[#4b5e52] mb-2"
// //                       style={{ fontFamily: "'Syne', sans-serif" }}
// //                     >
// //                       Title
// //                     </label>
// //                     <input
// //                       ref={titleRef}
// //                       id="bm-title"
// //                       type="text"
// //                       value={title}
// //                       onChange={(e) => setTitle(e.target.value)}
// //                       placeholder="e.g. MDN Web Docs"
// //                       required
// //                       className="w-full rounded-xl px-4 py-3 text-sm text-[#0a0f0d] placeholder:text-[#94a39e] outline-none transition-all duration-200 border-2 focus:border-[#33C35C] focus:ring-2 focus:ring-[#33C35C]/20"
// //                       style={{
// //                         background: "#f8fdf9",
// //                         borderColor: "rgba(34,197,94,0.18)",
// //                         fontFamily: "'DM Sans', sans-serif",
// //                       }}
// //                     />
// //                   </div>

// //                   <div>
// //                     <label
// //                       htmlFor="bm-url"
// //                       className="block text-xs font-semibold uppercase tracking-wider text-[#4b5e52] mb-2"
// //                       style={{ fontFamily: "'Syne', sans-serif" }}
// //                     >
// //                       URL
// //                     </label>
// //                     <input
// //                       id="bm-url"
// //                       type="text"
// //                       value={url}
// //                       onChange={(e) => handleUrlChange(e.target.value)}
// //                       placeholder="https://developer.mozilla.org"
// //                       required
// //                       className="w-full rounded-xl px-4 py-3 text-sm text-[#0a0f0d] placeholder:text-[#94a39e] outline-none transition-all duration-200 border-2"
// //                       style={{
// //                         background: hasUrlError ? "#fef2f2" : "#f8fdf9",
// //                         borderColor: hasUrlError ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.18)",
// //                         fontFamily: "'DM Sans', sans-serif",
// //                       }}
// //                       onFocus={(e) => {
// //                         if (!hasUrlError) e.target.style.borderColor = "#33C35C";
// //                         e.target.style.boxShadow = "0 0 0 3px rgba(51,195,92,0.15)";
// //                       }}
// //                       onBlur={(e) => {
// //                         handleUrlBlur();
// //                         if (!hasUrlError) e.target.style.borderColor = "rgba(34,197,94,0.18)";
// //                         e.target.style.boxShadow = "none";
// //                       }}
// //                     />
// //                     <AnimatePresence>
// //                       {(isDuplicate || isInvalidFormat || urlError) && (
// //                         <motion.p
// //                           className="flex items-center gap-2 mt-2 text-xs font-medium text-[#dc2626]"
// //                           initial={{ opacity: 0, y: -2 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           exit={{ opacity: 0, y: -2 }}
// //                           transition={{ duration: 0.2 }}
// //                         >
// //                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
// //                             <circle cx="12" cy="12" r="10" />
// //                             <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
// //                           </svg>
// //                           {urlError ||
// //                             (isDuplicate
// //                               ? "This link is already in your bookmarks."
// //                               : "Enter a valid URL (e.g. https://google.com or github.com).")}
// //                         </motion.p>
// //                       )}
// //                     </AnimatePresence>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-3 mt-6 sm:mt-7">
// //                   <motion.button
// //                     type="button"
// //                     onClick={onClose}
// //                     whileHover={{ scale: 1.01 }}
// //                     whileTap={{ scale: 0.99 }}
// //                     className="flex-1 rounded-xl py-3 text-sm font-semibold text-[#4b5e52] transition-colors duration-200 hover:bg-[#f0fdf4] border-2 border-[rgba(34,197,94,0.15)]"
// //                     style={{ fontFamily: "'Syne', sans-serif", background: "#f8fdf9" }}
// //                   >
// //                     Cancel
// //                   </motion.button>
// //                   <motion.button
// //                     type="submit"
// //                     disabled={saving || !title.trim() || !url.trim() || isDuplicate || isInvalidFormat}
// //                     whileHover={{ scale: 1.01 }}
// //                     whileTap={{ scale: 0.99 }}
// //                     className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-60 transition-opacity duration-200"
// //                     style={{
// //                       background: "linear-gradient(135deg, #33C35C, #22a34a)",
// //                       fontFamily: "'Syne', sans-serif",
// //                       boxShadow: "0 4px 14px rgba(51,195,92,0.35)",
// //                     }}
// //                   >
// //                     {saving ? (
// //                       <>
// //                         <motion.div
// //                           className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
// //                           animate={{ rotate: 360 }}
// //                           transition={{ duration: 0.7, ease: "linear", repeat: Infinity }}
// //                         />
// //                         Saving…
// //                       </>
// //                     ) : (
// //                       mode === "edit" ? "Save Changes" : "Add Bookmark"
// //                     )}
// //                   </motion.button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// "use client";

// import { useEffect, useRef, useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { isValidUrl, normaliseUrl } from "@/lib/utils/urlValidation";

// interface AddBookmarkModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (title: string, url: string) => Promise<void>;
//   initialTitle?: string;
//   initialUrl?: string;
//   mode?: "add" | "edit";
//   existingUrls?: string[];
// }

// export default function AddBookmarkModal({
//   open, onClose, onSave,
//   initialTitle = "", initialUrl = "",
//   mode = "add", existingUrls = [],
// }: AddBookmarkModalProps) {
//   const [title, setTitle] = useState(initialTitle);
//   const [url, setUrl] = useState(initialUrl);
//   const [saving, setSaving] = useState(false);
//   const [urlError, setUrlError] = useState<string | null>(null);
//   const [urlTouched, setUrlTouched] = useState(false);
//   const [titleFocused, setTitleFocused] = useState(false);
//   const [urlFocused, setUrlFocused] = useState(false);
//   const titleRef = useRef<HTMLInputElement>(null);

//   const normalisedExisting = useMemo(() => new Set(existingUrls.map(normaliseUrl)), [existingUrls]);

//   useEffect(() => {
//     if (open) {
//       setTitle(initialTitle); setUrl(initialUrl);
//       setUrlError(null); setUrlTouched(false);
//       setTimeout(() => titleRef.current?.focus(), 100);
//     }
//   }, [open, initialTitle, initialUrl]);

//   useEffect(() => {
//     const h = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [open, onClose]);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   const handleUrlChange = (v: string) => { setUrl(v); if (urlError) setUrlError(null); };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !url.trim()) return;
//     if (!isValidUrl(url)) { setUrlError("Enter a valid URL (e.g. https://google.com)."); setUrlTouched(true); return; }
//     if (mode === "add" && normalisedExisting.has(normaliseUrl(url))) { setUrlError("This link is already saved."); return; }
//     setSaving(true);
//     await onSave(title.trim(), url.trim());
//     setSaving(false);
//     setTitle(""); setUrl(""); setUrlError(null); setUrlTouched(false);
//   };

//   const isDuplicate = mode === "add" && url.trim() !== "" && normalisedExisting.has(normaliseUrl(url));
//   const isInvalidFormat = urlTouched && url.trim() !== "" && !isValidUrl(url);
//   const hasUrlError = isDuplicate || isInvalidFormat || !!urlError;

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 z-40"
//             style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={onClose}
//             aria-hidden
//           />

//           {/* Modal */}
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative w-full max-w-[420px] rounded-3xl my-auto overflow-hidden"
//               style={{ background: "#111820", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(51,195,92,0.06) inset" }}
//               initial={{ scale: 0.93, y: 24, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.93, y: 16, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 400, damping: 30 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Top decorative bar */}
//               <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #33C35C 40%, #16a34a 60%, transparent 100%)", opacity: 0.8 }} />

//               {/* Header */}
//               <div className="px-7 pt-6 pb-0 flex items-start justify-between">
//                 <div>
//                   {/* Mode pill */}
//                   <span
//                     className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-widest mb-3"
//                     style={{ background: "rgba(51,195,92,0.12)", color: "#4ade80", border: "1px solid rgba(51,195,92,0.2)", fontFamily: "'DM Sans', sans-serif" }}
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#33C35C] inline-block" />
//                     {mode === "edit" ? "Editing" : "New Bookmark"}
//                   </span>
//                   <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#f0f6fc", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
//                     {mode === "edit" ? "Edit bookmark" : "Save a link"}
//                   </h2>
//                   <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
//                     {mode === "edit" ? "Update the title or URL below." : "Add a new link to your collection."}
//                   </p>
//                 </div>

//                 <motion.button
//                   type="button"
//                   onClick={onClose}
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 18 }}
//                   className="flex items-center justify-center rounded-xl mt-0.5 shrink-0"
//                   style={{ width: 32, height: 32, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
//                   aria-label="Close"
//                 >
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                     <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
//                   </svg>
//                 </motion.button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="px-7 pt-6 pb-7 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Syne', sans-serif" }}>
//                     Title
//                   </label>
//                   <div className="relative">
//                     <div
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
//                       style={{ color: titleFocused ? "#33C35C" : "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
//                     >
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                         <path d="M4 7h16M4 12h10M4 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                       </svg>
//                     </div>
//                     <input
//                       ref={titleRef}
//                       type="text"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       onFocus={() => setTitleFocused(true)}
//                       onBlur={() => setTitleFocused(false)}
//                       placeholder="e.g. MDN Web Docs"
//                       required
//                       className="w-full pl-10 pr-4 text-sm outline-none"
//                       style={{
//                         height: 46,
//                         background: titleFocused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
//                         border: `1.5px solid ${titleFocused ? "rgba(51,195,92,0.5)" : "rgba(255,255,255,0.08)"}`,
//                         borderRadius: 14,
//                         color: "#f0f6fc",
//                         fontFamily: "'DM Sans', sans-serif",
//                         boxShadow: titleFocused ? "0 0 0 4px rgba(51,195,92,0.08)" : "none",
//                         transition: "all 0.2s ease",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* URL */}
//                 <div>
//                   <label className="block text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Syne', sans-serif" }}>
//                     URL
//                   </label>
//                   <div className="relative">
//                     <div
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
//                       style={{ color: hasUrlError ? "#f87171" : urlFocused ? "#33C35C" : "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
//                     >
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
//                         <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="2" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       value={url}
//                       onChange={(e) => handleUrlChange(e.target.value)}
//                       onFocus={() => setUrlFocused(true)}
//                       onBlur={() => { setUrlTouched(true); setUrlFocused(false); }}
//                       placeholder="https://developer.mozilla.org"
//                       required
//                       className="w-full pl-10 pr-4 text-sm outline-none"
//                       style={{
//                         height: 46,
//                         background: hasUrlError ? "rgba(239,68,68,0.06)" : urlFocused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
//                         border: `1.5px solid ${hasUrlError ? "rgba(239,68,68,0.4)" : urlFocused ? "rgba(51,195,92,0.5)" : "rgba(255,255,255,0.08)"}`,
//                         borderRadius: 14,
//                         color: "#f0f6fc",
//                         fontFamily: "'DM Sans', sans-serif",
//                         boxShadow: hasUrlError ? "0 0 0 4px rgba(239,68,68,0.06)" : urlFocused ? "0 0 0 4px rgba(51,195,92,0.08)" : "none",
//                         transition: "all 0.2s ease",
//                       }}
//                     />
//                   </div>

//                   <AnimatePresence>
//                     {(isDuplicate || isInvalidFormat || urlError) && (
//                       <motion.p
//                         className="flex items-center gap-1.5 mt-2 text-[12px]"
//                         style={{ color: "#f87171", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
//                         initial={{ opacity: 0, y: -6, height: 0 }}
//                         animate={{ opacity: 1, y: 0, height: "auto" }}
//                         exit={{ opacity: 0, y: -6, height: 0 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
//                           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
//                           <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                         </svg>
//                         {urlError || (isDuplicate ? "This link is already saved." : "Enter a valid URL with a real domain.")}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Divider */}
//                 <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "4px 0" }} />

//                 {/* Actions */}
//                 <div className="flex gap-3">
//                   <motion.button
//                     type="button"
//                     onClick={onClose}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="flex-1 rounded-2xl text-sm font-semibold transition-colors duration-200"
//                     style={{ height: 48, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "'Syne', sans-serif" }}
//                     onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
//                   >
//                     Cancel
//                   </motion.button>

//                   <motion.button
//                     type="submit"
//                     disabled={saving || !title.trim() || !url.trim() || isDuplicate || isInvalidFormat}
//                     whileHover={{ scale: 1.02, y: -1 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="flex-1 flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     style={{ height: 48, background: "linear-gradient(135deg, #33C35C 0%, #16a34a 100%)", boxShadow: "0 6px 24px rgba(51,195,92,0.35), inset 0 1px 0 rgba(255,255,255,0.18)", fontFamily: "'Syne', sans-serif" }}
//                   >
//                     {saving ? (
//                       <>
//                         <motion.span style={{ display:"block",width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff" }} animate={{ rotate:360 }} transition={{ duration:0.7,ease:"linear",repeat:Infinity }} />
//                         Saving…
//                       </>
//                     ) : (
//                       <>
//                         {mode === "edit" ? (
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                         ) : (
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
//                         )}
//                         {mode === "edit" ? "Save Changes" : "Add Bookmark"}
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// "use client";

// import { useEffect, useRef, useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { isValidUrl, normaliseUrl } from "@/lib/utils/urlValidation";

// interface AddBookmarkModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (title: string, url: string) => Promise<void>;
//   initialTitle?: string;
//   initialUrl?: string;
//   mode?: "add" | "edit";
//   existingUrls?: string[];
// }

// export default function AddBookmarkModal({
//   open,
//   onClose,
//   onSave,
//   initialTitle = "",
//   initialUrl = "",
//   mode = "add",
//   existingUrls = [],
// }: AddBookmarkModalProps) {
//   const [title, setTitle] = useState(initialTitle);
//   const [url, setUrl] = useState(initialUrl);
//   const [saving, setSaving] = useState(false);
//   const [urlError, setUrlError] = useState<string | null>(null);
//   const [urlTouched, setUrlTouched] = useState(false);
//   const [titleFocused, setTitleFocused] = useState(false);
//   const [urlFocused, setUrlFocused] = useState(false);
//   const titleRef = useRef<HTMLInputElement>(null);

//   const normalisedExisting = useMemo(
//     () => new Set(existingUrls.map(normaliseUrl)),
//     [existingUrls],
//   );

//   /* sync on open */
//   useEffect(() => {
//     if (open) {
//       setTitle(initialTitle);
//       setUrl(initialUrl);
//       setUrlError(null);
//       setUrlTouched(false);
//       setTimeout(() => titleRef.current?.focus(), 100);
//     }
//   }, [open, initialTitle, initialUrl]);

//   /* escape */
//   useEffect(() => {
//     const h = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && open) onClose();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [open, onClose]);

//   /* scroll lock */
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   const handleUrlChange = (v: string) => {
//     setUrl(v);
//     if (urlError) setUrlError(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !url.trim()) return;
//     if (!isValidUrl(url)) {
//       setUrlError("Enter a valid URL (e.g. https://google.com or github.com).");
//       setUrlTouched(true);
//       return;
//     }
//     if (mode === "add" && normalisedExisting.has(normaliseUrl(url))) {
//       setUrlError("This link is already in your bookmarks.");
//       return;
//     }
//     setSaving(true);
//     await onSave(title.trim(), url.trim());
//     setSaving(false);
//     setTitle("");
//     setUrl("");
//     setUrlError(null);
//     setUrlTouched(false);
//   };

//   const isDuplicate =
//     mode === "add" &&
//     url.trim() !== "" &&
//     normalisedExisting.has(normaliseUrl(url));
//   const isInvalidFormat = urlTouched && url.trim() !== "" && !isValidUrl(url);
//   const hasUrlError = isDuplicate || isInvalidFormat || !!urlError;
//   const canSubmit =
//     !saving &&
//     !!title.trim() &&
//     !!url.trim() &&
//     !isDuplicate &&
//     !isInvalidFormat;

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* ── Backdrop ── */}
//           <motion.div
//             key="backdrop"
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 40,
//               background: "rgba(15,23,42,0.40)",
//               backdropFilter: "blur(10px)",
//               WebkitBackdropFilter: "blur(10px)",
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.28 }}
//             onClick={onClose}
//             aria-hidden
//           />

//           {/* ── Panel wrapper ── */}
//           <motion.div
//             key="panel-wrap"
//             style={{
//               position: "fixed",
//               inset: 0,
//               zIndex: 50,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 16,
//               overflowY: "auto",
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <motion.div
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 width: "100%",
//                 maxWidth: 440,
//                 background: "#fff",
//                 borderRadius: 24,
//                 overflow: "hidden",
//                 boxShadow:
//                   "0 40px 100px rgba(15,23,42,0.16), 0 8px 32px rgba(15,23,42,0.08), 0 0 0 1.5px rgba(34,197,94,0.12)",
//                 margin: "auto",
//               }}
//               initial={{ scale: 0.93, y: 24, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.93, y: 16, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 400, damping: 30 }}
//             >
//               {/* Green top accent bar */}
//               <div
//                 style={{
//                   height: 3,
//                   background:
//                     "linear-gradient(90deg, #22c55e 0%, #4ade80 50%, #16a34a 100%)",
//                 }}
//               />

//               {/* Header */}
//               <div
//                 style={{
//                   padding: "24px 28px 0",
//                   display: "flex",
//                   alignItems: "flex-start",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   {/* Badge */}
//                   <div
//                     style={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: 6,
//                       padding: "3px 10px 3px 8px",
//                       borderRadius: 99,
//                       background: "#f0fdf4",
//                       border: "1px solid rgba(34,197,94,0.22)",
//                       marginBottom: 10,
//                     }}
//                   >
//                     <span
//                       style={{
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         background: "#22c55e",
//                         display: "inline-block",
//                       }}
//                     />
//                     <span
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 11,
//                         fontWeight: 600,
//                         color: "#16a34a",
//                         letterSpacing: "0.02em",
//                       }}
//                     >
//                       {mode === "edit" ? "EDITING" : "NEW BOOKMARK"}
//                     </span>
//                   </div>

//                   <h2
//                     style={{
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 800,
//                       fontSize: "1.3rem",
//                       color: "#0f172a",
//                       letterSpacing: "-0.03em",
//                       lineHeight: 1.15,
//                       margin: 0,
//                     }}
//                   >
//                     {mode === "edit" ? "Edit bookmark" : "Save a new link"}
//                   </h2>
//                   <p
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 13,
//                       color: "#94a3b8",
//                       marginTop: 5,
//                       lineHeight: 1.4,
//                     }}
//                   >
//                     {mode === "edit"
//                       ? "Update the title or URL below."
//                       : "Add a link to your personal collection."}
//                   </p>
//                 </div>

//                 {/* Close btn */}
//                 <motion.button
//                   type="button"
//                   onClick={onClose}
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 18 }}
//                   style={{
//                     width: 34,
//                     height: 34,
//                     borderRadius: 10,
//                     border: "1.5px solid #e2e8f0",
//                     background: "#f8fafc",
//                     color: "#64748b",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     flexShrink: 0,
//                     marginTop: 2,
//                   }}
//                   aria-label="Close"
//                 >
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                     <path
//                       d="M18 6L6 18M6 6l12 12"
//                       stroke="currentColor"
//                       strokeWidth="2.2"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </motion.button>
//               </div>

//               {/* Form */}
//               <form
//                 onSubmit={handleSubmit}
//                 style={{
//                   padding: "22px 28px 28px",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 18,
//                 }}
//               >
//                 {/* Title field */}
//                 <div>
//                   <label
//                     style={{
//                       display: "block",
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 700,
//                       fontSize: 11,
//                       color: "#64748b",
//                       letterSpacing: "0.06em",
//                       textTransform: "uppercase",
//                       marginBottom: 8,
//                     }}
//                   >
//                     Title
//                   </label>
//                   <div style={{ position: "relative" }}>
//                     <span
//                       style={{
//                         position: "absolute",
//                         left: 13,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         pointerEvents: "none",
//                         color: titleFocused ? "#22c55e" : "#94a3b8",
//                         transition: "color 0.2s",
//                       }}
//                     >
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                       >
//                         <path
//                           d="M4 7h16M4 12h10M4 17h6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                     </span>
//                     <input
//                       ref={titleRef}
//                       type="text"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       onFocus={() => setTitleFocused(true)}
//                       onBlur={() => setTitleFocused(false)}
//                       placeholder="e.g. MDN Web Docs"
//                       required
//                       style={{
//                         width: "100%",
//                         height: 48,
//                         paddingLeft: 40,
//                         paddingRight: 14,
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 14,
//                         color: "#0f172a",
//                         background: titleFocused ? "#fff" : "#f8fafc",
//                         border: `1.5px solid ${titleFocused ? "#22c55e" : "#e2e8f0"}`,
//                         borderRadius: 13,
//                         outline: "none",
//                         boxSizing: "border-box",
//                         boxShadow: titleFocused
//                           ? "0 0 0 4px rgba(34,197,94,0.10)"
//                           : "none",
//                         transition: "all 0.22s ease",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* URL field */}
//                 <div>
//                   <label
//                     style={{
//                       display: "block",
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 700,
//                       fontSize: 11,
//                       color: "#64748b",
//                       letterSpacing: "0.06em",
//                       textTransform: "uppercase",
//                       marginBottom: 8,
//                     }}
//                   >
//                     URL
//                   </label>
//                   <div style={{ position: "relative" }}>
//                     <span
//                       style={{
//                         position: "absolute",
//                         left: 13,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         pointerEvents: "none",
//                         color: hasUrlError
//                           ? "#ef4444"
//                           : urlFocused
//                             ? "#22c55e"
//                             : "#94a3b8",
//                         transition: "color 0.2s",
//                       }}
//                     >
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                       >
//                         <circle
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         />
//                         <path
//                           d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         />
//                       </svg>
//                     </span>
//                     <input
//                       type="text"
//                       value={url}
//                       onChange={(e) => handleUrlChange(e.target.value)}
//                       onFocus={() => setUrlFocused(true)}
//                       onBlur={() => {
//                         setUrlTouched(true);
//                         setUrlFocused(false);
//                       }}
//                       placeholder="https://developer.mozilla.org"
//                       required
//                       style={{
//                         width: "100%",
//                         height: 48,
//                         paddingLeft: 40,
//                         paddingRight: 14,
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 14,
//                         color: "#0f172a",
//                         background: hasUrlError
//                           ? "#fff5f5"
//                           : urlFocused
//                             ? "#fff"
//                             : "#f8fafc",
//                         border: `1.5px solid ${hasUrlError ? "#fca5a5" : urlFocused ? "#22c55e" : "#e2e8f0"}`,
//                         borderRadius: 13,
//                         outline: "none",
//                         boxSizing: "border-box",
//                         boxShadow: hasUrlError
//                           ? "0 0 0 4px rgba(239,68,68,0.08)"
//                           : urlFocused
//                             ? "0 0 0 4px rgba(34,197,94,0.10)"
//                             : "none",
//                         transition: "all 0.22s ease",
//                       }}
//                     />
//                   </div>

//                   {/* Error */}
//                   <AnimatePresence>
//                     {(isDuplicate || isInvalidFormat || urlError) && (
//                       <motion.div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 6,
//                           marginTop: 8,
//                           padding: "7px 12px",
//                           background: "#fff5f5",
//                           borderRadius: 9,
//                           border: "1px solid rgba(239,68,68,0.2)",
//                         }}
//                         initial={{ opacity: 0, y: -6, scaleY: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scaleY: 1 }}
//                         exit={{ opacity: 0, y: -6, scaleY: 0.9 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <svg
//                           width="12"
//                           height="12"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           style={{ color: "#ef4444", flexShrink: 0 }}
//                         >
//                           <circle
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           />
//                           <path
//                             d="M12 8v4M12 16h.01"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                         <span
//                           style={{
//                             fontFamily: "'DM Sans', sans-serif",
//                             fontSize: 12,
//                             color: "#ef4444",
//                             fontWeight: 500,
//                           }}
//                         >
//                           {urlError ||
//                             (isDuplicate
//                               ? "This link is already in your bookmarks."
//                               : "Enter a valid URL with a real domain.")}
//                         </span>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Divider */}
//                 <div style={{ height: 1, background: "#f1f5f9" }} />

//                 {/* Buttons */}
//                 <div style={{ display: "flex", gap: 10 }}>
//                   <motion.button
//                     type="button"
//                     onClick={onClose}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       flex: 1,
//                       height: 50,
//                       borderRadius: 14,
//                       border: "1.5px solid #e2e8f0",
//                       background: "#f8fafc",
//                       color: "#64748b",
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 700,
//                       fontSize: 14,
//                       cursor: "pointer",
//                       transition: "background 0.15s, color 0.15s",
//                     }}
//                     onMouseEnter={(e) => {
//                       const el = e.currentTarget as HTMLElement;
//                       el.style.background = "#f1f5f9";
//                       el.style.color = "#0f172a";
//                     }}
//                     onMouseLeave={(e) => {
//                       const el = e.currentTarget as HTMLElement;
//                       el.style.background = "#f8fafc";
//                       el.style.color = "#64748b";
//                     }}
//                   >
//                     Cancel
//                   </motion.button>

//                   <motion.button
//                     type="submit"
//                     disabled={!canSubmit}
//                     whileHover={canSubmit ? { scale: 1.02, y: -1 } : {}}
//                     whileTap={canSubmit ? { scale: 0.97 } : {}}
//                     style={{
//                       flex: 1,
//                       height: 50,
//                       borderRadius: 14,
//                       border: "none",
//                       background: canSubmit
//                         ? "linear-gradient(135deg, #22c55e, #16a34a)"
//                         : "#e2e8f0",
//                       color: canSubmit ? "#fff" : "#94a3b8",
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 700,
//                       fontSize: 14,
//                       cursor: canSubmit ? "pointer" : "not-allowed",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 8,
//                       boxShadow: canSubmit
//                         ? "0 6px 20px rgba(34,197,94,0.28), inset 0 1px 0 rgba(255,255,255,0.22)"
//                         : "none",
//                       transition:
//                         "background 0.2s, box-shadow 0.2s, color 0.2s",
//                     }}
//                   >
//                     {saving ? (
//                       <>
//                         <motion.span
//                           style={{
//                             display: "block",
//                             width: 14,
//                             height: 14,
//                             borderRadius: "50%",
//                             border: "2.5px solid rgba(255,255,255,0.3)",
//                             borderTopColor: "#fff",
//                           }}
//                           animate={{ rotate: 360 }}
//                           transition={{
//                             duration: 0.7,
//                             ease: "linear",
//                             repeat: Infinity,
//                           }}
//                         />
//                         Saving…
//                       </>
//                     ) : (
//                       <>
//                         {mode === "edit" ? (
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                           >
//                             <path
//                               d="M20 6L9 17l-5-5"
//                               stroke="currentColor"
//                               strokeWidth="2.5"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                           >
//                             <path
//                               d="M12 5v14M5 12h14"
//                               stroke="currentColor"
//                               strokeWidth="2.5"
//                               strokeLinecap="round"
//                             />
//                           </svg>
//                         )}
//                         {mode === "edit" ? "Save Changes" : "Add Bookmark"}
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValidUrl, normaliseUrl } from "@/lib/utils/urlValidation";

interface AddBookmarkModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, url: string) => Promise<void>;
  initialTitle?: string;
  initialUrl?: string;
  mode?: "add" | "edit";
  existingUrls?: string[];
}

export default function AddBookmarkModal({
  open, onClose, onSave,
  initialTitle = "", initialUrl = "",
  mode = "add", existingUrls = [],
}: AddBookmarkModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [urlTouched, setUrlTouched] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  const [urlFocused, setUrlFocused] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  // Tracks the URL just submitted so the reactive isDuplicate check
  // can exclude it during the brief window between onSave() resolving
  // and the Supabase realtime event updating existingUrls.
  const justSubmittedRef = useRef<string | null>(null);

  const normalisedExisting = useMemo(
    () => new Set(existingUrls.map(normaliseUrl)),
    [existingUrls]
  );

  useEffect(() => {
    if (open) {
      setTitle(initialTitle); setUrl(initialUrl);
      setUrlError(null); setUrlTouched(false);
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [open, initialTitle, initialUrl]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleUrlChange = (v: string) => { setUrl(v); if (urlError) setUrlError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    if (!isValidUrl(url)) {
      setUrlError("Enter a valid URL (e.g. https://google.com)."); setUrlTouched(true); return;
    }
    if (mode === "add" && normalisedExisting.has(normaliseUrl(url))) {
      setUrlError("This link is already in your bookmarks."); return;
    }
    // Mark this URL as "in-flight" so isDuplicate ignores it
    // if the realtime event fires before the modal fully unmounts.
    justSubmittedRef.current = normaliseUrl(url);
    setSaving(true);
    await onSave(title.trim(), url.trim());
    // Close before state reset so modal is gone when realtime fires.
    onClose();
    justSubmittedRef.current = null;
    setSaving(false);
    setTitle(""); setUrl(""); setUrlError(null); setUrlTouched(false);
  };

  const isDuplicate =
    mode === "add" &&
    url.trim() !== "" &&
    normalisedExisting.has(normaliseUrl(url)) &&
    normaliseUrl(url) !== justSubmittedRef.current;
  const isInvalidFormat = urlTouched && url.trim() !== "" && !isValidUrl(url);
  const hasUrlError     = isDuplicate || isInvalidFormat || !!urlError;
  const canSubmit       = !saving && !!title.trim() && !!url.trim() && !isDuplicate && !isInvalidFormat;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            style={{ position:"fixed", inset:0, zIndex:40, background:"rgba(10,15,13,0.42)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.28 }}
            onClick={onClose} aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="panel"
            style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16, overflowY:"auto" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              style={{ width:"100%", maxWidth:440, background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 40px 100px rgba(10,15,13,0.14), 0 8px 32px rgba(0,0,0,0.07), 0 0 0 1.5px rgba(34,197,94,0.12)", margin:"auto" }}
              initial={{ scale:0.93, y:26, opacity:0 }}
              animate={{ scale:1, y:0, opacity:1 }}
              exit={{ scale:0.93, y:16, opacity:0 }}
              transition={{ type:"spring", stiffness:400, damping:30 }}
            >
              {/* Top accent bar */}
              <div style={{ height:3, background:"linear-gradient(90deg, #22c55e 0%, #4ade80 55%, #16a34a 100%)" }}/>

              {/* Header */}
              <div style={{ padding:"24px 28px 0", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                <div>
                  {/* Eyebrow matching landing page */}
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                    <div style={{ width:18, height:1.5, background:"#22c55e", flexShrink:0 }}/>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:10.5, letterSpacing:"0.13em", textTransform:"uppercase", color:"#16a34a" }}>
                      {mode === "edit" ? "Editing" : "New Bookmark"}
                    </span>
                  </div>

                  <h2 style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontWeight:400, fontSize:"1.55rem", color:"#0a0f0d", letterSpacing:"-0.02em", lineHeight:1.15, margin:0 }}>
                    {mode === "edit" ? "Edit bookmark" : "Save a new link"}
                  </h2>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, color:"#4b5e52", marginTop:6, fontWeight:300, lineHeight:1.55 }}>
                    {mode === "edit" ? "Update the title or URL below." : "Add a link to your personal collection."}
                  </p>
                </div>

                {/* Close */}
                <motion.button
                  type="button" onClick={onClose}
                  whileHover={{ scale:1.1, rotate:90 }}
                  whileTap={{ scale:0.9 }}
                  transition={{ type:"spring", stiffness:400, damping:18 }}
                  style={{ width:34, height:34, borderRadius:10, border:"1.5px solid rgba(34,197,94,0.18)", background:"#f8fdf9", color:"#4b5e52", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, marginTop:2 }}
                  aria-label="Close"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ padding:"22px 28px 28px", display:"flex", flexDirection:"column", gap:18 }}>

                {/* Title */}
                <div>
                  <label style={{ display:"block", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:10.5, color:"#9aab9f", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>
                    Title
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color: titleFocused ? "#22c55e" : "#9aab9f", transition:"color 0.2s", display:"flex" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M4 12h10M4 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <input
                      ref={titleRef} type="text" value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onFocus={() => setTitleFocused(true)}
                      onBlur={() => setTitleFocused(false)}
                      placeholder="e.g. MDN Web Docs"
                      required
                      style={{
                        width:"100%", height:48, paddingLeft:40, paddingRight:14,
                        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#0a0f0d",
                        background: titleFocused ? "#fff" : "#f8fdf9",
                        border:`1.5px solid ${titleFocused ? "#22c55e" : "rgba(34,197,94,0.18)"}`,
                        borderRadius:13, outline:"none", boxSizing:"border-box",
                        boxShadow: titleFocused ? "0 0 0 4px rgba(34,197,94,0.10)" : "none",
                        transition:"all 0.22s ease",
                      }}
                    />
                  </div>
                </div>

                {/* URL */}
                <div>
                  <label style={{ display:"block", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:10.5, color:"#9aab9f", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>
                    URL
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color: hasUrlError ? "#ef4444" : urlFocused ? "#22c55e" : "#9aab9f", transition:"color 0.2s", display:"flex" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </span>
                    <input
                      type="text" value={url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      onFocus={() => setUrlFocused(true)}
                      onBlur={() => { setUrlTouched(true); setUrlFocused(false); }}
                      placeholder="https://developer.mozilla.org"
                      required
                      style={{
                        width:"100%", height:48, paddingLeft:40, paddingRight:14,
                        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#0a0f0d",
                        background: hasUrlError ? "#fff8f8" : urlFocused ? "#fff" : "#f8fdf9",
                        border:`1.5px solid ${hasUrlError ? "#fca5a5" : urlFocused ? "#22c55e" : "rgba(34,197,94,0.18)"}`,
                        borderRadius:13, outline:"none", boxSizing:"border-box",
                        boxShadow: hasUrlError ? "0 0 0 4px rgba(239,68,68,0.08)" : urlFocused ? "0 0 0 4px rgba(34,197,94,0.10)" : "none",
                        transition:"all 0.22s ease",
                      }}
                    />
                  </div>

                  <AnimatePresence>
                    {(isDuplicate || isInvalidFormat || urlError) && (
                      <motion.div
                        style={{ display:"flex", alignItems:"center", gap:7, marginTop:9, padding:"8px 12px", background:"#fff8f8", borderRadius:10, border:"1px solid rgba(239,68,68,0.20)" }}
                        initial={{ opacity:0, y:-5, scaleY:0.9 }} animate={{ opacity:1, y:0, scaleY:1 }}
                        exit={{ opacity:0, y:-5, scaleY:0.9 }}
                        transition={{ duration:0.18 }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color:"#ef4444", flexShrink:0 }}>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12.5, color:"#ef4444", fontWeight:500 }}>
                          {urlError || (isDuplicate ? "This link is already in your bookmarks." : "Enter a valid URL with a real domain.")}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div style={{ height:1, background:"rgba(34,197,94,0.10)" }}/>

                {/* Buttons */}
                <div style={{ display:"flex", gap:10 }}>
                  <motion.button
                    type="button" onClick={onClose}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    style={{ flex:1, height:50, borderRadius:14, border:"1.5px solid rgba(34,197,94,0.18)", background:"#f8fdf9", color:"#4b5e52", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, cursor:"pointer", transition:"background 0.15s, color 0.15s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background="#f0fdf4"; el.style.color="#0a0f0d"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background="#f8fdf9"; el.style.color="#4b5e52"; }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit" disabled={!canSubmit}
                    whileHover={canSubmit ? { scale:1.02, y:-1 } : {}}
                    whileTap={canSubmit ? { scale:0.97 } : {}}
                    style={{ flex:1, height:50, borderRadius:14, border:"none", background: canSubmit ? "linear-gradient(135deg,#22c55e,#16a34a)" : "#e2e8f0", color: canSubmit ? "#fff" : "#94a3b8", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, cursor: canSubmit ? "pointer" : "not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: canSubmit ? "0 6px 20px rgba(34,197,94,0.28), inset 0 1px 0 rgba(255,255,255,0.22)" : "none", transition:"background 0.2s, box-shadow 0.2s, color 0.2s" }}
                  >
                    {saving ? (
                      <>
                        <motion.span style={{ display:"block", width:14, height:14, borderRadius:"50%", border:"2.5px solid rgba(255,255,255,0.3)", borderTopColor:"#fff" }} animate={{ rotate:360 }} transition={{ duration:0.7, ease:"linear", repeat:Infinity }}/>
                        Saving…
                      </>
                    ) : (
                      <>
                        {mode === "edit"
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                        }
                        {mode === "edit" ? "Save Changes" : "Add Bookmark"}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}