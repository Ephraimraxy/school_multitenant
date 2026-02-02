# 🗄️ Running Database Migrations - Complete Guide

## ✅ Your Build is Successful!

Your app is deployed and healthcheck passed! Now you need to run database migrations.

---

## 🎯 Option 1: Railway CLI (Recommended)

### Step 1: Install Railway CLI

```powershell
npm install -g @railway/cli
```

### Step 2: Login and Link

```powershell
railway login
cd E:\Junks\school\school-portal-multitenant\school-portal-multitenant-main
railway link
# Select your project when prompted
```

### Step 3: Run Migrations

```powershell
railway run npm run db:push
```

**This runs the command INSIDE Railway's environment** where `postgres.railway.internal` is accessible.

---

## 🎯 Option 2: Get External DATABASE_URL and Run Locally

### Step 1: Get External Database URL

1. **Railway Dashboard** → Your **PostgreSQL service** (not the web service)
2. Go to **"Variables"** tab
3. Look for `DATABASE_URL` or `PUBLIC_URL`
4. Copy the **external** connection string

It should look like:
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

**NOT the internal one:**
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```

### Step 2: Create .env.local

Create `.env.local` in your project root:

```env
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway?sslmode=require
```

### Step 3: Run Migrations Locally

```powershell
cd E:\Junks\school\school-portal-multitenant\school-portal-multitenant-main
npm run db:push
```

---

## 🎯 Option 3: Railway Connect (If Available)

Some Railway projects have a "Connect" option:

1. Railway Dashboard → Your **PostgreSQL service**
2. Look for **"Connect"** or **"Connection"** tab
3. You might see connection details there

---

## 🎯 Option 4: Use Railway's Database Tab

1. Railway Dashboard → **PostgreSQL service**
2. Go to **"Data"** tab
3. You can run SQL directly there

However, this requires manual SQL execution. `db:push` is easier.

---

## ✅ Recommended: Railway CLI

**The easiest way is Railway CLI:**

```powershell
# Install CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Run migrations
railway run npm run db:push
```

This works because `railway run` executes commands **inside Railway's environment** where all internal hostnames are accessible.

---

## 🔍 Verify Migrations

After running migrations, verify:

1. Railway Dashboard → **PostgreSQL service** → **"Data"** tab
2. You should see tables:
   - ✅ `tenants`
   - ✅ `users`
   - ✅ `students`
   - ✅ `teachers`
   - ✅ `classes`
   - ✅ `attendance`
   - ✅ `payments`
   - etc.

---

## 🚀 After Migrations

Once migrations are complete:

1. **Visit your app**: `https://web-production-7396d1.up.railway.app`
2. **Access Super Admin**: `https://web-production-7396d1.up.railway.app/super-admin`
3. **Sign in** with: `hoseaephraim50@gmail.com`
4. **Create your first tenant/school!**

---

## 📝 Quick Commands

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Run migrations
railway run npm run db:push

# Optional: Open database studio
railway run npm run db:studio
```

---

**Use Railway CLI - it's the most reliable method!** 🚀



