const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_bnzOESX1oiP3@ep-mute-cake-a1mwdp0o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function createTables() {
  try {
    console.log('🚀 Creating tables in Neon...\n');
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Created users table');
    
    // Create tests table
    await sql`
      CREATE TABLE IF NOT EXISTS tests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        discount INTEGER DEFAULT 0,
        parameters INTEGER DEFAULT 1,
        report_time VARCHAR(100),
        sample_type VARCHAR(100),
        fasting_required BOOLEAN DEFAULT false,
        category VARCHAR(100),
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Created tests table');
    
    // Create packages table
    await sql`
      CREATE TABLE IF NOT EXISTS packages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        discount INTEGER DEFAULT 0,
        tests_count INTEGER DEFAULT 0,
        popular BOOLEAN DEFAULT false,
        features JSONB,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Created packages table');
    
    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id VARCHAR(50) UNIQUE NOT NULL,
        user_id UUID,
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_phone VARCHAR(20),
        user_address TEXT,
        items JSONB,
        subtotal DECIMAL(10,2),
        discount_amount DECIMAL(10,2) DEFAULT 0,
        tax_amount DECIMAL(10,2) DEFAULT 0,
        total_amount DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        booking_date TIMESTAMP,
        collection_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Created bookings table');
    
    // Create activity_logs table
    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        action VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Created activity_logs table');
    
    console.log('\n🎉 All tables created successfully!');
    console.log('\nYour Neon database is ready to use!');
    console.log('\nNext steps:');
    console.log('1. Update .env.local with DATABASE_URL');
    console.log('2. Run: npm run dev');
    console.log('3. Test signup at http://localhost:3000/signup');
    console.log('4. Import data from Supabase (if needed)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTables();
