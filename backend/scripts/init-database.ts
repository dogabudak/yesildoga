#!/usr/bin/env node

import { Client } from 'pg';
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

async function createDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  };

  const dbName = process.env.DB_NAME || 'yesildoga';

  console.log('🔧 Initializing PostgreSQL database...\n');
  console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`User: ${dbConfig.user}`);
  console.log(`Database: ${dbName}\n`);

  // Connect to PostgreSQL (without specifying database)
  const client = new Client({
    ...dbConfig,
    database: 'postgres' // Connect to default postgres database
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists
    const checkDbQuery = 'SELECT 1 FROM pg_database WHERE datname = $1';
    const result = await client.query(checkDbQuery, [dbName]);

    if (result.rows.length === 0) {
      // Database doesn't exist, create it
      console.log(`📦 Creating database "${dbName}"...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully`);
    } else {
      console.log(`✅ Database "${dbName}" already exists`);
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Could not connect to PostgreSQL server.');
      console.error('Please ensure PostgreSQL is running and accessible.');
      console.error(`Connection details: ${dbConfig.host}:${dbConfig.port}`);
    } else if (error.code === '28P01') {
      console.error('❌ Authentication failed.');
      console.error('Please check your database username and password in .env file.');
    } else {
      console.error('❌ Database creation failed:', error.message);
    }
    throw error;
  } finally {
    await client.end();
  }
}

async function testConnection() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'yesildoga',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  };

  console.log(`🧪 Testing connection to "${dbConfig.database}" database...`);
  
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    console.log('✅ Database connection test successful');
    console.log(`PostgreSQL version: ${result.rows[0].version.split(' ')[1]}`);
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

async function checkPostgreSQLInstallation() {
  console.log('🔍 Checking PostgreSQL installation...\n');
  
  try {
    // Try to connect to see if PostgreSQL is running
    const client = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: 'postgres'
    });
    
    await client.connect();
    await client.end();
    console.log('✅ PostgreSQL server is running');
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ PostgreSQL server is not running or not accessible.');
      console.error('\n📋 To install and start PostgreSQL:');
      console.error('');
      console.error('macOS (with Homebrew):');
      console.error('  brew install postgresql');
      console.error('  brew services start postgresql');
      console.error('');
      console.error('Ubuntu/Debian:');
      console.error('  sudo apt-get install postgresql postgresql-contrib');
      console.error('  sudo systemctl start postgresql');
      console.error('');
      console.error('Windows:');
      console.error('  Download from https://www.postgresql.org/download/windows/');
      console.error('');
      throw new Error('PostgreSQL server not accessible');
    }
    throw error;
  }
}

async function main() {
  try {
    console.log('🌱 Database Initialization Script\n');
    
    // Load environment variables
    await loadEnvironmentVariables();
    
    // Check if PostgreSQL is installed and running
    await checkPostgreSQLInstallation();
    
    // Create database if it doesn't exist
    await createDatabase();
    
    // Test connection to the created database
    await testConnection();
    
    console.log('\n🎉 Database initialization completed successfully!');
    console.log('You can now run "yarn start" or "yarn seed"');
    
  } catch (error) {
    console.error('\n💥 Database initialization failed!');
    console.error('Please fix the issues above and try again.');
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] === __filename) {
  main();
}

export { main as initDatabase };