import { prisma } from './lib/db'

async function testDatabaseConnection() {
  console.log('🔄 Testing database connection...\n')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Successfully connected to Supabase database!')
    
    // Test query
    console.log('\n📊 Running test query...')
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('Database info:', result)
    
    // Check if tables exist
    console.log('\n📋 Checking tables...')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    console.log('Tables in database:', tables)
    
    // Count records in each model (if tables exist)
    try {
      const userCount = await prisma.user.count()
      const productCount = await prisma.product.count()
      const orderCount = await prisma.order.count()
      
      console.log('\n📈 Record counts:')
      console.log(`  - Users: ${userCount}`)
      console.log(`  - Products: ${productCount}`)
      console.log(`  - Orders: ${orderCount}`)
    } catch (error) {
      console.log('\n⚠️  Tables not yet created. Run: npx prisma db push')
    }
    
    console.log('\n✨ Database connection test completed successfully!')
    
  } catch (error) {
    console.error('\n❌ Database connection failed!')
    console.error('Error details:', error)
    console.error('\n💡 Make sure to:')
    console.error('  1. Update DATABASE_URL in .env with your actual password')
    console.error('  2. Check your Supabase project is active')
    console.error('  3. Verify your IP is allowed in Supabase settings')
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()
