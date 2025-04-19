import type { Donations } from 'src/types/Donations';

export async function makeRequest(
  page: number,
  filter
): Promise<{ count: number; records: Donations[] }> {
  const results = await fetch(`/?page=${page}&type=${filter.type}`);

  return results.json();
}
