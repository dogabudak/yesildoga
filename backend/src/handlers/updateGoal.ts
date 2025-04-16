export const updateGoalHandler = async function (request:any, _reply: any) {
    const { goalId, progress } = request.body as { goalId: string; progress: number };
    return {
        success: true,
        message: `Goal ${goalId} updated ${progress}`,
    };
}
