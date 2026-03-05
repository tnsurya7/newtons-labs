import { neon } from '@neondatabase/serverless';

// Get database URL from environment
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return url;
};

// Create SQL query function
export const sql = neon(getDatabaseUrl());

// Helper function to check if database is configured
export const isDatabaseConfigured = () => {
  return !!process.env.DATABASE_URL;
};

// Execute query with error handling
export async function query<T = any>(
  queryText: string,
  params?: any[]
): Promise<T[]> {
  try {
    const result = await sql(queryText, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper for single row queries
export async function queryOne<T = any>(
  queryText: string,
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(queryText, params);
  return results[0] || null;
}

// Helper for insert/update/delete operations
export async function execute(
  queryText: string,
  params?: any[]
): Promise<number> {
  const result = await sql(queryText, params);
  return result.length;
}
