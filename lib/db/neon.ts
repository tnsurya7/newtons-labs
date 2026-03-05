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

// Note: These helper functions are not used in production code
// All queries use the sql tagged template directly
// Keeping them for backward compatibility but they won't work with Neon's API

// Execute query with error handling
export async function query<T = any>(
  queryText: string,
  params?: any[]
): Promise<T[]> {
  try {
    // Neon requires tagged templates, so we can't use this helper in production
    // This is kept for type compatibility only
    throw new Error('Use sql tagged template directly instead of query() helper');
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
  throw new Error('Use sql tagged template directly instead of queryOne() helper');
}

// Helper for insert/update/delete operations
export async function execute(
  queryText: string,
  params?: any[]
): Promise<number> {
  throw new Error('Use sql tagged template directly instead of execute() helper');
}
