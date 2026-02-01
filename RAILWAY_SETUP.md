# 🚂 Railway Deployment Setup Guide

This guide will help you deploy School Portal Multitenant to Railway.

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Railway account ([railway.app](https://railway.app))
- ✅ Clerk account ([clerk.com](https://clerk.com))
- ✅ Resend account ([resend.com](https://resend.com)) - You already have this!

---

## 🚀 Quick Deployment Steps

### Step 1: Push to GitHub

The code is already prepared and ready. Just push to your repository:

```bash
cd school-portal-multitenant/school-portal-multitenant-main
git init
git add .
git commit -m "Initial commit: School Portal Multitenant ready for Railway"
git remote add origin https://github.com/Ephraimraxy/school_multitenant.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Railway

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `Ephraimraxy/school_multitenant`

3. **Add PostgreSQL Database**
   - In your project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL instance automatically

4. **Configure Environment Variables**
   - Click on your web service (the Next.js app)
   - Go to "Variables" tab
   - Add the following variables (see details below):

---

## 🔐 Environment Variables Setup

### Required Variables

Add these in Railway → Your Service → Variables:

#### 1. Database
```
DATABASE_URL
```
- **Value**: Get from Railway PostgreSQL service → Variables tab → `DATABASE_URL`
- **Format**: `postgresql://user:pass@host:port/db?sslmode=require`

#### 2. Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
- **Get from**: Clerk Dashboard → API Keys
- **Note**: Add your Railway domain to Clerk's allowed origins

#### 3. Resend Email (You already have this!)
```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```
- **RESEND_API_KEY**: From Resend Dashboard → API Keys
- **RESEND_FROM_EMAIL**: Your verified domain email (or `onboarding@resend.dev` for testing)

#### 4. Application Configuration
```
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
NEXT_PUBLIC_SUPER_ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
NODE_ENV=production
```
- **NEXT_PUBLIC_APP_URL**: Your Railway app URL (get after first deployment)
- **NEXT_PUBLIC_SUPER_ADMIN_EMAIL**: Your email for super admin access
- **NEXT_PUBLIC_ROOT_DOMAIN**: Your custom domain (or Railway domain for testing)

---

## 📝 Step-by-Step Variable Setup

### After First Deployment:

1. **Get Your Railway URL**
   - Railway will provide: `https://your-app-name.railway.app`
   - Copy this URL

2. **Update Environment Variables**
   - Add `NEXT_PUBLIC_APP_URL=https://your-app-name.railway.app`
   - Redeploy (Railway auto-redeploys on variable changes)

3. **Configure Clerk**
   - Go to Clerk Dashboard → Settings → Domains
   - Add: `your-app-name.railway.app`
   - Update redirect URLs if needed

4. **Run Database Migrations**
   - Use Railway CLI or shell:
   ```bash
   railway run npm run db:push
   ```

---

## 🌐 Custom Domain Setup (Optional)

### 1. Add Domain in Railway

1. **Railway Dashboard** → Your Service → Settings → Domains
2. Click "Custom Domain"
3. Enter your domain: `yourdomain.com`

### 2. Configure DNS

Railway will provide DNS records. Add these to your domain registrar:

```
Type: CNAME
Name: @
Value: your-app.railway.app

Type: CNAME
Name: *
Value: your-app.railway.app
```

### 3. Update Environment Variables

After DNS is configured:

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
```

### 4. Update Clerk

- Add `yourdomain.com` to Clerk allowed domains
- Update redirect URLs

---

## 🔧 Post-Deployment Steps

### 1. Run Database Migrations

```bash
# Using Railway CLI
railway login
railway link
railway run npm run db:push
```

Or use Railway Shell:
- Railway Dashboard → Your Service → Deployments → Latest → Shell
- Run: `npm run db:push`

### 2. Access Super Admin

1. Visit: `https://your-app.railway.app/super-admin`
2. Sign in with the email you set in `NEXT_PUBLIC_SUPER_ADMIN_EMAIL`
3. Create your first tenant/school

### 3. Test Email Functionality

1. Go to Super Admin → Tenants
2. Invite a tenant admin
3. Check if email is sent via Resend

---

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL service added
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] App deployed successfully
- [ ] Super admin accessible
- [ ] Email sending works
- [ ] Custom domain configured (if applicable)

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
- All environment variables are set
- Node version is 20+ (check `package.json` engines)
- Build logs in Railway dashboard

### Database Connection Issues

**Check:**
- `DATABASE_URL` is correct
- PostgreSQL service is running
- Connection string includes `?sslmode=require`

### Authentication Not Working

**Check:**
- Clerk keys are correct
- Railway domain added to Clerk
- Redirect URLs configured in Clerk

### Email Not Sending

**Check:**
- `RESEND_API_KEY` is correct
- `RESEND_FROM_EMAIL` is verified in Resend
- Check Resend dashboard for email logs

### Subdomain Routing Not Working

**Check:**
- `NEXT_PUBLIC_ROOT_DOMAIN` is set correctly
- DNS wildcard record is configured
- Middleware is working (check logs)

---

## 📊 Monitoring

### View Logs
- Railway Dashboard → Your Service → Deployments → View Logs

### Monitor Performance
- Railway Dashboard → Metrics tab
- View CPU, Memory, Network usage

### Database Management
- Railway Dashboard → PostgreSQL Service → Data tab
- Use Railway's built-in database viewer

---

## 🔄 Continuous Deployment

Railway automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build the application
3. Deploy to production

---

## 💰 Cost Estimation

### Railway Free Tier:
- $5 credit/month
- 500 hours of usage
- 1GB RAM per service
- 1GB storage

### Estimated Monthly Cost:
- **Small deployment**: $0-5/month (free tier)
- **Medium deployment**: $10-20/month
- **Large deployment**: $30-50/month

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Clerk Documentation](https://clerk.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)

---

## 🎉 You're All Set!

Your School Portal Multitenant is now ready for Railway deployment!

**Next Steps:**
1. Push code to GitHub
2. Deploy on Railway
3. Set environment variables
4. Run migrations
5. Start managing schools!

---

**Need Help?** Check the main `README.md` or `DEPLOYMENT.md` for more details.

