# VAULT - Luxury E-Auction Platform

VAULT is a premium, full-stack digital auction house built with Next.js, specializing in the sale of rare and luxury items. This platform features a real-time bidding system, robust administrative controls, and a sophisticated user experience.

## ✨ Features

### 💎 User Experience
- **Live Bidding System**: Real-time bid updates with instant highest-bidder tracking.
- **Luxury UI**: A clean, premium aesthetic optimized for high-end commerce.
- **Secure Authentication**: Power by NextAuth with persistent sessions.

### 🛠 Administrative Suite
- **Interactive Dashboard**: A high-level overview of platform stats (Users, Auctions, Total Bids).
- **Recent Activity Feed**: Real-time log of the latest bids across all active auctions.
- **Auction Lifecycle Management**: Create, edit, and delete auctions with ease.
- **Native Image Uploading**: Upload item photos directly from your device (stored in `/public/uploads`).
- **Detailed Audit Logs**: Full bidding history for every item, including user timestamps.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or any Prisma-supported database)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd nextjs-auction
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/vault"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Developing**:
   ```bash
   npm run dev
   ```

## 🔐 Role-Based Access Control
- **ADMIN**: Access to the `/admin` dashboard and management tools.
- **USER**: Access to bidding, profile management, and auction browsing.

## 📁 Project Structure
- `/src/app`: Next.js App Router (Pages & API Routes).
- `/src/components`: Reusable UI components.
- `/prisma`: Database schema and migrations.
- `/public/uploads`: Storage for uploaded auction images.

---
Built with ❤️ by VAULT Team.
