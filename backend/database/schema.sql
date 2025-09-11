-- PostgreSQL database schema for sustainability data

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(255) NOT NULL UNIQUE,
    company VARCHAR(255) NOT NULL,
    parent VARCHAR(255),
    sector VARCHAR(255) NOT NULL,
    hq_city VARCHAR(255) NOT NULL,
    carbon_neutral BOOLEAN NOT NULL DEFAULT FALSE,
    sbti_status VARCHAR(100),
    renewable_energy_target_year INTEGER,
    renewable_share_percent DECIMAL(5,2),
    scope_disclosure JSONB NOT NULL DEFAULT '{"1": false, "2": false, "3": false}',
    iso_certifications TEXT[] DEFAULT ARRAY[]::TEXT[],
    green_score DECIMAL(5,2),
    controversies_count_12mo INTEGER,
    esg_policy_url TEXT,
    data_confidence VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_companies_domain ON companies USING gin(to_tsvector('english', domain));
CREATE INDEX IF NOT EXISTS idx_companies_company ON companies USING gin(to_tsvector('english', company));
CREATE INDEX IF NOT EXISTS idx_companies_sector ON companies (sector);
CREATE INDEX IF NOT EXISTS idx_companies_carbon_neutral ON companies (carbon_neutral);
CREATE INDEX IF NOT EXISTS idx_companies_parent ON companies (parent);
CREATE INDEX IF NOT EXISTS idx_companies_hq_city ON companies (hq_city);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON companies 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for quick stats
CREATE OR REPLACE VIEW company_stats AS
SELECT 
    COUNT(*) as total_companies,
    COUNT(*) FILTER (WHERE carbon_neutral = true) as carbon_neutral_count,
    COUNT(*) FILTER (WHERE renewable_share_percent IS NOT NULL) as with_renewable_data,
    COUNT(*) FILTER (WHERE parent IS NULL) as independent_companies,
    COUNT(DISTINCT sector) as unique_sectors,
    COUNT(DISTINCT hq_city) as unique_cities,
    AVG(renewable_share_percent) as avg_renewable_percentage,
    MAX(updated_at) as last_data_update
FROM companies;