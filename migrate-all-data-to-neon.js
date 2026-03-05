const { neon } = require('@neondatabase/serverless');
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const SUPABASE_URL = 'https://tulbixyhwpcqwhmpjune.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bGJpeHlod3BjcXdobXBqdW5lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0ODIwMiwiZXhwIjoyMDg3OTI0MjAyfQ.Hh0s0UtTV0bu7bFLgXa2zRa5sRFJasusohFI2AgKUUo';

// Neon connection
const NEON_URL = 'postgresql://neondb_owner:npg_bnzOESX1oiP3@ep-mute-cake-a1mwdp0o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const sql = neon(NEON_URL);

async function migrateTests() {
  console.log('\n📋 Migrating tests...');
  
  try {
    // Fetch all tests from Supabase
    const { data: tests, error } = await supabase
      .from('tests')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('❌ Error fetching tests from Supabase:', error);
      return;
    }
    
    if (!tests || tests.length === 0) {
      console.log('⚠️  No tests found in Supabase');
      return;
    }
    
    console.log(`Found ${tests.length} tests to migrate`);
    
    // Insert tests into Neon
    let successCount = 0;
    for (const test of tests) {
      try {
        await sql`
          INSERT INTO tests (
            id, name, price, original_price, discount, parameters,
            report_time, sample_type, fasting_required, category,
            description, status, created_at, updated_at
          ) VALUES (
            ${test.id}, ${test.name}, ${test.price}, ${test.original_price},
            ${test.discount || 0}, ${test.parameters || 1}, ${test.report_time},
            ${test.sample_type}, ${test.fasting_required || false}, ${test.category},
            ${test.description || ''}, ${test.status || 'active'},
            ${test.created_at}, ${test.updated_at || test.created_at}
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            price = EXCLUDED.price,
            updated_at = EXCLUDED.updated_at
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${tests.length} tests`);
      } catch (err) {
        console.error(`\n❌ Error inserting test ${test.name}:`, err.message);
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} tests`);
  } catch (error) {
    console.error('❌ Error in migrateTests:', error);
  }
}

async function migratePackages() {
  console.log('\n📦 Migrating packages...');
  
  try {
    const { data: packages, error } = await supabase
      .from('packages')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('❌ Error fetching packages from Supabase:', error);
      return;
    }
    
    if (!packages || packages.length === 0) {
      console.log('⚠️  No packages found in Supabase');
      return;
    }
    
    console.log(`Found ${packages.length} packages to migrate`);
    
    let successCount = 0;
    for (const pkg of packages) {
      try {
        await sql`
          INSERT INTO packages (
            id, name, price, original_price, discount, tests_count,
            popular, features, description, status, created_at, updated_at
          ) VALUES (
            ${pkg.id}, ${pkg.name}, ${pkg.price}, ${pkg.original_price},
            ${pkg.discount || 0}, ${pkg.tests_count || 0}, ${pkg.popular || false},
            ${JSON.stringify(pkg.features || [])}, ${pkg.description || ''},
            ${pkg.status || 'active'}, ${pkg.created_at}, ${pkg.updated_at || pkg.created_at}
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            price = EXCLUDED.price,
            updated_at = EXCLUDED.updated_at
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${packages.length} packages`);
      } catch (err) {
        console.error(`\n❌ Error inserting package ${pkg.name}:`, err.message);
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} packages`);
  } catch (error) {
    console.error('❌ Error in migratePackages:', error);
  }
}

async function migrateUsers() {
  console.log('\n👥 Migrating users...');
  
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at');
    
    if (error) {
      console.error('❌ Error fetching users from Supabase:', error);
      return;
    }
    
    if (!users || users.length === 0) {
      console.log('⚠️  No users found in Supabase');
      return;
    }
    
    console.log(`Found ${users.length} users to migrate`);
    
    let successCount = 0;
    for (const user of users) {
      try {
        await sql`
          INSERT INTO users (
            id, name, email, phone, password_hash, role, status, created_at, updated_at
          ) VALUES (
            ${user.id}, ${user.name}, ${user.email}, ${user.phone},
            ${user.password_hash}, ${user.role || 'user'}, ${user.status || 'active'},
            ${user.created_at}, ${user.updated_at || user.created_at}
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            updated_at = EXCLUDED.updated_at
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${users.length} users`);
      } catch (err) {
        console.error(`\n❌ Error inserting user ${user.email}:`, err.message);
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} users`);
  } catch (error) {
    console.error('❌ Error in migrateUsers:', error);
  }
}

async function migrateBookings() {
  console.log('\n📅 Migrating bookings...');
  
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at');
    
    if (error) {
      console.error('❌ Error fetching bookings from Supabase:', error);
      return;
    }
    
    if (!bookings || bookings.length === 0) {
      console.log('⚠️  No bookings found in Supabase');
      return;
    }
    
    console.log(`Found ${bookings.length} bookings to migrate`);
    
    let successCount = 0;
    for (const booking of bookings) {
      try {
        await sql`
          INSERT INTO bookings (
            id, booking_id, user_id, user_name, user_email, user_phone,
            user_address, items, subtotal, discount_amount, tax_amount,
            total_amount, status, payment_status, payment_method,
            booking_date, collection_date, created_at, updated_at
          ) VALUES (
            ${booking.id}, ${booking.booking_id}, ${booking.user_id},
            ${booking.user_name}, ${booking.user_email}, ${booking.user_phone},
            ${booking.user_address}, ${JSON.stringify(booking.items || [])},
            ${booking.subtotal}, ${booking.discount_amount || 0}, ${booking.tax_amount || 0},
            ${booking.total_amount}, ${booking.status || 'pending'},
            ${booking.payment_status || 'pending'}, ${booking.payment_method || 'pay_on_service'},
            ${booking.booking_date}, ${booking.collection_date},
            ${booking.created_at}, ${booking.updated_at || booking.created_at}
          )
          ON CONFLICT (id) DO UPDATE SET
            status = EXCLUDED.status,
            updated_at = EXCLUDED.updated_at
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${bookings.length} bookings`);
      } catch (err) {
        console.error(`\n❌ Error inserting booking ${booking.booking_id}:`, err.message);
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} bookings`);
  } catch (error) {
    console.error('❌ Error in migrateBookings:', error);
  }
}

async function migrateActivityLogs() {
  console.log('\n📊 Migrating activity logs...');
  
  try {
    const { data: logs, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at')
      .limit(1000); // Limit to recent 1000 logs
    
    if (error) {
      console.error('❌ Error fetching activity logs from Supabase:', error);
      return;
    }
    
    if (!logs || logs.length === 0) {
      console.log('⚠️  No activity logs found in Supabase');
      return;
    }
    
    console.log(`Found ${logs.length} activity logs to migrate`);
    
    let successCount = 0;
    for (const log of logs) {
      try {
        await sql`
          INSERT INTO activity_logs (
            id, user_id, action, description, created_at
          ) VALUES (
            ${log.id}, ${log.user_id}, ${log.action}, ${log.description}, ${log.created_at}
          )
          ON CONFLICT (id) DO NOTHING
        `;
        successCount++;
        process.stdout.write(`\r✅ Migrated ${successCount}/${logs.length} logs`);
      } catch (err) {
        // Silently skip errors for logs
      }
    }
    
    console.log(`\n✅ Successfully migrated ${successCount} activity logs`);
  } catch (error) {
    console.error('❌ Error in migrateActivityLogs:', error);
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
    
    const bookingCount = await sql`SELECT COUNT(*) as count FROM bookings`;
    console.log(`✅ Bookings in Neon: ${bookingCount[0].count}`);
    
    const logCount = await sql`SELECT COUNT(*) as count FROM activity_logs`;
    console.log(`✅ Activity logs in Neon: ${logCount[0].count}`);
  } catch (error) {
    console.error('❌ Error verifying migration:', error);
  }
}

async function migrate() {
  console.log('🚀 Starting data migration from Supabase to Neon...');
  console.log('================================================\n');
  
  try {
    await migrateTests();
    await migratePackages();
    await migrateUsers();
    await migrateBookings();
    await migrateActivityLogs();
    
    console.log('\n================================================');
    await verifyMigration();
    
    console.log('\n🎉 Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Test login with existing users');
    console.log('3. Verify tests and packages are showing');
    console.log('4. Deploy to production');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
