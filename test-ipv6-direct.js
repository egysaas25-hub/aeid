const { Client } = require('pg');

async function testWithIPv6Direct() {
  console.log('🔍 Testing Supabase Connection with IPv6 address directly...\n');
  
  const ipv6 = '2a05:d019:fa8:a409:8a9b:c558:9f2d:d1db';
  const password = 'ZOjiKiEfA9zcmXTp';
  
  // Try with IPv6 address directly
  const connectionString = `postgresql://postgres:${password}@[${ipv6}]:5432/postgres`;
  
  console.log('Connection string:', connectionString.replace(password, '****'));
  console.log('Attempting connection...\n');
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  
  try {
    await client.connect();
    console.log('✅ Connected successfully with IPv6!\n');
    
    const result = await client.query('SELECT version(), current_database(), current_user');
    console.log('📊 Database Info:');
    console.log('   PostgreSQL:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    
    console.log('\n✨ SUCCESS!');
    console.log('\n⚠️  Note: Your system only supports IPv6 for this Supabase instance.');
    console.log('   This might cause issues with some tools.');
    console.log('\n🔧 Recommendation: Contact Supabase support to enable IPv4');
    
    await client.end();
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    
    console.log('\n💡 Your network might not support IPv6.');
    console.log('   Solutions:');
    console.log('   1. Enable IPv6 on your network');
    console.log('   2. Use a VPN that supports IPv6');
    console.log('   3. Contact Supabase to enable IPv4 for your project');
    console.log('   4. Use Supabase API instead of direct database connection');
  }
}

testWithIPv6Direct();
