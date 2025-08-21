import axios from 'axios';
import { SearchResult } from '../types/index.js';

const BING_SEARCH_ENDPOINT = 'https://api.bing.microsoft.com/v7.0/search';

export class SearchService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.BING_API_KEY || '';
  }

  async searchWeb(query: string, count: number = 10): Promise<SearchResult[]> {
    if (!this.apiKey) {
      return this.getMockResults(query);
    }

    try {
      const response = await axios.get(BING_SEARCH_ENDPOINT, {
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
        },
        params: {
          q: query,
          count,
          safesearch: 'Moderate',
          textDecorations: false,
          textFormat: 'Raw',
        },
      });

      return response.data.webPages?.value?.map((result: any) => ({
        title: result.name,
        url: result.url,
        snippet: result.snippet,
        displayUrl: result.displayUrl,
      })) || [];
    } catch (error) {
      console.error('Search API error:', error);
      return this.getMockResults(query);
    }
  }

  private getMockResults(query: string): SearchResult[] {
    const mockResults = [
      {
        title: `${query} - Wikipedia`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        snippet: `Learn about ${query} on Wikipedia. Free encyclopedia with comprehensive information.`,
        displayUrl: `en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`,
      },
      {
        title: `Best ${query} - Comprehensive Guide`,
        url: `https://example.com/guide/${encodeURIComponent(query)}`,
        snippet: `Discover everything about ${query}. Expert insights and detailed information.`,
        displayUrl: `example.com/guide/${query.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        title: `${query} Reviews and Information`,
        url: `https://reviews.example.com/${encodeURIComponent(query)}`,
        snippet: `Find reviews, ratings and detailed information about ${query}.`,
        displayUrl: `reviews.example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
      },
    ];

    return mockResults.slice(0, 10);
  }
}