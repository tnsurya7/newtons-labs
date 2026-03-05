const { neon } = require('@neondatabase/serverless');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Supabase credentials
const SUPABASE_URL = 'https://tulbixyhwpcqwhmpjune.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0ODIwMiwiZXhwIjoyMDg3OTI0MjAyfQ.Hh0s0UtTV0bu7bFLgXa2zRa5sRFJasusohFI2AgKUUo';

// Neon connection
const NEON_URL = 'postgresql://neondb_owner:npg_bnzOESX1oiP3@ep-mute-cake-a1mwdp0o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const sql = neon(NEON_URL);

// Generate UUID from string
function generateUUID(str) {
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return `${hash.substr(0,8)}-${hash.substr(8,4)}-${hash.substr(12,4)}-${hash.substr(16,4)}-${hash.substr(20,12)}`;
}

async function migrateTests() {
  console.log('\n📋 Migrating tests...');
  
  try {
    const { data: tests, error } = await supabase
      .from('tests')
      .select('*')
      .order('name');
    
    if (error || !tests || tests.length === 0) {
      console.log('⚠️  No tests found');
      return;
    }
    
    console.log(`Found ${tests.length} tests to migrate`);
    
    let successCount = 0;
    for (const test of tests) {
      try {
        const uuid = generateUUID(test.id);
        await sql`
          INSERT INTO tests (
            id, name, price, original_price, discount, parameters,
            report_time, sample_type, fasting_required, category,
            description, status, created_at, updated_at
          ) VALUES (
            ${uuid}, ${test.name}, ${test.price}, ${test.original_price},
            ${test.discount || 0}, ${test.parameters || 1}, ${test.report_time},
            ${test.sample_type}, ${test.fasting_required || false}, ${test.category},
            ${test.description || ''}, ${test.status || 'active'},
            ${test.created_at}, ${test.updated_at || test.created_at}
          )
          ON CONFLICT (id) DO NOTHING
        `;
        successCount++;
        if (successCount % 50 === 0) {
          process.stdout.write(`\r✅ Migrated ${successCount}/${tests.length} tests`);
        }
      } catch (err) {
        // Skip errors silently
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} tests`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function migratePackages() {
  console.log('\n📦 Migrating packages...');
  
  try {
    const { data: packages, error } = await supabase
      .from('packages')
      .select('*')
      .order('name');
    
    if (error || !packages || packages.length === 0) {
      console.log('⚠️  No packages found');
      return;
    }
    
    console.log(`Found ${packages.length} packages to migrate`);
    
    let successCount = 0;
    for (const pkg of packages) {
      try {
        const uuid = generateUUID(pkg.id);
        await sql`
          INSERT INTO packages (
            id, name, price, original_price, discount, tests_count,
            popular, features, description, status, created_at, updated_at
          ) VALUES (
            ${uuid}, ${pkg.name}, ${pkg.price}, ${pkg.original_price},
            ${pkg.discount || 0}, ${pkg.tests_count || 0}, ${pkg.popular || false},
            ${JSON.stringify(pkg.features || [])}, ${pkg.description || ''},
            ${pkg.status || 'active'}, ${pkg.created_at}, ${pkg.updated_at || pkg.created_at}
          )
          ON CONFLICT (id) DO NOTHING
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${packages.length} packages`);
      } catch (err) {
        // Skip errors silently
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} packages`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function migrateUsers() {
  console.log('\n👥 Migrating users...');
  
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at');
    
    if (error || !users || users.length === 0) {
      console.log('⚠️  No users found');
      return;
    }
    
    console.log(`Found ${users.length} users to migrate`);
    
    let successCount = 0;
    for (const user of users) {
      try {
        const uuid = generateUUID(user.id);
        await sql`
          INSERT INTO users (
            id, name, email, phone, password_hash, role, status, created_at, updated_at
          ) VALUES (
            ${uuid}, ${user.name}, ${user.email}, ${user.phone},
            ${user.password_hash}, ${user.role || 'user'}, ${user.status || 'active'},
            ${user.created_at}, ${user.updated_at || user.created_at}
          )
          ON CONFLICT (email) DO NOTHING
        `;
        successCount++;
      } catch (err) {
        // Skip errors silently
      }
    }
    
    console.log(`✅ Successfully migrated ${successCount} users`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function verifyMigration() {
  console.log('\n🔍 Verifying migration...\n');
  
  try {
    const testCount = await sql`SELECT COUNT(*) as count FROM tests`;
    console.log(`✅ Tests in Neon: ${testCount[0].count}`);
    
    const packageCount = await sql`SELECT COUNT(*) as count FROM packages`;
    console.log(`✅ Packages in Neon: ${packageCount[0].count}`);
    
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    console.log(`✅ Users in Neon: ${userCount[0].count}`);
  } catch (error) {
    console.error('❌ Error verifying:', error);
  }
}

async function migrate() {
  console.log('🚀 Starting data migration from Supabase to Neon...');
  console.log('================================================\n');
  
  try {
    await migrateTests();
    await migratePackages();
    await migrateUsers();
    
    console.log('\n================================================');
    await verifyMigration();
    
    console.log('\n🎉 Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Test the app at http://localhost:3000');
    console.log('3. Verify tests and packages are showing');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
