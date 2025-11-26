# 🚀 Quick Start - Supabase Connection

## ⚡ Fast Setup (5 minutes)

### 1️⃣ Get Your Database Password

Go to your Supabase dashboard:
- URL: https://zxswqevnjldkhqkmixwh.supabase.co
- Navigate: **Settings** → **Database** → **Database Password**
- Copy or reset your password

### 2️⃣ Update .env File

Open `aeid/.env` and replace `[YOUR-DATABASE-PASSWORD]` with your actual password:

```env
DATABASE_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

DIRECT_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

### 3️⃣ Install Dependencies (if needed)

```bash
cd aeid
pnpm install @supabase/supabase-js
# or
npm install @supabase/supabase-js
```

### 4️⃣ Push Database Schema

```bash
npx prisma db push
```

This creates all your tables in Supabase.

### 5️⃣ Test Connection

```bash
npx ts-node test-db-connection.ts
```

You should see: ✅ Successfully connected to Supabase database!

### 6️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 7️⃣ Start Your App

```bash
pnpm dev
# or
npm run dev
```

## 📁 Files Created

- ✅ `.env` - Environment variables with Supabase connection
- ✅ `lib/supabase.ts` - Supabase client configuration
- ✅ `test-db-connection.ts` - Connection test script
- ✅ `SUPABASE_SETUP.md` - Detailed setup guide
- ✅ Updated `prisma/schema.prisma` - Added directUrl for migrations

## 🎯 What's Configured

Your project now has:
- ✅ Prisma connected to Supabase PostgreSQL
- ✅ Connection pooling (port 6543) for serverless
- ✅ Direct connection (port 5432) for migrations
- ✅ Supabase client for auth/storage/realtime
- ✅ Environment variables properly set

## 🔥 Next Steps

1. **Seed your database** (optional):
   ```bash
   npx prisma db seed
   ```

2. **View your data** with Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Opens at: http://localhost:5555

3. **Check Supabase Dashboard**:
   - Tables: https://zxswqevnjldkhqkmixwh.supabase.co/project/_/editor
   - SQL Editor: https://zxswqevnjldkhqkmixwh.supabase.co/project/_/sql

## 💡 Usage Examples

### Using Prisma (Database Operations)

```typescript
import { prisma } from '@/lib/db'

// Create
const user = await prisma.user.create({
  data: { email: 'test@example.com', password: 'hashed', name: 'Test User' }
})

// Read
const users = await prisma.user.findMany()

// Update
await prisma.user.update({
  where: { id: user.id },
  data: { name: 'Updated Name' }
})

// Delete
await prisma.user.delete({ where: { id: user.id } })
```

### Using Supabase Client (Auth, Storage, Realtime)

```typescript
import { supabase } from '@/lib/supabase'

// Query
const { data, error } = await supabase.from('User').select('*')

// Auth
const { data: authData } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Storage
const { data: uploadData } = await supabase.storage
  .from('images')
  .upload('file.jpg', file)
```

## ⚠️ Troubleshooting

**Connection fails?**
- Verify password in `.env` is correct
- Check Supabase project is active
- Ensure your IP is allowed (Supabase → Settings → Database)

**Tables not created?**
- Run: `npx prisma db push`

**Migration errors?**
- Use DIRECT_URL: `npx prisma migrate dev`

## 📚 Documentation

- Full setup guide: `SUPABASE_SETUP.md`
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Need help?** Check `SUPABASE_SETUP.md` for detailed instructions.
