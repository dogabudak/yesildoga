import axios from 'axios';
import type { CompanySearchResult, CompanyDetail } from 'src/types/Company.type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yesildoga-api.onrender.com';

export async function searchCompanies(query: string): Promise<CompanySearchResult[]> {
  const response = await axios.get(`${API_BASE_URL}/api/companies/search`, {
    params: { company: query },
  });

  return response.data;
}

export async function getCompanyByDomain(domain: string): Promise<CompanyDetail> {
  const response = await axios.get(`${API_BASE_URL}/api/companies/domain/${domain}`);

  return response.data;
}
