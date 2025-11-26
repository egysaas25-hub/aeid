# 📤 Load Prisma Schema to Supabase

## 🎯 Quick Steps

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/sql/new
2. Or navigate: **Your Project** → **SQL Editor** → **New Query**

### Step 2: Copy the SQL File

1. Open the file: `aeid/supabase-schema.sql`
2. Copy ALL the content (Ctrl+A, Ctrl+C)

### Step 3: Paste and Run

1. Paste into the Supabase SQL Editor
2. Click **"Run"** button (or press Ctrl+Enter)
3. Wait for execution to complete (~5-10 seconds)

### Step 4: Verify Tables Created

1. Go to: **Table Editor** in Supabase dashboard
2. You should see these tables:
   - ✅ User
   - ✅ Category
   - ✅ Product
   - ✅ Address
   - ✅ Order
   - ✅ CartItem
   - ✅ OrderItem

### Step 5: Update Prisma Client

Back in your project, generate the Prisma client:

```bash
cd aeid
npx prisma generate
```

## 📋 What the SQL Does

The `supabase-schema.sql` file:

✅ Creates all ENUM types (Role, OrderStatus, PaymentStatus)
✅ Creates all 7 tables with proper relationships
✅ Sets up foreign keys and cascading deletes
✅ Creates indexes for performance
✅ Adds auto-update triggers for `updatedAt` fields
✅ Configures UUID generation
✅ Sets up proper permissions

## 🔐 Optional: Enable Row Level Security (RLS)

If you want to add security policies:

1. In the SQL file, uncomment the RLS sections (lines starting with `--`)
2. Customize the policies for your needs
3. Run the modified SQL

Example RLS policy:
```sql
-- Users can only see their own data
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON "User"
    FOR SELECT USING (auth.uid()::TEXT = id);
```

## 🌱 Seed Data (Optional)

After creating tables, you can add sample data:

### Option 1: Use Supabase SQL Editor

```sql
-- Insert sample categories
INSERT INTO "Category" (id, name, slug) VALUES
  (gen_random_uuid()::TEXT, 'Egyptian Clothing', 'egyptian-clothing'),
  (gen_random_uuid()::TEXT, 'Accessories', 'accessories');

-- Insert sample user
INSERT INTO "User" (id, email, password, name, role) VALUES
  (gen_random_uuid()::TEXT, 'admin@example.com', 'hashed_password', 'Admin User', 'ADMIN');
```

### Option 2: Use Prisma Seed

Update your `prisma/seed.ts` and run:
```bash
npx prisma db seed
```

## ✅ Verification

Run these queries in SQL Editor to verify:

```sql
-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check table structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
ORDER BY table_name, ordinal_position;

-- Count records (should be 0 initially)
SELECT 
  (SELECT COUNT(*) FROM "User") as users,
  (SELECT COUNT(*) FROM "Category") as categories,
  (SELECT COUNT(*) FROM "Product") as products;
```

## 🚀 Using Your Database

Now you can use Supabase client in your app:

```typescript
import { supabase } from '@/lib/supabase'

// Query users
const { data: users, error } = await supabase
  .from('User')
  .select('*')

// Insert a category
const { data, error } = await supabase
  .from('Category')
  .insert({
    name: 'New Category',
    slug: 'new-category'
  })

// Query with relations
const { data: products } = await supabase
  .from('Product')
  .select(`
    *,
    category:Category(*)
  `)
```

## 🔧 Troubleshooting

### Error: "relation already exists"
- Tables already exist
- Solution: Drop tables first or use `DROP TABLE IF EXISTS` statements

### Error: "permission denied"
- Check your Supabase role permissions
- Make sure you're using the correct API key

### Error: "syntax error"
- Make sure you copied the ENTIRE SQL file
- Check for any copy/paste issues

## 📚 Next Steps

1. ✅ Schema loaded to Supabase
2. ⏭️ Add seed data (optional)
3. ⏭️ Configure RLS policies (recommended for production)
4. ⏭️ Test queries in your application
5. ⏭️ Set up Supabase Auth (if needed)

## 🆘 Need Help?

- Check Supabase logs: **Logs** → **Postgres Logs**
- View table structure: **Table Editor**
- Test queries: **SQL Editor**
- Supabase Docs: https://supabase.com/docs
