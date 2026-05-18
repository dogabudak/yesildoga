import axios from 'axios';
import type { CampaignSummary, CampaignDetail } from 'src/types/Campaign';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yesildoga-api.onrender.com';

export async function getCampaigns(): Promise<CampaignSummary[]> {
  const response = await axios.get(`${API_BASE_URL}/api/campaigns/`);
  return response.data;
}

export async function getCampaignBySlug(slug: string): Promise<CampaignDetail> {
  const response = await axios.get(`${API_BASE_URL}/api/campaigns/${slug}/`);
  return response.data;
}
