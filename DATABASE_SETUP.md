# Database Setup Guide - Supabase

## Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `new10labs`
   - Database password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"

### Step 2: Get Database Credentials
1. Wait for project to finish setting up (2-3 minutes)
2. Go to Project Settings > API
3. Copy these values:
   - Project URL
   - Project API Key (anon/public)
   - Service Role Key (keep secret!)

### Step 3: Add to Environment Variables
Create/update `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_key

# Admin
ADMIN_EMAIL=admin@new10lab.com
ADMIN_PASSWORD=your_secure_password
```

### Step 4: Run Database Migration
I'll create SQL scripts to set up all tables. Run them in Supabase SQL Editor.

---

## Database Schema

### Tables to Create:

1. **users** - User accounts
2. **tests** - Diagnostic tests
3. **packages** - Health packages
4. **bookings** - All bookings
5. **booking_items** - Items in each booking
6. **activity_logs** - User activity tracking

---

## Installation Complete!

Once you've completed steps 1-3, I'll handle the rest programmatically.
