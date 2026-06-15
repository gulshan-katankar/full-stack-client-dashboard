# Full-Stack SaaS Client Dashboard — Content Writing Business

A client-facing dashboard for a content writing agency. Clients can view order progress, create new content orders, manage settings, and receive notifications — all behind secure Supabase authentication.

---

## Tech Stack

| Layer       | Technology                                               | Notes                                      |
|-------------|----------------------------------------------------------|--------------------------------------------|
| Framework   | **Next.js 15** (App Router, TypeScript)                  | `create-next-app@latest` with `src/` dir   |
| Styling     | **Tailwind CSS v3**                                      | Installed via `create-next-app` prompt     |
| Auth & DB   | **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) | PKCE flow, cookie-based sessions, RLS      |
| Deployment  | **Netlify**                                              | Auto-detects Next.js, zero-config          |
| Fonts       | **Google Fonts** (Inter / Plus Jakarta Sans)             | Via `next/font/google`                     |
| Icons       | **Lucide React**                                         | Lightweight, tree-shakeable                |
| Charts      | **Recharts**                                             | For dashboard analytics visuals            |
| Forms       | **React Hook Form + Zod**                                | Validation for new order form              |
| Dates       | **date-fns**                                             | Lightweight date formatting                |
| Toasts      | **Sonner**                                               | Beautiful toast notifications              |

---

## Phased Workflow

We will follow **exactly** the phased approach you outlined:

```
Phase 1 (Core UI) --> Phase 2 (Local Data & Routing) --> Phase 3 (Supabase Auth + DB) --> Phase 4 (Landing Page) --> Phase 5 (E2E Sweep & Deploy)
```

---

## Phase 1 — Build Core UI from Screenshot Inspiration

> **Goal:** Pixel-perfect signed-in pages styled from your screenshot. No data logic — pure UI shells.

### Pages to Build

| Route                      | Page              | Description                                                                          |
|----------------------------|-------------------|--------------------------------------------------------------------------------------|
| `/dashboard`               | Dashboard Home    | Overview with stats cards, recent orders table, progress indicators, activity feed   |
| `/dashboard/orders`        | All Orders        | Filterable/sortable table of all content orders with status badges                   |
| `/dashboard/orders/new`    | New Order Form    | Multi-step or single-page form to submit a new content request                       |
| `/dashboard/orders/[id]`   | Order Detail      | Full order view with timeline, deliverables, revision history, messaging              |
| `/dashboard/settings`      | Settings          | Profile, notification prefs, billing info, API keys, team members                    |
| `/dashboard/notifications` | Notifications     | Notification center / bell dropdown                                                  |

### Shared UI Components

| Component                              | Purpose                                                              |
|----------------------------------------|----------------------------------------------------------------------|
| `Sidebar`                              | Navigation sidebar with links, logo, user avatar, collapse toggle    |
| `TopBar`                               | Breadcrumbs, search, notification bell, user dropdown                |
| `DashboardLayout`                      | Wraps all `/dashboard/*` pages with Sidebar + TopBar                 |
| `StatsCard`                            | Animated stat card (icon, value, label, trend arrow)                 |
| `StatusBadge`                          | Color-coded pill for order statuses                                  |
| `OrderTable`                           | Reusable data table with sort/filter/pagination                      |
| `ProgressBar`                          | Visual progress indicator for order completion                       |
| `EmptyState`                           | Illustrated empty state for zero-data scenarios                      |
| `Modal`                                | Reusable modal/dialog component                                      |
| `Button`, `Input`, `Select`, `Textarea`| Form primitives with consistent styling                              |

### Design System Setup

- **Tailwind config:** Custom color palette, border-radius tokens, box-shadow scales, animation keyframes
- **CSS variables:** For theme colors enabling dark/light mode switching
- **Typography scale:** Using Inter or Plus Jakarta Sans via `next/font`
- **Dark mode support:** Tailwind `darkMode: 'class'` with toggle in settings

---

## Phase 2 — Local Mock Data & Interactive Routing

> **Goal:** All pages are functional with realistic fake data. Navigation, filtering, sorting, form submission all work locally.

### Mock Data Layer

```
src/lib/mock-data.ts
```

- Array of 15–20 sample orders with varied statuses, dates, word counts, writers, content types
- User profile object
- Notification items
- Dashboard aggregate stats

### Content Order Data Model (Local)

```typescript
interface ContentOrder {
  id: string;
  title: string;
  contentType: 'blog_post' | 'landing_page' | 'email_sequence' | 'social_media' | 'whitepaper' | 'case_study' | 'product_description' | 'seo_article';
  status: 'draft' | 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  wordCount: number;
  targetWordCount: number;
  deadline: string;          // ISO date
  createdAt: string;
  updatedAt: string;
  writer?: string;
  brief: string;             // Content brief / instructions
  keywords: string[];
  targetAudience: string;
  tone: 'formal' | 'casual' | 'professional' | 'friendly' | 'authoritative';
  deliverables: Deliverable[];
  revisions: Revision[];
  progress: number;          // 0-100
}
```

### Interactivity Checklist

- [ ] Sidebar navigation highlights active route
- [ ] Dashboard stats cards show mock aggregates
- [ ] Orders table supports: search, filter by status/type, sort by date/priority, pagination
- [ ] "New Order" form validates with Zod, shows success toast, adds to local state
- [ ] Order detail page shows full order data, timeline, revision history
- [ ] Settings page has tabs (Profile, Notifications, Billing, Appearance)
- [ ] Dark/light mode toggle works and persists in localStorage
- [ ] Notification dropdown shows mock notifications with read/unread states
- [ ] All transitions and animations are smooth

---

## Phase 3 — Supabase Auth & Database

> **Goal:** Replace all mock data with Supabase. Add real authentication, protected routes, and RLS policies.

### Authentication

- Email/password sign-up & login
- OAuth providers (Google, GitHub — optional, configurable)
- Password reset flow
- Email confirmation
- PKCE flow via `@supabase/ssr`

### Database Schema

```sql
-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  notification_prefs JSONB DEFAULT '{"email": true, "in_app": true}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  priority TEXT NOT NULL DEFAULT 'medium',
  word_count INTEGER DEFAULT 0,
  target_word_count INTEGER,
  deadline DATE,
  brief TEXT,
  keywords TEXT[],
  target_audience TEXT,
  tone TEXT DEFAULT 'professional',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Deliverables
CREATE TABLE public.deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  version INTEGER DEFAULT 1,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Order Revisions / Activity
CREATE TABLE public.revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  revision_type TEXT DEFAULT 'comment', -- 'comment' | 'status_change' | 'revision_request' | 'delivery'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info', -- 'info' | 'success' | 'warning' | 'order_update'
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)

```sql
-- Users can only see/edit their own data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for deliverables, revisions, notifications...
```

### Supabase Client Architecture

```
src/lib/supabase/
  ├── client.ts       # Browser client (createBrowserClient)
  ├── server.ts       # Server Component client (createServerClient)
  ├── middleware.ts   # Middleware client for session refresh
  └── admin.ts        # Service-role client (for seeding/admin tasks)
```

### Auth Pages

| Route                       | Page                                               |
|-----------------------------|----------------------------------------------------|
| `/auth/login`               | Login form (email + password, OAuth buttons)       |
| `/auth/signup`              | Sign-up form                                       |
| `/auth/forgot-password`     | Password reset request                             |
| `/auth/reset-password`      | Password reset confirmation                        |
| `/auth/callback`            | OAuth/email confirmation callback handler          |

### Middleware (`middleware.ts`)

- Refresh Supabase session on every request
- Redirect unauthenticated users from `/dashboard/*` to `/auth/login`
- Redirect authenticated users from `/auth/*` to `/dashboard`

---

## Phase 4 — Landing Page

> **Goal:** A stunning, conversion-optimized marketing page for the SaaS product.

### Sections

| Section        | Content                                                           |
|----------------|-------------------------------------------------------------------|
| **Hero**       | Headline, subheadline, CTA buttons, dashboard preview screenshot  |
| **Social Proof** | Client logos, testimonials, trust badges                        |
| **Features**   | 3–6 feature cards with icons and descriptions                     |
| **How It Works** | 3-step process (Sign Up -> Submit Brief -> Get Content)         |
| **Pricing**    | 2–3 tier cards (Starter, Pro, Enterprise)                         |
| **Testimonials** | Client quotes with avatars                                      |
| **FAQ**        | Accordion-style common questions                                  |
| **CTA Footer** | Final call to action with sign-up form                            |
| **Footer**     | Links, socials, legal                                             |

### SEO

- Proper `<title>`, meta description, Open Graph tags
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- Single `<h1>` per page
- `next/font` for optimized font loading

---

## Phase 5 — End-to-End Sweep & Deployment

> **Goal:** Production-ready. Secure, tested, deployed, and verified.

### Security Checklist

- [ ] All `/dashboard/*` routes protected via middleware
- [ ] RLS policies verified — users cannot access other users' data
- [ ] Environment variables properly configured (`.env.local` not committed)
- [ ] CSRF protection via Supabase PKCE flow
- [ ] Input sanitization on all forms
- [ ] Rate limiting considerations documented
- [ ] `Content-Security-Policy` headers configured

### Testing Checklist

- [ ] Auth flows: sign-up, login, logout, password reset, session refresh
- [ ] Protected route redirects (unauthenticated -> login, authenticated -> dashboard)
- [ ] CRUD operations: create order, view orders, update order, filter/sort
- [ ] Form validation: required fields, word limits, date validation
- [ ] Responsive design: mobile, tablet, desktop breakpoints
- [ ] Dark mode toggle and persistence
- [ ] Empty states render correctly
- [ ] Error states and loading skeletons display properly

### Netlify Deployment Steps

1. Push to GitHub repo
2. Connect repo in Netlify dashboard
3. Set environment variables in Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build command: `next build` (auto-detected)
5. Deploy and verify all routes
6. Configure custom domain (if applicable)
7. Add `netlify.toml` to project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Post-Deploy Verification

- [ ] Landing page loads and all sections render
- [ ] Auth flow works end-to-end on production
- [ ] Dashboard loads with real data
- [ ] New order creation persists to Supabase
- [ ] Settings changes persist
- [ ] Mobile responsive on real devices
- [ ] Lighthouse score > 90 for performance

---

## Project Structure (Final)

```
full-stack-client-dashboard/
├── public/
│   ├── images/               # Static assets, logos
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Route group for public pages
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx      # Landing page
│   │   ├── (auth)/           # Route group for auth pages
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── callback/route.ts
│   │   ├── dashboard/        # Protected route group
│   │   │   ├── layout.tsx    # DashboardLayout (Sidebar + TopBar)
│   │   │   ├── page.tsx      # Dashboard home
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx          # All orders
│   │   │   │   ├── new/page.tsx      # New order form
│   │   │   │   └── [id]/page.tsx     # Order detail
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── notifications/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── ui/               # Primitives: Button, Input, Select, Modal, etc.
│   │   ├── dashboard/        # Dashboard-specific: StatsCard, OrderTable, etc.
│   │   ├── landing/          # Landing page sections: Hero, Features, Pricing, etc.
│   │   └── auth/             # Auth forms: LoginForm, SignupForm, etc.
│   ├── lib/
│   │   ├── supabase/         # Supabase client utilities
│   │   ├── mock-data.ts      # Mock data (Phase 2, kept for dev/testing)
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── utils.ts          # Utility functions
│   │   └── validations.ts    # Zod schemas
│   └── hooks/                # Custom React hooks
│       ├── use-orders.ts
│       ├── use-user.ts
│       └── use-theme.ts
├── middleware.ts              # Supabase auth middleware
├── .env.local                 # Supabase keys (not committed)
├── .env.example               # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── netlify.toml
├── package.json
└── README.md
```

---

## Open Questions (Awaiting Your Input)

1. **Content types** — Included: Blog Post, Landing Page, Email Sequence, Social Media, Whitepaper, Case Study, Product Description, SEO Article. Should any be added or removed?

2. **User roles** — Single-user client portal, or multi-user team support (e.g., a client org with multiple members)?

3. **File uploads** — Should clients upload briefs/assets when creating orders? If yes, we'll add Supabase Storage.

4. **Messaging/Comments** — Real-time chat per order, or is the revision/activity history sufficient?

5. **Billing/Payments** — Visual placeholder in Settings, or full Stripe integration?

6. **Notifications** — In-app only, or also email notifications via Supabase Edge Functions?

7. **OAuth providers** — Google/GitHub login, or email/password only?

8. **Screenshot** — Please send your design inspiration screenshots when ready. The visual style will drive the entire Phase 1 design system.
