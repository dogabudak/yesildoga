import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { searchHandler } from '../handlers/searchHandler.js';
import { goalIncreaseHandler, getGoalProgressHandler, updateGoalHandler } from '../handlers/goalHandler.js';

const routes: FastifyPluginAsync = async (server: any) => {
    // Search endpoint
    server.get('/search', {
        schema: {
            querystring: Type.Object({
                q: Type.String(),
                count: Type.Optional(Type.Number({ minimum: 1, maximum: 50 })),
            }),
            response: {
                200: Type.Object({
                    results: Type.Array(Type.Object({
                        title: Type.String(),
                        url: Type.String(),
                        snippet: Type.String(),
                        displayUrl: Type.String(),
                    })),
                    totalResults: Type.Number(),
                    searchTime: Type.Number(),
                    query: Type.String(),
                    goalProgress: Type.Optional(Type.Array(Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }))),
                }),
            },
        },
    }, searchHandler);

    // Goal increase endpoint (for search actions)
    server.post('/goal/increase', {
        schema: {
            body: Type.Object({
                goalId: Type.String(),
                query: Type.String(),
                amount: Type.Optional(Type.Number({ minimum: 1 })),
            }),
            response: {
                200: Type.Object({
                    success: Type.Boolean(),
                    message: Type.String(),
                    goal: Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }),
                    query: Type.String(),
                }),
            },
        },
    }, goalIncreaseHandler);

    // Get goal progress endpoint
    server.get('/goalProgress', {
        schema: {
            response: {
                200: Type.Object({
                    goals: Type.Array(Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    })),
                    totalGoals: Type.Number(),
                }),
            },
        },
    }, getGoalProgressHandler);

    // PUT endpoint for manual goal updates
    server.put('/updateGoal', {
        schema: {
            body: Type.Object({
                goalId: Type.String(),
                progress: Type.Number(),
            }),
            response: {
                200: Type.Object({
                    success: Type.Boolean(),
                    message: Type.String(),
                    goal: Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }),
                }),
            },
        },
    }, updateGoalHandler);
};

export default routes;
