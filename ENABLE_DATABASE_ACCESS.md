# 🔓 Enable Direct Database Access in Supabase

Your Supabase API works, but direct PostgreSQL connections are failing with "Tenant or user not found".

## ✅ Solution: Get Connection String from Dashboard

### Step 1: Go to Database Settings
Visit: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database

### Step 2: Find Connection String Section
Scroll down to **"Connection string"** or **"Connection info"**

### Step 3: Copy the Correct Connection String

You'll see different connection modes:

#### Option A: Session Mode (Recommended for Prisma)
- Port: **5432**
- Best for: Migrations, Prisma Studio
- Copy the URI that looks like:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
  ```

#### Option B: Transaction Mode (Connection Pooling)
- Port: **6543**
- Best for: Serverless functions, API routes
- Copy the URI that looks like:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:6543/postgres
  ```

### Step 4: Check Connection Pooling Settings

1. In the same page, look for **"Connection Pooling"** section
2. Make sure it's **ENABLED**
3. Check if there are any IP restrictions
4. If "IP Allow List" is enabled, add your IP or use `0.0.0.0/0` for testing

### Step 5: Update Your .env File

Replace the connection strings with the EXACT ones from the dashboard:

```env
# Use Session Mode for migrations
DIRECT_URL="[PASTE SESSION MODE URI HERE]"

# Use Transaction Mode for app
DATABASE_URL="[PASTE TRANSACTION MODE URI HERE]"
```

### Step 6: Test Connection

```bash
node test-fresh.js
```

## 🔍 Alternative: Check Project Region

The connection string might use a different hostname format:

- `db.zxswqevnjldkhqkmixwh.supabase.co` (newer format)
- `aws-0-us-east-1.pooler.supabase.com` (older format)
- `db.xxx.pooler.supabase.com` (regional format)

Make sure you're using the EXACT hostname from your Supabase dashboard!

## 🆘 If Still Not Working

1. **Check Project Status**: Make sure project isn't paused
2. **Verify Password**: The password you got: `ZOjiKiEfA9zcmXTp`
3. **Check Firewall**: Your network might be blocking PostgreSQL ports
4. **Contact Support**: Supabase might have restrictions on your account

## 📝 What We Know

✅ Supabase API works (project is active)
✅ Your credentials are valid
❌ Direct PostgreSQL connection is blocked

This usually means connection pooling needs to be configured or the connection string format is wrong.
