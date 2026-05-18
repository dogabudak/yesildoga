export interface CompanySearchResult {
  domain: string;
  company: string;
  carbon_neutral: boolean;
  renewable_share_percent: number;
}

export interface CompanyDetail {
  domain: string;
  company: string;
  carbon_neutral: boolean;
  renewable_share_percent: number;
  sector: string;
  headquarters: string;
  origin: string;
  parent: string;
  description: string;
  documents: string;
  carbon_neutral_alternatives: string;
  data_updated_date: string;
}
