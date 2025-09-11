import { Pool } from 'pg';

interface Company {
  id?: number;
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

interface PaginatedResult<T> {
  data: T[];
  total: number;
  offset: number;
  limit: number;
}

interface SearchResult {
  data: Company[];
  found: boolean;
  query: { domain?: string; company?: string };
}

class SustainabilityService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllCompanies(limit: number = 50, offset: number = 0): Promise<PaginatedResult<Company>> {
    const client = await this.pool.connect();
    try {
      const countQuery = 'SELECT COUNT(*) as total FROM companies';
      const countResult = await client.query(countQuery);
      const total = parseInt(countResult.rows[0].total);

      const dataQuery = `
        SELECT * FROM companies 
        ORDER BY company ASC 
        LIMIT $1 OFFSET $2
      `;
      const dataResult = await client.query(dataQuery, [limit, offset]);

      return {
        data: dataResult.rows,
        total,
        offset,
        limit
      };
    } finally {
      client.release();
    }
  }

  async searchCompanies(domain?: string, company?: string): Promise<SearchResult> {
    const client = await this.pool.connect();
    try {
      let query = '';
      let params: string[] = [];
      let paramIndex = 1;

      if (domain) {
        const cleanDomain = domain.replace('www.', '').toLowerCase();
        query = `
          SELECT * FROM companies 
          WHERE LOWER(domain) LIKE $${paramIndex} 
          OR $${paramIndex} LIKE '%' || LOWER(domain) || '%'
        `;
        params.push(`%${cleanDomain}%`);
        paramIndex++;
      }

      if (company && !domain) {
        query = `
          SELECT * FROM companies 
          WHERE LOWER(company) LIKE $${paramIndex}
        `;
        params.push(`%${company.toLowerCase()}%`);
      }

      if (!query) {
        return {
          data: [],
          found: false,
          query: { domain, company }
        };
      }

      const result = await client.query(query, params);

      return {
        data: result.rows,
        found: result.rows.length > 0,
        query: { domain, company }
      };
    } finally {
      client.release();
    }
  }

  async getCompanyByDomain(domain: string): Promise<Company | null> {
    const client = await this.pool.connect();
    try {
      const cleanDomain = domain.replace('www.', '').toLowerCase();
      
      const query = `
        SELECT * FROM companies 
        WHERE LOWER(domain) LIKE $1 
        OR $1 LIKE '%' || LOWER(domain) || '%'
        LIMIT 1
      `;
      
      const result = await client.query(query, [`%${cleanDomain}%`]);
      
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async getDataStats(): Promise<any> {
    const client = await this.pool.connect();
    try {
      const queries = [
        'SELECT COUNT(*) as total FROM companies',
        'SELECT COUNT(*) as carbon_neutral FROM companies WHERE carbon_neutral = true',
        'SELECT COUNT(*) as with_renewable FROM companies WHERE renewable_share_percent IS NOT NULL',
        'SELECT COUNT(*) as independent FROM companies WHERE parent IS NULL'
      ];

      const results = await Promise.all(
        queries.map(query => client.query(query))
      );

      return {
        version: '1.0.0',
        recordCount: parseInt(results[0].rows[0].total),
        lastUpdated: new Date().toISOString(),
        categories: {
          carbonNeutral: parseInt(results[1].rows[0].carbon_neutral),
          withRenewableData: parseInt(results[2].rows[0].with_renewable),
          independentCompanies: parseInt(results[3].rows[0].independent)
        }
      };
    } finally {
      client.release();
    }
  }
}

export { SustainabilityService, Company };