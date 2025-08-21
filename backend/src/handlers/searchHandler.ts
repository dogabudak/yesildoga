import { FastifyRequest, FastifyReply } from 'fastify';
import { SearchService } from '../services/searchService.js';
import { GoalService } from '../services/goalService.js';

const searchService = new SearchService();
const goalService = new GoalService();

interface SearchQuery {
  q: string;
  count?: number;
}

export const searchHandler = async (
  request: FastifyRequest<{ Querystring: SearchQuery }>,
  reply: FastifyReply
) => {
  const { q: query, count = 10 } = request.query;

  if (!query || query.trim() === '') {
    return reply.code(400).send({
      error: 'Query parameter "q" is required',
    });
  }

  try {
    const startTime = Date.now();
    const results = await searchService.searchWeb(query, count);
    const searchTime = Date.now() - startTime;

    const goalProgress = goalService.getAllGoals();

    return {
      results,
      totalResults: results.length,
      searchTime,
      query: query.trim(),
      goalProgress,
    };
  } catch (error) {
    request.log.error('Search error:', error);
    return reply.code(500).send({
      error: 'Internal server error during search',
    });
  }
};