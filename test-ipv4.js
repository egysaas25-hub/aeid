const { Client } = require('pg');
const dns = require('dns');
const { promisify } = require('util');
require('dotenv').config();

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);

async function testWithIPv4() {
  console.log('🔍 Testing Supabase Connection with IPv4...\n');
  
  const hostname = 'db.zxswqevnjldkhqkmixwh.supabase.co';
  const password = 'ZOjiKiEfA9zcmXTp';
  
  try {
    // Try to resolve both IPv4 and IPv6
    console.log('Resolving DNS...');
    
    let ipv4, ipv6;
    try {
      ipv4 = await resolve4(hostname);
      console.log('✅ IPv4 addresses:', ipv4);
    } catch (e) {
      console.log('⚠️  No IPv4 address found');
    }
    
    try {
      ipv6 = await resolve6(hostname);
      console.log('✅ IPv6 addresses:', ipv6);
    } catch (e) {
      console.log('⚠️  No IPv6 address found');
    }
    
    console.log('');
    
    // Try connection with explicit family setting
    const connectionString = `postgresql://postgres:${password}@${hostname}:5432/postgres`;
    
    console.log('Attempting connection...');
    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
    
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    const result = await client.query('SELECT version(), current_database(), current_user, inet_server_addr()');
    console.log('📊 Database Info:');
    console.log('   PostgreSQL:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    console.log('   Server IP:', result.rows[0].inet_server_addr);
    
    console.log('\n✨ SUCCESS! Connection works!');
    console.log('\n🎯 Next steps:');
    console.log('   1. Run: npx prisma db push');
    console.log('   2. Run: npx prisma generate');
    console.log('   3. Run: pnpm dev');
    
    await client.end();
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 DNS resolution failed. Try:');
      console.log('   1. Check your internet connection');
      console.log('   2. Try a different DNS server (8.8.8.8)');
      console.log('   3. Flush DNS cache: ipconfig /flushdns');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection timeout. This could mean:');
      console.log('   1. Firewall is blocking port 5432');
      console.log('   2. Supabase project is paused');
      console.log('   3. Your IP is not whitelisted');
    }
  }
}

testWithIPv4();
