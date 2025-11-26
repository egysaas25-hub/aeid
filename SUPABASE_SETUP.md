# Supabase Database Setup Guide

## 🔐 Step 1: Get Your Database Password

1. Go to your Supabase project: https://zxswqevnjldkhqkmixwh.supabase.co
2. Navigate to **Settings** → **Database**
3. Find your database password (or reset it if needed)
4. Copy the password

## 📝 Step 2: Update Environment Variables

Open the `.env` file and replace `[YOUR-DATABASE-PASSWORD]` with your actual database password in both URLs:

```env
DATABASE_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:YOUR_PASSWORD_HERE@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

DIRECT_URL="postgresql://postgres.zxswqevnjldkhqkmixwh:YOUR_PASSWORD_HERE@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

## 📦 Step 3: Install Supabase Client (Optional)

If you want to use Supabase client features (auth, storage, realtime):

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

## 🗄️ Step 4: Push Database Schema

Push your Prisma schema to Supabase:

```bash
npx prisma db push
```

This will create all the tables defined in your `prisma/schema.prisma` file.

## 🌱 Step 5: Seed Database (Optional)

If you have seed data:

```bash
npx prisma db seed
```

## ✅ Step 6: Generate Prisma Client

```bash
npx prisma generate
```

## 🧪 Step 7: Test Connection

Create a test file to verify the connection:

```typescript
// test-db.ts
import { prisma } from './lib/db'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    const userCount = await prisma.user.count()
    console.log(`📊 Users in database: ${userCount}`)
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  }
}

testConnection()
```

Run it:
```bash
npx ts-node test-db.ts
```

## 🚀 Usage Examples

### Using Prisma (Recommended for database operations)

```typescript
import { prisma } from '@/lib/db'

// Create a user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashed_password',
    name: 'John Doe'
  }
})

// Query users
const users = await prisma.user.findMany()
```

### Using Supabase Client (For auth, storage, realtime)

```typescript
import { supabase } from '@/lib/supabase'

// Query with Supabase client
const { data, error } = await supabase
  .from('User')
  .select('*')
  .limit(10)

// Use Supabase Auth
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})
```

## 🔍 Viewing Your Database

1. Go to: https://zxswqevnjldkhqkmixwh.supabase.co
2. Click on **Table Editor** to view your tables
3. Click on **SQL Editor** to run custom queries

## 📊 Prisma Studio

View and edit your database with Prisma Studio:

```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555

## ⚠️ Important Notes

- **Connection Pooling**: The `DATABASE_URL` uses port 6543 with pgBouncer for connection pooling (recommended for serverless)
- **Direct Connection**: The `DIRECT_URL` uses port 5432 for migrations and schema changes
- **Security**: Never commit your `.env` file to version control
- **Production**: Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` for production deployment

## 🐛 Troubleshooting

### Connection Timeout
- Check if your IP is allowed in Supabase dashboard (Settings → Database → Connection Pooling)
- Verify your password is correct

### Migration Errors
- Use `DIRECT_URL` for migrations: `npx prisma migrate dev`
- Use `DATABASE_URL` for application queries

### SSL Errors
Add `?sslmode=require` to your connection string if needed

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)
