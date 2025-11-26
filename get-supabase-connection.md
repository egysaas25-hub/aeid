# 🔍 Get Correct Supabase Connection String

The "Tenant or user not found" error usually means:
1. Wrong password
2. Password needs URL encoding (special characters)
3. Wrong connection string format

## ✅ Get Connection String from Supabase Dashboard

### Method 1: Copy from Dashboard (RECOMMENDED)

1. Go to: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database
2. Scroll to **Connection String** section
3. Select **URI** tab
4. Copy the connection string that looks like:
   ```
   postgresql://postgres.zxswqevnjldkhqkmixwh:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual password

### Method 2: Connection Pooler

For the pooled connection (port 6543):
1. Go to: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database
2. Look for **Connection Pooling** section
3. Mode: **Transaction**
4. Copy the connection string

### Method 3: Direct Connection

For direct connection (port 5432):
1. Same page as above
2. Look for **Connection String** (not pooling)
3. Copy that string

## 🔐 Password Special Characters

If your password has special characters like: `@`, `#`, `$`, `%`, `&`, etc.

You need to URL encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- ` ` (space) → `%20`

Example:
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`

## 🧪 Test Connection Formats

Try these formats in your `.env`:

### Format 1: Session Mode (Direct)
```env
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.zxswqevnjldkhqkmixwh.supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.zxswqevnjldkhqkmixwh.supabase.co:5432/postgres"
```

### Format 2: Transaction Mode (Pooled)
```env
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.zxswqevnjldkhqkmixwh.supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.zxswqevnjldkhqkmixwh.supabase.co:6543/postgres?pgbouncer=true"
```

### Format 3: AWS Endpoint
```env
DIRECT_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
DATABASE_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## 🎯 Quick Test

Run this to test your connection:

```bash
npx prisma db execute --stdin <<< "SELECT version();"
```

If it works, you'll see PostgreSQL version info.

## 💡 Alternative: Reset Password

If nothing works, reset your database password:

1. Go to: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database
2. Click **Reset Database Password**
3. Copy the new password (it will be simple, no special chars)
4. Update your `.env` file
5. Try again

## 🔧 Next Steps

Once you have the correct connection string:

```bash
# Test connection
npx prisma db push

# If successful, generate client
npx prisma generate

# Run test script
npx ts-node test-db-connection.ts
```
