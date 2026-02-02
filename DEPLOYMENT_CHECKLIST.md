# ✅ Railway Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## 📦 Pre-Deployment Checklist

### Code Preparation
- [x] Environment variables configured
- [x] Middleware updated for configurable domain
- [x] Resend email configured
- [x] Railway config files created (railway.json, Procfile)
- [x] Next.js config updated for standalone output
- [x] All dependencies in package.json

### Configuration Files Created
- [x] `.env.example` / `ENV_EXAMPLE.txt` - Environment variables template
- [x] `railway.json` - Railway deployment configuration
- [x] `Procfile` - Process file for Railway
- [x] `RAILWAY_SETUP.md` - Deployment guide
- [x] `middleware.ts` - Updated with configurable domain

### Code Updates
- [x] `src/middleware.ts` - Uses `NEXT_PUBLIC_ROOT_DOMAIN` env variable
- [x] `src/lib/mail.ts` - Uses `RESEND_FROM_EMAIL` env variable
- [x] `next.config.ts` - Added standalone output for Railway

---

## 🚀 Deployment Steps

### Step 1: GitHub Setup
- [ ] Initialize git repository
- [ ] Add all files
- [ ] Commit changes
- [ ] Push to `https://github.com/Ephraimraxy/school_multitenant`

### Step 2: Railway Setup
- [ ] Create Railway account
- [ ] Connect GitHub repository
- [ ] Create PostgreSQL service
- [ ] Configure environment variables

### Step 3: Environment Variables (Set in Railway)
- [ ] `DATABASE_URL` (from Railway PostgreSQL)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- [ ] `RESEND_API_KEY` (you already have this!)
- [ ] `RESEND_FROM_EMAIL`
- [ ] `NEXT_PUBLIC_APP_URL` (get after first deploy)
- [ ] `NEXT_PUBLIC_SUPER_ADMIN_EMAIL`
- [ ] `NEXT_PUBLIC_ROOT_DOMAIN` (your custom domain)
- [ ] `NODE_ENV=production`

### Step 4: Post-Deployment
- [ ] Run database migrations: `npm run db:push`
- [ ] Test super admin access: `/super-admin`
- [ ] Test email sending (invite admin)
- [ ] Configure custom domain (if applicable)
- [ ] Update Clerk with Railway domain

---

## 🔍 Verification Tests

After deployment, test these:

- [ ] Main page loads: `https://your-app.railway.app`
- [ ] Sign-in works: `/sign-in`
- [ ] Sign-up works: `/sign-up`
- [ ] Super admin accessible: `/super-admin`
- [ ] Database connection works
- [ ] Email sending works (Resend)
- [ ] Tenant pages load: `/demo` or `/tenant-slug`
- [ ] Subdomain routing works (if custom domain configured)

---

## 📝 Quick Reference

### Environment Variables Template

See `ENV_EXAMPLE.txt` for complete list.

**Required:**
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPER_ADMIN_EMAIL`
- `NEXT_PUBLIC_ROOT_DOMAIN`

### Commands

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit: Ready for Railway"
git remote add origin https://github.com/Ephraimraxy/school_multitenant.git
git push -u origin main

# Run migrations (after deployment)
railway run npm run db:push
```

---

## 🎯 You're Ready!

Everything is configured and ready for Railway deployment. Follow `RAILWAY_SETUP.md` for detailed instructions.




