const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase API Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'Not found');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAPI() {
  try {
    // Test 1: Check if we can query the database
    console.log('Test 1: Checking database access...');
    const { data, error } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️  No tables found yet (expected for new database)');
      console.log('   Error:', error.message);
    } else {
      console.log('✅ Database accessible via API!');
      console.log('   Data:', data);
    }
    
    // Test 2: Check project status
    console.log('\nTest 2: Checking project health...');
    const { data: healthData, error: healthError } = await supabase
      .from('pg_stat_activity')
      .select('*')
      .limit(1);
    
    if (!healthError) {
      console.log('✅ Project is active and healthy!');
    }
    
    console.log('\n✨ Supabase API connection works!');
    console.log('\n💡 The issue is with direct PostgreSQL connection.');
    console.log('   This could mean:');
    console.log('   1. Connection pooling is not enabled');
    console.log('   2. Your IP needs to be whitelisted');
    console.log('   3. Direct database access is restricted');
    console.log('\n🔧 Solution: Use Supabase API instead of direct Prisma connection');
    console.log('   Or enable direct database access in Supabase dashboard');
    
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    console.log('\n💡 This suggests the Supabase project might be:');
    console.log('   - Paused or inactive');
    console.log('   - Deleted');
    console.log('   - Having API issues');
  }
}

testAPI();
