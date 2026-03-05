const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_bnzOESX1oiP3@ep-mute-cake-a1mwdp0o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function testConnection() {
  console.log('🔍 Testing Neon database connection...\n');
  
  try {
    // Test connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Connection successful!');
    console.log('📅 Server time:', result[0].current_time);
    
    // Check tables
    console.log('\n📊 Checking tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach(t => console.log(`   - ${t.table_name}`));
    
    // Count records in each table
    console.log('\n📈 Checking data...');
    
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    console.log(`   Users: ${userCount[0].count} records`);
    
    const testCount = await sql`SELECT COUNT(*) as count FROM tests`;
    console.log(`   Tests: ${testCount[0].count} records`);
    
    const packageCount = await sql`SELECT COUNT(*) as count FROM packages`;
    console.log(`   Packages: ${packageCount[0].count} records`);
    
    const bookingCount = await sql`SELECT COUNT(*) as count FROM bookings`;
    console.log(`   Bookings: ${bookingCount[0].count} records`);
    
    console.log('\n🎉 Database is ready to use!');
    console.log('\nNext step: Run "npm run dev" to start the app');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your connection string is correct');
    console.error('2. Neon project is active');
    console.error('3. Tables are created (run: node create-tables-neon.js)');
    process.exit(1);
  }
}

testConnection();
