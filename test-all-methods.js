const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const projectRef = 'zxswqevnjldkhqkmixwh';
const password = 'ZOjiKiEfA9zcmXTp';
const region = 'aws-0-us-east-1';

// Different connection string formats to try
const connectionStrings = [
  {
    name: 'Direct Connection (Port 5432)',
    url: `postgresql://postgres.${projectRef}:${password}@${region}.pooler.supabase.com:5432/postgres`
  },
  {
    name: 'Pooled Connection (Port 6543)',
    url: `postgresql://postgres.${projectRef}:${password}@${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Direct with postgres user',
    url: `postgresql://postgres:${password}@${region}.pooler.supabase.com:5432/postgres`
  },
  {
    name: 'IPv4 Direct Connection',
    url: `postgresql://postgres.${projectRef}:${password}@${region}.pooler.supabase.com:5432/postgres?sslmode=require`
  },
  {
    name: 'Transaction Mode Pooler',
    url: `postgresql://postgres.${projectRef}:${password}@${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&pool_mode=transaction`
  }
];

async function testConnection(name, connectionString) {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });
  
  try {
    await client.connect();
    const result = await client.query('SELECT version(), current_database(), current_user');
    console.log(`✅ ${name} - SUCCESS!`);
    console.log(`   User: ${result.rows[0].current_user}`);
    console.log(`   Database: ${result.rows[0].current_database}`);
    console.log(`   Connection String: ${connectionString.replace(/:password@/, ':****@')}\n`);
    await client.end();
    return true;
  } catch (error) {
    console.log(`❌ ${name} - FAILED`);
    console.log(`   Error: ${error.message}\n`);
    await client.end().catch(() => {});
    return false;
  }
}

async function testAllMethods() {
  console.log('🔍 Testing Multiple Connection Methods...\n');
  console.log('Project: zxswqevnjldkhqkmixwh');
  console.log('Region: aws-0-us-east-1');
  console.log('Password: ****\n');
  console.log('═'.repeat(60) + '\n');
  
  let successCount = 0;
  
  for (const config of connectionStrings) {
    const success = await testConnection(config.name, config.url);
    if (success) successCount++;
  }
  
  console.log('═'.repeat(60));
  console.log(`\n📊 Results: ${successCount}/${connectionStrings.length} methods succeeded\n`);
  
  if (successCount === 0) {
    console.log('💡 All methods failed. This suggests:');
    console.log('   1. The password "password" is incorrect');
    console.log('   2. Your IP might be blocked');
    console.log('   3. The Supabase project might be paused\n');
    console.log('🔧 Next steps:');
    console.log('   → Visit: https://supabase.com/dashboard/project/zxswqevnjldkhqkmixwh/settings/database');
    console.log('   → Reset your database password');
    console.log('   → Check if project is active');
    console.log('   → Verify your IP is allowed (Settings → Database → Connection Pooling)');
  } else {
    console.log('🎉 Success! Use the working connection string in your .env file');
  }
}

testAllMethods();
