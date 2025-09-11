# Yesil Backend

A Fastify-based TypeScript backend serving multiple projects including sustainability data for Chrome extensions.

## Features

- **Search API**: Bing search integration with goal tracking
- **Sustainability API**: Company environmental data with PostgreSQL storage
- **Goal Management**: Progress tracking for searches
- **TypeScript**: Full type safety with schema validation
- **PostgreSQL**: Robust data storage with indexes and views

## New Sustainability Endpoints

### GET /api/companies
Get paginated list of all companies
- Query params: `limit` (default: 50), `offset` (default: 0)
- Returns: Paginated company data with totals

### GET /api/companies/search
Search companies by domain or name
- Query params: `domain`, `company`
- Returns: Matching companies with search metadata

### GET /api/companies/domain/:domain
Get company data by domain
- Params: `domain` (company domain to lookup)
- Returns: Single company data or 404

### GET /api/data/version
Get database statistics and version info
- Returns: Record counts, categories, last updated timestamp

## Setup

### Quick Setup (Recommended)
```bash
yarn install
yarn db:setup  # Creates .env, database, and seeds data
yarn start     # Start development server
```

### Manual Setup
1. Install dependencies:
```bash
yarn install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

3. Initialize database:
```bash
yarn db:init  # Creates the database if it doesn't exist
```

4. Seed the database:
```bash
yarn seed     # Creates tables and imports company data
```

5. Start the server:
```bash
yarn start    # Development with watch mode
```

## Available Scripts

- `yarn db:setup` - Complete setup (env + database + seeding)
- `yarn db:init` - Create database only
- `yarn db:reset` - Reset schema (drop all tables and recreate empty)
- `yarn seed` - Drop everything and import fresh data from JSON
- `yarn start` - Start development server with watch mode
- `yarn build` - TypeScript type checking
- `yarn lint` - Code linting

**Note:** The `yarn seed` command now completely drops and recreates all database objects before importing data, so it can be run multiple times safely.

## Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 12+ (must be running)

### Installing PostgreSQL
```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

## Database Schema

The sustainability data is stored in a `companies` table with:
- Full company information (domain, name, sector, location)
- Environmental data (carbon neutral status, renewable energy %)
- ESG information (certifications, policies, scores)
- JSON fields for complex data (scope disclosure)
- Indexes for fast domain and text searches
- Automatic timestamp tracking

## Environment Variables

```env
# Server
API_HOST=localhost
API_PORT=8082
LOG_LEVEL=info

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yesildoga
DB_USER=postgres
DB_PASSWORD=password
```

## Chrome Extension Integration

The sustainability endpoints are designed to serve the Chrome extension located at `../yesil-ext/`. The extension:

1. Fetches company data from `/api/companies`
2. Caches data locally for performance
3. Looks up companies by domain for overlay popups
4. Falls back gracefully when API is unavailable

## Development

```bash
# Lint code
yarn lint

# Type check
yarn build

# Seed database
yarn seed

# Start with watch mode
yarn start
```

The seeder script automatically:
- Creates database schema with indexes
- Imports data from the extension's data.json file
- Shows statistics after import
- Handles duplicate domains and data validation