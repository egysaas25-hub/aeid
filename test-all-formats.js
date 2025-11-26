const { Client } = require('pg');

const projectRef = 'zxswqevnjldkhqkmixwh';
const password = 'ZOjiKiEfA9zcmXTp';

const formats = [
  {
    name: 'Pooler with postgres.ref user (Port 5432)',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
  },
  {
    name: 'Pooler with postgres.ref user (Port 6543)',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Pooler with postgres user (Port 5432)',
    url: `postgresql://postgres:${password}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
  },
  {
    name: 'Pooler with postgres user (Port 6543)',
    url: `postgresql://postgres:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
  },
  {
    name: 'Pooler with postgres user + pgbouncer',
    url: `postgresql://postgres:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Pooler with postgres.ref + pgbouncer',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
];

async function testFormat(name, url) {
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000
  });
  
  try {
    await client.connect();
    const result = await client.query('SELECT current_user, current_database()');
    console.log(`✅ ${name}`);
    console.log(`   User: ${result.rows[0].current_user}`);
    console.log(`   DB: ${result.rows[0].current_database}`);
    console.log(`   URL: ${url.replace(password, '****')}\n`);
    await client.end();
    return url;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}\n`);
    await client.end().catch(() => {});
    return null;
  }
}

async function main() {
  console.log('🔍 Testing All Supabase Connection Formats...\n');
  console.log('Project:', projectRef);
  console.log('Password: ****\n');
  console.log('═'.repeat(70) + '\n');
  
  let workingUrl = null;
  
  for (const format of formats) {
    const result = await testFormat(format.name, format.url);
    if (result && !workingUrl) {
      workingUrl = result;
    }
  }
  
  console.log('═'.repeat(70));
  
  if (workingUrl) {
    console.log('\n🎉 SUCCESS! Found working connection!\n');
    console.log('Add this to your .env file:');
    console.log(`\nDIRECT_URL="${workingUrl}"`);
    console.log(`DATABASE_URL="${workingUrl}"`);
  } else {
    console.log('\n❌ No working connection found.\n');
    console.log('💡 This means:');
    console.log('   1. The pooler endpoint might not be available for your project');
    console.log('   2. Your network blocks these connections');
    console.log('   3. You need to enable connection pooling in Supabase dashboard\n');
    console.log('🔧 Alternative: Use Prisma with Supabase Data API');
    console.log('   Or enable IPv6 on your network');
  }
}

main();
