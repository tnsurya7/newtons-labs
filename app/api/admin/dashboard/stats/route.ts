import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET() {
  try {
    const stats = {
      totalUsers: 0,
      totalBookings: 0,
      totalRevenue: 0,
      activeServices: 0,
      todayBookings: 0,
      pendingBookings: 0,
      completedBookings: 0,
      recentBookings: [],
    };

    if (!supabaseAdmin) {
      // Return default data if database not configured
      return NextResponse.json({
        ...stats,
        activeServices: 10,
      });
    }

    // Fetch each stat individually with error handling
    try {
      const { count: usersCount } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true });
      stats.totalUsers = usersCount || 0;
    } catch (error) {
      console.log('Users table query failed');
    }

    try {
      const { count: bookingsCount } = await supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact', head: true });
      stats.totalBookings = bookingsCount || 0;
    } catch (error) {
      console.log('Bookings table query failed');
    }

    try {
      const { data: revenueData } = await supabaseAdmin
        .from('bookings')
        .select('total_amount');
      stats.totalRevenue = revenueData?.reduce((sum: number, b: any) => sum + Number(b.total_amount), 0) || 0;
    } catch (error) {
      console.log('Revenue query failed');
    }

    try {
      const { count: testsCount } = await supabaseAdmin
        .from('tests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      const { count: packagesCount } = await supabaseAdmin
        .from('packages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      stats.activeServices = (testsCount || 0) + (packagesCount || 0);
    } catch (error) {
      console.log('Services query failed');
      stats.activeServices = 10; // Default value
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);
      stats.todayBookings = todayCount || 0;
    } catch (error) {
      console.log('Today bookings query failed');
    }

    try {
      const { count: pendingCount } = await supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      stats.pendingBookings = pendingCount || 0;
    } catch (error) {
      console.log('Pending bookings query failed');
    }

    try {
      const { count: completedCount } = await supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');
      stats.completedBookings = completedCount || 0;
    } catch (error) {
      console.log('Completed bookings query failed');
    }

    try {
      const { data: recentBookings } = await supabaseAdmin
        .from('bookings')
        .select(`
          *,
          items:booking_items(*)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      stats.recentBookings = recentBookings || [];
    } catch (error) {
      console.log('Recent bookings query failed');
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Return default stats on error
    return NextResponse.json({
      totalUsers: 0,
      totalBookings: 0,
      totalRevenue: 0,
      activeServices: 10,
      todayBookings: 0,
      pendingBookings: 0,
      completedBookings: 0,
      recentBookings: [],
    });
  }
}
