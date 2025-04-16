import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import {updateGoalHandler} from "handlers/updateGoal";

const routes: FastifyPluginAsync = async (server: any) => {
    // GET endpoint
    server.get('/goalProgress', {
        schema: {
            response: {
                200: Type.Object({
                    hello: Type.String(),
                }),
            },
        },
    }, async function () {
        return { hello: 'world' };
    });

    // PUT endpoint
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
                }),
            },
        },
    }, updateGoalHandler);
};

export default routes;
