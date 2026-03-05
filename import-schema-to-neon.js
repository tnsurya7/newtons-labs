const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Read connection string from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL=(.+?)[\r\n]/);

if (!dbUrlMatch) {
  console.error('❌ DATABASE_URL not found in .env.local');
  console.error('Content:', envContent);
  process.exit(1);
}

const DATABASE_URL = dbUrlMatch[1].trim();
console.log('✅ Found DATABASE_URL');

// Create SQL client
const sql = neon(DATABASE_URL);

// Read schema file
const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

console.log('📄 Read schema.sql');
console.log('🚀 Importing schema to Neon...\n');

async function importSchema() {
  try {
    // Execute the schema
    await sql(schema);
    
    console.log('✅ Schema imported successfully!');
    console.log('\n📊 Tables created:');
    console.log('  - users');
    console.log('  - tests');
    console.log('  - packages');
    console.log('  - bookings');
    console.log('  - activity_logs');
    console.log('\n🎉 Your Neon database is ready!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Test signup/login at http://localhost:3000');
    console.log('3. Import your data from Supabase (if needed)');
    
  } catch (error) {
    console.error('❌ Error importing schema:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

importSchema();
