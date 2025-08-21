export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  displayUrl: string;
}

export interface GoalProgress {
  id: string;
  type: 'forest' | 'agriculture' | 'charity' | 'education' | 'seas';
  current: number;
  target: number;
  description: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
  query: string;
  goalProgress?: GoalProgress[];
}