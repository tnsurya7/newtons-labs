# Admin Panel Testing Guide

## 🎯 What's Ready to Test

1. ✅ Admin Login (Supabase authentication)
2. ✅ Admin Dashboard (Real-time stats)
3. ✅ Tests Management (Full CRUD)
4. ✅ Packages Management (UI ready, needs API)

---

## 📋 Pre-Testing Checklist

### 1. Verify Supabase Connection

**Go to**: http://localhost:3000/test-connection

**Expected Result**: 
- ✅ Supabase Database - Green checkmark
- ✅ Configuration - "Environment variables set"
- ✅ Connection - "Successfully connected"
- ✅ Tables - "6 tables accessible"

**If you see errors**:
- Make sure you ran the SQL schema in Supabase
- Check `.env.local` has correct credentials
- Restart dev server

### 2. Verify Admin User Exists

The SQL schema should have created an admin user:
- Email: admin@new10lab.com
- Password: admin123
- Role: admin

**To verify in Supabase**:
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "users" table
4. Look for admin@new10lab.com with role='admin'

---

## 🧪 Test Scenarios

### Test 1: Admin Login

**URL**: http://localhost:3000/admin/login

**Steps**:
1. Enter email: `admin@new10lab.com`
2. Enter password: `admin123`
3. Click "Sign In"

**Expected Result**:
- ✅ Redirects to `/admin/dashboard`
- ✅ Shows admin name in sidebar
- ✅ No errors in console

**If login fails**:
- Check browser console for errors
- Verify admin user exists in Supabase `users` table
- Check `ADMIN_PASSWORD` in `.env.local` matches

---

### Test 2: Admin Dashboard

**URL**: http://localhost:3000/admin/dashboard (after login)

**What to Check**:

1. **Overview Cards** (top row):
   - Total Users (should show count from database)
   - Total Bookings (should show count)
   - Total Revenue (should show sum)
   - Active Services (tests + packages count)

2. **Quick Stats** (second row):
   - Today's Bookings
   - Pending Bookings
   - Completed Bookings

3. **Recent Bookings Table**:
   - Shows latest bookings from database
   - Displays: Booking ID, Customer, Service, Amount, Status, Date

**Expected Result**:
- ✅ All stats load without errors
- ✅ Numbers match your database data
- ✅ Recent bookings table shows real data (if any bookings exist)

**If you see mock data**:
- This means Supabase is not connected
- Go back to Test 1 (verify connection)

---

### Test 3: Tests Management (Full CRUD)

**URL**: http://localhost:3000/admin/services → Click "Tests Management"

#### 3.1 View Tests List

**Expected Result**:
- ✅ Shows all tests from database (should see 6 tests from schema)
- ✅ Table displays: Name, Category, Price, Discount, Parameters, Status, Actions
- ✅ Search box at top

**Tests you should see** (from schema):
1. Complete Blood Count (CBC)
2. Thyroid Profile Total
3. Lipid Profile
4. HbA1c (Glycated Hemoglobin)
5. Vitamin D (25-OH)
6. Liver Function Test (LFT)

#### 3.2 Search Tests

**Steps**:
1. Type "blood" in search box

**Expected Result**:
- ✅ Filters to show only "Complete Blood Count (CBC)"
- ✅ Updates in real-time as you type

#### 3.3 Add New Test

**Steps**:
1. Click "Add New Test" button
2. Fill in form:
   - Name: "Kidney Function Test"
   - Original Price: 899
   - Discounted Price: 499
   - Parameters: 8
   - Report Time: "12 hours"
   - Category: "Kidney Health"
   - Status: Active
   - Fasting Required: ✓ (checked)
   - Description: "Complete kidney function assessment"
3. Click "Add Test"

**Expected Result**:
- ✅ Modal closes
- ✅ New test appears in table
- ✅ Discount calculated automatically (44% OFF)
- ✅ No errors in console

**Verify in Supabase**:
1. Go to Supabase → Table Editor → tests
2. Should see new test with ID "7"

#### 3.4 Edit Test

**Steps**:
1. Click edit icon (pencil) on any test
2. Change price from 299 to 249
3. Click "Update Test"

**Expected Result**:
- ✅ Modal closes
- ✅ Test price updates in table
- ✅ Discount recalculates
- ✅ Changes saved to database

#### 3.5 Delete Test

**Steps**:
1. Click delete icon (trash) on the test you just added
2. Confirm deletion

**Expected Result**:
- ✅ Confirmation dialog appears
- ✅ Test removed from table
- ✅ Deleted from database

---

### Test 4: Packages Management (UI Only)

**URL**: http://localhost:3000/admin/services → Click "Packages Management"

**Expected Result**:
- ✅ Page loads
- ✅ Shows loading spinner
- ✅ Then shows error or empty state (API not implemented yet)

**Note**: This page UI is ready but needs API endpoints to work fully.

---

### Test 5: Navigation & Sidebar

**Steps**:
1. Click different menu items in sidebar:
   - Dashboard
   - Services
   - Users (not implemented yet)
   - Bookings (not implemented yet)
   - Analytics (not implemented yet)

**Expected Result**:
- ✅ Dashboard and Services work
- ✅ Others show "not implemented" or redirect
- ✅ Active menu item highlighted
- ✅ Sidebar responsive on mobile

---

### Test 6: Logout

**Steps**:
1. Click "Logout" at bottom of sidebar
2. Confirm logout

**Expected Result**:
- ✅ Redirects to `/admin/login`
- ✅ Cannot access admin pages without logging in again
- ✅ Session cleared from localStorage

---

## 🐛 Common Issues & Solutions

### Issue 1: "Database not configured" error

**Solution**:
1. Check `.env.local` has real Supabase credentials
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Test connection at http://localhost:3000/test-connection

### Issue 2: "Invalid credentials" on login

**Solution**:
1. Verify admin user exists in Supabase `users` table
2. Check `ADMIN_PASSWORD` in `.env.local` is "admin123"
3. Make sure user has `role='admin'` and `status='active'`

### Issue 3: Tests not loading

**Solution**:
1. Check browser console for errors
2. Verify SQL schema was run successfully
3. Check `tests` table has data in Supabase

### Issue 4: Can't add/edit/delete tests

**Solution**:
1. Check browser console for API errors
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
3. Check Supabase RLS policies allow admin operations

---

## ✅ Testing Checklist

Use this checklist to verify everything works:

- [ ] Supabase connection test passes
- [ ] Admin user exists in database
- [ ] Can login with admin credentials
- [ ] Dashboard loads with real stats
- [ ] Tests list shows 6 tests from database
- [ ] Search filters tests correctly
- [ ] Can add new test successfully
- [ ] Can edit existing test
- [ ] Can delete test
- [ ] Sidebar navigation works
- [ ] Can logout successfully
- [ ] Mobile responsive (test on small screen)

---

## 📊 Expected Data

After running the SQL schema, you should have:

**Users Table**:
- 1 admin user (admin@new10lab.com)

**Tests Table**:
- 6 tests (CBC, Thyroid, Lipid, HbA1c, Vitamin D, LFT)

**Packages Table**:
- 4 packages (Aarogyam Basic, Advanced, Full Body, Senior Citizen)

**Bookings Table**:
- Empty (will populate when users book services)

---

## 🎬 Next Steps After Testing

Once you've tested everything above:

1. **Report any issues** you find
2. **Confirm what works** so I know what to build next
3. **Choose next feature** to implement:
   - Packages API (to make packages management work)
   - Users Management
   - Bookings Management
   - Analytics

Let me know what you find!
