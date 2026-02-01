# 🗄️ Running Database Migrations

## When to Run Migrations

You need to run `npm run db:push` **after**:
1. ✅ Your app is deployed on Railway
2. ✅ PostgreSQL service is created
3. ✅ `DATABASE_URL` environment variable is set in Railway
4. ✅ Before you start using the app

---

## Option 1: Using Railway CLI (Recommended)

### Step 1: Install Railway CLI

**Windows (PowerShell):**
```powershell
# Install via npm
npm install -g @railway/cli

# Or using scoop (if you have it)
scoop install railway
```

**Mac/Linux:**
```bash
curl -fsSL https://railway.app/install.sh | sh
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Link Your Project
```bash
cd school-portal-multitenant/school-portal-multitenant-main
railway link
# Select your project when prompted
```

### Step 4: Run Migrations
```bash
railway run npm run db:push
```

---

## Option 2: Using Railway Web Shell

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Open your project

2. **Open Shell**
   - Click on your web service (Next.js app)
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Click "Shell" or "View Logs" → "Open Shell"

3. **Run Command**
   ```bash
   npm run db:push
   ```

---

## Option 3: Run Locally (If DATABASE_URL is set)

If you have `DATABASE_URL` from Railway:

1. **Create `.env.local` file:**
   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
   ```
   (Get this from Railway → PostgreSQL service → Variables)

2. **Run migration:**
   ```bash
   cd school-portal-multitenant/school-portal-multitenant-main
   npm run db:push
   ```

---

## Option 4: Using Railway's Database Tab

Railway also provides a database viewer where you can run SQL directly:

1. Go to Railway Dashboard
2. Click on your PostgreSQL service
3. Go to "Data" tab
4. You can run SQL queries directly there

However, `db:push` is easier as it uses Drizzle to sync your schema.

---

## Verify Migration Success

After running migrations, you should see:
- ✅ Tables created (tenants, users, students, teachers, classes, etc.)
- ✅ No errors in the output

You can verify by:
1. Using Railway's database viewer
2. Running: `railway run npm run db:studio` (opens Drizzle Studio)

---

## Troubleshooting

### Error: "Cannot connect to database"
- Check `DATABASE_URL` is set correctly
- Verify PostgreSQL service is running
- Ensure connection string includes `?sslmode=require`

### Error: "Module not found"
- Make sure you're in the project directory
- Run `npm install` first

### Error: "Permission denied"
- Check database user has proper permissions
- Verify connection string credentials

---

## Quick Reference

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Run migrations
railway run npm run db:push

# Open database studio (optional)
railway run npm run db:studio
```

---

**After migrations run successfully, your app is ready to use!** 🎉

