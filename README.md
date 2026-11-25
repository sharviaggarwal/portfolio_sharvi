# Sharvi Aggarwal — Personal Portfolio & Private Admin Studio

A modular, full-stack editorial portfolio built with **React, TypeScript, Tailwind CSS, Framer Motion, Express, and SQLite (`node:sqlite`)**, complete with a **private `/admin` Content Management Dashboard** and persistent file uploads.

---

## Architecture & Persistence

- **Frontend (`src/`)**: React + TypeScript + Vite + Framer Motion. Reads live published content from `GET /api/portfolio` via `PortfolioContext`, while keeping static initial fallbacks in `src/data/` so the public portfolio renders smoothly with zero layout shift.
- **Backend (`server/`)**: Express API (`server/index.mjs`) with:
  - **SQLite Database (`server/data/portfolio.db`)**: Automatically initialized and seeded with all portfolio content on first startup.
  - **Persistent File Uploads (`server/uploads/`)**: Images (`JPG`, `PNG`, `WebP`, `GIF`) and documents (`PDF`) uploaded from `/admin` are stored persistently on disk and served at `/uploads/...`.
  - **Private Authentication (`server/auth.mjs`)**: Salted `scrypt` password verification (`ADMIN_PASSWORD_HASH` in `server/.env`), constant-time comparisons, rate-limited login (`POST /api/auth/login`), and HMAC-SHA256 signed `HttpOnly` session cookies. **No passwords, secrets, or database credentials exist in frontend code.**
  - **Schema Validation (`server/validation.mjs`)**: Every admin mutation is validated server-side with Zod.
- **Optional Supabase Cloud Schema (`supabase/schema.sql`)**: Evaluated against the existing workspace (which had no Supabase keys configured for this portfolio). SQLite + disk storage works immediately out of the box, and `supabase/schema.sql` is included with RLS policies if you decide to migrate to Supabase Postgres + Storage later.

---

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure or change your private admin login (stored hashed in `server/.env`):**
   ```bash
   npm run admin:setup
   ```
   *(Enter your admin email and a password of at least 8 characters. `server/.env` is gitignored and never bundled into the frontend.)*

3. **Run both the backend API (`:4000`) and Vite frontend (`:5175`):**
   ```bash
   npm run dev
   ```
   - Public Portfolio: `http://localhost:5175/`
   - Private Admin Dashboard: `http://localhost:5175/admin`

---

## How to Log In & Manage Your Portfolio (`/admin`)

1. Open `/admin` in your browser (not linked in the public navbar).
2. Sign in with the email and password configured in `server/.env`.
3. Use the left sidebar to manage:
   - **Projects**: Add/edit/delete projects with title, short & detailed descriptions, technologies, category, cover image upload, multi-screenshot upload, problem statement, engineering approach, architecture workflow, metrics, GitHub URL, live demo URL, project date, **Featured** toggle, **Published** toggle, and **Preview Before Publishing**.
   - **Internships & Work** / **Leadership** / **Achievements & Awards** / **Certifications**: Manage company/organization, role, duration/date, responsibilities, technologies, certificate/supporting image or PDF uploads, and links.
   - **Technical Skills**: Add/edit/delete skills, assign categories & icons, and link them to projects or your Shared General Toolkit.
   - **Education & Milestones**: Update degree, institution, CGPA, and extra milestones.
   - **Moving Memories**: Upload/edit/delete polaroids in the Tech World Moving Memories reel.
   - **Profile & Resume**: Upload a replacement **Resume PDF** or **portrait photo** persistently.
4. Click **View Live Site ↗** at the top right to see published updates immediately on the public portfolio. Unpublishing an entry hides it from the public site while keeping it editable in `/admin`.

---

## Production Deployment Guide

### Option 1: Single Full-Stack Node Service (Recommended — Render / Railway / Fly.io)
Because the Express server serves both the `/api` + `/uploads` backend and the built `dist/` React SPA from one origin, `HttpOnly` auth cookies work seamlessly with zero CORS complexity.

1. **Build Command:**
   ```bash
   npm install && npm run build
   ```
2. **Start Command:**
   ```bash
   npm start
   ```
3. **Environment Variables (set in host dashboard, never commit):**
   - `NODE_ENV=production`
   - `PORT=4000` *(or host-assigned `PORT`)*
   - `COOKIE_SECURE=true` *(when served over HTTPS)*
   - `JWT_SECRET=<long-random-64-char-hex-string>`
   - `ADMIN_EMAIL=<your-admin-email>`
   - `ADMIN_PASSWORD_HASH=<generated-via-npm-run-admin:setup>`
4. **Persistent Storage (Important!):**
   - Mount a **Persistent Disk** (e.g., on Render) covering `/app/server/data` and `/app/server/uploads` (or mount one persistent disk at `/app/server/storage` and symlink/configure paths) so your SQLite database and uploaded images/PDFs survive redeploys and restarts.

### Option 2: Vercel Frontend + Render Backend
If deploying `dist/` on Vercel and `server/` separately on Render, add Vercel `rewrites` in `vercel.json` forwarding `/api/(.*)` and `/uploads/(.*)` to your Render backend URL so `/admin` authentication cookies remain same-origin.
