#!/usr/bin/env node

import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadEnvironmentVariables() {
  try {
    const envContent = await fs.readFile(path.join(__dirname, '../.env'), 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key]) {
        process.env[key] = value.replace(/^["'](.*)["']$/, '$1');
      }
    });
  } catch (error) {
    console.log('No .env file found, using system environment variables');
  }
}

async function createDatabasePool(): Promise<Pool> {
  return new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'yesildoga',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

async function resetSchema(pool: Pool) {
  console.log('🔄 Resetting database schema...');
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Drop everything in the correct order to avoid dependency issues
    console.log('🗑️  Dropping existing objects...');
    
    // Drop views first
    await client.query('DROP VIEW IF EXISTS company_stats CASCADE');
    
    // Drop triggers and functions
    await client.query('DROP TRIGGER IF EXISTS update_companies_updated_at ON companies');
    await client.query('DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE');
    
    // Drop tables
    await client.query('DROP TABLE IF EXISTS companies CASCADE');
    
    console.log('✅ Dropped existing schema objects');
    
    // Now recreate everything from schema file
    console.log('📝 Recreating schema...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf-8');
    
    await client.query(schema);
    console.log('✅ Database schema recreated successfully');
    
    await client.query('COMMIT');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error resetting schema:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  console.log('🔄 Database Schema Reset\n');
  console.log('This will drop all tables and recreate them (without data).\n');
  
  try {
    // Load environment variables
    await loadEnvironmentVariables();
    
    // Create database connection
    const pool = await createDatabasePool();
    console.log('✅ Connected to PostgreSQL database');
    
    // Reset schema
    await resetSchema(pool);
    
    // Close connection
    await pool.end();
    console.log('\n✅ Schema reset completed successfully!');
    console.log('📝 Run "yarn seed" to populate with data');
    
  } catch (error) {
    console.error('\n❌ Schema reset failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] === __filename) {
  main();
}

export { main as resetSchema };