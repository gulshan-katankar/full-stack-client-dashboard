# Project Context (GEMINI.md)

**App Name:** Taskbito / SaaS Client Dashboard
**Tech Stack:** Next.js 15 (App Router, Turbopack), Tailwind CSS v4, React (with Hooks), Supabase SSR, Zod (Form Validation), Sonner (Toasts), Lucide-React (Icons).
**Design System:** Premium SaaS aesthetic. Plus Jakarta Sans font, deep violet sidebar (`#1A1625`), off-white background (`#F8F9FA`), and heavily encapsulated UI components.

---

## 📖 What This App Is
This is a professional-grade, full-stack SaaS dashboard designed for managing client orders, specifically tailored for content packages or service deliverables. 
It features a "My Tasks" Kanban board for tracking order progress, a streamlined "New Client" form for onboarding, and a clean, responsive layout consisting of a global topbar and an expandable sidebar.

---

## ✅ What We Have Done So Far

### 1. UI & Architecture (Phase 1 & Phase 1.5 Redesign)
- **Scaffolding:** Set up the Next.js 15 project with Tailwind CSS v4.
- **Global Layout:** Implemented a persistent `Sidebar` (dark theme, sectioned) and a `Topbar` (with a globally functional search bar that updates URL `?q=` params).
- **Typography:** Switched the entire application's font to **Plus Jakarta Sans** for a geometric, premium feel.
- **New Client Onboarding:** Built a robust, responsive form at `/dashboard/clients/new` using standard HTML forms backed by `zod` for validation and `sonner` for toast notifications.
- **Kanban Board ("My Tasks"):** Completely transformed the `/dashboard/orders` route into a premium Kanban board featuring columns (To Do, In Progress, In Reviewed, Completed), priority tags, and avatar piles. 
- **Local Data Hook:** Built a `useOrders` hook leveraging `localStorage` to allow the Kanban board to reflect newly created clients/orders immediately without a backend.
- **Search Filtering:** The Topbar search input dynamically filters the Kanban board tasks in real-time.

### 2. Backend Scaffolding (Phase 3 Preparation)
- Installed `@supabase/ssr` and `@supabase/supabase-js`.
- Created Supabase utility clients: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, and `src/lib/supabase/middleware.ts`.
- Set up root `middleware.ts` for protecting routes.
- Scaffolded basic authentication route folders (`login`, `signup`, `callback`).

---

## 🚀 Instructions for Future Models

If you are picking up this project, you are stepping into **Phase 3: Supabase Auth & Database Integration**. 

**Where to pick up:**
1. **Authentication:** The Supabase SSR utilities are created, but the `login` and `signup` pages need to be fleshed out with UI and hooked up to `supabase.auth`.
2. **Database:** The Kanban board currently uses a mocked `useOrders` hook (`src/hooks/use-orders.ts`) tied to `localStorage`. You need to design the Supabase schema (e.g., `clients`, `orders`/`tasks`) and replace the local storage logic with real Supabase server/client calls.
3. **Design Consistency:** 
   - ALWAYS maintain the existing design language. Do not default back to standard Tailwind gray/blue.
   - Use `lucide-react` for any new icons.
   - The primary text color is `#0F172A`, the sidebar is `#1A1625`, and the main canvas is `#F8F9FA`.

**Gotchas:**
- We are using **Next.js 15** and **Tailwind v4**. Tailwind v4 does NOT use a `tailwind.config.ts` file; configuration is handled via CSS variables in `src/app/globals.css` using the `@theme` directive.
- The font *Plus Jakarta Sans* is injected directly into the `<body>` in `src/app/layout.tsx` using `className={jakarta.className}`. Do not attempt to use `font-sans` utilities unless mapped correctly in CSS.
