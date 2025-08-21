import { FastifyRequest, FastifyReply } from 'fastify';
import { GoalService } from '../services/goalService.js';

const goalService = new GoalService();

interface GoalIncreaseBody {
  goalId: string;
  query: string;
  amount?: number;
}

export const goalIncreaseHandler = async (
  request: FastifyRequest<{ Body: GoalIncreaseBody }>,
  reply: FastifyReply
) => {
  const { goalId, query, amount = 1 } = request.body;

  if (!goalId || !query) {
    return reply.code(400).send({
      error: 'goalId and query are required',
    });
  }

  try {
    const updatedGoal = goalService.incrementGoal(goalId, amount);
    
    if (!updatedGoal) {
      return reply.code(404).send({
        error: 'Goal not found',
      });
    }

    request.log.info(`Goal ${goalId} incremented by ${amount} for query: "${query}"`);

    return {
      success: true,
      message: `Goal ${goalId} updated successfully`,
      goal: updatedGoal,
      query,
    };
  } catch (error) {
    request.log.error('Goal increment error:', error);
    return reply.code(500).send({
      error: 'Internal server error during goal update',
    });
  }
};

export const getGoalProgressHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const goals = goalService.getAllGoals();
    return {
      goals,
      totalGoals: goals.length,
    };
  } catch (error) {
    request.log.error('Get goals error:', error);
    return reply.code(500).send({
      error: 'Internal server error while fetching goals',
    });
  }
};

export { updateGoalHandler } from './updateGoal.js';