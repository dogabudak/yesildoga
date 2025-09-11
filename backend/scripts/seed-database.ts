#!/usr/bin/env node

import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CompanyData {
  domain: string;
  company: string;
  parent?: string;
  sector: string;
  hq_city: string;
  carbon_neutral: boolean;
  sbti_status?: string;
  renewable_energy_target_year?: number;
  renewable_share_percent?: number;
  scope_disclosure: {
    "1": boolean;
    "2": boolean;
    "3": boolean;
  };
  iso_certifications: string[];
  green_score?: number;
  controversies_count_12mo?: number;
  esg_policy_url?: string;
  data_confidence?: string;
}

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

async function dropAndRecreateSchema(pool: Pool) {
  console.log('Dropping existing schema and recreating...');
  
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
    
    // Drop extensions if needed (but usually keep them)
    // await client.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
    
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
    console.error('❌ Error recreating schema:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function loadCompanyData(): Promise<CompanyData[]> {
  console.log('Loading company data from JSON...');
  
  try {
    // Look for data.json in the extension directory
    const dataPath = path.join(__dirname, '../database/data.json');
    const jsonContent = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(jsonContent);
    
    console.log(`✅ Loaded ${data.length} companies from data.json`);
    return data;
  } catch (error) {
    console.error('❌ Error loading company data:', error);
    throw error;
  }
}

async function insertCompanies(pool: Pool, companies: CompanyData[]): Promise<void> {
  console.log('Inserting companies into database...');
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // No need to truncate since we dropped and recreated the table
    console.log('📝 Inserting company data into fresh table...');
    
    const insertQuery = `
      INSERT INTO companies (
        domain, company, parent, sector, hq_city, carbon_neutral, 
        sbti_status, renewable_energy_target_year, renewable_share_percent,
        scope_disclosure, iso_certifications, green_score, 
        controversies_count_12mo, esg_policy_url, data_confidence
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )
    `;
    
    let inserted = 0;
    let skipped = 0;
    
    for (const company of companies) {
      try {
        await client.query(insertQuery, [
          company.domain,
          company.company,
          company.parent || null,
          company.sector,
          company.hq_city,
          company.carbon_neutral,
          company.sbti_status || null,
          company.renewable_energy_target_year || null,
          company.renewable_share_percent || null,
          JSON.stringify(company.scope_disclosure),
          company.iso_certifications || [],
          company.green_score || null,
          company.controversies_count_12mo || null,
          company.esg_policy_url || null,
          company.data_confidence || null
        ]);
        inserted++;
        
        if (inserted % 100 === 0) {
          console.log(`📝 Inserted ${inserted} companies...`);
        }
      } catch (error) {
        console.warn(`⚠️  Skipped company ${company.domain}: ${error.message}`);
        skipped++;
        
        // Don't fail the entire process for individual record errors
        if (skipped > 50) {
          console.error('❌ Too many errors, aborting...');
          throw new Error(`Too many insertion errors (${skipped})`);
        }
      }
    }
    
    await client.query('COMMIT');
    
    console.log(`✅ Successfully inserted ${inserted} companies`);
    if (skipped > 0) {
      console.log(`⚠️  Skipped ${skipped} companies due to errors`);
    }
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error inserting companies:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function showStats(pool: Pool): Promise<void> {
  console.log('\n📊 Database Statistics:');
  
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM company_stats');
    const stats = result.rows[0];
    
    console.log(`Total companies: ${stats.total_companies}`);
    console.log(`Carbon neutral: ${stats.carbon_neutral_count}`);
    console.log(`With renewable data: ${stats.with_renewable_data}`);
    console.log(`Independent companies: ${stats.independent_companies}`);
    console.log(`Unique sectors: ${stats.unique_sectors}`);
    console.log(`Unique cities: ${stats.unique_cities}`);
    if (stats.avg_renewable_percentage) {
      console.log(`Average renewable %: ${parseFloat(stats.avg_renewable_percentage).toFixed(2)}%`);
    }
    console.log(`Last updated: ${stats.last_data_update}`);
    
  } finally {
    client.release();
  }
}

async function main() {
  console.log('🌱 Starting database seeding process...\n');
  
  try {
    // Load environment variables
    await loadEnvironmentVariables();
    
    // Create database connection
    const pool = await createDatabasePool();
    console.log('✅ Connected to PostgreSQL database');
    
    // Drop and recreate schema completely
    await dropAndRecreateSchema(pool);
    
    // Load and insert company data
    const companies = await loadCompanyData();
    await insertCompanies(pool, companies);
    
    // Show statistics
    await showStats(pool);
    
    // Close connection
    await pool.end();
    console.log('\n✅ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder if this script is executed directly
if (process.argv[1] === __filename) {
  main();
}

export { main as seedDatabase };