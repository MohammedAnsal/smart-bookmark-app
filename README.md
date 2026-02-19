# 🔖 Smart Bookmark App

A modern, real-time bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users can securely sign in with Google, add bookmarks, manage favourites, and see updates instantly across multiple tabs using Supabase Realtime.

---

## 🚀 Live Demo

🔗 https://smart-bookmarkk.vercel.app/

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Supabase Google OAuth
- **Database:** Supabase PostgreSQL
- **Realtime Engine:** Supabase Realtime
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **Deployment:** Vercel

---

## ✨ Core Features

- Google OAuth login (no email/password)
- Private user-based bookmarks
- Add, Edit, Delete bookmarks
- Favourite toggle system
- Realtime updates across multiple tabs
- Search functionality
- Client-side pagination
- Responsive design (mobile, tablet, desktop)
- Clean SaaS-style UI
- Protected dashboard routes

---

# 🔐 Supabase Implementation

Supabase is the backbone of this project.

It handles:

- Authentication
- Database
- Row Level Security (RLS)
- Realtime subscriptions

---

## 🗄 Database Schema

### Table: `bookmarks`

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `title` (text)
- `url` (text)
- `is_favorite` (boolean, default false)
- `created_at` (timestamp)

---

## 🔒 Row Level Security (RLS)

RLS policies ensure:

- Users can only access their own bookmarks
- No cross-user data exposure
- Secure database-level isolation

All queries are scoped by `user_id`.

---

# ⚡ Realtime Architecture

The dashboard subscribes to the `bookmarks` table using Supabase Realtime.

It listens for:

- INSERT
- UPDATE
- DELETE

This ensures:

- Adding a bookmark in one tab updates other tabs instantly
- Editing reflects everywhere
- Deleting removes across sessions without refresh

---

# 🧠 Learning Experience — First-Time Supabase Implementation

This project was my first time implementing **Supabase in a real-world full-stack setup**, and I approached it as an opportunity to deeply understand how authentication, database security, and realtime systems work together.

Rather than treating challenges as blockers, I used them as learning moments to better understand the internal behavior of Supabase and PostgreSQL.

---

## 🚀 What I Learned While Implementing Supabase

### 1️⃣ Authentication & Session Handling

Integrating Google OAuth with Supabase required:

- Understanding how sessions are managed
- Protecting routes in Next.js App Router
- Ensuring authenticated users are redirected properly
- Handling loading states during session validation

This helped me understand client-side vs server-side auth flows more clearly.

---

### 2️⃣ Row Level Security (RLS)

Setting up RLS policies was an important learning step.

I ensured:

- Users can only access their own bookmarks
- All queries are scoped by `user_id`
- No cross-user data leakage occurs

This improved my understanding of database-level security instead of relying only on frontend checks.

---

### 3️⃣ Realtime Subscriptions

Implementing Supabase Realtime required understanding how:

- INSERT
- UPDATE
- DELETE

events are streamed from PostgreSQL.

While working with DELETE events, I learned how PostgreSQL replication identity works and how it affects realtime filtering.

This deepened my understanding of database internals and event-driven systems.

---

### 4️⃣ Data Validation & Edge Cases

While building bookmark validation:

- I handled duplicate URL detection
- Normalized URLs to avoid false mismatches
- Managed realtime updates without triggering false duplicate errors

This strengthened my understanding of state synchronization and data normalization.

---

## 🎯 Overall Takeaway

Using Supabase for the first time was a valuable learning experience.

Through this project, I gained practical experience in:

- Authentication flows
- Database security with RLS
- Realtime data synchronization
- PostgreSQL behavior in production-like setups
- Structuring a full-stack Next.js application cleanly

This project significantly improved my confidence in working with backend-as-a-service platforms and realtime systems.
