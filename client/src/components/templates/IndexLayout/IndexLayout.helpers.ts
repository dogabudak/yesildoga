import type { Donations } from '../../../types/Donations';

export async function makeRequest(page: number, filter): Promise<{count: number, records:Donations[]}> {
  const results = await fetch(`/absences?page=${page}&startDate=${filter.startDate}&endDate=${filter.endDate}&type=${filter.type}`);

  return results.json();
}
