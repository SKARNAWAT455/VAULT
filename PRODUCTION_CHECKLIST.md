# VAULT — Production Readiness Checklist

> **Status:** 🔴 NOT Production Ready
> Last audited: 2026-03-04

---

## 🔴 CRITICAL (Must fix before going live)

### 1. Environment & Secrets
- [ ] Replace weak `NEXTAUTH_SECRET` (`"my_ultra_secure_nextauth_secret_123!"`) with a cryptographically strong secret
  - Generate with: `openssl rand -base64 32`
- [ ] Move all secrets to a cloud secret manager or hosting platform's env vars (Vercel, Railway, etc.)
- [ ] Change `NEXTAUTH_URL` from `http://localhost:3000` to the real production domain
- [ ] Change `DATABASE_URL` from local PostgreSQL to a hosted database (e.g., Neon, Supabase, Railway, AWS RDS)
- [ ] Ensure `.env` is in `.gitignore` and **never committed to GitHub**

### 2. Database
- [ ] Migrate from local PostgreSQL to a hosted/cloud PostgreSQL provider
- [ ] Add `deletedAt DateTime?` (soft-delete) field to `Auction` model — currently missing from schema
- [ ] Run `prisma migrate deploy` against the production database (not just `prisma db push`)
- [ ] Set up automatic database backups on the hosting provider

### 3. File Uploads
- [ ] Replace local disk uploads (`/public/uploads/`) with cloud storage (AWS S3, Cloudinary, Vercel Blob, etc.)
  - Local uploads are wiped on every deployment on serverless platforms like Vercel
- [ ] Add file type and file size validation to `/api/upload` route
- [ ] Add virus/malware scanning for uploaded files (optional but recommended)

### 4. Security
- [ ] Add **rate limiting** to all API routes (especially `/api/auth`, `/api/auction`, `/api/contact`)
  - Use `next-rate-limit` or Vercel Edge middleware
- [ ] Add **input validation** (Zod or Yup) to all API request bodies
- [ ] Add CSRF protection (Next-Auth handles some, but verify all POST routes)
- [ ] Add proper HTTP security headers (use `next-safe-headers` or configure in `next.config.mjs`):
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security`
  - `Content-Security-Policy`
- [ ] Sanitize user inputs before saving to database (prevent XSS/SQL injection)
- [ ] Hash passwords with bcrypt (verify current implementation uses salt rounds ≥ 12)

---

## 🟡 HIGH PRIORITY (Strongly recommended before launch)

### 5. Error Handling
- [ ] Add a global `error.tsx` page in `src/app/` for unhandled errors
- [ ] Add a `not-found.tsx` (404) page in `src/app/`
- [ ] Wrap all API routes in try/catch and return consistent error responses
- [ ] Add server-side logging (e.g., Sentry, LogRocket, or Axiom) for error tracking

### 6. Authentication & Authorization
- [ ] Verify all admin API routes (`/api/admin/*`) check for ADMIN role server-side
- [ ] Add email verification flow for new user registrations (currently `emailVerified` exists in schema but is unused)
- [ ] Add password reset / "Forgot Password" flow
- [ ] Implement account lockout after repeated failed login attempts

### 7. Performance
- [ ] Run `npm run build` and fix all TypeScript/ESLint errors before deploying
- [ ] Add `loading.tsx` skeleton screens to slow pages (auction list, admin dashboard)
- [ ] Use `next/image` component instead of raw `<img>` tags for automatic optimization
- [ ] Implement pagination or infinite scroll on auction listings (avoid loading all records at once)
- [ ] Add database query indexes on frequently searched fields (`auctionId`, `userId`, `status`, `endTime`)

### 8. SEO & Metadata
- [ ] Replace generic metadata in `layout.tsx` with page-specific metadata on each route
- [ ] Add Open Graph (`og:`) tags for social sharing previews
- [ ] Add a `sitemap.xml` (use `next-sitemap` package)
- [ ] Add a `robots.txt` file
- [ ] Add structured data (JSON-LD) for auction listings

### 9. Social Media Links
- [ ] Add real URLs to all social media icon links in the topbar (currently all `href=""`)

---

## 🟢 NICE TO HAVE (Polish before/after launch)

### 10. Real-time Features
- [ ] Implement WebSocket or Server-Sent Events (SSE) for live bid updates
  - Currently bids only update on page refresh
- [ ] Add countdown timer on auction detail page that updates live

### 11. Email Notifications
- [ ] Set up transactional email (e.g., Resend, SendGrid, Nodemailer)
- [ ] Send email confirmation when a user registers
- [ ] Notify the highest bidder when they are outbid
- [ ] Notify the winner when an auction closes
- [ ] Send admin email on new contact form submissions

### 12. Payment Integration
- [ ] Integrate a payment gateway (Razorpay for India, or Stripe) for winning bids
- [ ] Add payment status tracking to the `Bid` or a new `Payment` model

### 13. Admin Panel Enhancements
- [ ] Add admin ability to manually close/reopen auctions
- [ ] Add bulk actions (e.g., delete multiple auctions)
- [ ] Export bid history / contact messages as CSV
- [ ] Add analytics dashboard (total revenue, active users, bids per day)

### 14. Testing
- [ ] Write unit tests for critical business logic (bidding engine, auth)
- [ ] Write integration tests for all API routes
- [ ] Add E2E tests with Playwright or Cypress for key user flows

### 15. DevOps & Deployment
- [ ] Set up CI/CD pipeline (GitHub Actions) to run lint + build on every push
- [ ] Configure staging environment separate from production
- [ ] Set up domain name and SSL certificate (Vercel handles SSL automatically)
- [ ] Configure `next.config.mjs` with production image domains and security headers
- [ ] Remove `final-lint.txt` debug file from project root before pushing

---

## ✅ Already Done (Completed Features)
- [x] User authentication (Login / Register with NextAuth + bcrypt)
- [x] Role-based access control (USER / ADMIN)
- [x] Admin middleware protecting `/admin/*` routes
- [x] Auction CRUD (Create, Edit, Delete with soft-delete, History)
- [x] Bidding engine with current price tracking
- [x] Admin dashboard with stats, search, and filtering
- [x] Contact form with admin inbox
- [x] Image upload for auctions
- [x] User profile & change password
- [x] My Bids page
- [x] Responsive UI with Bootstrap + custom CSS
- [x] Git repository initialized

---

## 🚀 Recommended Deployment Platform
| Option | Database | Storage | Cost |
|--------|----------|---------|------|
| **Vercel** (recommended) | Neon (free tier) | Vercel Blob / Cloudinary | Free → Paid |
| **Railway** | Railway PostgreSQL | Cloudinary | ~$5/mo |
| **Render** | Render PostgreSQL | AWS S3 | Free → Paid |
