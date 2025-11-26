// Simple connection test without Prisma
const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n');
  
  // Test DIRECT_URL
  console.log('Testing DIRECT_URL (port 5432)...');
  const directUrl = process.env.DIRECT_URL;
  
  if (!directUrl) {
    console.error('❌ ERROR: DIRECT_URL not found in .env file!\n');
    return;
  }
  
  console.log('Connection string format:', directUrl.replace(/:[^:@]+@/, ':****@'));
  
  const client = new Client({
    connectionString: directUrl,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    const result = await client.query('SELECT version(), current_database(), current_user');
    console.log('📊 Database Info:');
    console.log('   Version:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    console.log('\n✨ Connection test passed!');
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your password is correct');
    console.error('   2. If password has special characters (@#$%), URL encode them');
    console.error('   3. Get connection string from: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database');
    console.error('   4. Try resetting your database password in Supabase dashboard');
  } finally {
    await client.end();
  }
}

testConnection();
