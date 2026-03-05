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
