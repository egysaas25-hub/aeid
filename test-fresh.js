// Force fresh load of .env
delete require.cache[require.resolve('dotenv')];
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const { Client } = require('pg');

async function testConnection() {
  console.log('🔍 Testing Supabase Connection (Fresh Load)...\n');
  
  const directUrl = process.env.DIRECT_URL;
  const databaseUrl = process.env.DATABASE_URL;
  
  console.log('DIRECT_URL loaded:', directUrl ? 'Yes' : 'No');
  console.log('Connection format:', directUrl ? directUrl.replace(/:[^:@]+@/, ':****@') : 'N/A');
  console.log('');
  
  if (!directUrl) {
    console.error('❌ ERROR: DIRECT_URL not found!\n');
    return;
  }
  
  const client = new Client({
    connectionString: directUrl,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    console.log('Attempting connection...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    const result = await client.query('SELECT version(), current_database(), current_user');
    console.log('📊 Database Info:');
    console.log('   Version:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    console.log('\n✨ Connection test PASSED!');
    console.log('\n🎯 Next steps:');
    console.log('   1. Run: npx prisma db push');
    console.log('   2. Run: npx prisma generate');
    console.log('   3. Run: pnpm dev');
    
  } catch (error) {
    console.error('❌ Connection FAILED!');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('   ❌ DNS lookup failed - hostname not found');
      console.error('   → Check your internet connection');
      console.error('   → Verify the Supabase project URL is correct');
    } else if (error.message.includes('password authentication failed')) {
      console.error('   ❌ Wrong password');
      console.error('   → Get password from: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database');
      console.error('   → Or reset your database password');
    } else if (error.message.includes('Tenant or user not found')) {
      console.error('   ❌ Wrong username format');
      console.error('   → Username should be: postgres.zxswqevnjldkhqkmixwh');
    } else {
      console.error('   → Check all connection details');
    }
  } finally {
    await client.end();
  }
}

testConnection();
