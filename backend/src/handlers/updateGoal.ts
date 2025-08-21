import { FastifyRequest, FastifyReply } from 'fastify';
import { GoalService } from '../services/goalService.js';

const goalService = new GoalService();

interface UpdateGoalBody {
  goalId: string;
  progress: number;
}

export const updateGoalHandler = async (
  request: FastifyRequest<{ Body: UpdateGoalBody }>,
  reply: FastifyReply
) => {
  const { goalId, progress } = request.body;

  if (!goalId || typeof progress !== 'number') {
    return reply.code(400).send({
      error: 'goalId and progress (number) are required',
    });
  }

  try {
    const updatedGoal = goalService.updateGoal(goalId, progress);
    
    if (!updatedGoal) {
      return reply.code(404).send({
        error: 'Goal not found',
      });
    }

    return {
      success: true,
      message: `Goal ${goalId} updated to ${progress}`,
      goal: updatedGoal,
    };
  } catch (error) {
    request.log.error('Goal update error:', error);
    return reply.code(500).send({
      error: 'Internal server error during goal update',
    });
  }
};
