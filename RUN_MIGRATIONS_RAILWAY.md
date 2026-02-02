# 🗄️ Running Database Migrations on Railway

## ❌ Problem

When running `railway run npx drizzle-kit push` locally, you get:
```
Error: getaddrinfo ENOTFOUND postgres.railway.internal
```

This happens because `DATABASE_URL` uses Railway's internal hostname (`postgres.railway.internal`) which only works **inside Railway's network**, not from your local machine.

---

## ✅ Solution: Use Railway Web Shell (Easiest)

### Step 1: Open Railway Web Shell

1. Go to [Railway Dashboard](https://railway.app)
2. Click on your **web service** (Next.js app)
3. Go to **"Deployments"** tab
4. Click on the **latest deployment**
5. Click **"Shell"** button (or "Open Shell")

### Step 2: Run Migrations

In the Railway shell, run:

```bash
npm run db:push
```

Or:

```bash
npx drizzle-kit push
```

**That's it!** The migrations will run because you're inside Railway's network.

---

## 🔄 Alternative: Use Railway CLI with Correct Command

If you want to use Railway CLI, make sure you're running the command correctly:

```bash
# Make sure you're linked to the project
railway link

# Run migrations (this runs INSIDE Railway's environment)
railway run npm run db:push
```

**Note:** `railway run` executes commands inside Railway's environment where `postgres.railway.internal` is accessible.

---

## 🌐 Alternative: Get External DATABASE_URL

If you want to run migrations locally:

### Step 1: Get External Database URL

1. Railway Dashboard → **PostgreSQL service**
2. Go to **"Variables"** tab
3. Look for `DATABASE_URL` or `DATABASE_URL_EXTERNAL`
4. Copy the **external** connection string (not the internal one)

It should look like:
```
postgresql://user:pass@containers-us-west-xxx.railway.app:5432/railway
```

**NOT:**
```
postgresql://user:pass@postgres.railway.internal:5432/railway
```

### Step 2: Create Local .env.local

Create `.env.local` in your project root:

```env
DATABASE_URL=postgresql://user:pass@containers-us-west-xxx.railway.app:5432/railway?sslmode=require
```

### Step 3: Run Locally

```bash
npm run db:push
```

---

## ✅ Recommended: Railway Web Shell

**The easiest way is to use Railway's web shell:**

1. Railway Dashboard → Your Service → Deployments → Latest → **Shell**
2. Run: `npm run db:push`
3. Done! ✅

This works because:
- ✅ You're inside Railway's network
- ✅ All environment variables are available
- ✅ No local setup needed
- ✅ No connection issues

---

## 🔍 Verify Migrations

After running migrations, verify tables were created:

1. Railway Dashboard → **PostgreSQL service**
2. Go to **"Data"** tab
3. You should see tables like:
   - `tenants`
   - `users`
   - `students`
   - `teachers`
   - `classes`
   - etc.

---

## 📝 Quick Reference

```bash
# Option 1: Railway Web Shell (Recommended)
# 1. Railway Dashboard → Service → Deployments → Shell
# 2. npm run db:push

# Option 2: Railway CLI
railway run npm run db:push

# Option 3: Local (with external DATABASE_URL)
# Set DATABASE_URL in .env.local with external URL
npm run db:push
```

---

**Use Railway Web Shell - it's the simplest!** 🚀



