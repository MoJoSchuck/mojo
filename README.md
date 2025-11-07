# mojo

A modern social media app built with **Next.js App Router**, **Clerk auth**, **Prisma + PostgreSQL**, and **shadcn/ui**.  
Create posts (with images), like, comment, follow users, and receive notifications — with real-time updates and a responsive UI.

<img width="1262" height="681" alt="Bildschirmfoto 2025-11-06 um 16 17 27" src="https://github.com/user-attachments/assets/f4906e51-32fe-4c5d-a781-719744fdd0ed" />

---

## ✨ Features

- 🔐 **Auth** with Clerk (sign in/out, server-side auth, user sync to DB)
- 📝 **Posts:** create text/image posts, list feed, delete own posts
- 💬 **Social:** like posts (optimistic UI), comment (with notifications), follow/unfollow
- 🔔 **Notifications:** like/comment/follow events, unread marking
- 👤 **Profile:** dynamic route `/profile/[username]` with posts, likes tabs, and edit profile
- 🧭 **Who to follow:** suggested users panel
- 🖼️ **Image uploads** via UploadThing
- 📱 **Responsive layout** with Navbar/Sidebar and mobile menu
- 🌗 **Dark/light theme** with next-themes

---

## 🧠 Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components, Server Actions)
- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** PostgreSQL + Prisma ORM
- **UI:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Uploads:** UploadThing
- **Utilities:** date-fns, lucide-react, react-hot-toast

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── layout.tsx                # Root layout, ClerkProvider, ThemeProvider, Navbar, Sidebar
│   ├── page.tsx                  # Home feed (syncs user, lists posts, shows who to follow)
│   ├── notifications/page.tsx
│   ├── profile/[username]/page.tsx
│   └── api/uploadthing/          # Upload route handler & core
├── actions/                      # Server actions (posts, users, profile, notifications)
├── components/                   # UI components (PostCard, CreatePost, Sidebar, Navbar, etc.)
├── lib/                          # Prisma client, utils
├── middleware.ts                 # Clerk middleware with recommended matcher
└── prisma/
    └── schema.prisma             # User, Post, Comment, Like, Follow, Notification
```

---

## 🧩 Data Model (Prisma)

- **User:** profile info and relations (posts, comments, likes, follows, notifications)
- **Post:** content, image, author, comments, likes
- **Comment:** content, author, post
- **Like:** composite (userId, postId)
- **Follow:** composite PK (followerId, followingId)
- **Notification:** enum type `LIKE | COMMENT | FOLLOW`; optional post/comment links

---

## 🧱 Notable Implementation Details

- **Server actions**
  - `post.action.ts`: createPost, getPosts, toggleLike (with notification), createComment (with notification), deletePost
  - `user.action.ts`: syncUser (syncs Clerk user image/name/email to DB), getUserByClerkId, getDbUserId, getRandomUsers, toggleFollow (with notification)
  - `profile.action.ts`: getProfileByUsername, getUserPosts, getUserLikedPosts, updateProfile, isFollowing
  - `notification.action.ts`: getNotifications, markNotificationsAsRead

- **Avatars**
  - ✅ Uses `object-cover object-center` for proper stretching
  - ✅ Prefers Clerk image URL (`user.imageUrl`) if available, else falls back to DB image

- **Caching / Revalidation**
  - Calls `revalidatePath("/")` after mutations and user syncs

- **Middleware**
  - Clerk middleware configured with App Router matcher in `src/middleware.ts`
  - Dynamic exports with `% dynamic = "force-dynamic"` to ensure auth context is available server-side

- **Mobile Navbar**
  - Profile links to `/profile/[username]`, derived from Clerk user (fallback to email local-part)

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Clerk account (Publishable + Secret Key)

### 2. Environment Variables

Create a `.env` file in the project root with:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# UploadThing
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
```

## 🧱 3. Install & Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

## 🧩 4. Run Dev Server

```bash
npm run dev
```

Then open: http://localhost:3000

## ☁️ Deployment

- Use your own server or deploy on Vercel (recommended)
- Ensure your Prisma schema is migrated on your production DB
- Set environment variables in your hosting platform
- Deploy as a standard Next.js App Router project

## Project URL

[Live Demo](https://mojo-psi-one.vercel.app)

## 📜 License

MIT
