# VAULT — Future Features (Deferred)

> These features were intentionally deferred because they require external services, paid plans, or are beyond the scope of local/college development. Implement these when moving to a real production deployment.

---

## 🗄️ Feature #2 — Hosted Database

**Why deferred:** Currently using local PostgreSQL. Local DBs are not accessible from the internet.

**Tasks when ready:**
- [ ] Sign up for a free hosted PostgreSQL provider (Neon.tech is free, Supabase free tier, Railway $5/mo)
- [ ] Copy your `DATABASE_URL` connection string to your hosting platform's env vars
- [ ] Run `npx prisma migrate deploy` against the production database
- [ ] Run `npx prisma db seed` if a seed file exists
- [ ] Verify all tables are created: `npx prisma studio`
- [ ] Enable automated daily backups from your DB provider's dashboard

---

## ☁️ Feature #3 — Cloud File Storage

**Why deferred:** Local disk uploads (`/public/uploads/`) are lost on every deployment on serverless platforms like Vercel.

**Tasks when ready:**
- [ ] Choose a storage provider: **Cloudinary** (free 25GB) or **Vercel Blob** (free 5GB) or **AWS S3**
- [ ] Install the storage SDK: `npm install cloudinary` or `npm install @vercel/blob`
- [ ] Update `/api/upload/route.ts` to stream the file to the cloud provider instead of local disk
- [ ] Update displayed image URLs to use the CDN URL returned by the provider
- [ ] Add maximum file size validation (e.g., 5MB limit)
- [ ] Add MIME-type whitelisting (only allow `image/jpeg`, `image/png`, `image/webp`)
- [ ] Add virus scan integration (optional: Cloudmersive free 800 scans/month)

---

## 🌐 Feature #9 — Social Media Links

**Why deferred:** Requires actual social media accounts to be created first.

**Tasks when ready:**
- [ ] Create official VAULT accounts on Facebook, Instagram, Twitter/X, LinkedIn
- [ ] Replace all empty `href=""` in `src/app/layout.tsx` (topbar social icons) with real profile URLs
- [ ] Add Open Graph image (`og:image`) — design a 1200×630 banner image

---

## 💳 Feature #12 — Payment Integration

**Why deferred:** Requires business registration and payment gateway account approval.

**Tasks when ready:**
- [ ] Create a Razorpay account (India, free for domestic cards) or Stripe account
- [ ] Install the SDK: `npm install razorpay` or `npm install stripe`
- [ ] Add a `Payment` model to Prisma schema with `status`, `amount`, `provider`, `transactionId`
- [ ] Create `/api/payment/create-order/route.ts` to initialize payment session
- [ ] Create `/api/payment/verify/route.ts` to validate webhook signature
- [ ] Add "Pay Now" button on the auction winner notification email
- [ ] Build a `/payment/success` and `/payment/failure` page

---

## 🚀 Feature #15 — DevOps & CI/CD Pipeline

**Why deferred:** Requires a live domain, hosting platform account, and GitHub Actions setup.

**Tasks when ready:**
- [ ] Register a domain name (Namecheap, GoDaddy, etc.)
- [ ] Create a Vercel account and import the VAULT GitHub repo
- [ ] Set all `.env` variables in Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Create `.github/workflows/ci.yml` with:
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with: { node-version: '20' }
        - run: npm ci
        - run: npm run lint
        - run: npx jest --passWithNoTests
        - run: npm run build
  ```  
- [ ] Configure a staging Vercel project for the `dev` branch
- [ ] Remove `final-lint.txt` from project root (leftover debug file)
- [ ] Set `NEXTAUTH_URL` to your production domain in Vercel env vars
- [ ] Enable SSL (Vercel handles this automatically with your custom domain)

---

*Last updated: 2026-03-04 | VAULT College Project*
