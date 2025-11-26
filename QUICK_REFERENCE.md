# 🚀 Quick Reference - Supabase Setup

## ✅ What You Have

- ✅ Supabase Project: `zxswqevnjldkhqkmixwh`
- ✅ Password: `ZOjiKiEfA9zcmXTp`
- ✅ API URL: `https://zxswqevnjldkhqkmixwh.supabase.co`
- ✅ Anon Key: `eyJhbGciOiJIUzI1NiIs...` (in .env)
- ✅ Supabase API: Working ✓
- ❌ Direct PostgreSQL: Not working (IPv6 issue)

## 📝 Load Schema to Supabase

### 1-Minute Setup:

```bash
# 1. Open Supabase SQL Editor
https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/sql/new

# 2. Copy and paste content from:
aeid/supabase-schema.sql

# 3. Click "Run" button

# 4. Verify in Table Editor
https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/editor
```

## 💻 Use in Your App

```typescript
// Use Supabase client (not Prisma for now)
import { supabase } from '@/lib/supabase'

// Query
const { data } = await supabase.from('User').select('*')

// Insert
const { data } = await supabase.from('Category').insert({ name: 'Test', slug: 'test' })

// Update
const { data } = await supabase.from('Product').update({ price: 99.99 }).eq('id', productId)

// Delete
const { data } = await supabase.from('CartItem').delete().eq('id', itemId)
```

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **SQL Editor** | https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/sql |
| **Table Editor** | https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/editor |
| **Database Settings** | https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database |
| **API Docs** | https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/api |

## 📁 Files Created

| File | Purpose |
|------|---------|
| `supabase-schema.sql` | SQL to create all tables |
| `LOAD_SCHEMA_TO_SUPABASE.md` | Detailed instructions |
| `SUPABASE_CONNECTION_ISSUE.md` | Connection troubleshooting |
| `lib/supabase.ts` | Supabase client config |
| `.env` | Environment variables |

## 🎯 Next Actions

1. **Load Schema**: Copy `supabase-schema.sql` to SQL Editor and run
2. **Verify Tables**: Check Table Editor
3. **Test Queries**: Try querying in SQL Editor
4. **Use in App**: Import and use `supabase` client
5. **Add Data**: Insert seed data or test records

## 🆘 Quick Fixes

**Tables not showing?**
- Refresh Table Editor page
- Check SQL Editor for errors

**Can't query tables?**
- Check RLS is disabled (for testing)
- Verify API key in .env

**Need to reset?**
```sql
-- Drop all tables (careful!)
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "CartItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "Address" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "OrderStatus" CASCADE;
DROP TYPE IF EXISTS "PaymentStatus" CASCADE;
```

Then run `supabase-schema.sql` again.
