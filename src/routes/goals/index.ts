import { getGoalProgress } from '@helpers/api/getGoalProgress';
import type { FastifyInstance } from 'fastify';

type query = {
  pageSize: number;
  page: number;
  type?: string;
};

export async function goalProgress(fastify: FastifyInstance): Promise<void> {
  fastify.get('/goals', async (req, res) => {
    const { page, pageSize, type } = req.query as query;
    const response = await getGoalProgress({ page, pageSize, type });
    res.status(200).send(response);
  });
}

export async function registerSearch(fastify: FastifyInstance): Promise<void> {
  fastify.post('/goal/increase', async (req, res) => {
    console.log('Single page application server side');
    res.status(200).send({});
  });
}
