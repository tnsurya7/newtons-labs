# Migration from Supabase to Neon Database

## ✅ What's Been Done

### 1. Package Installation
- ✅ Installed `@neondatabase/serverless` package
- ✅ Kept `@supabase/supabase-js` (can be removed later if not needed)

### 2. Database Utility Created
- ✅ Created `lib/db/neon.ts` with query helpers
- ✅ Supports parameterized queries for security
- ✅ Includes error handling

### 3. API Routes Migrated
- ✅ `/api/auth/signup` - User registration
- ✅ `/api/auth/login` - User authentication
- ✅ `/api/tests` - Fetch tests with filters
- ✅ `/api/packages` - Fetch packages
- ✅ `/api/health-concerns` - Fetch health categories

### 4. Environment Variables Updated
- ✅ Removed Supabase variables
- ✅ Added `DATABASE_URL` for Neon

---

## 🚀 Setup Instructions

### Step 1: Create Neon Database

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up or log in
3. Click "Create Project"
4. Choose a name: `newtons-lab`
5. Select region closest to you
6. Click "Create Project"

### Step 2: Get Connection String

1. After project creation, you'll see the dashboard
2. Click on "Connection Details" or "Connection String"
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 3: Import Your Database Schema

1. In Neon dashboard, click "SQL Editor"
2. Open your `supabase/schema.sql` file
3. Copy the entire schema
4. Paste it into the Neon SQL Editor
5. Click "Run" to execute

### Step 4: Export Data from Supabase

#### Option A: Using Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. For each table (users, tests, packages, bookings, etc.):
   - Click the table
   - Click "..." menu
   - Select "Export as CSV"
   - Save the file

#### Option B: Using SQL Export
1. In Supabase SQL Editor, run:
   ```sql
   COPY (SELECT * FROM users) TO STDOUT WITH CSV HEADER;
   COPY (SELECT * FROM tests) TO STDOUT WITH CSV HEADER;
   COPY (SELECT * FROM packages) TO STDOUT WITH CSV HEADER;
   COPY (SELECT * FROM bookings) TO STDOUT WITH CSV HEADER;
   COPY (SELECT * FROM activity_logs) TO STDOUT WITH CSV HEADER;
   ```
2. Save each result as a CSV file

### Step 5: Import Data to Neon

#### Using Neon SQL Editor:
1. For each table, create an INSERT statement:
   ```sql
   -- Example for tests table
   INSERT INTO tests (id, name, price, category, status, ...)
   VALUES 
     ('uuid1', 'Test Name 1', 100, 'PATHOLOGY', 'active', ...),
     ('uuid2', 'Test Name 2', 150, 'IMMUNOLOGY', 'active', ...);
   ```

#### Or use the CSV import (if available in Neon):
1. In Neon dashboard, look for "Import" option
2. Upload your CSV files
3. Map columns to table fields

### Step 6: Update Environment Variables

#### Local Development (.env.local):
```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Vercel Production:
1. Go to https://vercel.com
2. Click your project
3. Go to Settings → Environment Variables
4. Remove old variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Add new variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string
   - Environments: ✅ Production ✅ Preview ✅ Development
6. Click Save

### Step 7: Test Locally

1. Update your `.env.local` with Neon connection string
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Test these features:
   - ✅ User signup
   - ✅ User login
   - ✅ Browse tests
   - ✅ Browse packages
   - ✅ Health concerns
   - ✅ Create booking

### Step 8: Deploy to Vercel

1. Commit and push changes:
   ```bash
   git add .
   git commit -m "Migrate from Supabase to Neon database"
   git push origin main
   ```
2. Vercel will automatically deploy
3. Wait for build to complete
4. Test production site

---

## 📋 Verification Checklist

After migration, verify:

- [ ] Database schema imported successfully
- [ ] All data migrated (users, tests, packages, bookings)
- [ ] Local development works
- [ ] User signup works
- [ ] User login works
- [ ] Tests page loads
- [ ] Packages page loads
- [ ] Health concerns display
- [ ] Booking creation works
- [ ] Production deployment successful
- [ ] Production site works

---

## 🔧 Troubleshooting

### Error: "DATABASE_URL is not set"
**Solution**: Make sure you added `DATABASE_URL` to your `.env.local` file and restarted the dev server.

### Error: "Connection refused"
**Solution**: 
1. Check your Neon connection string is correct
2. Make sure it includes `?sslmode=require` at the end
3. Verify your Neon project is active

### Error: "relation does not exist"
**Solution**: You need to import the schema first. Run the SQL from `supabase/schema.sql` in Neon SQL Editor.

### Error: "No data showing"
**Solution**: You need to import your data from Supabase to Neon.

### Build fails on Vercel
**Solution**: 
1. Make sure `DATABASE_URL` is added to Vercel environment variables
2. Make sure it's enabled for all environments
3. Redeploy the project

---

## 🎯 Benefits of Neon

1. **Serverless**: Auto-scales based on usage
2. **Cost-effective**: Pay only for what you use
3. **Fast**: Built on PostgreSQL with modern architecture
4. **Branching**: Create database branches for testing
5. **No connection limits**: Better for serverless functions

---

## 📊 Data Migration Script

If you have a lot of data, you can use this Node.js script to migrate:

```javascript
// migrate-to-neon.js
const { neon } = require('@neondatabase/serverless');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_KEY'
);

const sql = neon('YOUR_NEON_CONNECTION_STRING');

async function migrateTable(tableName) {
  console.log(`Migrating ${tableName}...`);
  
  // Fetch from Supabase
  const { data, error } = await supabase
    .from(tableName)
    .select('*');
  
  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return;
  }
  
  // Insert into Neon
  for (const row of data) {
    const columns = Object.keys(row).join(', ');
    const values = Object.values(row);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    await sql(
      `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
      values
    );
  }
  
  console.log(`✅ Migrated ${data.length} rows from ${tableName}`);
}

async function migrate() {
  await migrateTable('users');
  await migrateTable('tests');
  await migrateTable('packages');
  await migrateTable('bookings');
  await migrateTable('activity_logs');
  console.log('🎉 Migration complete!');
}

migrate();
```

Run with:
```bash
node migrate-to-neon.js
```

---

## 🆘 Need Help?

If you encounter issues:
1. Check Neon documentation: https://neon.tech/docs
2. Verify your connection string format
3. Make sure schema is imported before data
4. Check Vercel deployment logs for errors
5. Test locally first before deploying

---

## ✨ Next Steps

After successful migration:
1. Monitor Neon dashboard for performance
2. Set up database backups in Neon
3. Consider removing `@supabase/supabase-js` package if not needed
4. Update any remaining Supabase references in code
5. Test all features thoroughly
