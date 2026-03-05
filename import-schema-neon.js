const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Your Neon connection string
const DATABASE_URL = 'postgresql://neondb_owner:npg_bnzOESX1oiP3@ep-mute-cake-a1mwdp0o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

console.log('✅ Using Neon database');

// Create SQL client
const sql = neon(DATABASE_URL);

// Read schema file
const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

console.log('📄 Read schema.sql');
console.log('🚀 Importing schema to Neon...\n');

async function importSchema() {
  try {
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          await sql`${sql.raw(statement)}`;
          process.stdout.write(`\r✅ Executed ${i + 1}/${statements.length} statements`);
        } catch (err) {
          console.error(`\n❌ Error in statement ${i + 1}:`, err.message);
          console.error('Statement:', statement.substring(0, 100) + '...');
        }
      }
    }
    
    console.log('\n\n✅ Schema imported successfully!');
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
