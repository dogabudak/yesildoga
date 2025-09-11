#!/usr/bin/env node

import { initDatabase } from './init-database.js';
import { seedDatabase } from './seed-database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkEnvFile() {
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  try {
    await fs.access(envPath);
    console.log('✅ .env file exists');
  } catch (error) {
    console.log('⚠️  .env file not found, creating from .env.example...');
    try {
      await fs.copyFile(envExamplePath, envPath);
      console.log('✅ .env file created from .env.example');
      console.log('📝 Please review and update the database credentials in .env file');
    } catch (copyError) {
      console.error('❌ Failed to create .env file:', copyError.message);
      throw copyError;
    }
  }
}

async function main() {
  console.log('🚀 Complete Database Setup\n');
  console.log('This script will:');
  console.log('1. Check/create .env file');
  console.log('2. Initialize PostgreSQL database');
  console.log('3. Seed database with company data');
  console.log('');

  try {
    // Step 1: Check .env file
    console.log('📋 Step 1: Environment Configuration');
    await checkEnvFile();
    console.log('');

    // Step 2: Initialize database
    console.log('📋 Step 2: Database Initialization');
    await initDatabase();
    console.log('');

    // Step 3: Seed database
    console.log('📋 Step 3: Database Seeding');
    await seedDatabase();
    console.log('');

    console.log('🎉 Complete setup finished successfully!');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('  yarn start    # Start the development server');
    console.log('  yarn build    # Type check the project');
    console.log('  yarn lint     # Lint the code');
    console.log('');
    console.log('🌐 The server will be available at:');
    console.log('  http://localhost:8082');
    console.log('');
    console.log('📊 API endpoints:');
    console.log('  GET  /api/companies              - List all companies');
    console.log('  GET  /api/companies/search       - Search companies');
    console.log('  GET  /api/companies/domain/:id   - Get company by domain');
    console.log('  GET  /api/data/version           - Database statistics');

  } catch (error) {
    console.error('\n💥 Setup failed!');
    console.error('Error:', error.message);
    console.error('\nPlease fix the issues above and run the setup again.');
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] === __filename) {
  main();
}

export { main as setupDatabase };